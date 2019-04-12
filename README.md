# AngularOfficalDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


#MY README Start here!

create by commend 'ng new angular-offical-demo'
# ------------------MY OWN README Divider-----------------

# Observable vs Promise
https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables
https://stackoverflow.com/questions/45272071/access-a-value-from-settimeout-observable-method

    
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
            observer.next('Sequence value from observable' + i++);
          }, 1000);
        });
      }

then 
    
        // test
        this.heroService.getSingle().subscribe(v => {
          console.log(v);
        });
        this.heroService.getSequence().subscribe(v => {
          console.log(v);
        });
      
  
 In HTTP practice
 
        getHeroesByHTTP(): Observable<Hero[]> {
          return this.http.get<Hero[]>(this.heroesUrl) // <Hero[]> means ob type of returned by http
            .pipe(
              tap(_ => console.log('fetched heroes')),
              catchError(this.handleError<Hero[]>('getHeroes', []))
          );
        } 

**What's pipe?**
https://stackoverflow.com/questions/51269372/difference-between-the-methods-pipe-and-subscribe-on-a-rxjs-observable

pip the operation for the observable, can play with at https://stackblitz.com/edit/typescript-vhmxyz?file=index.ts 

      import {Observable, range } from 'rxjs';
      
      import { map, filter, tap } from 'rxjs/operators';
      
      let i = 0;
      
      let ob = new Observable(observer => {
                setInterval(() => {
                  observer.next(i++);
                }, 1000);
              });
      
      
      ob.pipe(
        filter(x => x % 2 === 1), // filter the value from generate/next of ob, only work for odd
        map(x => x + x), // change the output map to two times
        tap(_ => console.log('I am tap'))
      ).subscribe(x => console.log(x));

**What's the tap?**
https://stackoverflow.com/questions/49184754/tap-vs-subscribe-to-set-a-class-property

**What's the catchError**
https://www.learnrxjs.io/operators/error_handling/catch.html

handle err in observable! the writing of official doc is great practice

in src/app/heroes/hero-search/hero-search.component.ts
**What's the Subject in rxjs**
https://stackoverflow.com/questions/47537934/what-is-the-difference-between-a-observable-and-a-subject-in-rxjs
different format to generate value
    
    import {Observable, range ,Subject } from 'rxjs';
    
    import { map, filter, tap } from 'rxjs/operators';
    
    let i = 0;
    /*//Observable test block
    let ob = new Observable(observer => {
              setInterval(() => {
                observer.next(i++);
              }, 1000);
            });
    
    
    ob.pipe(
      filter(x => x % 2 === 1), // filter the value from generate/next of ob, only work for odd
      map(x => x + x), // change the output map to two times
      tap(_ => console.log('I am tap of ob'))// https://stackoverflow.com/questions/49184754/tap-vs-subscribe-to-set-a-class-property
    ).subscribe(x => console.log(x));
    */
    
    //Subject test block
    
    let sub = new Subject();
    sub.pipe(filter(x => x % 2 === 1),
      map(x => x*2), 
      tap(_ => console.log('I am tap of subject'))).subscribe(x => console.log(x));
    
    setInterval(()=>{
      sub.next(i++);
    },1000);


# Plus: Change detection in Component(What happens when data/component change and update DOM?)
practice: delete the data in heroService

React and Angular’s change detection are different, but they have in common one very important thing - making diff of current and previous state from memory (not from DOM) and rendering only what has been changed.
https://dzone.com/articles/how-to-use-change-detection-in-angular
https://stackoverflow.com/questions/47386408/angular-5-0-change-detection-strategy-vs-reacts-change-detection-strategy

# Async search practice!
https://angular.io/tutorial/toh-pt6#search-by-name

Subject in rxjs, refer to previous code

**What is switchMap?**
https://www.learnrxjs.io/operators/transformation/switchmap.html
Main use here is to cancel when not qualified by debounce and distinctUntilChanged

then return observable to this.heroes$


in src/app/heroes/hero-search/hero-search.component.html???

    
    *ngFor="let hero of heroes$ | async"

Remember that the component class does not subscribe to the heroes$ observable. That's the job of the AsyncPipe in the template.
