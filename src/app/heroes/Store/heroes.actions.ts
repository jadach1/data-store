import { Action } from '@ngrx/store';
import {Hero} from '../../Models/hero'

export const ADD_HERO='ADD_HERO';
export const ADD_HEROES='ADD_HEROES';
export const UPDATE_HERO='UPDATE_HERO';
export const DELETE_HERO='DELETE_HERO';
export const EDIT_START='EDIT_START';
export const EDIT_FINISH='EDIT_FINISH'

export class AddHero implements Action {
    readonly type = ADD_HERO;
    constructor(public payload: Hero){
        payload = new Hero();
        console.log(payload)
    }
}

export class AddHeroes implements Action {
    readonly type = ADD_HEROES;
    constructor(public payload: Hero[]){}
}

export class UpdateHero implements Action {
    readonly type = UPDATE_HERO;
    
    constructor(public payload: { index: number; hero: Hero}){console.log("update action")}
}

export class EditHeroStart implements Action {
    readonly type = EDIT_START;
    constructor(public payload: number){ }
}

export class EditHeroFinish implements Action {
    readonly type = EDIT_FINISH;
}

export class DeleteHero implements Action {
    readonly type = DELETE_HERO;
    constructor(public payload: number){}
}


export type HeroActions = AddHero | 
                          AddHeroes | 
                          UpdateHero | 
                          DeleteHero | 
                          EditHeroStart | 
                          EditHeroFinish;