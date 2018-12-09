import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable()
export class AbstractProvider {

  constructor(private db: AngularFireDatabase) { }

  public getDb() {
    return this.db;
  }

  public getAll(PATH: string) {
    var itemsRef: AngularFireList<any>;
    itemsRef = this.getDb().list(PATH);
    return itemsRef.snapshotChanges().pipe(
      map(usuario =>
        usuario.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  public get(key: string, PATH: string) {
    return this.getDb().object(PATH + key)
      .snapshotChanges().subscribe(usuario => {
        return (usuario.payload.val() + usuario.key);
      });
  }

  remove(key: string, PATH: string) {
    return this.db.list(PATH).remove(key);
  }


}
