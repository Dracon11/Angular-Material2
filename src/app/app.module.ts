import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeroService } from './services/hero.service';
import { HeroSearchService } from './services/hero-search.service';

import { AppComponent } from './app.component';
import { HeroesComponent, SelectedHeroDialog } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RoutingModule } from './routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';

// Material2
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    SelectedHeroDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MaterialModule ,
    BrowserAnimationsModule
  ],
  providers: [HeroService, HeroSearchService],
  bootstrap: [AppComponent],
  entryComponents: [SelectedHeroDialog]
})
export class AppModule { }
