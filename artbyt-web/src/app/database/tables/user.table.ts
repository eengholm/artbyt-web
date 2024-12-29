import { Generated } from 'kysely'

export interface UserTable {
    id: Generated<string>,
    username: string,
    password: string,
}

export type UserRow = UserTable
export type InsertableUserRow = UserTable
export type UpdateableUserRow = UserTable
export type SelectableUserRow = UserTable

    