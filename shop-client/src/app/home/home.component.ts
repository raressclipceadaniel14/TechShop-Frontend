import { Component, AfterViewInit } from '@angular/core';

declare var Carousel: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const carouselElement = document.getElementById('default-carousel');
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 3000, // Slide interval in milliseconds
      });
    }
  }
}
