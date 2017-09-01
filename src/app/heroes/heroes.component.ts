import {HeroService} from '../services/hero.service';
import {Router} from '@angular/router';
import { Hero } from './../models/hero';

import { MdDialog, MdDialogRef } from '@angular/material';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero: Hero;
  dialogRef: MdDialogRef<SelectedHeroDialog>;

  constructor(
    private HeroService: HeroService,
    private router: Router,
    private dialog: MdDialog ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.HeroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.dialogRef = this.dialog.open(SelectedHeroDialog);
    this.dialogRef.componentInstance.selectedHero = hero;
  }

  goToDetails() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string) {
    name = name.trim();
    if (!name) {return; }
    this.HeroService.create(name)
    .then(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });
  }

  delete(hero: Hero): void {
    this.HeroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }

}

@Component({
  selector: 'app-heroes',
  templateUrl: './selected-dialog.component.html'
})
export class SelectedHeroDialog {
  selectedHero: any;

  constructor(
    public dialogRef: MdDialogRef<SelectedHeroDialog>,
    private router: Router ) {}

    goToDetail(): void {
      this.dialogRef.close();
      this.router.navigate(['/detail', this.selectedHero.id]);
    }
}


