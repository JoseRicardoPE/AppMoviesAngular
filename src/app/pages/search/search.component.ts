import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesPosterComponent } from 'src/app/components/movies-poster/movies-poster.component';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Billboard } from 'src/app/interfaces/billboard';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MoviesPosterComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  text = '';
  movies: Billboard[] = [];
  notMovie = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.text = params['text'];
      this.movieService.searchMovie(this.text).subscribe(movie => {
        this.movies = movie;
        if (this.movies.length === 0) {
          this.notMovie = 'Not found movie...'
        }
      });
    });
  }

}
