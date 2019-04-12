/**
 * Created by hea on 4/9/19.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../service/hero.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  // means one way data binding, to accept the data from attribute like [hero]="selectedHero"
  @Input() hero: Hero;

  // DI for getting hero id from route
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    // + means convert string to number
    // and get id param from route
    const id = +this.route.snapshot.paramMap.get('id');
    this.hero = this.heroService.getHeroById(id);
  }
  goBack() {
    this.location.back();
  }

}
