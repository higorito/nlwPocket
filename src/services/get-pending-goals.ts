import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, lte, gte, eq, sql } from "drizzle-orm";


export async function getPendingGoals() {
    const lastDayOfWeek = dayjs().endOf('week').toDate();
    const firstDayOfWeek = dayjs().startOf('week').toDate();

    const goalsCreateUpToWeek = db.$with('goals_create_up_to_week').as(
        db.select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt,
        }).from(goals).where(
            lte(goals.createdAt, lastDayOfWeek) //lower than or equal(lte) MENOR OU IGUAL AO ULTIMO DIA DA SEMANA
        )
    )
    
    const goalsCompletionCounts = db.$with('goals_completion_counts').as(
        db.select({
            goalId: goalCompletions.goalId,
            completionCount: count(goalCompletions.id)
                .mapWith(Number)
                .as('completionCount')
            
        })
        .from(goalCompletions)
        .where(and(
            gte(goalCompletions.createdAt, firstDayOfWeek), //greater than or equal(gte) MAIOR OU IGUAL AO PRIMEIRO DIA DA SEMANA
            lte(goalCompletions.createdAt, lastDayOfWeek)
        ))
        .groupBy(goalCompletions.goalId)
    )

    const pendingGoals = await db.with(goalsCreateUpToWeek, goalsCompletionCounts)
    .select({
        id: goalsCreateUpToWeek.id,
        title: goalsCreateUpToWeek.title,
        desiredWeeklyFrequency: goalsCreateUpToWeek.desiredWeeklyFrequency,
        completionCount: sql`COALESCE(${goalsCompletionCounts.completionCount}, 0)`.mapWith(Number)
    })
    .from(goalsCreateUpToWeek)
    .leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalId, goalsCreateUpToWeek.id))

    return {
        pendingGoals
    }

}