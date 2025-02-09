import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIamgesOfDestinationComponent } from './update-iamges-of-destination.component';

describe('UpdateIamgesOfDestinationComponent', () => {
  let component: UpdateIamgesOfDestinationComponent;
  let fixture: ComponentFixture<UpdateIamgesOfDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIamgesOfDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateIamgesOfDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
