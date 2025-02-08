import { DestinationServiceService } from '../../Services/destination.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destination } from '../../Models/destination';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-one-destination',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './one-destination.component.html',
  styleUrl: './one-destination.component.css',
})
export class OneDestinationComponent implements OnInit {
  destination: Destination | null = null;
  destinationId: number = 0;
  currentIndex: number = 0;
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationServiceService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('DestinationID');
    this.destinationId = id ? Number(id) : 0;
    if (this.destinationId > 0) {
      this.destinationService.GetDestinationById(this.destinationId).subscribe({
        next: (data) => {
          //console.log(data);
          this.destination = data;
        },
        error: (error) => {
          //console.error('Error fetching destination data:', error);
        },
      });
    }
    this.startAutoScroll();
  }




ngOnDestroy() {
  clearInterval(this.intervalId);
}

startAutoScroll(): void {
  this.intervalId = setInterval(() => {
    this.scrollToSlide(this.currentIndex, new Event(''));
    this.currentIndex = (this.currentIndex + 1) % (this.destination?.imagePath.length || 0);
  }, 4000);
}

  scrollToSlide(index: number, event: Event): void {
    event.preventDefault();
    const element = document.getElementById('slide' + (index + 1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
