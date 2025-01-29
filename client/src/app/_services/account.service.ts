import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user'
import { firstValueFrom } from 'rxjs'
import { parseUserPhoto } from '../_helper/_helper'
import { Photo } from '../_models/photo'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _key = 'account';
  private _baseApiUrl = environment.baseUrl + 'api/account/'
  private _http = inject(HttpClient)

  data = signal<{ user: User, token: string } | null>(null)

  constructor() {
    this.loadDataFromLocalStorage()
  }

  logout() {
    localStorage.removeItem(this._key)
    this.data.set(null)
  }

  async login(loginData: { username: string, password: string }): Promise<string> {
    try {
      const url = this._baseApiUrl + 'login'
      const response = this._http.post<{ user: User, token: string }>(url, loginData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      return error.error?.message
    }
  }

  async register(registerData: User): Promise<string> {
    try {
      const url = this._baseApiUrl + 'register'
      const response = this._http.post<{ user: User, token: string }>(url, registerData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      return error.error?.message
    }
  }

  private saveDataToLocalStorage() {
    const jsonString = JSON.stringify(this.data())
    localStorage.setItem(this._key, jsonString)
  }

  private loadDataFromLocalStorage() {
    const jsonString = localStorage.getItem(this._key)
    if (jsonString) {
      const data = JSON.parse(jsonString)
      this.data.set(data)
    }
  }
  async updateProfile(user: User): Promise<boolean> {
    const url = environment.baseUrl + 'api/user/'
    try {
      const response = this._http.patch(url, user)
      await firstValueFrom(response)
      const currenData = this.data()
      if (currenData) {
        currenData.user = user
        this.data.set(currenData)
        this.saveDataToLocalStorage()

      }
    } catch (error) {
      return false

    }

    return true
  }
  async setAvatar(photo_id: string): Promise<void> {
    const url = environment.baseUrl + 'api/photo/' + photo_id
    try {
      const response = this._http.patch(url, {})
      await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        const photos = user.photos?.map(p => {
          p.is_avatar = p.id === photo_id
          return p

        })
      }
    } catch (error) {

    }
  }
  async deletPhoto(photo_id: string): Promise<void> {
    const url = environment.baseUrl + 'api/photo/' + photo_id
    try {
      const response = this._http.patch(url, {})
      await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        const photos = user.photos?.map(p => p.id != photo_id)
        user.photos = photos
        const copyData = this.data()
        if (copyData)
          copyData.user = user
        this.data.set(copyData)
        this.saveDataToLocalStorage()

      }
    } catch (error) {


    }
  }
  async UploadPhoto(file: File): Promise<boolean> {
    const url = environment.baseUrl + 'api/photo/'
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = this._http.post<Photo>(url, formData)
      const photo = await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        if (!user.photos)
          user.photos = []
        user.photos.push(photo)

        const codyData = this.data()
        if (codyData)
          codyData.user = user
        this.data.set(codyData)
        this.saveDataToLocalStorage()
        return true
      }
    } catch (error) {
      return false
    }
    return false
  }
}