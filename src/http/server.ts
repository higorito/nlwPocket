import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from 'fastify-type-provider-zod';
import { createGoalRoute } from './routes/create-goal';
import { createCompletionRoute } from './routes/create-completion';
import { pendingGoalsRoute } from './routes/get-pending-goals';
import { getWeekSummaryRoute } from './routes/get-week-summary';
import fastifyCors from '@fastify/cors';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: '*',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.listen({
    port: 3333,
}).then(() => {
    console.log('Server iniciado em http://localhost:3333');
});

app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(pendingGoalsRoute);
app.register(getWeekSummaryRoute);
