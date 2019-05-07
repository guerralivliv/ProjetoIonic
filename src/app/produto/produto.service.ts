import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  save(produto: Produto) {
    return this.db.list('produtos').push(produto);
  }

  getAll() {
    return this.db.list('produtos').snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
  }

  update(id: string, produto: Produto) {
    return this.db.list('produtos').update(id, produto);
  }

  remove(id: string) {
    return this.db.list('produtos').remove(id);
  }

  get(id: string) {
    return this.db.object('/produtos/' + id).valueChanges();
  }

}
