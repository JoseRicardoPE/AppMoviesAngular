import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { MovieDetails } from 'src/app/interfaces/movie-details';
import { MovieCredits, Cast, Crew } from 'src/app/interfaces/movie-credits';
import { CastSlideComponent } from 'src/app/components/cast-slide/cast-slide.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, CastSlideComponent],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie?: MovieDetails;
  cast: Cast[] = [];
  crew: Crew[] = [];
  director: Crew[] = [];
  writer: Crew[] = [];
  
  constructor(
    private movieService: MoviesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;

    combineLatest([
      this.movieService.getMovieId(id),
      this.movieService.getMovieCredits(id),
    ]).subscribe( ([movie, cast]) => {
      if (movie === null || cast === null) {
        console.error('Error: Movie not found...');
        return;
      }
      this.movie = movie;
      this.cast = cast;
      // console.log(movie);
    });

    this.getStaffMovie(id);

  }

  getStars(voteAverage: number) {
    const starsCount = Math.floor(voteAverage);
    return Array(starsCount).fill(0);
  }

  buttonReturn() {
    window.history.back();

  }

  loadImageMovie(posterPath: string) {
    return this.movieService.loadImageMovie(posterPath);
  }

  // getCast(id: string) {
  //   this.movieService.getMovieCredits(id);
  // }

  getStaffMovie(movieId: number) {
    this.movieService.getMovieCrew(movieId).subscribe((credits: MovieCredits) => {
      this.crew = credits.crew;
      this.director = credits.crew.filter(member => member.job === 'Director');
      this.writer = credits.crew.filter(member => member.job === 'Writer');
      console.log('Crew:', this.crew);
      console.log('Director:', this.director);
      console.log('Writer:', this.writer);
    }, err => console.log(err));
  }

}
