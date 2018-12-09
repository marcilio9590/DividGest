import { Injectable } from '@angular/core';
import { ComumProvider } from './../comum/comum';
import { AngularFireDatabase } from '@angular/fire/database';
import { AES256 } from '@ionic-native/aes-256';

@Injectable()
export class UsuariosProvider extends ComumProvider {
  private PATH = 'usuarios/';
  constructor(db: AngularFireDatabase, private aes256: AES256) {
    super(db);
  }

  getAll() {
    return super.getAll(this.PATH);
  }

  get(key: string) {
    return super.get(key, this.PATH);
  }

  save(usuario: any) {
    // Update sobrescreve apenas as propriedades passadas.
    // set sobreescreve todo o objeto da key
    return new Promise((resolve, reject) => {
      if (usuario.key) {
        this.getDb().object(this.PATH + usuario.key)
          .update({ nome: usuario.nome })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.getDb().list(this.PATH)
          .push({ nome: usuario.nome, password: this.aes256.generateSecureKey(usuario.password) })
          .then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return super.remove(key, this.PATH);
  }

}
