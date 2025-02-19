import { computed, inject, Injectable, signal, Signal } from '@angular/core'
import { User } from '../_models/user'
import { AccountService } from './account.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { catchManager } from '../_helper/cache'
import { parseQuery } from '../_helper/_helper'
import { default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  user: Signal<User | undefined>
  following = signal<Paginator<UserQueryPagination, User>>(default_paginator)
  follower = signal<Paginator<UserQueryPagination, User>>(default_paginator)

  http: HttpClient = inject(HttpClient)
  accountService: AccountService = inject(AccountService)
  private _baseApiUrl = environment.baseUrl + 'api/like/'
  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }
  public IsFollowingMember(id: string): boolean {
    const user = this.user()
    if (!user) return false
    const following = (user.following as string[])
    return following.includes(id)
  }
  toggleLike(target_id: string): boolean {

    const user = this.user()
    if (!user) return false
    const url = this._baseApiUrl
    this.http.put(url, { target_id }).subscribe()

    const following = (user.following as string[])
    const isFollowingtarget = following.includes(target_id)
    if (isFollowingtarget) {
      console.log(`remove ${target_id} from following list`)

      user.following = following.filter(id => id !== target_id)
    } else {

      console.log(`add ${target_id} to following list`)
      following.push(target_id)
      user.following = following

    }
    this.accountService.SetUser(user)
    return user.following.includes(target_id)
  }
  getDataFromApi(type: 'follower' | 'following') {
    const setSignal = (cacheData: Paginator<UserQueryPagination, User>) => {
      //  console.log(` --> load ${type} data from cache`)
      if (type === 'follower')
        this.following.set(cacheData)
      else
        this.follower.set(cacheData)
    }
    const pagination = type === 'following' ? this.following().pagination : this.follower().pagination
    const key = catchManager.caeatKey(pagination)
    const cacheData = catchManager.load(key, type)
    if (cacheData) {
      console.log(` --> load ${type} data from cache`)
      if (type === 'follower')
        this.following.set(cacheData)
      else
        this.follower.set(cacheData)
      return
    }
    console.log(` --> load ${type} data from api`)
    const url = this._baseApiUrl + type + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        const key = catchManager.caeatKey(response.pagination)
        catchManager.save(key, type, response)
        setSignal(response)
      }


    })
  }
  getfollowing() {
    this.getDataFromApi('following')
  }
  getfollowers() {
    this.getDataFromApi('follower')
  }
}
