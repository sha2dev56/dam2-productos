import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/angular';

import { RouterLink } from '@angular/router';

import { moonOutline, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    RouterLink
  ]
})
export class InicioPage {

  darkMode = false;

  moonOutline = moonOutline;
  sunnyOutline = sunnyOutline;

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;

    document.body.classList.toggle('dark', this.darkMode);
  }
}