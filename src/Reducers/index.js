import { combineReducers } from 'redux'
import { GET_LIST, CLEANING, MOVIE_LIST_LOADING } from "../Actions";

const initialState = {
  data: [],
  currentPage: 1,
  totalPage: 1,
  keyword: "",
  isLoading: false
}

const movieReducer = (state = initialState, {type, payload}) => {
  switch(type){
    case GET_LIST:
      if(payload) {
        return {
          ...state,
          ...payload,
          totalPage: parseInt(payload.totalPage, 10)
        }
      } else {
        return initialState
      }
    case MOVIE_LIST_LOADING: {
      return {
        ...state,
        isLoading: payload
      }
    }
    case CLEANING: {
      return initialState
    }
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  movies: movieReducer
})

export default rootReducer
