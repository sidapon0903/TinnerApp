import { Elysia } from "elysia";
import { example } from "./controllers/example.controller";
import{cors} from "@elysiajs/cors";
import { tlsConfig } from "./configs/tls.config";
import { MONGODB } from "./configs/dadtbase.configs";
import { jwtConfig } from "./controllers/jwt.configs";
import { Accountcontroller } from "./controllers/account.controllers";
import { swaggerConfig } from "./configs/swagger.config";
import { userController } from "./controllers/user.controllers";


MONGODB.connect()
const app = new Elysia()
.use(Accountcontroller)
.use(cors())
.use(swaggerConfig)
.use(example)
.use(jwtConfig)
.use(userController)
.listen({
port : Bun.env.PORT || 8000,
  tls : tlsConfig
})

let protocol = 'http'
if ('cert' in tlsConfig)
protocol = 'https'

console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)

