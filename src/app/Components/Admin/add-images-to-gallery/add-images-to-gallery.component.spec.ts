import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagesToGalleryComponent } from './add-images-to-gallery.component';

describe('AddImagesToGalleryComponent', () => {
  let component: AddImagesToGalleryComponent;
  let fixture: ComponentFixture<AddImagesToGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddImagesToGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImagesToGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
