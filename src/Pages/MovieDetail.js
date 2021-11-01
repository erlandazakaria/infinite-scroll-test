import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useModal } from "../Contexts/Modal";

const MovieDetail = () => {
  const { id } = useParams();
  const [ data, setData ] = useState(null);
  const { setModal } = useModal();

  const fetch = async () => {
    const response = await axios.get(process.env.REACT_APP_SERVER_URL, {
      params: {
        apikey: process.env.REACT_APP_API_KEY,
        i: id
      }
    });
    if(response.data.Response === "True") {
      setData(response.data)
    }
  }

  useEffect(() => {
    fetch()
  // eslint-disable-next-line
  }, [])

  return data ? (
    <div style={styles.container}>
      <h2>{data.Title}</h2>
      <img onClick={() => setModal(data.Poster)} alt={data.Title} src={data.Poster} width={100} height={150} style={{objectFit: "contain"}} />
      <h3>{data["Ratings"] && data["Ratings"][0] && data["Ratings"][0]["Value"]}</h3>
      {Object.keys(data).map((key, index) => {
        if(key !== "Title" && key !== "Ratings" && key !== "Plot" && key !== "Poster" ) {
          return <div key={key}>{key} : {data[key]}</div>
        }
        return null;
      })}
      <h4>{data["Plot"] && data["Plot"]}</h4>
    </div>
  ) : <div>Loading ...</div>;
}

export default MovieDetail;

const styles = {
  container: {textAlign: "center", maxWidth: 500}
}
