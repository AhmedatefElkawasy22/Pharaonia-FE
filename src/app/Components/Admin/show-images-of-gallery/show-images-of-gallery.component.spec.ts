import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImagesOfGalleryComponent } from './show-images-of-gallery.component';

describe('ShowImagesOfGalleryComponent', () => {
  let component: ShowImagesOfGalleryComponent;
  let fixture: ComponentFixture<ShowImagesOfGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowImagesOfGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowImagesOfGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
