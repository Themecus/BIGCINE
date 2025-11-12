import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeliculasService, Pelicula } from '../services/peliculas.service';

@Component({
  selector: 'app-anadir-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anadir-pelicula.html',
  styleUrls: ['./anadir-pelicula.css']
})
export class AnadirPeliculaComponent {
  nuevaPelicula: Pelicula = {
    nombre: '',
    imagenUrl: ''
  };

  constructor(private peliculasService: PeliculasService) {}

  agregarPelicula() {
    if (this.nuevaPelicula.nombre.trim() && this.nuevaPelicula.imagenUrl.trim()) {
      this.peliculasService.agregarPelicula({...this.nuevaPelicula});

      // Limpiar formulario
      this.nuevaPelicula = {
        nombre: '',
        imagenUrl: ''
      };

      alert('¡Película agregada correctamente!');
    }
  }

  manejarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.agregarPelicula();
    }
  }

  get peliculas() {
    return this.peliculasService.obtenerPeliculas();
  }
}
