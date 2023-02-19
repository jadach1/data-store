import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import {Hero} from '../../Models/hero'
import {HeroesService} from '../../service/heroes.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  hero: Hero;
  newHeroForm: FormGroup;

  constructor(private heroService: HeroesService) {
    this.hero = new Hero();
    this.newHeroForm = new FormGroup(
      {name: new FormControl(null),
       height: new FormControl(null),
       origin: new FormControl(null),
       skills: new FormControl([])}
    )
  }

  onSubmit(){
    console.log(this.newHeroForm)
    console.log(this.hero)
    this.heroService.addHero(this.hero)
  }

}
