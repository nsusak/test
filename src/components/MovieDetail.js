import { useParams } from "react-router-dom";
import { fetchSingleMovie } from "../api";
function MovieDetail() {
  const { id } = useParams();
  console.log(id, "detail id");
  fetchSingleMovie(id);

  return (
    <div>
      <h2>Movie Detail</h2>
      {/* Display movie details */}
      {/* ... */}
    </div>
  );
}

export default MovieDetail;
