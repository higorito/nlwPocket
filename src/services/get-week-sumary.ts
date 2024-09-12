import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { count, lte, gte, and, eq, sql } from "drizzle-orm"; 


export async function getWeekSummary() {
    const lastDayOfWeek = dayjs().endOf('week').toDate();
    const firstDayOfWeek = dayjs().startOf('week').toDate();

    const goalsCreateUpToWeek = db.$with('goals_created_up_to_week').as(
        db.select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt
        })
        .from(goals)
        .where(lte(goals.createdAt, lastDayOfWeek))
    )

    const goalCompletedInWeek = db.$with('goals_completed_in_week').as(
        db.select({
            id: goalCompletions.id,
            title: goals.title,
            completedAt: goalCompletions.createdAt,
            completedAtDate: sql`DATE(${goalCompletions.createdAt})`.as('completedAtDate')
        })
        .from(goalCompletions)
        .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
        .where(and(
            gte(goalCompletions.createdAt, firstDayOfWeek),
            lte(goalCompletions.createdAt, lastDayOfWeek)
        ))
    )

    const goasCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
        db.select({
            completedAtDate: goalCompletedInWeek.completedAtDate,
            completions: sql`
             JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', ${goalCompletedInWeek.id},
                    'title', ${goalCompletedInWeek.title},
                    'completedAt', ${goalCompletedInWeek.completedAt}
                )
             )
            `.as('completions')
        })
        .from(goalCompletedInWeek)
        .groupBy(goalCompletedInWeek.completedAtDate)
    )

    const result = await db
        .with(goalsCreateUpToWeek, goalCompletedInWeek, goasCompletedByWeekDay)
        .select({
            completed: sql`(SELECT COUNT(*) FROM ${goalCompletedInWeek})`.mapWith(Number),
            total: sql`(SELECT SUM(${goalsCreateUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreateUpToWeek})`.mapWith(Number),
            goalsPerDay: sql`
                    JSON_OBJECT_AGG(
                        ${goasCompletedByWeekDay.completedAtDate},
                        ${goasCompletedByWeekDay.completions}
                    )
            `,
        })
        .from(goasCompletedByWeekDay)

    return {
        result
    }
}