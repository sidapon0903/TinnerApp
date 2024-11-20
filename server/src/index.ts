import { listen } from "bun";
import { Elysia,t } from "elysia";
import { example } from "./controllers/example.controller";
import{swagger} from  "@elysiajs/swagger"
import{cors} from '@elysiajs/cors'
import { tlsConfig } from "./configs/tls.config";
import { MMapOptions } from "bun";
import { MONGODB } from "./configs/dadtbase.configs";
import { jwtConfig } from "./configs/jwt.configs";

MONGODB.connect()
const app = new Elysia()
.use(cors())
.use(swagger)
.use(example)
.use(jwtConfig)
.listen({
  port : Bun.env.PORT || 8000,
  tls : tlsConfig
})

let protocol = 'http'
if ('cert' in tlsConfig)
protocol = 'https'

console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)

