import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-eliminar-cine',
	templateUrl: './eliminar-cine.html',
	styleUrls: ['./eliminar-cine.css'],
	standalone: true,
	imports: [CommonModule]
})
export class EliminarCineComponent implements OnInit {
	// Aquí podrías añadir lógica para listar y eliminar cines

	ngOnInit() {
		// Inicialización mínima
	}

	eliminarCine() {
		// Placeholder: reemplaza con la lógica real si la tienes
		if (confirm('¿Eliminar este cine?')) {
			// lógica de eliminación
			alert('Cine eliminado ');
		}
	}
}
