import { Component } from '@angular/core';
import {Hero} from '../../Models/hero'
import { Subscription } from 'rxjs';
import { HeroesService } from '../../service/heroes.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  constructor(private heroService: HeroesService){console.log("display comp init")}

  heroes: Hero[] = [];

ngOnInit(): void {
  // We created 1 hero in Service which is loaded before this component.  So we concat
   this.heroService.getHeroes();      
}

ngOnDestroy(): void {
console.log("destroyed display component")
}

status: Subscription = this.heroService.status.subscribe( string => alert("display:: " + string))
subscription: Subscription = this.heroService.heroesUpdated.subscribe(
        newHeroes => this.heroes = this.heroes.concat(newHeroes), 
        err => console.log("error updating heroes", 
        () => console.log("done with updating heroes")));
}
