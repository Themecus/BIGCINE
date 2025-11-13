import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-snacks',
  templateUrl: '../view/modificar-snacks.html',
  styleUrls: ['../view/modificar-snacks.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModificarSnacksComponent implements OnInit {
  // Array de snacks
  snacks: any[] = [];

  // Snack seleccionado para editar
  snackEditando: any = null;

  // Snack temporal para edición
  snackTemporal: any = {};

  // Categorías disponibles
  categorias = [
    { value: 'PALOMITAS', label: '🍿 Palomitas' },
    { value: 'BEBIDAS', label: '🥤 Bebidas' },
    { value: 'DULCES', label: '🍫 Dulces' },
    { value: 'COMBOS', label: '📦 Combos' },
    { value: 'OTROS', label: '🍕 Otros' }
  ];

  // Estados para los modales (ESTAS SON LAS QUE FALTABAN)
  mostrarConfirmacion: boolean = false;
  mostrarExito: boolean = false;

  // Filtro de búsqueda
  filtroBusqueda: string = '';

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

  // Filtrar snacks por búsqueda
  get snacksFiltrados() {
    if (!this.filtroBusqueda.trim()) {
      return this.snacks;
    }
    const busqueda = this.filtroBusqueda.toLowerCase();
    return this.snacks.filter(snack => 
      snack.nombre.toLowerCase().includes(busqueda) ||
      (snack.descripcion && snack.descripcion.toLowerCase().includes(busqueda)) ||
      snack.categoria.toLowerCase().includes(busqueda)
    );
  }

  // Iniciar edición de un snack
  iniciarEdicion(snack: any) {
    this.snackEditando = snack;
    // Crear copia temporal para editar
    this.snackTemporal = { ...snack };
  }

  // Cancelar edición
  cancelarEdicion() {
    this.snackEditando = null;
    this.snackTemporal = {};
    this.mostrarConfirmacion = false;
  }

  // Mostrar confirmación antes de guardar
  guardarCambios() {
    this.mostrarConfirmacion = true;
  }

  // Confirmar y ejecutar el guardado
  confirmarGuardado() {
    if (this.snackTemporal.nombre?.trim() && this.snackTemporal.precio > 0) {
      // Actualizar el snack original con los datos temporales
      Object.assign(this.snackEditando, this.snackTemporal);
      
      // Asegurar que los números sean correctos
      this.snackEditando.precio = Number(this.snackTemporal.precio);
      this.snackEditando.stock = Number(this.snackTemporal.stock);
      
      this.guardarSnacksEnLocalStorage();
      
      // Cerrar modales y mostrar éxito
      this.mostrarConfirmacion = false;
      this.mostrarExito = true;
    } else {
      alert('❌ Por favor completa todos los campos obligatorios (nombre y precio)');
      this.mostrarConfirmacion = false;
    }
  }

  // Cancelar la modificación
  cancelarModificacion() {
    this.mostrarConfirmacion = false;
  }

  // Cerrar modal de éxito
  cerrarExito() {
    this.mostrarExito = false;
    this.cancelarEdicion(); // Volver a la vista de selección
  }

  // Eliminar un snack
  eliminarSnack(snack: any) {
    if (confirm(`¿Estás seguro de que quieres eliminar "${snack.nombre}"?`)) {
      this.snacks = this.snacks.filter(s => s.id !== snack.id);
      this.guardarSnacksEnLocalStorage();
      
      // Si estábamos editando este snack, cancelar edición
      if (this.snackEditando && this.snackEditando.id === snack.id) {
        this.cancelarEdicion();
      }
      
      alert('🗑️ Snack eliminado correctamente');
    }
  }

  // Incrementar stock
  incrementarStock(snack: any, cantidad: number = 1) {
    snack.stock += cantidad;
    this.guardarSnacksEnLocalStorage();
  }

  // Decrementar stock
  decrementarStock(snack: any, cantidad: number = 1) {
    if (snack.stock >= cantidad) {
      snack.stock -= cantidad;
      this.guardarSnacksEnLocalStorage();
    } else {
      alert('❌ No hay suficiente stock');
    }
  }

  // Formatear precio
  formatearPrecio(precio: number): string {
    return `$${precio?.toFixed(2) || '0.00'}`;
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
}