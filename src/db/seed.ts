import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
    await db.delete(goalCompletions);
    await db.delete(goals);

    const result = await db.insert(goals).values([
        { title: 'Learn to cook', desiredWeeklyFrequency: 3 },
        { title: 'Go to the gym', desiredWeeklyFrequency: 5 },
        { title: 'Read a book', desiredWeeklyFrequency: 1 },
        { title: 'REACT', desiredWeeklyFrequency: 7 },
    ]).returning();

    const startOfWeek = dayjs().startOf('week')

    await db.insert(goalCompletions).values([
        { goalId: result[0].id, completedAt: startOfWeek.toDate() },
        { goalId: result[1].id, completedAt: startOfWeek.add(1, 'day').toDate() },
        { goalId: result[2].id, completedAt: startOfWeek.add(2, 'day').toDate() },
        { goalId: result[3].id, completedAt: startOfWeek.add(3, 'day').toDate() },
    ]);
}

seed().finally(() => {
    client.end();
});