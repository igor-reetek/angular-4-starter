import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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

  customerForm: FormGroup;

  customer: Customer;
  customerId: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private customerService: CustomerService) {
    this.customer = <Customer>{};
    this.createForm();
  }

  createForm(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      company: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(256)]],
      phones: this.fb.array([])
    });
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
        this.onCustomerRetrieved(data);
      });
  }

  onCustomerRetrieved(customer: Customer): void {
    if (this.customerForm) {
      this.customerForm.reset();
    }
    this.customer = customer;
    console.log(this.customer);

    // Update the data on the form
    this.customerForm.patchValue({
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      company: this.customer.companyName,
      email: this.customer.emailAddress,
    });
    const phoneFGs = this.customer.phones.map(phone =>
      this.fb.group({
        phoneNumber: [phone.phoneNumber, [Validators.required, Validators.maxLength(10)]],
        phoneTypeId: [phone.phoneTypeId]
      }));
    const phonesFormArray = this.fb.array(phoneFGs);
    this.customerForm.setControl("phones", phonesFormArray);
  }

  get firstName() { return this.customerForm.get('firstName'); }
  get lastName() { return this.customerForm.get('lastName'); }
  get company() { return this.customerForm.get('company'); }
  get email() { return this.customerForm.get('email'); }
  get phones() { return this.customerForm.get('phones'); }

  //Promise
  // getCustomer(id: number): void {
  //   this.customerService.getCustomer(id)
  //     .then(customer => this.customer = customer);
  // }
}
