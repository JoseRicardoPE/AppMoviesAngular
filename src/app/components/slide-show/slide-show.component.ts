import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('swiperContainer') swiperContainer!: any; // ViewChild para obtener referencia al contenedor Swiper

  @Input() movies!:Billboard[];
  mySwiper?: Swiper;

  constructor(private router: Router, private movieService: MoviesService) { }
  
  ngOnInit(): void {
    // console.log(this.movie);
  }
  
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper(this.swiperContainer.nativeElement, {
      direction: 'horizontal', // Dirección del deslizamiento
      loop: true,
      scrollbar: {
        el: 'swiper-scrollbar',
        hide: false,
        draggable: true, // Permite arrastrar el scrollbar
      }
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

  onClickMovie(movie: Billboard) {
    this.router.navigate(['/movie', movie.id]);
  }
}
