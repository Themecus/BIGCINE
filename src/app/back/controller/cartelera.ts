import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartelera',
  templateUrl: '../../front/view/cartelera.html',
  styleUrls: ['../../front/view/cartelera.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarteleraComponent implements OnInit {

  peliculas: any[] = [];


  ngOnInit() {
    this.cargarPeliculasDesdeLocalStorage();
  }


  cargarPeliculasDesdeLocalStorage() {
    const peliculasGuardadas = localStorage.getItem('carteleraPeliculas');
    if (peliculasGuardadas) {
      this.peliculas = JSON.parse(peliculasGuardadas);
    }
  }
}