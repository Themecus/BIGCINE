import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizar-dulceria',
  templateUrl: '../../front/view/visualizar-dulceria.html',
  styleUrls: ['../../front/view/visualizar-dulceria.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VisualizarDulceriaComponent implements OnInit {
  // Array para almacenar los snacks
  snacks: any[] = [];

  // Categorías disponibles para los snacks
  categorias = [
    { value: 'PALOMITAS', label: '🍿 Palomitas' },
    { value: 'BEBIDAS', label: '🥤 Bebidas' },
    { value: 'DULCES', label: '🍫 Dulces' },
    { value: 'COMBOS', label: '📦 Combos' },
    { value: 'OTROS', label: '🍕 Otros' }
  ];

  ngOnInit() {
    this.cargarSnacksDesdeLocalStorage();
  }

  cargarSnacksDesdeLocalStorage() {
    const snacksGuardados = localStorage.getItem('snacksDulceria');
    if (snacksGuardados) {
      this.snacks = JSON.parse(snacksGuardados);
      console.log('Snacks cargados:', this.snacks); // Para debug
    }
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

  // Obtener snacks por categoría
  getSnacksPorCategoria(categoria: string): any[] {
    return this.snacks.filter(snack => snack.categoria === categoria);
  }

  // Calcular valor total del inventario - CORREGIDO
  calcularValorTotalInventario(): number {
    if (!this.snacks || this.snacks.length === 0) return 0;
    
    const total = this.snacks.reduce((acumulador, snack) => {
      // Asegurarse de que precio y stock son números
      const precio = Number(snack.precio) || 0;
      const stock = Number(snack.stock) || 0;
      const valorSnack = precio * stock;
      
      console.log(`Snack: ${snack.nombre}, Precio: ${precio}, Stock: ${stock}, Valor: ${valorSnack}`); // Debug
      
      return acumulador + valorSnack;
    }, 0);
    
    console.log('Valor total del inventario:', total); // Debug
    return total;
  }

  // Calcular valor por categoría - CORREGIDO
  calcularValorCategoria(categoria: string): number {
    const snacksCategoria = this.getSnacksPorCategoria(categoria);
    if (snacksCategoria.length === 0) return 0;
    
    return snacksCategoria.reduce((acumulador, snack) => {
      const precio = Number(snack.precio) || 0;
      const stock = Number(snack.stock) || 0;
      return acumulador + (precio * stock);
    }, 0);
  }

  // Obtener total de unidades en stock - CORREGIDO
  getTotalStock(): number {
    if (!this.snacks || this.snacks.length === 0) return 0;
    
    return this.snacks.reduce((acumulador, snack) => {
      return acumulador + (Number(snack.stock) || 0);
    }, 0);
  }

  // Obtener categorías que tienen snacks
  getCategoriasConSnacks(): string[] {
    return this.categorias.filter(cat => 
      this.getSnacksPorCategoria(cat.value).length > 0
    ).map(cat => cat.value);
  }

  // Método adicional para debug
  mostrarDebugInfo() {
    console.log('=== DEBUG DULCERÍA ===');
    console.log('Total snacks:', this.snacks.length);
    console.log('Snacks:', this.snacks);
    this.snacks.forEach(snack => {
      console.log(`${snack.nombre}: $${snack.precio} x ${snack.stock} = $${(snack.precio * snack.stock)}`);
    });
    console.log('Valor total calculado:', this.calcularValorTotalInventario());
    console.log('=====================');
  }
}

