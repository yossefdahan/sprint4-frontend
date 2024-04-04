import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


export function SearchFilter() {
  const [search, setSearch] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the search form
    console.log(search);
  };

  return (
    <form className="search-filter" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          name="destination"
          placeholder="Search destinations"
          value={search.destination}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <input
          type="date"
          name="checkIn"
          placeholder="Add dates"
          value={search.checkIn}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <input
          type="date"
          name="checkOut"
          placeholder="Add dates"
          value={search.checkOut}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <input
          className='add-guests'
          type="number"
          name="guests"
          placeholder="Add guests"
          value={search.guests}
          onChange={handleChange}
          min="1"
        />
      </div>
      <button type="submit" className="search-btn">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
};
