import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from './search/search-product.component';
import { Customer } from './search/search-customer.component';
import { ProductModalComponent } from './templates/product-modal.component';

@Component({
  selector: 'product-quotation',
  templateUrl: './product-quotation.component.html',
  styleUrls: ['./product-quotation.component.css']
})
export class ProductQuotationComponent implements OnInit {

  addedProducts: Product[] = [];
  selectedCustomer!: Customer;

  constructor(private modalService: NgbModal) {}

  ngOnInit() { 

  }

  updateSelectedCustomer(updatedCustomer: Customer) {
    this.selectedCustomer = updatedCustomer;
  }

  removeProduct(product: Product) {
    console.log('ehr')
    this.addedProducts = this.addedProducts.filter((prod) => {
      return prod.name.toLowerCase() != product.name.toLowerCase();
    })
  }

  selectNewProduct(product: Product) {
    this.addedProducts.push(product);
    console.log(this.addedProducts, 'add')
  }

	openProductModal(product: Product) {
		const modalRef = this.modalService.open(ProductModalComponent);
		modalRef.componentInstance.name = product.name;
	}

  increaseQuantity(product: Product) {
    product.quantity++;
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
}
