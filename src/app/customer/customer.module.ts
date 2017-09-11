import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomerListComponent } from './customer-list.component';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerService } from './customer.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild([
      { path: 'customers', component: CustomerListComponent },
      { path: 'customerEdit/:id', component: CustomerEditComponent },
    ])
  ],
  exports: [
    CustomerListComponent,
  ],
  declarations: [
        /**
     * Components / Directives/ Pipes
     */
    CustomerListComponent,
    CustomerEditComponent,
  ],
  providers: [
    CustomerService,    
  ]
})
export class CustomerModule {}