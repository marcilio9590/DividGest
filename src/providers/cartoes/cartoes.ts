import { Injectable } from '@angular/core';
import { ComumProvider } from './../comum/comum';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class CartoesProvider extends ComumProvider {
  private PATH = 'cartoes/';
  constructor(db: AngularFireDatabase) {
    super(db);
  }

  getAll() {
    return super.getAll(this.PATH);
  }

  get(key: string) {
    return super.get(key, this.PATH);
  }

  save(cartao: any) {
    // Update sobrescreve apenas as propriedades passadas.
    // set sobreescreve todo o objeto da key
    return new Promise((resolve, reject) => {
      if (cartao.key) {
        this.getDb().object(this.PATH + cartao.key)
          .update({ nome: cartao.nome, vencimento: cartao.vencimento })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.getDb().list(this.PATH)
          .push({ nome: cartao.nome, vencimento: cartao.vencimento })
          .then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return super.remove(key, this.PATH);
  }


}
