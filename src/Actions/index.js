import axios from "axios";

export const GET_LIST = "GET_LIST";
export const CLEANING = "CLEANING";
export const MOVIE_LIST_LOADING = "MOVIE_LIST_LOADING";

export const updateMovieDataStatus = (payload) => {
  return {
    type: MOVIE_LIST_LOADING,
    payload
  }
}

export const getList = (page, search) => async (dispatch, getState) => {
  const { data, currentPage, totalPage, keyword } = getState().movies;
  
  if(page === currentPage && search === keyword) {
    dispatch({
      type: GET_LIST,
      payload: {data, currentPage, totalPage, keyword}
    })
    return;
  }

  const response = await axios.get(process.env.REACT_APP_SERVER_URL, {
    params: {
      apikey: process.env.REACT_APP_API_KEY,
      s: search,
      page
    }
  });
  if(response.data.Response !== 'False') {
    const { Search, totalResults } = response.data;
    dispatch({
      type: GET_LIST,
      payload: {
        data: search !== keyword ? Search : [...data, ...Search],
        currentPage: search !== keyword ? 1 : page,
        totalPage: totalResults/10,
        keyword: search
      }
    })
  } else {
    dispatch({type: GET_LIST, payload: null})
  }
  dispatch(updateMovieDataStatus(false))
}

export const cleaning = (payload) => {
  return {
    type: CLEANING
  }
}
