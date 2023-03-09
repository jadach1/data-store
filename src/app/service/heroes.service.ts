import {Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromHeroList from '../heroes/Store/heroes.reducer'
import * as HeroActions from '../heroes/Store/heroes.actions'
import {Hero} from '../Models/hero'
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class HeroesService implements OnInit{

  // Save the State 
  heroesStatus: fromHeroList.State;
 // heroes:Hero[] = [];

  constructor(private store: Store<fromHeroList.AppState>) { }

  ngOnInit(): void {
    console.log("initialising Hero Store")
    this.store.select('heroList').subscribe({
      next: (heroesStatus) => {this.heroesStatus = heroesStatus, console.log(heroesStatus)},
      error: (err) => console.log(err),
      complete: ()=> Swal.fire('Heroes Have Arrived from their HeadQuarters!')
    })
  }

  /*RETURN ALL HEROES */
  getHeroes(): Hero[] {
    return this.heroesStatus.Heroes;
  }

  addHero(hero: Hero) {
    this.store.dispatch(new HeroActions.AddHero(hero))
  }

  addHeroes(heroes: Hero[]) {
    this.store.dispatch(new HeroActions.AddHeroes(heroes))
  }

  /*RETURN A HERO WE WISH TO EDIT */
  getHeroToEdit(): Hero{
    let index = this.heroesStatus.editedHeroIndex;
    if (index != -1)
      return this.heroesStatus.Heroes[index];
    else
      return null
  }

  /*UPDATE A HERO WE HAVE HERE */
  updateHero(newHero: Hero) {
    this.store.dispatch(new HeroActions.UpdateHero({index: newHero.id, hero: newHero}))
  }
}
