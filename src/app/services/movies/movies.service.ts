import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Billboard } from 'src/app/interfaces/billboard';
import { MovieObject } from 'src/app/interfaces/movie-object';
import { MovieDetails } from 'src/app/interfaces/movie-details';
import { MovieCredits, Cast, Crew } from 'src/app/interfaces/movie-credits';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private URL = 'https://api.themoviedb.org/3';
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjI5NTE1YzZhYTMwYzg5MTQxZDM2ZmIyNWFmOTQyNiIsInN1YiI6IjYyOWY2NDIzODUwMDVkMDA1MmI5NmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Db8x8Pn59YG6Wh0b_shbdmtgyzLoDq7Eox_MJqTFPA';
  private apiUrlImage = 'https://image.tmdb.org/t/p/w500';
  private imageDefault = 'assets/images/default-poster.png';
  private headers = {
    authorization: `Bearer ${this.apiKey}`
  };

  constructor(private http: HttpClient) { }
  
  loadImageMovie(posterPath: string): string {
    if (!posterPath) {
      return this.imageDefault;
    } else {
      return this.apiUrlImage + posterPath;
    }
  }
  
  getMovies(page: number = 1): Observable<Billboard[]> {
    return this.http.get<MovieObject>(`${this.URL}/movie/now_playing?language=en-US&page=${page}`, {headers: this.headers}).pipe(
      map( response => response.results)
    );
  }

  searchMovie(text: string): Observable<Billboard[]> {
    return this.http.get<MovieObject>(`${this.URL}/search/movie?query=${text}&language=en-US&page=1`, {headers: this.headers}).pipe(
      map( response => response.results)
    )
  }

  getMovieId(id: string) {
    return this.http.get<MovieDetails>(`${this.URL}/movie/${id}?language=en-US`, {headers: this.headers}).pipe(
      catchError( err => of(null) )
    );
  }

  getMovieCredits(id: string): Observable<Cast[] | null> {
    return this.http.get<MovieCredits>(`${this.URL}/movie/${id}/credits?language=en-US`, {headers: this.headers}).pipe(
      map( response => response.cast),
      catchError( err => of(null) ),
    );
  }

  getMovieCrew(id: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`${this.URL}/movie/${id}/credits?language=en-US`, {headers: this.headers});
  }

  getMovieTrailer(id: number): Observable<any> {
    return this.http.get<MovieDetails>(`${this.URL}/movie/${id}/videos?language=en-US`, {headers: this.headers});
  }

}
