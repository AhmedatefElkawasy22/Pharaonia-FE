import { GalleryService } from './../../Services/gallery/gallery.service';
import { Gallery } from './../../Models/gallery';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  imports: [NgFor, CommonModule],
})
export class GalleryComponent implements OnInit {
  gallery: Gallery[] = [];
  constructor(
    private http: HttpClient,
    private GalleryService: GalleryService
  ) {}

  ngOnInit(): void {
    this.GalleryService.GetGallery().subscribe({
      next: (data) => {
        this.gallery = data;
      },
      error: () => {},
    });
  }
}
