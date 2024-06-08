import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast, MovieCredits } from 'src/app/interfaces/movie-credits';
import { MoviesService } from 'src/app/services/movies/movies.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cast-slide.component.html',
  styleUrls: ['./cast-slide.component.css']
})
export class CastSlideComponent implements OnInit, AfterViewInit {

  mySwiper?: Swiper;
  @Input() cast?: Cast[] = [];
  
  constructor(
    private movieService: MoviesService,
  ) { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper', {
      slidesPerView: 5,
      spaceBetween: 16,
      freeMode: true,
      loop: true
    });
  }

  ngOnInit(): void {
  }

  loadImageMovie(posterPath: string) {
    return this.movieService.loadImageMovie(posterPath);
  }

  onSlidePrev() {
    this.mySwiper?.slidePrev();
  }

  onSlideNext() {
    this.mySwiper?.slideNext();
  }

}
