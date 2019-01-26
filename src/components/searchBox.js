import React from "react";

const SearchBox = ({ value, onChange,onClick, title, message, children, info, continent  }) => (
  <div className="search-box">
    {/* <label>{label} </label> */}
    <h1>{title}</h1>
    <p>{message}</p>
    <input className="input-box"
      type="text" list="data" onChange={onChange} value={value} onClick={onClick}/>
    {children}
    {continent && (
      <div>
        <p>{info}</p>
        <h1>{continent}</h1>
      </div>
    )}
  </div>
);

export default SearchBox;
