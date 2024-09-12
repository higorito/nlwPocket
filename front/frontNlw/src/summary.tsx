import { CheckCircle, Plus } from "lucide-react";
import { DialogTrigger } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { InOrbitIcon } from "./components/inorbit-icon";
import { Progress, ProgressIndicator } from "./components/ui/progress-bar";
import { Separator } from "./components/ui/separator";
import { OutlineButton } from "./components/ui/outline-button";

export function Summary() {
    return (
        <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <InOrbitIcon />
                    <span className="font-semibold text-lg">9 a 13 de setembro </span>
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
                    <ProgressIndicator style={{ width: '80%' }} />
                </Progress>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Você completou <span>8</span> de <span>15</span> metas essa semana</span>
                    <span>53%</span>
                </div>
            </div>

            <Separator />

            <div className="flex gap-3 flex-wrap">
                <OutlineButton>
                    <Plus className='size-4 text-zinc-600' />
                    Programar
                </OutlineButton>
                <OutlineButton>
                    <Plus className='size-4 text-zinc-600' />
                    Meditar
                </OutlineButton>
                <OutlineButton>
                    <Plus className='size-4 text-zinc-600' />
                    Ler
                </OutlineButton>
                <OutlineButton>
                    <Plus className='size-4 text-zinc-600' />
                    Exercitar
                </OutlineButton>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-medium">Sua semana</h2>

                <div className="flex flex-col gap-4">
                    <h3 className="font-medium">
                        Sexta
                        <span className="text-zinc-400 text-xs">
                            (13 de setembro)
                        </span>
                    </h3>

                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-3">
                            <CheckCircle className="size-4 text-pink-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou "<span className="text-zinc-100">Acordar</span>" às
                                <span className="text-zinc-100"> 6:00h</span>
                            </span>
                        </li>

                        <li className="flex items-center gap-3">
                            <CheckCircle className="size-4 text-pink-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou "<span className="text-zinc-100">Treinar</span>" às
                                <span className="text-zinc-100"> 7:00h</span>
                            </span>
                        </li>

                        <li className="flex items-center gap-3">
                            <CheckCircle className="size-4 text-pink-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou "<span className="text-zinc-100">Comer</span>" às
                                <span className="text-zinc-100"> 9:00h</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}