import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Billboard } from 'src/app/interfaces/billboard';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-slide-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit, AfterViewInit {

  @Input() movie!:Billboard[];
  mySwiper?: Swiper;
  apiUrlImage = 'https://image.tmdb.org/t/p/w500';

  constructor(private router: Router, private movieService: MoviesService) { }
  
  ngOnInit(): void {
    // console.log(this.movie);
  }
  
  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  loadImageMovie(posterPath: String): String {
    return this.apiUrlImage + posterPath;
  }
}
