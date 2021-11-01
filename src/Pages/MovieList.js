import React, { useState, useEffect, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getList, updateMovieDataStatus, cleaning } from "../Actions";
import Card from "../Components/Card";

const MovieList = () => {
  const list = useSelector(state => state.movies); 
  const dispatch = useDispatch();

  const [ page, setPage ] = useState(1);
  const [ searchValue, setSearchValue ] = useState("");

  const loader = useRef();
  const observer = useRef();

  const handleSearch = () => {
    dispatch(updateMovieDataStatus(true))
    dispatch(getList(1, searchValue))
  }

  useEffect(() => {
    if(list.isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(
      (val) => {
        const target = val[0];
        if (target.isIntersecting && page < list.totalPage) {   
          setPage(prevPage => prevPage + 1)
        }
      }, 
      {root: null, rootMargin: "20px", threshold: 1.0}
    );
    observer.current.observe(loader.current)
  // eslint-disable-next-line
  }, [list.isLoading]);

  useEffect(() => {
    dispatch(updateMovieDataStatus(true))
    dispatch(getList(page, searchValue))
  // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    return () => dispatch(cleaning())
  // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div style={styles.wrapper}>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        <button onClick={handleSearch} style={{marginLeft: 5}}>Search</button>
      </div>
      {list.data.map(element => (<Card data={element} key={`element-${element.imdbID}`} />))}
      <div ref={loader} style={{marginBottom: 20}}>{page < list.totalPage && "Loading More"}</div>
    </div>
  );
}

export default MovieList;

const styles = {
  wrapper: {display: "flex", justifyContent: "center", marginBottom: 20}
}
