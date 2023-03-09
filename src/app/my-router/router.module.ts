import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {DisplayComponent} from '../../app/heroes/display/display.component'
import {HeroesComponent} from '../heroes/heroes/heroes.component'
import {UpdateHeroComponent} from '../heroes/update-hero/update-hero.component'


const routes: Routes = [
  {
    path: 'add',
    component: HeroesComponent
  },
  {
    path: 'display',
    component: DisplayComponent
  },
  {
    path: 'update',
    component: UpdateHeroComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class appRoutingModule {

 }
