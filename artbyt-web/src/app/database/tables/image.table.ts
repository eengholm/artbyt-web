import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface ImageTable {
    id: Generated<number>
    created_at: Generated<Date>
    filename: string | null
    url: string | null
    assignment_id: number
  }

export type ImageRow = Selectable<ImageTable>
export type InsertableImageRow = Insertable<ImageTable>
export type UpdateableImageRow = Updateable<ImageTable>