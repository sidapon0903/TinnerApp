import { Query } from "@angular/core"
import { User } from "../_models/user"
import { QueryPagination, UserQueryPagination } from "./pagination"

const defaultAvatar = '/assets/images-removebg-preview.png'
const images_not_found = '/ggg.png.png'

function getAvatar(user: User): string {
    if (user.photos) {
        const avater = user.photos.find(p => p.is_avatar_avatar === true)
        if (avater)
            return avater.url
    }
    return defaultAvatar
}
function getPhotoOfTheDay(user: User): string {
    if (user.photos && user.photos.length > 0) {
        const index = Math.floor(Math.random() * user.photos.length)
        return user.photos[0].url
    }
    return defaultAvatar
}
export function parseUserPhoto(user: User): User {
    user.avater = getAvatar(user)
    user.photoOfTheDay = getPhotoOfTheDay(user)
    return user
}
export function parseQuery(query: QueryPagination | UserQueryPagination): string {
    let queryString = '?'
    if (query.pageSize)
        queryString += `&pageSize= ${query.pageSize}`
    if (query.currentPage)
        queryString += `&currentPage= ${query.currentPage}`

    if ('username' in query && query.username)
        queryString += `&username= ${query.username}`
    if ('looking_for' in query && query.looking_for)
        queryString += `&looking_for= ${query.looking_for}`
    if ('min_age' in query && query.min_age)
        queryString += `&max_age= ${query.min_age}`
    if ('max_age' in query && query.max_age)
        queryString += `&max_age= ${query.max_age}`

    return queryString
}