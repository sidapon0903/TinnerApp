import { Static, t } from "elysia";
export const _userpaginator = t.Object({
    pageSize : t.Number() ,
    currentPage : t.Number(),
    length: t.Optional(t.Number()),

  })
  export type pagination = Static<typeof _pagination>

  export function CreatePagination<T extends , U extends , TSchema>(itemtype:T,paginationtype)

