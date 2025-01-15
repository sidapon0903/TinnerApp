import { User } from "../_models/user"

const defaultAvatar = '/assets/images-removebg-preview.png'
const images_not_found = '/ggg.png.png'

function getAvatar(user:User):string {
    if(user.photos){
        const avater = user.photos.find(p=> p.is_avatar_avatar === true)
        if (avater)
        return avater.url
}
    return defaultAvatar
}
function getPhotoOfTheDay(user:User):string{
    if(user.photos&&user.photos.length > 0 ){
    const index = Math.floor(Math.random()*user.photos.length);
        return user.photos[0].url
    }
    return defaultAvatar
}
export function parseUserPhoto(user:User):User{
    user.avater = getAvatar (user)
    user.photoOfTheDay = getPhotoOfTheDay(user)
    return user
}