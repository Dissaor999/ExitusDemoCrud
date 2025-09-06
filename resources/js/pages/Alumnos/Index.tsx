import AppLayout from '@/layouts/app-layout';
import { Head, router, Link } from '@inertiajs/react';
import {type Alumnos} from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Index({ alumnos }: { alumnos: Alumnos[] }) {
    const deleteAlumno = async (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
            try {
                router.delete(route('alumnos.destroy', { id }));
                toast.success('Alumno eliminado con éxito');
            } catch (error) {
                console.error('Error eliminando alumno:', error);
                toast.error('Error eliminando alumno');
            }
        }
    };
    return (
        <AppLayout>
            <Head title="Lista de Alumnos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <h1 className="text-2xl font-bold">Lista de Alumnos</h1>
                    <div>
                        <Button 
                            className={buttonVariants( { variant: 'default' })}>
                            <a href={`/alumnos/create`}>Agregar Alumno</a>
                        </Button>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Apellido</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alumnos.map((alumno) => (
                                    <TableRow key={alumno.id}>
                                        <TableCell className="font-medium">{alumno.id}</TableCell>
                                        <TableCell>{alumno.nombre}</TableCell>
                                        <TableCell>{alumno.apellido}</TableCell>
                                        <TableCell>{alumno.email}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                                                asChild
                                            >
                                                <a href={`/alumnos/${alumno.id}/edit`}>Editar</a>
                                            </Button>
                                            <Button
                                                className={buttonVariants({ variant: 'destructive', size: 'sm'})}
                                                asChild
                                                onClick={() => deleteAlumno(alumno.id)}
                                            >
                                                <p>Eliminar</p>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>               
            </div>
        </AppLayout>
    );
}
