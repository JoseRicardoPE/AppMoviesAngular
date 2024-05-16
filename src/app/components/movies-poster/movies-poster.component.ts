import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Billboard } from 'src/app/interfaces/billboard';

@Component({
  selector: 'app-movies-poster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-poster.component.html',
  styleUrls: ['./movies-poster.component.css']
})
export class MoviesPosterComponent implements OnInit {

  @Input() posterMovie: Billboard[] = [];
    
  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    
  }

  loadPosterMovie(posterPath: string): string {
    return this.moviesService.loadImageMovie(posterPath);
  }

  getStars(voteAverage: number) {
    const starsCount = Math.floor(voteAverage);
    return Array(starsCount).fill(0);
  }

}
