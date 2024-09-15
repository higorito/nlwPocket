import { CheckCircle, Plus } from "lucide-react";
import { DialogTrigger } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { InOrbitIcon } from "./components/inorbit-icon";
import { Progress, ProgressIndicator } from "./components/ui/progress-bar";
import { Separator } from "./components/ui/separator";
import { OutlineButton } from "./components/ui/outline-button";

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";
import { PendingGoals } from "./components/pending-goals";

dayjs.locale(ptBr);

export function Summary() {


    const { data } = useQuery({
        queryKey: ['summary'],
        queryFn: getSummary,
        staleTime: 1000 * 60 * 2 // 2 minutes
    })

    if (!data) return
    
    const firstDayOfWeek = dayjs().startOf('week').format('DD MMM');
    const lastDayOfWeek = dayjs().endOf('week').format('DD MMM');

    const completedPerc = Math.round((data.completed / data.total) * 100);

    return (
        <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <InOrbitIcon />
                    <span className="font-semibold text-lg capitalize">{firstDayOfWeek} - {lastDayOfWeek}</span>
                </div>

                <DialogTrigger asChild >
                    <Button size="sm">
                        <Plus className='size-4' />
                        Cadastrar Meta
                    </Button>
                </DialogTrigger>

            </div>
            <div className="flex flex-col gap-3">
                <Progress max={15} value={8}>
                    <ProgressIndicator style={{ width: `${completedPerc}%` }} />
                </Progress>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Você completou <span>{data?.completed} </span> de <span>{data?.total}</span> metas essa semana</span>
                    <span>{completedPerc}%</span>
                </div>
            </div>

            <Separator />

            <PendingGoals/>

            {Object.entries(data.goalsPerDay).map(([date, goals]) => {
                const weekDay = dayjs(date).format('dddd');
                const formatedDate = dayjs(date).format('DD [de] MMMM');


                return (
                    <div key={date} className="flex flex-col gap-6">
                        <h2 className="text-xl font-medium">Sua semana</h2>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-medium capitalize">
                                {weekDay}{' '}
                                <span className="text-zinc-400 text-xs">
                                    ({formatedDate})
                                </span>
                            </h3>

                            <ul className="flex flex-col gap-3">
                                {goals.map(goal => {
                                    const time = dayjs(goal.completedAt).format('HH:mm');

                                    return (
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="size-4 text-pink-500" />
                                            <span className="text-sm text-zinc-400">
                                                Você completou "<span className="text-zinc-100">{goal.title}</span>" às {' '}
                                                <span className="text-zinc-100">{time}</span>
                                            </span>
                                        </li>
                                    )
                                }
                                )}

                            </ul>
                        </div>
                    </div>
                )
            }
            )}

        </div>
    );
}