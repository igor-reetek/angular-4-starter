import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import "rxjs/add/operator/takeUntil";
import * as FileSaver from 'file-saver'; 

import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit, OnDestroy {

  pagination: Observable<any>;
  page: number = 1;
  pageSize: number = 10;
  unsubscribe: Subject<any> = new Subject();
  searchVm = { customerName: '', companyName: '', email: '' };

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
    this._customerService.searchCustomers(this.searchVm, this.page, this.pageSize)
      .takeUntil(this.unsubscribe)
      .subscribe((data: any) => {
        this.pagination = data;
      });
  }

  exportCustomers(): void {
    this._customerService.exportCustomers()
      .takeUntil(this.unsubscribe)
      .subscribe((blob: Blob) => {
        FileSaver.saveAs(blob, 'Customers.csv');
      });
  }
}
