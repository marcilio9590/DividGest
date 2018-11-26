import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CartoesProvider } from "./../../providers/cartoes/cartoes";
import { Observable } from "rxjs/Observable";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cartoesList: Observable<any>;
  constructor(public navCtrl: NavController, private provider: CartoesProvider,
    private toast: ToastController) {
    this.cartoesList = this.provider.getAll();
  }

  newCartoes() {
    this.navCtrl.push('CartoesPage');
  }

  editCartoes(cartoes: any) {
    this.navCtrl.push('CartoesPage', { cartoes: cartoes });
  }

  removeCartoes(key: string) {
    this.provider.remove(key)
      .then(() => {
        this.toast.create({ message: 'Cartão removido com sucesso.', duration: 3000 }).present();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao remover cartão.', duration: 3000 }).present();
        console.log(e);
      })
  }

}
