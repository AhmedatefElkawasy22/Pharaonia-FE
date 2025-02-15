import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAboutUSComponent } from './add-about-us.component';

describe('AddAboutUSComponent', () => {
  let component: AddAboutUSComponent;
  let fixture: ComponentFixture<AddAboutUSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAboutUSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAboutUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
