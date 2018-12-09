import { Injectable } from '@angular/core';
import { ComumProvider } from './../comum/comum';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DividasProvider extends ComumProvider {

  private PATH = 'dividas/';
  constructor(db: AngularFireDatabase) {
    super(db);
  }

  getAll() {
    return super.getAll(this.PATH);
  }

  get(key: string) {
    return super.get(key, this.PATH);
  }

  save(divida: any) {
    return new Promise((resolve, reject) => {
      if (divida.key) {
        this.getDb().object(this.PATH + divida.key)
          .update({ data: divida.data, valor: divida.valor, cartao: divida.cartao, usuario: divida.usuario })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.getDb().list(this.PATH)
          .push({ data: divida.data, valor: divida.valor, cartao: divida.cartao, usuario: divida.usuario })
          .then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return super.remove(key, this.PATH);
  }
}
