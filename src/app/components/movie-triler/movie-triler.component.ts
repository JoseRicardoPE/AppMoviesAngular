import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TrailerModalComponent } from '../trailer-modal/trailer-modal.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-triler',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, MatButtonModule, MatDialogModule, HttpClientModule],
  templateUrl: './movie-triler.component.html',
  styleUrls: ['./movie-triler.component.css']
})
export class MovieTrilerComponent implements OnInit {

  @Input() movieId!: number;
  trailerUrl?: string;

  constructor(
    private movieService: MoviesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovieTrailer();
  }

  getMovieTrailer(): void {
    this.movieService.getMovieTrailer(this.movieId).subscribe( (data: any) => {
      console.log('Api Response:', data);
      const trailers = data.results.filter( (video: any) => video.type === 'Trailer' && video.site === 'YouTube');
      console.log('Filtered trailers:', trailers);
      if (trailers.length > 0) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailers[0].key}`;
        console.log('Trailer URL:', this.trailerUrl);
      } else {
        this.trailerUrl = undefined;
      }
    });
  }

  openTrailerModal(): void {
    this.dialog.open(TrailerModalComponent, {
      data: {
        trailerUrl: this.trailerUrl
      }
    });
  }

}
