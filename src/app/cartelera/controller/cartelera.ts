import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartelera',
  templateUrl: '../view/cartelera.html',
  styleUrls: ['../view/cartelera.css'],
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