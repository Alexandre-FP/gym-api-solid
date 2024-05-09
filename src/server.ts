import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0', // sejá acessivel pelo front-end
    port: env.PORT_DEV,
  })
  .then(() => console.log(`🚀 HTTP Server Running in ${env.PORT_DEV}!`))
