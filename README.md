istema de Gestión Escolar CRUD
Este proyecto es una aplicación web para gestionar alumnos, profesores y materias, construida con Laravel 11, React y Inertia.js. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) y establecer relaciones de muchos a muchos entre las entidades principales.

Configuración del Entorno (.env)
Para que el proyecto funcione correctamente, es necesario configurar el archivo de variables de entorno. Sigue los siguientes pasos:

Copia el archivo de ejemplo y nómbralo .env:

cp .env.example .env

Genera una clave de aplicación única para Laravel:

php artisan key:generate

Abre el archivo .env y configura las credenciales de tu base de datos. Asegúrate de que los campos DB_DATABASE, DB_USERNAME y DB_PASSWORD coincidan con tu configuración local.

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tu_base_de_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

Ejecuta las migraciones para crear las tablas en la base de datos:

php artisan migrate

Diseño de las Tablas Relacionales
Para gestionar las relaciones entre alumnos, profesores y materias, se optó por un diseño de base de datos relacional de muchos a muchos (N:M), utilizando tablas intermedias.

Decisión: En lugar de agregar una columna a la tabla de alumnos para listar todas las materias (lo que sería ineficiente y complicado de mantener), se crearon dos tablas de unión:

alumnos_materias: Relaciona a un alumno con una materia. Un alumno puede tener múltiples materias y una materia puede ser asignada a múltiples alumnos.

profesores_materias: Relaciona a un profesor con una materia, permitiendo que un profesor imparta varias materias.

Ventajas: Este enfoque previene la redundancia de datos y facilita la escalabilidad. Si un alumno se da de baja de una materia, solo se elimina una fila de la tabla alumnos_materias, sin afectar a las otras tablas. Además, Eloquent de Laravel simplifica enormemente el manejo de estas relaciones con métodos como attach(), detach() y sync().
