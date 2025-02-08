/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OfferServiceService } from './offerService.service';

describe('Service: OfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferServiceService]
    });
  });

  it('should ...', inject([OfferServiceService], (service: OfferServiceService) => {
    expect(service).toBeTruthy();
  }));
});
