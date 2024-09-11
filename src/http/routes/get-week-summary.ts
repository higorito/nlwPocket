import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekSummary } from '../../services/get-week-sumary';

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/summary', async () => {
        const {sumary} = await getWeekSummary();
    
        return {
            sumary
        }
    });
}