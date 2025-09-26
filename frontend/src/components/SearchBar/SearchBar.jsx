import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import { CiSearch } from 'react-icons/ci';

// Debounce utility to limit API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }
}

const SearchBar = ({ searchTerm, setSearchTerm, searchType, onSelect, replaceInputOnSelect = true }) => {
  const [results, setResults] = useState([]); // Store API results
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Control dropdown visibility
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item

  const fetchData = async (query) => {
    if (!query) {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = 'http://localhost:2000';
      const res = await fetch(`${apiUrl}/api/${searchType}/by-name?search=${encodeURIComponent(query)}`);
      const result = await res.json();
      setResults(result.data || []); // Access data => data.customers, products etc
      setIsDropdownOpen(true);
    } catch (error) {
      setError(error.message || `Failed to fetch ${searchType}`);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  const debouncedFetch = debounce(fetchData, 300);

  // Fetch when searchTerm changes, but only if no item is selected
  useEffect(() => {
    if (!selectedItem || replaceInputOnSelect) {
      debouncedFetch(searchTerm);
    }
  }, [searchTerm, selectedItem]);

  // Handle selecting an item from the dropdown
  const handleSelect = (result) => {
    if (replaceInputOnSelect) {
      setSelectedItem(result);
      setSearchTerm(result.name); // Update searchTerm
    } else {
      setSearchTerm(''); // clear result if not in replace mode
    }

    setResults([]); // Clear results
    setIsDropdownOpen(false); // Close dropdown
    onSelect(result); // Pass item to parent
  }

  // Handle clearing the selection
  const handleClear = () => {
    setSelectedItem(null); // Clear selection
    setSearchTerm(''); // Reset search term
    setResults([]); // Clear results
    setIsDropdownOpen(false); // Close dropdown
    onSelect(null); // Clear item in parent
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
      <div className="search-container">
        {
          replaceInputOnSelect && selectedItem ? (
            <div className="selected-item">
              {selectedItem.name}
              <span className="clear-icon" onClick={handleClear}>✕</span>
            </div>
          ) : (
            <>
              <CiSearch className="search-icon" />
              <input
                type="text"
                name="search"
                placeholder={`Search ${searchType}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => results.length > 0 && setIsDropdownOpen(true)}
              />
            </>
          )
        }
        {
          isDropdownOpen && (!selectedItem || !replaceInputOnSelect) && (
            <ul className="dropdown">
              { isLoading && <li style={{ padding: '10px' }}>Loading...</li> }
              { error && <li className="error">{error}</li> }
              {
                !isLoading && !error && results.length === 0 && searchTerm && (
                  <li style={{ padding: '10px' }}>No {searchType} found</li>
                )
              }
              {
                !isLoading &&
                  results.map((result) => (
                    <li
                      key={result._id} // Use _id from MongoDB
                      onClick={() => handleSelect(result)}
                      className="dropdown-item"
                    >
                      {result.name}
                    </li>
                  ))
                }
            </ul>
          )
        }
      </div>
  );
}

export default SearchBar;