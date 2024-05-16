import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Billboard } from 'src/app/interfaces/billboard';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies/movies.service';
import Swiper from 'swiper';

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

  constructor(private router: Router, private movieService: MoviesService) { }
  
  ngOnInit(): void {
    // console.log(this.movie);
  }
  
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper', {
      loop: true,
    });
  }

  loadImageMovie(posterPath: string): string {
    return this.movieService.loadImageMovie(posterPath);
  }

  onSlidePrev() {
    this.mySwiper?.slidePrev();
  }

  onSlideNext() {
    this.mySwiper?.slideNext();
  }
}
