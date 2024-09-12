import { Plus } from "lucide-react";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

import logo from '../assets/logo-in-orbit.svg'
import start from '../assets/lets-start-illustration.svg'

export function EmptyGoal() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
            <img src={logo} alt="logo" />
            <img src={start} alt="começar" />
            <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>
                Você ainda não tem nenhuma tarefa cadastrada.
            </p>

            <DialogTrigger asChild>
                <Button>
                    <Plus className='size-4' />
                    Cadastrar Meta
                </Button>
            </DialogTrigger>
        </div>
    );
}