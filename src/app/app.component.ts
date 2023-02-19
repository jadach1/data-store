import { Component, OnDestroy, OnInit } from '@angular/core';
import {Hero} from '../app/Models/hero'
import { Subscription } from 'rxjs';
import { HeroesService } from '../app/service/heroes.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private heroService: HeroesService){console.log("app comp init")}
  
  heroes: Hero[] = [
                    {name:"larry", height : "180", origin:"Canada", skills:['Strength'] },
                    {name: "Kiegan", height: "201", origin:"England", skills:['Speed']}
                  ];

subscription: Subscription = this.heroService.heroesUpdated.subscribe(
      newHeroes => {this.heroes = newHeroes}, 
      err => console.log("error updating heroes", 
      () => console.log("done with updating heroes")));

  ngOnInit(): void {
  // We created 1 hero in Service which is loaded before this component.  So we concat
    this.heroService.getHeroes();
  // Add the heroes we have statically coded here
   this.heroService.addHeroes(this.heroes);  
   console.log("initiate App comp")        
}

  ngOnDestroy(): void {
    console.log("destroyed app component")
}


}
