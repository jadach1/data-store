import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Hero } from '../../Models/hero'
import { Store } from '@ngrx/store';
import * as fromHeroList from '../Store/heroes.reducer'
import * as heroActions from '../Store/heroes.actions'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-hero',
  templateUrl: './update-hero.component.html',
  styleUrls: ['./update-hero.component.css']
})
export class UpdateHeroComponent implements OnInit, OnDestroy{
    updateHeroForm: FormGroup;
    heroState: fromHeroList.State;
    editedHero:   Hero;
    index: number = -1;

    
    constructor(private store: Store<fromHeroList.AppState>) {}

  ngOnInit(): void {
      this.store.select('heroList').subscribe({
        next: (heroState) => {
                              this.heroState = heroState,
                              this.setUpForm(),
                              this.index = heroState.editedHeroIndex
                            },
        error: (error) => console.log(error)
      })
    
      
        
      
  }

  setUpForm() {
      this.editedHero = this.heroState.Heroes[this.heroState.editedHeroIndex]
      this.updateHeroForm = new FormGroup({
        'edit_name' : new FormControl(this.editedHero.name),
        'edit_height' : new FormControl(this.editedHero.height),
        'edit_origin' : new FormControl(this.editedHero.origin)
      })
  }

  onSubmit(){
      let controls = this.updateHeroForm;
      let newHero = new Hero(controls.value['edit_name'], 
                             controls.value['edit_height'], 
                             controls.value['edit_origin'], 
                             this.editedHero.skills)
      console.log(newHero)
      this.store.dispatch(new heroActions.UpdateHero({index: this.index,hero: newHero}))
      Swal.fire("Successfully Updated Hero " + newHero.name)
    }

    ngOnDestroy(){
      console.log("destryoing update hero component")
      this.store.dispatch(new heroActions.EditHeroFinish())
    }
}
