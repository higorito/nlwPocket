import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPending } from "../http/get-peding-goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {

    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['pending-goals'],
        queryFn: getPending,
        staleTime: 1000 * 60 * 2 // 2 minutes
    })

    if (!data) return

    async function handleCompleteGoal(goalId: string) {
        await createGoalCompletion(goalId)

        queryClient.invalidateQueries({ queryKey: ['summary'] })
        queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    }

    return (
        <div className="flex gap-3 flex-wrap">
            {data.map(goal => {
                return (
                    <OutlineButton key={goal.id}
                        disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
                        onClick={() => handleCompleteGoal(goal.id)}
                    >
                        <Plus className='size-4 text-zinc-600' />
                        <span className="capitalize">{goal.title}</span>
                    </OutlineButton>
                )
            }
            )}

        </div>
    )
}