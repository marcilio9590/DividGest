import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsuariosProvider } from "./../../providers/usuarios/usuarios";
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {
  usuarios: Observable<any>;

  constructor(public navCtrl: NavController, private provider: UsuariosProvider,
    private toast: ToastController) {
    this.usuarios = this.provider.getAll();
    console.log(this.usuarios);
  }

  newCartao() {
    this.navCtrl.push('UsuarioPage');
  }

  editUsuarios(usuario: any) {
    this.navCtrl.push('UsuarioPage', { usuario: usuario });
  }

  removeUsuario(key: string) {
    this.provider.remove(key)
      .then(() => {
        this.toast.create({ message: 'Usuário removido com sucesso.', duration: 3000 }).present();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao remover Usuário.', duration: 3000 }).present();
        console.log(e);
      })
  }

}
