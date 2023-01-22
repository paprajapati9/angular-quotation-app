import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'product-modal',
	templateUrl: './product-modal.component.html'
})
export class ProductModalComponent {
	@Input() name!: string;

	constructor(public activeModal: NgbActiveModal) {}
}
