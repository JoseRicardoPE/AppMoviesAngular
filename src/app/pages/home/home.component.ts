import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Billboard } from 'src/app/interfaces/billboard';
import { SlideShowComponent } from 'src/app/components/slide-show/slide-show.component';
import { MoviesPosterComponent } from 'src/app/components/movies-poster/movies-poster.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlideShowComponent, MoviesPosterComponent, InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Billboard[] = [];
  page: number = 1;
  isLoading: boolean = false;

  constructor(private movieService: MoviesService) { }

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

  // @HostListener('window:scroll', ['$event'])
  // onScroll() {
  //   const scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop);
  //   console.log(scrollPosition);
  // }

}
