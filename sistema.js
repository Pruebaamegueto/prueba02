const fs = require('fs');
const readline = require('readline');

// sistema.js

class Hospital {
    constructor() {
        this.pacientes = [];
        this.doctores = [];
        this.citas = [];
        this.cargarDatos();
    }

    // Guardar y cargar datos
    guardarDatos() {
        const data = {
            pacientes: this.pacientes,
            doctores: this.doctores,
            citas: this.citas,
        };
        fs.writeFileSync('hospital_data.json', JSON.stringify(data, null, 2));
    }

    cargarDatos() {
        if (fs.existsSync('hospital_data.json')) {
            const data = JSON.parse(fs.readFileSync('hospital_data.json', 'utf-8'));
            this.pacientes = data.pacientes || [];
            this.doctores = data.doctores || [];
            this.citas = data.citas || [];
        }
    }

    // Gestión de pacientes
    agregarPaciente(nombre, edad, direccion) {
        const paciente = { id: this.pacientes.length + 1, nombre, edad, direccion };
        this.pacientes.push(paciente);
        this.guardarDatos();
        console.log(`Paciente agregado: ${nombre}`);
    }

    listarPacientes() {
        console.log("Lista de pacientes:");
        this.pacientes.forEach(p => console.log(p));
    }

    // Gestión de doctores
    agregarDoctor(nombre, especialidad) {
        const doctor = { id: this.doctores.length + 1, nombre, especialidad };
        this.doctores.push(doctor);
        this.guardarDatos();
        console.log(`Doctor agregado: ${nombre}`);
    }

    listarDoctores() {
        console.log("Lista de doctores:");
        this.doctores.forEach(d => console.log(d));
    }

    // Gestión de citas
    agendarCita(idPaciente, idDoctor, fecha) {
        const paciente = this.pacientes.find(p => p.id === idPaciente);
        const doctor = this.doctores.find(d => d.id === idDoctor);

        if (!paciente) {
            console.log("Paciente no encontrado.");
            return;
        }
        if (!doctor) {
            console.log("Doctor no encontrado.");
            return;
        }

        const cita = { id: this.citas.length + 1, paciente, doctor, fecha };
        this.citas.push(cita);
        this.guardarDatos();
        console.log(`Cita agendada para ${paciente.nombre} con el Dr. ${doctor.nombre} el ${fecha}`);
    }

    listarCitas() {
        console.log("Lista de citas:");
        this.citas.forEach(c => {
            console.log(`Cita ID: ${c.id}, Paciente: ${c.paciente.nombre}, Doctor: ${c.doctor.nombre}, Fecha: ${c.fecha}`);
        });
    }
}

// Menú interactivo
const hospital = new Hospital();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mostrarMenu() {
    console.log("\n--- Sistema de Gestión de Hospital ---");
    console.log("1. Agregar paciente");
    console.log("2. Listar pacientes");
    console.log("3. Agregar doctor");
    console.log("4. Listar doctores");
    console.log("5. Agendar cita");
    console.log("6. Listar citas");
    console.log("7. Salir");
    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case '1':
                rl.question("Nombre del paciente: ", (nombre) => {
                    rl.question("Edad del paciente: ", (edad) => {
                        rl.question("Dirección del paciente: ", (direccion) => {
                            hospital.agregarPaciente(nombre, parseInt(edad), direccion);
                            mostrarMenu();
                        });
                    });
                });
                break;
            case '2':
                hospital.listarPacientes();
                mostrarMenu();
                break;
            case '3':
                rl.question("Nombre del doctor: ", (nombre) => {
                    rl.question("Especialidad del doctor: ", (especialidad) => {
                        hospital.agregarDoctor(nombre, especialidad);
                        mostrarMenu();
                    });
                });
                break;
            case '4':
                hospital.listarDoctores();
                mostrarMenu();
                break;
            case '5':
                rl.question("ID del paciente: ", (idPaciente) => {
                    rl.question("ID del doctor: ", (idDoctor) => {
                        rl.question("Fecha de la cita (YYYY-MM-DD): ", (fecha) => {
                            hospital.agendarCita(parseInt(idPaciente), parseInt(idDoctor), fecha);
                            mostrarMenu();
                        });
                    });
                });
                break;
            case '6':
                hospital.listarCitas();
                mostrarMenu();
                break;
            case '7':
                console.log("Saliendo del sistema...");
                rl.close();
                break;
            default:
                console.log("Opción no válida.");
                mostrarMenu();
                break;
        }
    });
}

mostrarMenu();