import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'
import { catchManager } from '../_helper/cache'
import { parseQuery, parseUserPhoto } from '../_helper/_helper'
import { firstValueFrom } from 'rxjs'

type dataCategory = 'members' | 'follower' | 'following'

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient)
  private url = environment.baseUrl + 'api/'
  paginator = signal<Paginator<UserQueryPagination, User>>(default_paginator)
  private getData(category: dataCategory) {
    const pagination = this.paginator().pagination

    let key = catchManager.caeatKey(pagination)
    const catchData = catchManager.load(key, category)
    if (catchData) {
      console.log(`load ${category} from cache !!`)
      this.paginator.set(catchData)
      return
    }

    console.log(`load ${category} from sever !!`)
    const url = this.url + 'user/' + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        key = catchManager.caeatKey(pagination)
        catchManager.save(key, category, response)
        this.paginator.set(response)
      }
    })
  }
  getMembers() {
    this.getData('members')
  }
  async getMemberByUsername(username: string): Promise<User | undefined> {
    const member = this.paginator().items.find(obj => obj.username === username)
    if (member) {
      console.log('นิ่งไว้เ!!!!!!')
      return member
    }
    else {
      console.log('นิ่งไว้เ!!!!!!/api')
      try {
        const url = this.url + 'user/' + username
        const _member = await firstValueFrom(this.http.get<User>(url))
        return parseUserPhoto(_member)
      } catch (error) {
        console.error('Get Member Error', error)
      }
    }
    return undefined

  }
}
