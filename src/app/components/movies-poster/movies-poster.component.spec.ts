import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesPosterComponent } from './movies-poster.component';

describe('MoviesPosterComponent', () => {
  let component: MoviesPosterComponent;
  let fixture: ComponentFixture<MoviesPosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MoviesPosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
