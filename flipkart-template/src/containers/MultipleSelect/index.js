import React, { useState } from 'react';
import Select from 'react-select';
import './style.css';

function App() {
  const data = [
    {
      value: 1,
      label: "cerulean"
    },
    {
      value: 2,
      label: "fuchsia rose"
    },
    {
      value: 3,
      label: "true red"
    },
    {
      value: 4,
      label: "aqua sky"
    },
    {
      value: 5,
      label: "tigerlily"
    },
    {
      value: 6,
      label: "blue turquoise"
    }
  ];

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  return (
    <div className="App">
      <h3>Get selected by only value for multi select - <a href="https://www.cluemediator.com" target="_blank">Clue Mediator</a></h3>

      <Select
        className="dropdown"
        placeholder="Select Option"
        value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function
        isMulti
        isClearable
      />

      {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div><b>Selected Value: </b> {JSON.stringify(selectedValue)}</div>
      </div>}
    </div>
  );
}

export default App;
































// import React, { useState } from "react";

// const MultipleSelect = function(props) {
//     const [selectedFlavors, setSelectedFlavors] = useState([]);

//     const handleSelect = function(selectedItems) {
//         const flavors = [];
//         for (let i=0; i<selectedItems.length; i++) {
//             flavors.push(selectedItems[i].value);
//         }
//         setSelectedFlavors(flavors);
//     }
//     const options = [
//         { value: 'chocolate', label: 'Chocolate' },
//         { value: 'strawberry', label: 'Strawberry' },
//         { value: 'vanilla', label: 'Vanilla' }
//       ]

//     return (
//         <>
//         <form>
//             <select multiple={true} value={selectedFlavors} options={options} onChange={(e)=> {handleSelect(e.target.selectedOptions)}}>
//                 <option value="grapefruit">Grapefruit</option>
//                 <option value="lime">Lime</option>
//                 <option value="coconut">Coconut</option>
//                 <option value="mango">Mango</option>
//             </select>
//         </form>
//         {selectedFlavors}
//         </>
//     );
// };

// export default MultipleSelect;