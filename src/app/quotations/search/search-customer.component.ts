import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Customer {
  name: string;
  avatar: string;
  address: string;
  mobile: number;
}

@Component({
  selector: 'search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {
  @Output() selectCustomer: EventEmitter<Customer> = new EventEmitter();
  myControl = new FormControl< string | Customer>('');
  options: Customer[] = [
    {
      name: 'Pankaj Prajapati 1',
      avatar: '/assets/images/avatar.png',
      address: 'Delhi',
      mobile: 9999999911,
    },
    {
      name: 'Pankaj Prajapati 2',
      avatar: '/assets/images/avatar.png',
      address: 'Kolkata',
      mobile: 9999999900,
    },
    {
      name: 'Pankaj Prajapati 3',
      avatar: '/assets/images/avatar.png',
      address: 'Mumbai',
      mobile: 9999999922,
    }
  ];
  filteredCustomers!: Observable<Customer[]>;

  constructor() { }

  ngOnInit() { 

    this.filteredCustomers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    console.log(this.filteredCustomers, 'fil');

  }

  displayFn(customer: Customer): string {
    console.log(this.myControl, 'sa');
    return customer && customer.name ? customer.name : '';
  }

  private _filter(name: string): Customer[] {
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
        this.selectCustomer.emit(event.source.value);
      }
    }
  }
}
