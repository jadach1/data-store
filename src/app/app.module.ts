import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {appRoutingModule} from '../app/my-router/router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store'
import {MatSelectModule} from '@angular/material/select';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import {heroesReducer} from '../app/heroes/Store/heroes.reducer'

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import { DisplayComponent } from './heroes/display/display.component';
import { UpdateHeroComponent } from './heroes/update-hero/update-hero.component';

import {env} from '../Environment/environment'

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DisplayComponent,
    UpdateHeroComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({heroList: heroesReducer}),
    StoreDevtoolsModule.instrument({logOnly: env.prod})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
