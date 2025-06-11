# PrismaDB

All the prisma related commands are in the documentation

## Apply migrations

Run the following command to create and apply a migration:
`npx prisma migrate dev --name init`

## Generate DB instance

Run the following command to generate schema instance
`npx prisma generate`

## Manage your data

View and edit your data locally by running this command:
`npx prisma studio`

## PRISMA EXECUTING COMMANDS

### Commands

pull Pull the state from the database to the Prisma schema using introspection
push Push the state from Prisma schema to the database during prototyping
seed Seed your database
execute Execute native commands to your database

### Examples

Run `prisma db pull`
$ prisma db pull

Run `prisma db push`
$ prisma db push

Run `prisma db seed`
$ prisma db seed

Run `prisma db execute`
$ prisma db execute

## Database IDE

Open Prisma Interractive DB IDE
`pnpx prisma studio`
