import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartoesProvider } from "./../../providers/cartoes/cartoes";
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-cartoes',
  templateUrl: 'cartoes.html',
})
export class CartoesPage {

  cartoesList: Observable<any>;
  constructor(public navCtrl: NavController, private provider: CartoesProvider,
    private toast: ToastController) {
    this.cartoesList = this.provider.getAll();
  }

  newCartao() {
    this.navCtrl.push('CartaoPage');
  }

  editCartoes(cartoes: any) {
    this.navCtrl.push('CartaoPage', { cartoes: cartoes });
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
