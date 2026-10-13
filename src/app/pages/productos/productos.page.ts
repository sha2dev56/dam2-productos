import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular';

import { Product as ProductService } from '../../services/product';
import { Product, ProductsResponse } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { moonOutline, sunnyOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon
  ]
})
export class ProductosPage implements OnInit {

  private productService = inject(ProductService);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  // Parámetros de Paginación
  limit = 10;
  skip = 0;

  darkMode = false;

  moonOutline = moonOutline;
  sunnyOutline = sunnyOutline;
  chevronBackOutline = chevronBackOutline;
  chevronForwardOutline = chevronForwardOutline;

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProducts(this.limit, this.skip)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: ProductsResponse) => {
          this.products = response.products;
          this.total = response.total;
        },
        error: (error) => {
          console.error(error);
          this.error = 'No se han podido cargar los productos.';
        }
      });
  }

  nextPage(): void {
    if (this.skip + this.limit < this.total) {
      this.skip += this.limit;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.skip - this.limit >= 0) {
      this.skip -= this.limit;
      this.loadProducts();
    }
  }

  get currentPage(): number {
    return Math.floor(this.skip / this.limit) + 1;
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }
}