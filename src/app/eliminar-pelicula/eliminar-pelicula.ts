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

  // Función para eliminar película con animación
  eliminarPelicula(pelicula: any, event: Event) {
    event.preventDefault();
    
    // Agregar clase de explosión
    const card = (event.target as HTMLElement).closest('.pelicula-card');
    if (card) {
      card.classList.add('exploding');
      
      // Esperar a que termine la animación y luego eliminar
      setTimeout(() => {
        this.peliculas = this.peliculas.filter(p => p.id !== pelicula.id);
        this.guardarPeliculasEnLocalStorage();
      }, 500); // Tiempo de la animación
    }
  }

  // Función para eliminar todas las películas
  eliminarTodasLasPeliculas() {
    if (confirm('¿Estás seguro de que quieres eliminar TODAS las películas? ¡Esta acción no se puede deshacer!')) {
      // Animación para todas las tarjetas
      const cards = document.querySelectorAll('.pelicula-card');
      cards.forEach(card => {
        card.classList.add('exploding');
      });
      
      // Esperar a que terminen las animaciones y luego eliminar todo
      setTimeout(() => {
        this.peliculas = [];
        this.guardarPeliculasEnLocalStorage();
      }, 600);
    }
  }
}