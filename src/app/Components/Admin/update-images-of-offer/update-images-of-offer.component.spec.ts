import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateImagesOfOfferComponent } from './update-images-of-offer.component';

describe('UpdateImagesOfOfferComponent', () => {
  let component: UpdateImagesOfOfferComponent;
  let fixture: ComponentFixture<UpdateImagesOfOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateImagesOfOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateImagesOfOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
