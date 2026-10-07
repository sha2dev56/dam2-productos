import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, timeout } from 'rxjs';

import {
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
  IonCardContent
} from '@ionic/angular';

import { User } from '../../models/user';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  imports: [
    RouterLink,
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
    CommonModule,
    FormsModule
  ]
})
export class UserPage implements OnInit {

  private userService = inject(UserService);

  users: User[] = [];

  loading = true;

  error = '';

  ngOnInit() {
    console.log('UserPage iniciada');
    this.fetchUsers();
  }

  fetchUsers() {

    console.log('Haciendo petición a UserService...');

    this.loading = true;
    this.error = '';

    this.userService.getUsers()
      .pipe(
        timeout(10000),
        finalize(() => {
          console.log('FINALIZE ejecutado');
          this.loading = false;
        })
      )
      .subscribe({

        next: (data) => {
          console.log('DATOS RECIBIDOS:', data);

          this.users = data.users;
        },

        error: (err) => {
          console.error('ERROR:', err);

          this.error = 'No se pudo conectar con DummyJSON';
        }

      });

  }
}