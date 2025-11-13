import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Necesario para *ngIf y *ngFor

@Component({
    selector: 'app-eliminar-cine',
    templateUrl: '../../front/view/eliminar-cine.html',
    styleUrls: ['../../front/view/eliminar-cine.css'],
    standalone: true,
  imports: [CommonModule]  // <-- Importamos CommonModule
})
export class EliminarCineComponent implements OnInit {

    cines: any[] = [];

  // Modales
    mostrarConfirmacion: boolean = false;
    cineAEliminar: any = null;
    mostrarExito!: boolean;
    mensajeExito!: string;

    ngOnInit() {
    this.mostrarExito = false;
    this.mensajeExito = '';
    this.cargarCines();
    }

    cargarCines() {
    const cinesGuardados = localStorage.getItem('cines');
    this.cines = cinesGuardados ? JSON.parse(cinesGuardados) : [];
    }

    guardarCines() {
    localStorage.setItem('cines', JSON.stringify(this.cines));
    }

  // Obtener texto de películas
    getPeliculasTexto(cine: any): string {
    if (!cine.peliculas || cine.peliculas.length === 0) return '';
    return cine.peliculas.map((p: any) => p.nombre).join(', ');
    }

    confirmarEliminacion(cine: any) {
    this.cineAEliminar = cine;
    this.mostrarConfirmacion = true;
    }

    confirmarEliminarTodos() {
    this.cineAEliminar = { id: 'all' };
    this.mostrarConfirmacion = true;
    }

    cancelarEliminacion() {
    this.cineAEliminar = null;
    this.mostrarConfirmacion = false;
    }

    eliminarCineConfirmado() {
    if (!this.cineAEliminar) return;
    this.cines = this.cines.filter(c => c.id !== this.cineAEliminar.id);
    this.guardarCines();
    this.mostrarConfirmacion = false;
    this.mensajeExito = `El cine "${this.cineAEliminar.nombre}" ha sido eliminado correctamente.`;
    this.mostrarExito = true;
    this.cineAEliminar = null;
    }

    eliminarTodosConfirmados() {
    this.cines = [];
    this.guardarCines();
    this.mostrarConfirmacion = false;
    this.mensajeExito = 'Todos los cines han sido eliminados correctamente.';
    this.mostrarExito = true;
    }

    cerrarExito() {
    this.mostrarExito = false;
    this.mensajeExito = '';
    }
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
