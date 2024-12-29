import { createKysely } from "@vercel/postgres-kysely";
import { AssignmentTable } from "./tables/assignment.table";
import { ImageTable } from "./tables/image.table";
import { UserTable } from "./tables/user.table";

export interface Database {
    assignments: AssignmentTable;
    images: ImageTable
    users: UserTable;
  }
  
  
export const db = createKysely<Database>();