import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAboutUSComponent } from './update-about-us.component';

describe('UpdateAboutUSComponent', () => {
  let component: UpdateAboutUSComponent;
  let fixture: ComponentFixture<UpdateAboutUSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAboutUSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAboutUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
