import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTrilerComponent } from './movie-triler.component';

describe('MovieTrilerComponent', () => {
  let component: MovieTrilerComponent;
  let fixture: ComponentFixture<MovieTrilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MovieTrilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTrilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
