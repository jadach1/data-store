import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Hero} from '../Models/hero'

@Injectable({
  providedIn: 'root'
})


export class HeroesService implements OnDestroy {

  hero: Hero = new Hero();
  heroes: Hero[] = [];
  heroesUpdated = new EventEmitter<Hero[]>();
  status = new EventEmitter<string>();

  constructor() {
    this.hero = {
      name: "Abhish",
      height: "194",
      origin: "India",
      skills: ["Cunning","Tactition"]      
    }

    this.heroes.push(this.hero);
    this.hero = new Hero();
    this.heroesUpdated.emit(this.heroes);
    console.log("Service Initiated")
   }

  ngOnDestroy(): void {
      console.log("Service Destroyed")
  }

  public addHeroes(newHeroes: Hero[]){
      this.heroes = this.heroes.concat(newHeroes);
      this.status.emit("updated heroes list")
  }

  public addHero(newHero: Hero){
    this.heroes.push(newHero)
    this.status.emit("updated heroes list with new Hero: " + newHero.name)
    this.heroesUpdated.emit(this.heroes);
  }

  public getHeroes() {
    this.heroesUpdated.emit(this.heroes);
  }

}
