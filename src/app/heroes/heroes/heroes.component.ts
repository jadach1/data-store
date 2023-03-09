import { Component, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms'
import { Store } from '@ngrx/store';
import {Hero} from '../../Models/hero'
import * as fromHeroList from '../Store/heroes.reducer'
import * as heroActions from '../Store/heroes.actions'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnDestroy {
  
  hero: Hero;
  newHeroForm: FormGroup;

  constructor(private store: Store<fromHeroList.AppState>) {
    
    this.hero = new Hero();

    this.newHeroForm = new FormGroup(
      {name: new FormControl(null, [Validators.required]),
       height: new FormControl(null, [Validators.required]),
       origin: new FormControl(null, [Validators.required]),
       skills: new FormArray([],[Validators.required])}
    )
  }

  onAddSkill(){
    const control = new FormControl(null);
    (<FormArray>this.newHeroForm.get('skills')).push(control);
  }

  onSubmit(){
    if(this.newHeroForm.valid){
      let form = this.newHeroForm.value;
      let hero = new Hero( form.name, form.height, form.origin, form.skills, 1)
      this.store.dispatch(new heroActions.AddHero(hero))
      this.newHeroForm.reset();
    }
  }

  ngOnDestroy(){
    console.log("destryoing add hero component")
  }
}
