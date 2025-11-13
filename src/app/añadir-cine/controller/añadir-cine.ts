import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-anadir-cine',
	templateUrl: '../view/añadir-cine.html',
	styleUrls: ['../view/añadir-cine.css'],
	standalone: true,
	imports: [CommonModule, FormsModule, NgFor, NgIf]
})
export class AnadirCineComponent implements OnInit {
	nombreCine: string = '';
	peliculas: any[] = [];
	peliculasSeleccionadas: any[] = [];
	horarios: string[] = [''];

	ngOnInit() {
		this.cargarPeliculas();
	}

	cargarPeliculas() {
		const peliculasGuardadas = localStorage.getItem('carteleraPeliculas');
		if (peliculasGuardadas) {
			this.peliculas = JSON.parse(peliculasGuardadas);
		}
	}

	onCheckboxChange(event: Event, pelicula: any) {
		const checked = (event.target as HTMLInputElement).checked;
		if (checked) {
			if (!this.peliculasSeleccionadas.includes(pelicula)) {
				this.peliculasSeleccionadas.push(pelicula);
			}
		} else {
			this.peliculasSeleccionadas = this.peliculasSeleccionadas.filter((p) => p !== pelicula);
		}
	}

	agregarHorario() {
		this.horarios.push('');
	}

	eliminarHorario(i: number) {
		if (this.horarios.length > 1) this.horarios.splice(i, 1);
	}

	guardarCine() {
		const nuevoCine = {
			nombre: this.nombreCine,
			peliculas: this.peliculasSeleccionadas,
			horarios: this.horarios.filter(h => h.trim() !== '')
		};
		// Aquí puedes guardar en localStorage o enviar a backend
		alert('Cine agregado: ' + JSON.stringify(nuevoCine, null, 2));
		this.nombreCine = '';
		this.peliculasSeleccionadas = [];
		this.horarios = [''];
	}
}