import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import "rxjs/add/operator/takeUntil";

import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Component({
  selector: 'customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnDestroy, OnInit {

  customerForm: FormGroup;

  customer: Customer = <Customer>{};
  customerId: any;
  phoneTypes: any[] = [{ id: 1, value: 'Mobile' }, { id: 2, value: 'Home' }, { id: 3, value: 'Work' }, { id: 4, value: 'Fax' }];
  unsubscribe: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private customerService: CustomerService) {
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
    this.route.params.takeUntil(this.unsubscribe).subscribe(
      params => {
        this.customerId = params['id'];
        this.getCustomer(this.customerId);
      }
    );
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  //Observable
  getCustomer(id: number): void {
    this.customerService.getCustomer(id)
      .takeUntil(this.unsubscribe)
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

  initPhone() {
    return this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      phoneTypeId: ['']
    });
  }

  addPhone() {
    const control = <FormArray>this.customerForm.controls['phones'];
    control.push(this.initPhone());
  }

  removePhone(i: number) {
    const control = <FormArray>this.customerForm.controls['phones'];
    control.removeAt(i);
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
