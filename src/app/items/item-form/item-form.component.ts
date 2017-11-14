import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../shared/item';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from 'angularfire2/database';

import { ItemService } from '../shared/item.service';
import { BookService } from '../shared/book.service';



@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

    item: Item = new Item();
    getBooks: any;
  constructor(private itemSvc: ItemService, private bookSvc: BookService) { 
  }

  ngOnInit() {
    this.getBooks = this.bookSvc.getBooksList();
    
  }

  createItem() {
    this.itemSvc.createItem(this.item)
    this.item = new Item() // reset item
    
  }

}
