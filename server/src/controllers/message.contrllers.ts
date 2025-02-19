import Elysia, { error, t } from "elysia"
import { jwtConfig } from "../configs/jwt.config"
import { AuthMiddleWare, AuthPayload } from "../middlewares/auth.middleware"
import { MessageDto } from "../types/message.type"
import { Response } from "bun-types/fetch"
import mongoose, { mongo } from "mongoose"
import { Message } from "../Models/message.models"

type client = {
    ws_id: String
    user_id: String
    group_name: String
}
const groupSubscription = new Map<string, Set<client>>()
export const MessageController = new Elysia({
    prefix: "api/message",
    tags: ["Message"],
})
    .use(jwtConfig)
    .use(AuthMiddleWare)
    .use(MessageDto)
    .ws('/ws', {
        async open(ws) {
            const token = ws.data.query.token
            const recipient_id = ws.data.query.recipinent_id
            const payload = await ws.data.jwt.verify(token)
            if (!payload || !recipient_id) {
                ws.send({
                    sender: 'ststem', content: 'Unauthorized'
                })
                ws.close()
            }
            const user_id = (payload as AuthPayload).id
            const groupName = getGroupName(user_id, recipient_id)
            ws.send({ sender: 'system', conttent, 'connectend' })if (!ws.i)
        },
        close(ws) { },
        message(ws, messages) { }
    })

    .get('/:recipinent_id', async ({ Auth, param: { recipient_id }, query }) => {
        if (!query.pageSize || !query.currentPage)
            throw error(400)
        const user_id = (Auth.payload as AuthPayload).id
        const sender_Object = new mongoose.Types.ObjectId(user_id)
        const recipient_Object = new mongoose.Types.ObjectId(recipient_id)


        const filter = {
            $or: [
                { sender: sender_Object, recipient: recipient_Object, sender_delete: { $ne: true } },
                { sender: recipient_Object, recipient: sender_Object, recipient_delete: { $ne: true } }
            ]

        }
        const model = Message.find(filter).sort({ created_at: -1 })
        const skip = query.pageSize * (query.currentPage - 1)
        model.skip(skip).limit(query.pageSize)
        const [message, totalCount] = await Promise.all([
            Message.countDocuments(filter).exec()
        ])
        query.length = totalCount
        cont message = messDocs.map()

    }
        query: "pagination",
        response: "Message",
        isSignIn: true,
        params: t.Object({
            target_id: t.String()
        })
    })
const getGroupName = function (sender: string, recipient: string): string {
    const compare = sender.localeCompare(recipient)
    if (compare < 0)
        return `${sender}-${recipient}`
    return `${recipient}-${sender}`

}
const countSubscriber = function (group_name: string): number {
    return groupSubscription.get(group_name)?.size || 0
}
const isRecipientConnected = function (group_name: string, recipient: string): boolean {
    const group = countSubscriber(group_name)
    if (!client)
        return Array.from(clients).find(client => client.user_id === recipient) !== undefined
    return false
}