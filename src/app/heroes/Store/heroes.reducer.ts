import {Hero} from '../../Models/hero'

import * as HeroActions from '../Store/heroes.actions'

export interface AppState{
    heroList: State;
}

export interface State{
    Heroes: Hero[];
    editedHero: Hero;
    editedHeroIndex: number;
}

const initialState: State  = {
    Heroes: [
                new Hero('Maneesh','198','India',['strength','extreme focus'],1),
                new Hero('Xin','176','China',['speed','balance'],1),
                new Hero('Doug','187','United States',['stealth','alchemy'],1)
            ],
    editedHero: null,
    editedHeroIndex: -1,
}


export function heroesReducer(state: State = initialState, 
                              action: HeroActions.HeroActions) 
{

    switch (action.type) {

         /***************ADD NEW HERO ****************/
        case HeroActions.ADD_HERO:
             //state changes must be immutable, return a new object
            return {
                ...state,
                Heroes: [...state.Heroes, action.payload]
            }

        /***************ADD HEROES ****************/
        case HeroActions.ADD_HEROES:
            return {
                ...state, Heroes: [...state.Heroes, ...(action.payload as Hero[])]
            }

        /***************UPDATE ****************/
        case HeroActions.UPDATE_HERO:

            // copy existing hero
             const hero = state.editedHero;
            
            //create object with old and new hero
             const updatedHero = {
                ...hero,
                ...action.payload.hero
             }

            //copy old heroes array
             const updatedHeroes = [...state.Heroes];

            //make necessary change            
             updatedHeroes[state.editedHeroIndex] = updatedHero;

            //return updated state
             return {
                ...state, Heroes: updatedHeroes
             }

        /***************EDIT START ****************/
        case HeroActions.EDIT_START:
           const index = action.payload;
           const heroToEdit = {...state.Heroes[index]}
        //    console.log(state.editedHeroIndex)
            return { ...state, 
                    editedHeroIndex: index, 
                    editedHero: heroToEdit}
        
         /***************EDIT FINISH ****************/
        case HeroActions.EDIT_FINISH:
            return {
                ...state,
                editedHeroIndex: -1,
                editedHero: null
            }

         /***************DELETE ****************/
        case HeroActions.DELETE_HERO:
            return {
                ...state,
               Heroes: state.Heroes.filter((hero, index) => {
                return index !== action.payload;
               })
            }
         default :
            return state
                
    }
}