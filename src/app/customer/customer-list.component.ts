import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import "rxjs/add/operator/takeUntil";

import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit, OnDestroy {

  pagination: Observable<any>;
  page: number = 1;
  unsubscribe: Subject<any> = new Subject();

  constructor(private _customerService: CustomerService) {

  }

  public ngOnInit(): void {
    this.searchCustomers();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  searchCustomers(): void {
    this._customerService.searchCustomers({}, this.page, 10)
      .takeUntil(this.unsubscribe)
      .subscribe((data: any) => {
        this.pagination = data;
      });;
  }
}
