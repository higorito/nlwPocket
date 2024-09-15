
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from './ui/radio-group';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { createGoal } from '../http/create-goal';


const createGoalForm = z.object({
    title: z.string().min(1, 'O título é obrigatório'),
    desiredWeeklyFrequency: z.coerce.number().min(1).max(7)
})


type CreateGoalForm = z.infer<typeof createGoalForm>;

export function CreateGoal() {
    const queryClient = useQueryClient()

    const { register, control, handleSubmit, formState, reset } = useForm<CreateGoalForm>({
        resolver: zodResolver(createGoalForm)
    });

    async function handleCreateGoal(data: CreateGoalForm) {
        await createGoal({
            title: data.title,
            desiredWeeklyFrequency: data.desiredWeeklyFrequency
        });

        queryClient.invalidateQueries({ queryKey: ['summary'] })
        queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

        reset();
    }

    return (
        <DialogContent>
            <div className='flex flex-col gap-6 h-full'>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <DialogTitle>
                            Adicionar Meta
                        </DialogTitle>
                        <DialogClose>
                            <X className='size-4 text-zinc-600' />
                        </DialogClose>

                    </div>
                    <DialogDescription>
                        Adicione uma nova meta para começar a organizar suas tarefas.
                    </DialogDescription>
                </div>

                <form onSubmit={handleSubmit(handleCreateGoal)} className='flex-1 flex-col justify-between'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='title'>Qual a atividade?</Label>
                            <Input id='title' type='text' placeholder='Ex: Fazer exercícios...' autoFocus
                                {...register('title')}
                            />

                            {formState.errors.title && (
                                <span className='text-red-500 text-sm font-medium'>
                                    {formState.errors.title.message}
                                </span>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='vezes'>Quantas vezes na semana?</Label>
                            <Controller
                                control={control}
                                defaultValue={3}
                                name='desiredWeeklyFrequency'
                                render={({ field }) => {
                                    return (
                                        <RadioGroup onValueChange={field.onChange}
                                            value={String(field.value)}
                                        >
                                            <RadioGroupItem value='1'>
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>
                                                    1 vez na semana
                                                </span>
                                                <span>😉</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value='2'>
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>
                                                    2 vezes na semana
                                                </span>
                                                <span>😊</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value='3'>
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>
                                                    3 vezes na semana
                                                </span>
                                                <span>🥰</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value='4'>
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>
                                                    4 vezes na semana
                                                </span>
                                                <span>😎</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value='5'>
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>
                                                    5 vezes na semana
                                                </span>
                                                <span>😍</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value='6'>
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>
                                                    6 vezes na semana
                                                </span>
                                                <span>🤩</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value='7'>
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>
                                                    Todos os dias
                                                </span>
                                                <span>🚀</span>
                                            </RadioGroupItem>
                                        </RadioGroup>
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    <div className='flex items-center gap-3'>
                        <DialogClose asChild>
                            <Button type='button' variant='secondary' className='flex-1' >
                                Fechar
                            </Button>
                        </DialogClose>
                        <Button className='flex-1' >Adicionar</Button>
                    </div>
                </form>


            </div>
        </DialogContent>
    );
}