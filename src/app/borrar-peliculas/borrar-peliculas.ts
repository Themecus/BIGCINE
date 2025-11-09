import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-borrar-peliculas',
  templateUrl: './borrar-peliculas.html',
  styleUrls: ['./borrar-peliculas.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BorrarPeliculasComponent implements OnInit {
  peliculas: any[] = [];

  ngOnInit() {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    const peliculasGuardadas = localStorage.getItem('carteleraPeliculas');
    if (peliculasGuardadas) {
      this.peliculas = JSON.parse(peliculasGuardadas);
    }
  }

  borrarPelicula(id: number) {
    this.peliculas = this.peliculas.filter(pelicula => pelicula.id !== id);
    this.guardarPeliculas();
  }

  borrarTodasLasPeliculas() {
    if (confirm('¿Estás seguro de que quieres borrar TODAS las películas?')) {
      this.peliculas = [];
      this.guardarPeliculas();
    }
  }

  guardarPeliculas() {
    localStorage.setItem('carteleraPeliculas', JSON.stringify(this.peliculas));
  }
}