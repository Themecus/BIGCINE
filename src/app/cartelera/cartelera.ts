import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.html',
  styleUrls: ['./cartelera.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarteleraComponent implements OnInit {
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
}