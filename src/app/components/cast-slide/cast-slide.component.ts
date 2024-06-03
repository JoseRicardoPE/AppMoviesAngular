import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-cast-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cast-slide.component.html',
  styleUrls: ['./cast-slide.component.css']
})
export class CastSlideComponent implements OnInit {

  constructor(
    private movieService: MoviesService,
  ) { }

  ngOnInit(): void {
  }

}
