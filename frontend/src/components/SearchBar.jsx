import { useEffect, useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  onSelect,
  searchType,
  selectedItem,
  onClear,
}) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!value || selectedItem) return setResults([]);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:2000/api/${searchType}/user/by-name?search=${value}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json();
      setResults(data.data || []);
    };

    fetchData();
  }, [value, searchType, selectedItem]);

  return (
    <div className="searchbar-container">
      {selectedItem ? (
        <div className="searchbar-selected">
          <span>{selectedItem.name}</span>
          <button className="searchbar-clear" onClick={onClear}>
            ×
          </button>
        </div>
      ) : (
        <>
          <input
            className="searchbar-input"
            type="text"
            placeholder={`Search ${searchType}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />

          {results.length > 0 && (
            <ul className="searchbar-dropdown">
              {results.map((item) => (
                <li
                  key={item._id}
                  className="searchbar-item"
                  onClick={() => {
                    onSelect(item);
                    setResults([]);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBar;
