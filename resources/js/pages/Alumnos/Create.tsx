import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
type CreateAlumnoFrom = {
    nombre?: string;
    apellido?: string;
    email?: string;
};
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from 'sonner';


export default function Create() {
    const alumnoName = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm<CreateAlumnoFrom>({
        nombre: '',
        apellido: '',
        email: '',
    });
   
    const createAlumno: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        router.post('/alumnos', data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (alumnoName.current) {
                    alumnoName.current.focus();
                }
                toast.success('Alumno creado con éxito');
            },
            onError: () => {
                console.log(errors);
                toast.error('Error creando el alumno');
            },
        });
    }
       
    
    return (
        <AppLayout>
            <Head title="Agregar Alumno" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <h1 className="text-2xl font-bold">Agregar Alumno</h1>
                    <div>
                        <form onSubmit={createAlumno} className="max-w-md space-y-6">
                            <div>
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input
                                    type="text"
                                    id="nombre"
                                    ref={alumnoName}
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                />
                                <InputError message={errors.nombre} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="apellido">Apellido</Label>
                                <Input
                                    type="text"
                                    id="apellido"
                                    value={data.apellido}
                                    onChange={(e) => setData('apellido', e.target.value)}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                />
                                <InputError message={errors.apellido} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <Button type="submit" disabled={processing} className={buttonVariants({ variant: 'default' })}>
                                    Guardar
                                </Button>
                            </div>
                        </form>
                        
                    </div>               
            </div>
        </AppLayout>
    );
}
