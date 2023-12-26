import { Elysia } from 'elysia'

import { authentication } from './authentication'
import { registerCustomer } from './routes/register-customer'
import { sendAuthenticationLink } from './routes/send-authentication-link'
import { authenticateFromLink } from './routes/authenticate-from-link'

const app = new Elysia()
  .use(authentication)
  .use(registerCustomer)
  .use(sendAuthenticationLink)
  .use(authenticateFromLink)
  .get('/', () => 'Hello')

app.listen(3333)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
