import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Listing } from './listing';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class ListingService {

  private basePath = '/book';

  listingsRef: AngularFireList<Listing>;
  listingRef:  AngularFireObject<Listing>;

  listings: Observable<Listing[]>; //  list of objects
  listing:  Observable<Listing>;   //   single object

  constructor(private db: AngularFireDatabase) {
    this.listingsRef = db.list('/book')
  }

  getListingsList(query?) {
    // const itemsRef = afDb.list('/items')
    // return this.itemsRef.valueChanges()
    return this.listingsRef.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) )
    })
  }
  
  getListing(key: string): Observable<Listing> {
    const listingPath = `${this.basePath}/${key}`;
    this.listing = this.db.object(listingPath).valueChanges();
    return this.listing
  }

}
