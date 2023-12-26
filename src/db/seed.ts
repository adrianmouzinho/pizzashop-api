import { faker } from '@faker-js/faker'
import chalk from 'chalk'

import { authLinks, restaurants, users } from './schema'
import { db } from './connection'

/**
 * Reset database
 */
await db.delete(restaurants)
await db.delete(authLinks)
await db.delete(users)

console.log(chalk.yellow('✔ Database reset'))

/**
 * Create customers
 */
const [customer1, customer2] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'customer',
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'customer',
    },
  ])
  .returning()

console.log(chalk.yellow('✔ Created customers'))

/**
 * Create restaurant manager
 */
const [manager] = await db
  .insert(users)
  .values({
    name: 'Adrian Mouzinho',
    email: 'adrian.mouz@gmail.com',
    role: 'manager',
  })
  .returning()

console.log(chalk.yellow('✔ Created manager'))

/**
 * Create restaurant
 */
const [restaurant] = await db
  .insert(restaurants)
  .values({
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.id,
  })
  .returning()

console.log(chalk.yellow('✔ Created restaurant'))

console.log(chalk.greenBright('Database seeded successfully!'))

process.exit()
