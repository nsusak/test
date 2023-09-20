import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };
  return (
    <div className="text-bg-secondary p-3 text-center">
      <div className="search-bar input-group mb-3 row">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="form-control mb-1"
            placeholder="Search movies..."
            value={term}
            onChange={handleChange}
          />
          <button className="btn btn-danger" type="submit ">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
