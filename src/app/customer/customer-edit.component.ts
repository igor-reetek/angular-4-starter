import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Component({
  selector: 'customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {

  //customerForm: FormGroup;

  customer: Customer;
  customerId: any;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) {
    this.customer = <Customer>{};
  }

  public ngOnInit(): void {
    // Read the customer Id from the route parameter
    this.route.params.subscribe(
      params => {
        this.customerId = params['id'];
        this.getCustomer(this.customerId);
      }
    );
  }

  //Observable
  getCustomer(id: number): void {
    this.customerService.getCustomer(id)
      .subscribe((data: Customer) => {
        this.customer = data;
        console.log(this.customer);
      });
  }

  //Promise
  // getCustomer(id: number): void {
  //   this.customerService.getCustomer(id)
  //     .then(customer => this.customer = customer);
  // }
}
