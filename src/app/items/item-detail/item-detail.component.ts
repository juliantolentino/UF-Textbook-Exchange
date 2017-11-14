import { Router} from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';


@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  key = '';
  showHide: false;

  @Input() item: Item;

  constructor(private itemSvc: ItemService, private router: Router) { 
}

  ngOnInit() {
    this.key = this.item.$key;

  }

  goToComplete(item: Item) {

    let itemKey = item ? item.$key : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/items/'+ itemKey]);
    console.log('heyoo')
  }

  updateTimeStamp() {
    const date = new Date().getTime()
    this.itemSvc.updateItem(this.item.$key, { timeStamp: date })
  }

  updateActive(value: boolean) {
    this.itemSvc.updateItem(this.item.$key, { active: value })
  }

  deleteItem() {
    this.itemSvc.deleteItem(this.item.$key)
  }

}
