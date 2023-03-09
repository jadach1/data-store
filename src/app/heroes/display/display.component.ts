import { Component, OnDestroy } from '@angular/core';
import {Hero} from '../../Models/hero'
import {Observable, Subscription } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import * as heroActions from '../Store/heroes.actions'
import * as fromHeroList from '../Store/heroes.reducer'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnDestroy {

  constructor(private store: Store<fromHeroList.AppState>) {console.log("display comp init")}

  heroes: Observable<fromHeroList.State>;

  ngOnInit(): void {
    
        this.heroes = this.store.select('heroList')
  }

  ngOnDestroy(): void {
  console.log("destroyed display component")
  }


}
