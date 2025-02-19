export interface Message {
    id: t.Optional(t.String()),
    sender: t.String(),
    recipient: t.String(),
    content: t.String(),
    created_at: t.Optional(t.Date()),
    read_at: t.Optional(t.Date()),
    sender_deleted: t.Optional(t.Boolean()),
    recipient_deleted: t.Optional(t.Boolean()),

}

