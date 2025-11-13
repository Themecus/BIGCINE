import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-snack',
  templateUrl: '../../front/view/eliminar-snack.html',
  styleUrls: ['../../front/view/eliminar-snack.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EliminarSnackComponent implements OnInit {
  // Array para almacenar los snacks
  snacks: any[] = [];

  // Variables para las ventanas emergentes
  mostrarConfirmacion = false;
  mostrarExito = false;
  snackAEliminar: any = null;
  mensajeExito = '';

  // Categorías para los iconos
  categorias = [
    { value: 'PALOMITAS', label: '🍿 Palomitas' },
    { value: 'BEBIDAS', label: '🥤 Bebidas' },
    { value: 'DULCES', label: '🍫 Dulces' },
    { value: 'COMBOS', label: '📦 Combos' },
    { value: 'OTROS', label: '🍕 Otros' }
  ];

  // Se ejecuta cuando el componente se inicializa
  ngOnInit() {
    this.cargarSnacksDesdeLocalStorage();
  }

  // Cargar snacks desde LocalStorage
  cargarSnacksDesdeLocalStorage() {
    const snacksGuardados = localStorage.getItem('snacksDulceria');
    if (snacksGuardados) {
      this.snacks = JSON.parse(snacksGuardados);
    }
  }

  // Guardar snacks en LocalStorage
  guardarSnacksEnLocalStorage() {
    localStorage.setItem('snacksDulceria', JSON.stringify(this.snacks));
  }

  // Función para abrir ventana de confirmación
  confirmarEliminacion(snack: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.snackAEliminar = snack;
    this.mostrarConfirmacion = true;
  }

  // Función para eliminar snack después de confirmación
  eliminarSnackConfirmado() {
    if (this.snackAEliminar) {
      // Agregar clase de explosión
      const card = document.querySelector(`[data-snack-id="${this.snackAEliminar.id}"]`);
      if (card) {
        card.classList.add('exploding');
        
        // Esperar a que termine la animación y luego eliminar
        setTimeout(() => {
          this.snacks = this.snacks.filter(s => s.id !== this.snackAEliminar.id);
          this.guardarSnacksEnLocalStorage();
          
          // Mostrar mensaje de éxito
          this.mensajeExito = `"${this.snackAEliminar.nombre}" ha sido eliminado correctamente`;
          this.mostrarExito = true;
          
          // Cerrar ventana de confirmación
          this.mostrarConfirmacion = false;
          this.snackAEliminar = null;
        }, 500);
      }
    }
  }

  // Función para cancelar eliminación
  cancelarEliminacion() {
    this.mostrarConfirmacion = false;
    this.snackAEliminar = null;
  }

  // Función para cerrar ventana de éxito
  cerrarExito() {
    this.mostrarExito = false;
    this.mensajeExito = '';
  }

  // Función para eliminar todos los snacks
  confirmarEliminarTodos() {
    if (this.snacks.length > 0) {
      this.mostrarConfirmacion = true;
      this.snackAEliminar = { nombre: 'todos los snacks', id: 'all' };
    }
  }

  // Función para eliminar todos después de confirmación
  eliminarTodosConfirmados() {
    // Animación para todas las tarjetas
    const cards = document.querySelectorAll('.snack-card');
    cards.forEach(card => {
      card.classList.add('exploding');
    });
    
    // Esperar a que terminen las animaciones y luego eliminar todo
    setTimeout(() => {
      this.snacks = [];
      this.guardarSnacksEnLocalStorage();
      
      // Mostrar mensaje de éxito
      this.mensajeExito = 'Todos los snacks han sido eliminados correctamente';
      this.mostrarExito = true;
      
      // Cerrar ventana de confirmación
      this.mostrarConfirmacion = false;
      this.snackAEliminar = null;
    }, 600);
  }

  // Obtener icono de categoría
  getIconoCategoria(categoria: string): string {
    switch (categoria) {
      case 'PALOMITAS': return '🍿';
      case 'BEBIDAS': return '🥤';
      case 'DULCES': return '🍫';
      case 'COMBOS': return '📦';
      default: return '🍕';
    }
  }

  // Obtener nombre de categoría
  getNombreCategoria(categoria: string): string {
    switch (categoria) {
      case 'PALOMITAS': return 'Palomitas';
      case 'BEBIDAS': return 'Bebidas';
      case 'DULCES': return 'Dulces';
      case 'COMBOS': return 'Combos';
      default: return 'Otros';
    }
  }

  // Formatear precio
  formatearPrecio(precio: number): string {
    return `$${precio?.toFixed(2) || '0.00'}`;
  }

  // Método para manejar el click en toda la tarjeta
seleccionarSnack(snack: any, event: Event): void {
 
  if ((event.target as HTMLElement).closest('button')) {
    return;
  }
  
 
  this.confirmarEliminacion(snack, event);
}
}