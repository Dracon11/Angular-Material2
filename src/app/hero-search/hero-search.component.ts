import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../services/hero-search.service';
import { Hero } from './../models/hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchSevice: HeroSearchService,
    private router: Router ) { }

  ngOnInit() {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.heroSearchSevice.search(term)
      : Observable.of<Hero[]>([]))
      .catch (error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);

  }

}
