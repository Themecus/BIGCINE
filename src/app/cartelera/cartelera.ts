import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService, Pelicula } from '../services/peliculas.service';

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartelera.html',
  styleUrls: ['./cartelera.css']
})
export class CarteleraComponent implements OnInit {
  peliculas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit() {
    this.peliculas = this.peliculasService.obtenerPeliculas();
  }
}
