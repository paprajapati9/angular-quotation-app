import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Product {
  name: string;
  img: string;
  bmc: number;
  price: number;
  sellingPrice?: number;
  quantity: number;
}

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() selectProduct: EventEmitter<Product> = new EventEmitter();
  myControl = new FormControl< string | Product>('');
  options: Product[] = [
    {
      name: '0 ohm (0R0) 5% SMD resistor 0805 (reel of 5000)',
      img: '/assets/images/img1.png',
      bmc: 121,
      price: 100,
      quantity: 1
    },
    {
      name: '1 ohm (0R0) 5% SMD resistor 0805 (reel of 5000)',
      img: '/assets/images/img1.png',
      bmc: 121,
      price: 200,
      quantity: 1
    },
    {
      name: '3 ohm (0R0) 5% SMD resistor 0805 (reel of 5000)',
      img: '/assets/images/img1.png',
      bmc: 121,
      price: 300,
      quantity: 1
    }
  ];
  filteredOptions!: Observable<Product[]>;

  constructor() { }

  ngOnInit() { 

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    console.log(this.filteredOptions, 'fil');

  }

  displayFn(user: Product): string {
    console.log(this.myControl, 'sa');
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value, 'selected')
        this.selectProduct.emit(event.source.value);
      }
    }
  }
}
