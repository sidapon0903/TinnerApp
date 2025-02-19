import { Elysia, t } from "elysia"
// import { example } from "./controllers/example.controller"
import { swaggerConfig } from "./configs/swagger.config"
import { tlsConfig } from "./configs/tls.config"
import cors from "@elysiajs/cors"

import { jwtConfig } from "./configs/jwt.config"
import { AccountController } from "./controllers/account.controller"
import { UserController } from "./controllers/user.controller"
import staticPlugin from "@elysiajs/static"
import { PhotoController } from "./controllers/photo.controller"
import { LikeController } from "./controllers/like.controller"
import { MongoDB } from "./configs/dadtbase.configs"
import { ErrorController } from "./controllers/errorControllers"
import { MessageController } from "./controllers/message.contrllers"

MongoDB.connect()

const app = new Elysia()
  .use(cors())
  .use(jwtConfig)
  .use(swaggerConfig)
  // .use(example)

  .use(staticPlugin({
    assets: "public/uploads",
    prefix: "img"
  }))

  .use(AccountController)
  .use(UserController)
  .use(PhotoController)
  .use(LikeController)
  .use(ErrorController)
  .use(MessageController)

  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)
