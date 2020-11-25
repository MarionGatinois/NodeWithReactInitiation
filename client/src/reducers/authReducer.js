//choisir si connecté ou non
import { FETCH_USER } from '../actions/types';

//null , on ne sait pas si connecté ou non
export default function(state = null, action) {
  switch (action.type){
    case FETCH_USER :
      return action.payload || false; //null, empty string ou false
    default:
      return state;
  }
}
