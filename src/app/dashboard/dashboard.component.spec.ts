import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

/**
 * Load the implementations that should be tested.
 */
import { DashboardComponent } from './dashboard.component';

describe('Dashboard', () => {
  /**
   * Provide our implementations or mocks to the dependency injector
   */
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      /**
       * Provide a better mock.
       */
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      DashboardComponent
    ]
  }));

  it('should log ngOnInit', inject([DashboardComponent], (dashboard: DashboardComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    dashboard.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
