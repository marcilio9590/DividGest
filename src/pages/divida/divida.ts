import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DividasProvider } from './../../providers/dividas/dividas';
import { CartoesProvider } from './../../providers/cartoes/cartoes';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-divida',
  templateUrl: 'divida.html',
})
export class DividaPage {

  title: string;
  form: FormGroup;
  divida: any;
  cartoes: Observable<Array<any>>;
  usuarios: Observable<Array<any>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private dividasProvider: DividasProvider,
    private cartoesProvider: CartoesProvider,
    private usuariosProvider: UsuariosProvider,
    private toast: ToastController) {
    this.divida = this.navParams.data.divida || {};
    this.createForm();
    this.setUpPageTitle();
    this.getCartoes();
    this.getUsuarios();
  }

  private getCartoes() {
    this.cartoes = this.cartoesProvider.getAll();
  }

  private getUsuarios() {
    this.usuarios = this.usuariosProvider.getAll();
  }

  private setUpPageTitle() {
    this.title = this.navParams.data.usuario ? 'Alterandando Dívida' : 'Nova Dívida';
  }

  private createForm() {
    this.form = this.formBuilder.group({
      key: [this.divida.key],
      data: [this.divida.data, Validators.required],
      valor: [this.divida.valor, Validators.required],
      cartao: [this.divida.cartao, Validators.required],
      usuario: [this.divida.usuario, Validators.required],
    })
  }

  selectCard(event,cartao: any) {
    this.divida.cartao = cartao;
  }

  selectUser(usuario: any) {
    this.divida.usuario = usuario;
  }

  onSubmit() {
    if (this.form.valid) {
      this.dividasProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Divida salva com sucesso.', duration: 3000 }).present();
        }).catch((e) => {
          this.toast.create({ message: 'Erro ao salvar divida.', duration: 3000 }).present();
          console.log(e);
        });
    }
  }
}
