import mongoose from "mongoose"
import { IMessageModel, IMessageDocument } from "../interfaces/message.interfaces"
import { message } from "../types/message.type"

const schema = new mongoose.Schema<IMessageDocument, IMessageModel>({
    sender: { type: mongoose.Types.ObjectId, ref: 'User' required: true },
    recipient: { type: mongoose.Types.ObjectId, ref: 'User'required: true },
    content: { type: String, required: true },
    read_at: { type: Date },
    sender_deleted: { type: Boolean },
    recipient_deleted: { type: Boolean, }
}, {
    timestamps: { createdAt: 'created_at', }
})
schema.methods.toMessage = function (): message {
    return {
        id: this._id.toSting(),
        sender: this.sender.toSting(),
        recipient: this.recipient.toSting(),
        content: this.content,
        created_at: this.created_at,
        read_at: this.read_at,
        sender_deleted: this.sender_deleted,
        recipient_deleted: this.recipient_deleted,
    }
}
schema.index({ sender: 1, recipient: 1, creaated_at: 1 })
schema.index({ recipient: 1, sender: 1, creaated_at: 1 })

export const Message = mongoose.model<IMessageDocument, IMessageModel>('Message', schema)   