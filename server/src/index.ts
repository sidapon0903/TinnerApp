import { Elysia } from "elysia";

import{cors} from "@elysiajs/cors";
import { tlsConfig } from "./configs/tls.config";
import { MONGODB } from "./configs/dadtbase.configs";

import { Accountcontroller } from "./controllers/account.controllers";
import { swaggerConfig } from "./configs/swagger.config";
import { UserContreller } from "./controllers/user.controllers";
import staticPlugin from "@elysiajs/static";
import { jwtConfig } from "./configs/jwt.config";




MONGODB.connect()
const app = new Elysia()
.use(Accountcontroller)
.use(cors())
.use(swaggerConfig)
.use(staticPlugin({
assets : "public/uploads",
prefix : "img"
}))
//.use(example)

.use(jwtConfig)
.use(UserContreller)
.listen({
port : Bun.env.PORT || 8000,
  tls : tlsConfig
})

let protocol = 'http'
if ('cert' in tlsConfig)
protocol = 'https'

console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)

