import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {appRoutingModule} from '../app/my-router/router.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import { DisplayComponent } from './heroes/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
