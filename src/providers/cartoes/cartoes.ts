import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable()
export class CartoesProvider {
  private PATH = 'cartoes/';
  constructor(private db: AngularFireDatabase) { }

  getAll() {
    var itemsRef: AngularFireList<any>;
    itemsRef = this.db.list(this.PATH);
    return itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  get(key: string) {
    return this.db.object(this.PATH + key)
      .valueChanges();
  }

  save(cartoes: any) {
    // Update sobrescreve apenas as propriedades passadas.
    // set sobreescreve todo o objeto da key
    return new Promise((resolve, reject) => {
      if (cartoes.key) {
        // this.db.list(this.PATH)
        //   .update(cartoes.key, { nome: cartoes.nome, vencimento: cartoes.vencimento })
        //   .then(() => resolve())
        //   .catch((e) => reject(e));
        this.db.object(this.PATH + cartoes.key)
          .update({ nome: cartoes.nome, vencimento: cartoes.vencimento })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nome: cartoes.nome, vencimento: cartoes.vencimento })
          .then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
