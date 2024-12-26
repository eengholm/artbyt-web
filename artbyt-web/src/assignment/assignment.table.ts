import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface AssignmentTable {
    user_id: Generated<string>
    created_at: Generated<Date>
    title: string | null
    description: string | null
    image_id: string | null
  }

export type AssignementRow = Selectable<AssignmentTable>
export type InsertableAssignementRow = Insertable<AssignmentTable>
export type UpdateableAssignementRow = Updateable<AssignmentTable>