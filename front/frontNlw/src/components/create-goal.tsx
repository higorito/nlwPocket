
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from './ui/radio-group';

export function CreateGoal() {
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

                <form action="" className='flex-1 flex-col justify-between'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='title'>Qual a atividade?</Label>
                            <Input id='title' type='text' placeholder='Ex: Fazer exercícios...' autoFocus />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='vezes'>Quantas vezes na semana?</Label>
                            <RadioGroup>
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
                            </RadioGroup>
                        </div>
                    </div>

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