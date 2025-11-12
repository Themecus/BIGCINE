import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-snacks',
  templateUrl: '../view/anadir-snacks.html',  
  styleUrls: ['../view/anadir-snacks.css'],   
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AnadirSnacksComponent {
  // Variables para el formulario
  nuevoSnack = {
    nombre: '',
    categoria: 'PALOMITAS', // Valor por defecto
    precio: 0,
    descripcion: '',
    stock: 0
  };

  // Categorías disponibles para los snacks
  categorias = [
    { value: 'PALOMITAS', label: '🍿 Palomitas' },
    { value: 'BEBIDAS', label: '🥤 Bebidas' },
    { value: 'DULCES', label: '🍫 Dulces' },
    { value: 'COMBOS', label: '📦 Combos' },
    { value: 'OTROS', label: '🍕 Otros' }
  ];

  // Array para almacenar los snacks
  snacks: any[] = [];

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

  // Función para agregar nuevo snack
  agregarSnack() {
    if (this.nuevoSnack.nombre.trim() && this.nuevoSnack.precio > 0) {
      this.snacks.push({
        ...this.nuevoSnack,
        id: Date.now(), // ID único
        precio: Number(this.nuevoSnack.precio), // Asegurar que es número
        stock: Number(this.nuevoSnack.stock) // Asegurar que es número
      });

      // Guardar en LocalStorage después de agregar
      this.guardarSnacksEnLocalStorage();

      // Limpiar el formulario (mantener la categoría)
      const categoriaActual = this.nuevoSnack.categoria;
      this.nuevoSnack = {
        nombre: '',
        categoria: categoriaActual,
        precio: 0,
        descripcion: '',
        stock: 0
      };

      // Mostrar mensaje de éxito
      alert('¡Snack agregado correctamente!');
    } else {
      alert('Por favor completa todos los campos obligatorios (nombre y precio)');
    }
  }

  // Función para manejar Enter en los inputs
  manejarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.agregarSnack();
    }
  }

  // Función para formatear precio
  formatearPrecio(precio: number): string {
    return `$${precio.toFixed(2)}`;
  }

  // Calcular valor total del inventario
  calcularValorTotalInventario(): number {
    return this.snacks.reduce((total, snack) => {
      return total + (snack.precio * snack.stock);
    }, 0);
  }

  // Obtener snacks por categoría
  getSnacksPorCategoria(categoria: string): any[] {
    return this.snacks.filter(snack => snack.categoria === categoria);
  }
}
