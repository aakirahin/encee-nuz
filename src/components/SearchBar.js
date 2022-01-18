import { useNavigate } from "react-router";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  filterQueries,
  setFilterQueries,
}) {
  let navigate = useNavigate();
  const handleSearchTermInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setFilterQueries({ ...filterQueries, title: searchTerm });
    navigate("/");
  };

  return (
    <div id="search-bar">
      <form onSubmit={handleSearch}>
        <input
          id="search-term"
          type="text"
          value={searchTerm}
          onChange={handleSearchTermInput}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
