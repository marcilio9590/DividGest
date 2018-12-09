import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  title: string;
  form: FormGroup;
  usuario: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: UsuariosProvider,
    private toast: ToastController) {
    this.usuario = this.navParams.data.usuario || {};
    this.createForm();
    this.setUpPageTitle();
  }

  private setUpPageTitle() {
    this.title = this.navParams.data.usuario ? 'Alteradando Usuário' : 'Novo Usuário';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.usuario.key],
      nome: [this.usuario.nome, Validators.required],
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Usuário salvo com sucesso.', duration: 3000 }).present();
        }).catch((e) => {
          this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000 }).present();
          console.log(e);
        });
    }
  }

}
