import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

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
  standalone: true,
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

  // Estados reactivos con Signals
  products = signal<Product[]>([]);
  total = signal<number>(0);
  loading = signal<boolean>(false);
  error = signal<string>('');

  // Paginación
  limit = 10;
  skip = signal<number>(0);

  // Señales derivadas (Computed Signals)
  currentPage = computed(() => Math.floor(this.skip() / this.limit) + 1);
  totalPages = computed(() => Math.ceil(this.total() / this.limit));

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
    this.loading.set(true);
    this.error.set('');

    this.productService.getProducts(this.limit, this.skip())
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (response: ProductsResponse) => {
          this.products.set(response.products);
          this.total.set(response.total);
        },
        error: (err) => {
          console.error(err);
          this.error.set('No se han podido cargar los productos.');
        }
      });
  }

  nextPage(): void {
    if (this.skip() + this.limit < this.total()) {
      this.skip.update(val => val + this.limit);
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.skip() - this.limit >= 0) {
      this.skip.update(val => val - this.limit);
      this.loadProducts();
    }
  }
}