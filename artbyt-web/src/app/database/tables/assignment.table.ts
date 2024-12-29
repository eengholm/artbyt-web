import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface AssignmentTable {
    id: Generated<number>
    created_at: Generated<Date>
    title: string | null
    description: string | null
  }

export type AssignementRow = Selectable<AssignmentTable>
export type InsertableAssignementRow = Insertable<AssignmentTable>
export type UpdateableAssignementRow = Updateable<AssignmentTable>