import { useHistory } from "react-router-dom";

import { useModal } from "../Contexts/Modal";

const Card = ({data}) => {
  const history = useHistory();
  const { setModal } = useModal();

  return (
    <div key={data.imdbID} style={styles.container}>
      <div>
        <img onClick={() => setModal(data.Poster)} alt={data.Title} src={data.Poster} width={100} height={150} style={{objectFit: "contain"}} />
      </div>
      <div style={styles.wrapper}>
        <div>
          <div>{data.Title}</div>
          <div>{`Year: ${data.Year}`}</div>
          <div>{`Type: ${data.Type}`}</div>
        </div>
        <div style={{alignSelf: "flex-end"}} onClick={() => history.push(`/infinite-scroll-test/movie-detail/${data.imdbID}`)}>Detail</div>
      </div>
    </div>
  );
}

export default Card;

const styles = {
  container: {display: "flex", flexDirection: "row", width: 500, height: 150, marginBottom: 5, border: "1px solid grey", borderRadius: 5},
  wrapper: {display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box", width: "100%", height: 150, padding: 10}
}
