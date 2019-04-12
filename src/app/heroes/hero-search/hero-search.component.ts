import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../../hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html'
})
export class HeroSearchComponent implements OnInit {
  // The $ is a convention that indicates heroes$ is an Observable, not an array.
  heroes$: Observable<Hero[]>;
  // why it's a subject not just string
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term, https://www.learnrxjs.io/operators/filtering/debounce.html
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroesByHTTP(term)),
    );
  }
}
