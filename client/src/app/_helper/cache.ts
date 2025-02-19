import { User } from "../_models/user"
import { parseUserPhoto } from "./_helper"
import { Paginator, QueryPagination, UserQueryPagination } from "../_models/pagination"

const data = new Map()
type catchOpt = 'members' | 'chat' | 'follower' | 'following'
type catchValue = Paginator<UserQueryPagination, User> | Paginator<QueryPagination, User>
export const catchManager = {

    caeatKey: function <T extends { [key: string]: any }>(query: T): string {
        return Object.values(query).join('-')
    },
    load: function (key: string, opt: catchOpt): catchValue | undefined {
        const _data = data.get(opt + key)
        if (opt === 'chat')
            return _data as Paginator<QueryPagination, User>
        return _data as Paginator<UserQueryPagination, User>
        return undefined


    },
    save: function (key: string, opt: catchOpt, value: catchValue) {
        //  if (opt === 'chat')
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