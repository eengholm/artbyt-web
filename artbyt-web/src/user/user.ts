import { Generated } from "kysely"

export interface User {
    id: Generated<string>
    name: string
    password: string
  }