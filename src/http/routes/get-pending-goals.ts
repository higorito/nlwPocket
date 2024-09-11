import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getPendingGoals } from '../../services/get-pending-goals';

export const pendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/pending-goals', async () => {
        const {pendingGoals} = await getPendingGoals();
    
        return {
            pendingGoals
        }
    });
}