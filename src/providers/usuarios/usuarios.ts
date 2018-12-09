import { Injectable } from '@angular/core';
import { AbstractProvider } from './../abstract/abstract';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class UsuariosProvider extends AbstractProvider {
  private PATH = 'usuarios/';
  constructor(db: AngularFireDatabase) {
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
          .update({ nome: usuario.nome, vencimento: usuario.vencimento })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.getDb().list(this.PATH)
          .push({ nome: usuario.nome, vencimento: usuario.vencimento })
          .then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return super.remove(key, this.PATH);
  }

}
