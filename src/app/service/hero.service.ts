/**
 * Created by hea on 4/9/19.
 */
import { Injectable } from '@angular/core';

import { CONSTANT } from '../app.constant';

import { Hero } from '../hero';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// err handling
import { catchError, map, tap } from 'rxjs/operators';

// @Injectable mark for DI,  providedIn: 'root' means singleton
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes;
  private heroesUrl = 'api/heroes';
  // service inject other service is also the same way like constructor(private heroService: HeroService)
  constructor(private http: HttpClient) {
    this.heroes = [...CONSTANT.heroes] ;
  }
  getHeroes() {
    return this.heroes;
  }
  deleteFirstHero() {
    this.heroes.splice(0, 1);
  }
  // make getHeroes async
  getHeroesAsync(): Observable<Hero[]> {
    return of(CONSTANT.heroes);
  }
  getHeroesByHTTP(): Observable<Hero[]> {
    console.log(this.http.get<Hero[]>(this.heroesUrl) // <Hero[]> means ob type of returned by http
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      ));
    return this.http.get<Hero[]>(this.heroesUrl) // <Hero[]> means ob type of returned by http
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroById(id: number): Hero {
    for ( let hero of CONSTANT.heroes) {
        if ( hero.id === id) {
          return hero;
        }
    }
    return null;
  }
  /* test observable for sequence value*/
  // test observable
  getSingle(): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('Single value from observable');
      }, 1000);
    });
  }
  // test observable sequence, can emit multiple value over time! this is different than promise
  getSequence(): Observable<any> {
    let i = 0;
    return new Observable(observer => {
      setInterval(() => {
        observer.next(i++);
      }, 1000);
    });
  }


  searchHeroesByHTTP(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => console.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
