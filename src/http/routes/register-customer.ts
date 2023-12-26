import Elysia, { t } from 'elysia'

import { db } from '@/db/connection'
import { users } from '@/db/schema'

export const registerCustomer = new Elysia().post(
  '/customers',
  async ({ body, set }) => {
    const { name, email, phone } = body

    await db.insert(users).values({
      name,
      email,
      phone,
    })

    set.status = 'Created'
  },
  {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      phone: t.String(),
      email: t.String({ format: 'email' }),
    }),
  },
)
