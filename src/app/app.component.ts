import { Component, OnDestroy, OnInit } from '@angular/core';
import {Hero} from '../app/Models/hero'
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {HeroesService} from '../app/service/heroes.service'
import * as fromHeroList from '../app/heroes/Store/heroes.reducer'
import * as heroActions from '../app/heroes/Store/heroes.actions'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  constructor( private store: Store<fromHeroList.AppState>)
              {console.log("app comp init")}
  
    //heroes: Observable<fromHeroList.State>;
    title='Data-Store'
    subscription: Subscription;
    heroes: Hero[] = [];
    updateButtonDisabled: boolean = true;
  

  ngOnInit(): void {
     this.subscription =  this.store.select('heroList').subscribe(
    {
      next: (Heroes) => this.heroes = Heroes.Heroes,
      error: (err)  => console.log(err) 
    }
   )

   Swal.fire('Welcome to the Heroes Application Where We Test Out The Functionality of NgRX Store !')
  }

  /*UPDATE AN EXISTING HERO.  WE SET THE INDEX WE WISH TO UPDATE IN THE STORE HERE */
  updateHero(hero: Hero){
    if (hero === null) {
      this.updateButtonDisabled = true;
    } else {
      this.updateButtonDisabled = false
    }
    this.store.dispatch(new heroActions.EditHeroStart(this.heroes.indexOf(hero)))
  }

  disableMe(){
    this.updateButtonDisabled=true;
  }
  ngOnDestroy(): void {
    console.log("destroyed app component")
    this.subscription.unsubscribe()
}


}
