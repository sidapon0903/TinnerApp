import { Photo } from "./photo";

export interface User {
 user: User;
 id:string,
 display_name?:string,
 username?:string,
 create_at?:Date,
 updated_at?:Date,
 last_active?:Date,
 introduction?:string,
 interest?:string,
 looking_for?:string,
 location?:string,
 gander?:string,
 age?:string,
 avater?:string,
 photos?:Photo[],
 photoOfTheDay?:string

 followers:User[ ]| String[]
 following:User[ ]| String[]

 password?: string
}
