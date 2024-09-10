import fastify from 'fastify';
import { createGoal } from '../services/create-goal';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from 'fastify-type-provider-zod';
import z from 'zod';
import { getPendingGoals } from '../services/get-pending-goals';
import { createGoalCompletion } from '../services/create-goal-completion';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.listen({
    port: 3333,
}).then(() => {
    console.log('Server started on http://localhost:3333');
});


app.post('/goals', {
    schema: {
        body: z.object({
            title: z.string(),
            desiredWeeklyFrequency: z.number().int().min(1).max(7)
        })
    }
}, async (request) => {

    const {title, desiredWeeklyFrequency} = request.body;

    await createGoal({
        title,
        desiredWeeklyFrequency
    });

});


app.get('/pending-goals', async () => {
    const {pendingGoals} = await getPendingGoals();

    return {
        pendingGoals
    }
});

app.post('/goal-completions', {
    schema: {
        body: z.object({
            goalId: z.string()
        })
    }
}, async (request) => {
    const {goalId} = request.body;

    await createGoalCompletion({
        goalId
    });

});