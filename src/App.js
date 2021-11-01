import { Switch, Route } from "react-router-dom";

import { useModal } from "./Contexts/Modal";

import Header from "./Components/Header";
import Modal from "./Components/Modal";

import MovieList from "./Pages/MovieList";
import MovieDetail from "./Pages/MovieDetail";

const App = () => {
  const { modal, closeModal } = useModal();

  return(
    <div className="container">
      {modal ? <Modal data={modal} handleClick={closeModal} /> : null}
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <MovieList />
          </Route>
          <Route path="/movie-detail/:id">
            <MovieDetail />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
