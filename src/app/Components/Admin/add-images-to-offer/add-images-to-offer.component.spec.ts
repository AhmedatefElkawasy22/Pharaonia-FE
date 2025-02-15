import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagesToOfferComponent } from './add-images-to-offer.component';

describe('AddImagesToOfferComponent', () => {
  let component: AddImagesToOfferComponent;
  let fixture: ComponentFixture<AddImagesToOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddImagesToOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImagesToOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
