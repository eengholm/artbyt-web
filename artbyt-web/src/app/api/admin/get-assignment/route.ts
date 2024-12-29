import { db } from "@/app/database/database";
import { Assignment } from "@/interfaces/assignment";

export async function GET() : Promise<Assignment[]> {

    const assignements = await db.selectFrom('assignments')
    .selectAll()
    .$castTo<Assignment>()
    .execute();
    
    return assignements;
}