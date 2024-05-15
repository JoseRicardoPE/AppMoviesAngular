import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Billboard } from 'src/app/interfaces/billboard';
import { SlideShowComponent } from 'src/app/components/slide-show/slide-show.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlideShowComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Billboard[] = [];

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe( movie => {
      console.log(movie);
      this.movies = movie;
    })
  }

}
