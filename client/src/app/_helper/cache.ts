import { User } from "../_models/user"
import { parseUserPhoto } from "./_helper"
import { Paginator, UserQueryPagination } from "./pagination"
const data = new Map()
type catchOpt = 'members' | 'chat' | 'follower' | 'following'
type catchValue = Paginator<UserQueryPagination, User>
export const catchManager = {

    caeatKey: function <T extends { [key: string]: any }>(query: T) {
        return Object.values(query).join('-')
    },
    load: function (key: string, opt: catchOpt): catchValue | undefined {
        return data.get(opt + key)

    },
    save: function (key: string, opt: catchOpt, value: catchValue) {
        if (opt === 'chat')
            value.items = value.items.map(u => parseUserPhoto(u))
        data.set(opt + key, value)
    },
    clear: function (opt: catchOpt | 'all') {
        if (opt === 'all')
            data.clear()
        else
            for (const key of data.keys()) {
                if (key.startstWith(opt))
                    data.delete(key)
            }
    },
}