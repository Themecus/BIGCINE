import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-pelicula',
  templateUrl: './eliminar-pelicula.html',
  styleUrls: ['./eliminar-pelicula.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EliminarPeliculaComponent implements OnInit {
  // Array para almacenar las películas
  peliculas: any[] = [];

  // Variables para las ventanas emergentes
  mostrarConfirmacion = false;
  mostrarExito = false;
  peliculaAEliminar: any = null;
  mensajeExito = '';

  // Se ejecuta cuando el componente se inicializa
  ngOnInit() {
    this.cargarPeliculasDesdeLocalStorage();
  }

  // Cargar películas desde LocalStorage
  cargarPeliculasDesdeLocalStorage() {
    const peliculasGuardadas = localStorage.getItem('carteleraPeliculas');
    if (peliculasGuardadas) {
      this.peliculas = JSON.parse(peliculasGuardadas);
    }
  }

  // Guardar películas en LocalStorage
  guardarPeliculasEnLocalStorage() {
    localStorage.setItem('carteleraPeliculas', JSON.stringify(this.peliculas));
  }

  // Función para abrir ventana de confirmación
  confirmarEliminacion(pelicula: any, event: Event) {
    event.preventDefault();
    this.peliculaAEliminar = pelicula;
    this.mostrarConfirmacion = true;
  }

  // Función para eliminar película después de confirmación
  eliminarPeliculaConfirmada() {
    if (this.peliculaAEliminar) {
      // Agregar clase de explosión
      const card = document.querySelector(`[data-pelicula-id="${this.peliculaAEliminar.id}"]`);
      if (card) {
        card.classList.add('exploding');
        
        // Esperar a que termine la animación y luego eliminar
        setTimeout(() => {
          this.peliculas = this.peliculas.filter(p => p.id !== this.peliculaAEliminar.id);
          this.guardarPeliculasEnLocalStorage();
          
          // Mostrar mensaje de éxito
          this.mensajeExito = `"${this.peliculaAEliminar.nombre}" ha sido eliminada correctamente`;
          this.mostrarExito = true;
          
          // Cerrar ventana de confirmación
          this.mostrarConfirmacion = false;
          this.peliculaAEliminar = null;
        }, 500);
      }
    }
  }

  // Función para cancelar eliminación
  cancelarEliminacion() {
    this.mostrarConfirmacion = false;
    this.peliculaAEliminar = null;
  }

  // Función para cerrar ventana de éxito
  cerrarExito() {
    this.mostrarExito = false;
    this.mensajeExito = '';
  }

  // Función para eliminar todas las películas
  confirmarEliminarTodas() {
    if (this.peliculas.length > 0) {
      this.mostrarConfirmacion = true;
      this.peliculaAEliminar = { nombre: 'todas las películas', id: 'all' };
    }
  }

  // Función para eliminar todas después de confirmación
  eliminarTodasConfirmadas() {
    // Animación para todas las tarjetas
    const cards = document.querySelectorAll('.pelicula-card');
    cards.forEach(card => {
      card.classList.add('exploding');
    });
    
    // Esperar a que terminen las animaciones y luego eliminar todo
    setTimeout(() => {
      this.peliculas = [];
      this.guardarPeliculasEnLocalStorage();
      
      // Mostrar mensaje de éxito
      this.mensajeExito = 'Todas las películas han sido eliminadas correctamente';
      this.mostrarExito = true;
      
      // Cerrar ventana de confirmación
      this.mostrarConfirmacion = false;
      this.peliculaAEliminar = null;
    }, 600);
  }
}