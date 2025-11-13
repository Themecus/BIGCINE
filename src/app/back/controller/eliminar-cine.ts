import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-cine',
  templateUrl: '../../front/view/eliminar-cine.html',
  styleUrls: ['../../front/view/eliminar-cine.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EliminarCineComponent implements OnInit {
  // Array para almacenar los cines
  cines: any[] = [];

  // Variables para las ventanas emergentes
  mostrarConfirmacion = false;
  mostrarExito = false;
  cineAEliminar: any = null;
  mensajeExito = '';

  ngOnInit() {
    this.cargarCinesDesdeLocalStorage();
  }

  cargarCinesDesdeLocalStorage() {
    const cinesGuardados = localStorage.getItem('cines');
    if (cinesGuardados) {
      this.cines = JSON.parse(cinesGuardados);
    }
  }

  guardarCinesEnLocalStorage() {
    localStorage.setItem('cines', JSON.stringify(this.cines));
  }

  confirmarEliminacion(cine: any) {
    this.cineAEliminar = cine;
    this.mostrarConfirmacion = true;
  }

  eliminarCineConfirmado() {
    if (this.cineAEliminar) {
      // Agregar clase de explosión
      const card = document.querySelector(`[data-cine-id="${this.cineAEliminar.id}"]`);
      if (card) {
        card.classList.add('exploding');
        
        // Esperar a que termine la animación y luego eliminar
        setTimeout(() => {
          this.cines = this.cines.filter(c => c.id !== this.cineAEliminar.id);
          this.guardarCinesEnLocalStorage();
          
          // Mostrar mensaje de éxito
          this.mensajeExito = `"${this.cineAEliminar.nombre}" ha sido eliminado correctamente`;
          this.mostrarExito = true;
          
          // Cerrar ventana de confirmación
          this.mostrarConfirmacion = false;
          this.cineAEliminar = null;
        }, 500);
      }
    }
  }

  cancelarEliminacion() {
    this.mostrarConfirmacion = false;
    this.cineAEliminar = null;
  }

  cerrarExito() {
    this.mostrarExito = false;
    this.mensajeExito = '';
  }

  confirmarEliminarTodos() {
    if (this.cines.length > 0) {
      this.mostrarConfirmacion = true;
      this.cineAEliminar = { nombre: 'todos los cines', id: 'all' };
    }
  }

  eliminarTodosConfirmados() {
    // Animación para todas las tarjetas
    const cards = document.querySelectorAll('.cine-card');
    cards.forEach(card => {
      card.classList.add('exploding');
    });
    
    // Esperar a que terminen las animaciones y luego eliminar todo
    setTimeout(() => {
      this.cines = [];
      this.guardarCinesEnLocalStorage();
      
      // Mostrar mensaje de éxito
      this.mensajeExito = 'Todos los cines han sido eliminados correctamente';
      this.mostrarExito = true;
      
      // Cerrar ventana de confirmación
      this.mostrarConfirmacion = false;
      this.cineAEliminar = null;
    }, 600);
  }
}
