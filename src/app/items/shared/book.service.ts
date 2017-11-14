import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from 'angularfire2/database';
import { Item } from './item';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class BookService {

  private basePath = '/book';
  bookList: AngularFireList<any[]>;
  //itemsRef: AngularFireList<Item>;
  //itemRef:  AngularFireObject<Item>;

  //items: Observable<Item[]>; //  list of objects
  //item:  Observable<Item>;   //   single object


  constructor(private db: AngularFireDatabase) {
    this.bookList = db.list('/book');
  }

  getBooksList(query?) {
    // const itemsRef = afDb.list('/items')
    // return this.itemsRef.valueChanges()
    return this.bookList.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) )
    })
  }

}
