import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular';

import {
  moonOutline,
  sunnyOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class InicioPage {

  darkMode = false;

  moonOutline = moonOutline;
  sunnyOutline = sunnyOutline;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;

    document.body.classList.toggle(
      'dark',
      this.darkMode
    );
  }

}