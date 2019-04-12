/**
 * Created by hea on 4/8/19.
 */

import {Component, OnInit} from '@angular/core';

import { Hero } from '../hero';

import { HeroService } from '../service/hero.service';

import { map, filter } from 'rxjs/operators';

@Component({
  selector : 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})

export class HeroesComponent implements OnInit {
  heroes;
  selectedHero: Hero;
  // inject the hero service, then we can use as this.heroService
  constructor(private heroService: HeroService) {}
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  ngOnInit() {
    // this.heroes = this.heroService.getHeroes();
    console.log(this.heroService.getHeroesByHTTP().subscribe(heroes => {
      this.heroes = heroes;
    }));
    // test
    this.heroService.getSingle().subscribe(v => {
      console.log(v);
    });
    this.heroService.getSequence().pipe(filter(x => x % 2 === 1)).subscribe(v => {
      console.log(v);
    });
  }
  delete() {
    this.heroService.deleteFirstHero();
  }
}
