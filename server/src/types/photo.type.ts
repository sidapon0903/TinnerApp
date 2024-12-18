import Elysia, {Static, t} from"elysia"


export const _photo =t.Object({
id: t.Optional(t.String()),
url:t.String(),
is_avatar: t.Optional(t.String()),
created_at :t.Optional(t.Date()),
public_id :t.String()
})

export const _uplodPhoto = t.Object({
    file : t.File({
        type:['image/jpeg','image/png'],
        maxSize:'1m',
        error : 'image eust be .jpeg or .png'
    })
})

export type photo = Static<typeof _photo>
export const PhotoDto = new Elysia().model({
    upload : _uplodPhoto,
    photo_id : t.Object({photo_id:t.String()}),
    photo : _photo,
    photos : t.Array(_photo)
})