import Elysia, { Static, t } from "elysia"
import { _pagination, CreatePagination } from "./pagination.type"
import { _user } from "./user.type"

const _massage = t.Object({
    id: t.Optional(t.String()),
    sender: t.String(),
    recipient: t.String(),
    content: t.String(),
    created_at: t.Optional(t.Date()),
    read_at: t.Optional(t.Date()),
    sender_deleted: t.Optional(t.Boolean()),
    recipient_deleted: t.Optional(t.Boolean()),

})
export const _massagePaginator = CreatePagination(_massage, _pagination)
export type MassagePagination = Static<typeof _pagination>
export type message = Static<typeof _massage>
export const MessageDto = new Elysia().model({
    pagination: t.Optional(_pagination),

    message: _massagePaginator
})