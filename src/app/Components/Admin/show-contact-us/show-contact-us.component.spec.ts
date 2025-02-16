import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContactUsComponent } from './show-contact-us.component';

describe('ShowContactUsComponent', () => {
  let component: ShowContactUsComponent;
  let fixture: ComponentFixture<ShowContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowContactUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
