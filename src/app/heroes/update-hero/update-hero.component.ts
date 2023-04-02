import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Hero } from '../../Models/hero'
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { Router } from '@angular/router';
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
    heroState:      fromHeroList.State;
    editedHero:     Hero;
    index:          number = -1;

    
    constructor(private store: Store<fromHeroList.AppState>, private route: Router) {
      
      //Place in blank form so error isn't produced if we navigate to /edit without a hero
      this.updateHeroForm = new FormGroup({
                        'edit_name'   : new FormControl(),
                        'edit_height' : new FormControl(),
                        'edit_origin' : new FormControl()
                      });
    }

  ngOnInit(): void {
      this.store.select('heroList')
      .pipe( tap( state => {

        if(state.editedHeroIndex === -1){
          
          this.route.navigate(['display'])
          throw "this is throwing"

        } else {

          Swal.fire("Success","valid hero chose",'question')

        }
      } ))
      .pipe( take(1) )
      .subscribe({
        next: (heroState) => {
                              this.heroState = heroState,
                              this.index = heroState.editedHeroIndex
                            },
        error: (error) => console.log(error),
        complete: () => {
                         Swal.fire("complete","Updating " + this.heroState.Heroes[this.index].name),
                         this.setUpForm()
                        }
      })  
  }

  setUpForm() {
    console.log("edit form")
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
      this.store.dispatch(new heroActions.UpdateHero({index: this.index,hero: newHero}))
      Swal.fire("Successfully Updated Hero " + newHero.name)
    }

    ngOnDestroy()
    {
      console.log("destryoing update hero component")
      this.store.dispatch(new heroActions.EditHeroFinish())
    }
}
