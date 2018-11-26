import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartoesProvider } from './../../providers/cartoes/cartoes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-cartoes',
  templateUrl: 'cartoes.html',
})
export class CartoesPage {
  title: string;
  form: FormGroup;
  cartoes: any;



  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: CartoesProvider,
    private toast: ToastController) {
    this.cartoes = this.navParams.data.cartoes || {};
    this.createForm();
    this.setUpPageTitle();
  }

  private setUpPageTitle() {
    this.title = this.navParams.data.cartoes ? 'Alteradando Cartão' : 'Novo Cartão';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.cartoes.key],
      nome: [this.cartoes.nome, Validators.required],
      vencimento: [this.cartoes.vencimento, Validators.required],
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Cartão salvo com sucesso.', duration: 3000 }).present();
        }).catch((e) => {
          this.toast.create({ message: 'Erro ao salvar cartão.', duration: 3000 }).present();
          console.log(e);
        });
    }
  }
}
