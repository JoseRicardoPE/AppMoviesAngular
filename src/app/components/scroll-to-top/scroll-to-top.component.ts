import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule,],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit, OnDestroy {

  windowScrolled = false;
  scrollSubscription: Subscription | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private scrollDispatcher: ScrollDispatcher,
  ) {}

  ngOnInit(): void {
    this.scrollSubscription = this.scrollDispatcher.scrolled().subscribe( (event: any) => {
      const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
      this.windowScrolled = scrollTop > 200;
    });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  scrollToTop(): void {
    this.document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}
