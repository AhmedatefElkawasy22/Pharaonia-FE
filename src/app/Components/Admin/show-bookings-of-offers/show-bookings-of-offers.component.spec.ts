import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookingsOfOffersComponent } from './show-bookings-of-offers.component';

describe('ShowBookingsOfOffersComponent', () => {
  let component: ShowBookingsOfOffersComponent;
  let fixture: ComponentFixture<ShowBookingsOfOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBookingsOfOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBookingsOfOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
