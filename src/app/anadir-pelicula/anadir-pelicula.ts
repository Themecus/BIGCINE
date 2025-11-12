import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-pelicula',
  templateUrl: './anadir-pelicula.html',
  styleUrls: ['./anadir-pelicula.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AnadirPeliculaComponent {
  // Variables para el formulario
  nuevaPelicula = {
    nombre: '',
    imagenUrl: ''
  };

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

  // Función para agregar nueva película
  agregarPelicula() {
    if (this.nuevaPelicula.nombre.trim() && this.nuevaPelicula.imagenUrl.trim()) {
      this.peliculas.push({
        nombre: this.nuevaPelicula.nombre,
        imagenUrl: this.nuevaPelicula.imagenUrl,
        id: Date.now() // ID único
      });
      
      // Guardar en LocalStorage después de agregar
      this.guardarPeliculasEnLocalStorage();
      
      // Limpiar el formulario
      this.nuevaPelicula = {
        nombre: '',
        imagenUrl: ''
      };

      // Mostrar mensaje de éxito
      alert('¡Película agregada correctamente!');
    }
  }

  // Función para manejar Enter en los inputs
  manejarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.agregarPelicula();
    }
  }
}