import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import * as _ from 'lodash';


@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: any; // Observable<Item[]>;
  showSpinner = true;

  filteredItems: any;
  subscription: any;

  title: string;
  author: string;
  class: string;
  professor: string;
  price: number;

  filters = {}



  constructor(private itemService: ItemService/*, private db: AngularFireDatabase*/) {
    this.items = this.itemService.getItemsList()
    //this.items.applyFilters()
    //this.applyFilters()
  }


  ngOnInit() {
    //this.getItemsList();
    this.items.subscribe(x => {
      //this.applyFilters()

      this.showSpinner = false;
    })
    //this.applyFilters();
    /*
    this.db.list('/items')
      .subscribe(items => {
        this.items = items;
        this.applyFilters()
    })*/

  }

  deleteItems() {
    this.itemService.deleteAll()
  }
/*
  getItemsList() {
    if (this.subscription) this.subscription.unsubscribe()
 
    this.subscription = this.itemService.getItemsList()
                            .subscribe(items => {
                              this.items = items
                            })
  }*/

  private applyFilters() {
    this.filteredItems = _.filter(this.items, _.conforms(this.filters) );
    console.log(this.filteredItems);
  }

  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }

    /// removes filter
  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }

}
