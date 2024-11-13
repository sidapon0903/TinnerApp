import { listen } from "bun";
import { Elysia,t } from "elysia";
import { example } from "./controllers/example.controller";
import{swagger} from  "@elysiajs/swagger"
import{cors} from '@elysiajs/cors'
const app = new Elysia()
.use(cors())
.use(swagger)
.use(example)
.listen(8000)

let protocol = 'http'
if ('cert' in tlsconfig)
protocol = 'https'

console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
