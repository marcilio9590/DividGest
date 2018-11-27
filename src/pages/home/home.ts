import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private title;

  constructor(public navCtrl: NavController) {
    this.title = "Gestão de Dívidas";
  }

  openPage(page: string) {
    this.navCtrl.push(page);
  }

}
