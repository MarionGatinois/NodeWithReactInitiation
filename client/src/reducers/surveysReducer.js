//importer tous les surveys
import { FETCH_SURVEYS } from '../actions/types';

//[] si erreur  , on retourne vide
export default function(state = [], action) {
  switch (action.type){
    case FETCH_SURVEYS :
      return action.payload;
    default:
      return state;
  }
}

//89
