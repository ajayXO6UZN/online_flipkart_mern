import React, { useEffect, useState, useRef } from "react";
import {  searchBar } from "../../actions/productAction";
import axios from "../../helpers/axios";
import './search.css'
import { useSelector,useDispatch } from "react-redux";

const Auto = () => {
  const dispatch = useDispatch();
  const promise = useSelector(state => state.getPageProduct);

  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  console.log(search)
 

  useEffect(() => {
  
    dispatch(searchBar(search));
}, [search]);

useEffect(() => {
  const pokemon = [];
  var name

 promise && promise.products.map((item,i)=>(
   name=item.name,
   pokemon.push({ name })
 ))

   setOptions(pokemon);
}, [promise]);
console.log(options)
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });
console.log(options)
  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = poke => {
    setSearch(poke);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          { options
            .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex(value.name)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.name}</span>
                
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

function Search() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
   
        <Auto />
      
    </div>
  );
}

export default Search;