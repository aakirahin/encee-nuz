export default function SearchBar({
  searchTerm,
  setSearchTerm,
  filterQueries,
  setFilterQueries,
}) {
  const handleSearchTermInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setFilterQueries({ ...filterQueries, title: searchTerm });
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
