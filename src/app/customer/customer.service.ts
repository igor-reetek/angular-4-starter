import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Customer } from './customer';

@Injectable()
export class CustomerService {

    constructor(private http: Http) {

    }

    //Observable Array
    getCustomers() : Observable<Customer[]> {
        return this.http.get('http://localhost:3558/api/customer/all')
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch(this._handleError);
    }

    searchCustomers(searchVm: any, pageNo: number, pageSize: number) : Observable<any> {
        return this.http.post('http://localhost:3558/api/customer/search?pageNo=' + pageNo + '&pageSize=' + pageSize, searchVm)
        // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
        //...errors if any
        .catch(this._handleError);
    }

    //Observable
    getCustomer(id: number): Observable<Customer> {
        return this.http.get('http://localhost:3558/api/customer/ById/' + id)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch(this._handleError);
    }

    //Promise
    // getCustomer(id: number) : Promise<Customer> {
    //     return this.http.get('http://localhost:3558/api/customer/ById/' + id)
    //         .toPromise()
    //         .then((res: Response) => <Customer>res.json())
    //         .catch(this._handlePromiseError);
    // }

    _handleError(err: any) {
        console.log(err);
        return Observable.throw(err || 'Server error');
    }

    _handlePromiseError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}