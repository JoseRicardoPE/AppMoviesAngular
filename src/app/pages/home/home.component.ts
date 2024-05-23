import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Billboard } from 'src/app/interfaces/billboard';
import { SlideShowComponent } from 'src/app/components/slide-show/slide-show.component';
import { MoviesPosterComponent } from 'src/app/components/movies-poster/movies-poster.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner, faArrowUp } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlideShowComponent, MoviesPosterComponent, InfiniteScrollModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Billboard[] = [];
  page: number = 1;
  isLoading: boolean = false;
  faSpinner = faSpinner;
  faArrowUp = faArrowUp;

  constructor(private movieService: MoviesService, library: FaIconLibrary) {
    library.addIcons(faSpinner);
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.isLoading = true;
    this.movieService.getMovies(this.page).subscribe( (movie: Billboard[]) => {
      console.log(movie);  
      this.movies = [...this.movies, ...movie];
      this.isLoading = false;
    })
  }

  onScroll(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.page++;
      this.loadMovies();
    }, 2000);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
