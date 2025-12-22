import { db } from "@/app/database/database";
import { Assignment } from "@/interfaces/assignment";

export async function GET(limit: number | undefined) : Promise<Assignment[]> {

    if(limit !== undefined && limit > 0){
        const assignements = await db.selectFrom('assignments')
        .selectAll()
        .limit(limit)
        .$castTo<Assignment>()
        .execute();
        
        return assignements;
    }
    else{
        const assignements = await db.selectFrom('assignments')
        .selectAll()
        .$castTo<Assignment>()
        .execute();
        
        return assignements;
    }
}