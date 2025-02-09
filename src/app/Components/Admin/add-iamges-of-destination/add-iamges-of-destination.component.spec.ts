import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIamgesOfDestinationComponent } from './add-iamges-of-destination.component';

describe('AddIamgesOfDestinationComponent', () => {
  let component: AddIamgesOfDestinationComponent;
  let fixture: ComponentFixture<AddIamgesOfDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIamgesOfDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIamgesOfDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
