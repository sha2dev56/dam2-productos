import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from '../../services/user'; // Ajusta según la ruta de tu servicio
import { User } from '../../models/user'; // Ajusta según la ruta de tu modelo

@Component({
  selector: 'app-usuarios',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonButton,
    IonIcon
  ]
})
export class UserPage implements OnInit {
  private userService = inject(UserService);

  // Declaración del estado usando Signals
  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.error.set('');

    this.userService.getUsers()
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (response: { users: User[] }) => {
          this.users.set(response.users);
        },
        error: (err) => {
          console.error(err);
          this.error.set('No se han podido cargar los usuarios.');
        }
      });
  }
}