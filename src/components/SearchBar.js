import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    onSubmit(term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };
  return (
    <div className="text-bg-secondary p-3 text-center">
      <div class="input-group input-group-lg mb-3 container">
        <input
          type="text"
          class="form-control"
          placeholder="Enter a movie name"
          aria-label="Enter a movie name"
          value={term}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch(event);
            }
          }}
        />
        <button class="btn btn-danger" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
