import React, { Component } from "react";

import continents from "./data/continents.json";

import Header from "./components/header";
import SearchBox from "./components/searchBox";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      continents: continents,
      inputContinent: "",
      selectedContinent: "",
      filteredContinents: continents.map(el => el.continent),
      inputCountry: "",
      selectedCountries: [],
      showCountry: false,
      showFlag: false,
      // selectedFlag: [],
      clickContinent: false,
      clickCountry: false
    };
  }

  onContinentChange = e => {
    const value = e.target.value;
    // const { filteredContinents } = this.state;
    // console.log(typeof value)
    this.setState({
      inputContinent: value
      // selectedContinent: value,
      // filteredContinents: filteredContinents.filter(c => c.startsWith(value))
    });
  };

  onContinentClick = e => {
    e.preventDefault();
    this.setState({
      showCountry: true,
      clickContinent: false,
      selectedContinent: e.target.innerText,
      inputContinent: "",
      selectedCountries: this.state.continents
        .filter(c => c.continent === e.target.innerText)[0]
        .countries.map(c => Object.assign({}, c, { checked: false }))
    });
  };

  onCountryClick = e => {
    // e.preventDefault();
    e.stopPropagation();
    const { selectedCountries } = this.state;
    const value = e.target.value;
    // let flag = selectedCountries.filter(c => c.name === value)[0].flag;
    // // console.log(flag);
    // this.setState({
    //   inputCountry: value,
    //   showFlag: true,
    //   selectedFlag: !selectedFlag.includes(flag) ? [...selectedFlag, flag] : selectedFlag
    // });
    // let cur = selectedCountries.map(c => Object.assign({},c,{checked: e.target.checked}));
    // this.setState({
    //   selectedCountries:  selectedCountries.map(c => Object.assign({},c,{checked: e.target.checked}))
    // })
    let index = selectedCountries.map(c => c.name).indexOf(value);
    // flags = selectedCountries.map(c=>{return {flag: c.flag, checked: false}});
    this.setState({
      showFlag: true,
      selectedCountries: [
        ...selectedCountries.slice(0, index),
        {
          ...selectedCountries[index],
          checked: !selectedCountries[index].checked
        },
        ...selectedCountries.slice(index + 1)
      ]
    });
  };

  onCountryInputChange = e => {
    const value = e.target.value;
    this.setState({
      inputCountry: value
    });
    console.log(value)
  };

  clearFlags = () => {
    this.setState({
      showFlag: false,
      // selectedFlag: [],
      inputCountry: "",
      clickCountry: false,
      selectedContinent: "",
      selectedCountries: []
    });
  };

  render() {
    const {
      selectedContinent,
      filteredContinents,
      showCountry,
      selectedCountries,
      inputContinent,
      showFlag,
      inputCountry,
      // selectedFlag,
      clickContinent,
      clickCountry
    } = this.state;

    console.log(selectedCountries.filter(c => c.checked));
    return (
      <div className="App">
        <Header />
        <div className="container">
        {/* Step 1 */}
          <div className="box">
            <SearchBox
              title="Step 1"
              message="Select a continent."
              value={inputContinent}
              onChange={this.onContinentChange}
              info="You selected"
              continent={selectedContinent}
              // onClick={() => this.setState({ clickContinent: true })}
              // selectedCountries.filter(c => c.checked)
              onClick={() => selectedCountries.filter(c => c.checked).length===0 && this.setState({ clickContinent: true })}
            >
              <ul>
                {filteredContinents
                  .filter(c =>
                    c.toLowerCase().startsWith(inputContinent.toLowerCase())
                  )
                  .map((c, index) => (
                    <li
                      hidden={!clickContinent ? true : false}
                      key={index}
                      onClick={this.onContinentClick}
                    >
                      {c}
                    </li>
                  ))}
              </ul>
            </SearchBox>
          </div>

          {/* step 2 */}
          <div
            className="box"
            onClick={() => this.setState({ clickCountry: false })}
          >
            {showCountry && (
              <SearchBox
                title="Step 2"
                message="Now, select a country."
                value={inputCountry}
                onChange={this.onCountryInputChange}
                onClick={e => {
                  e.stopPropagation();
                  this.setState({ clickCountry: true });
                }}
              >
                <div className="check-list">
                  {selectedContinent &&
                    selectedCountries
                      .filter(c =>
                        c.name
                          .toLowerCase()
                          .startsWith(inputCountry.toLowerCase())
                      )
                      .map((c, index) => (
                        <div
                          key={index}
                          className="drop-drown"
                          hidden={!clickCountry ? true : false}
                        >
                          <input
                            type="checkbox"
                            name="countries"
                            value={c.name}
                            onClick={this.onCountryClick}
                          />
                          {c.name}
                        </div>
                      ))}
                </div>
              </SearchBox>
            )}
          </div>

          <div className="box">
            {showFlag && (
              <div className="flags-box">
                <h1>Select flags</h1>
                <div className="flags">
                  {selectedCountries.map((f, index) => (
                    <div className="flag" key={index}>
                      {f.checked && f.flag}
                    </div>
                  ))}
                </div>
                <button onClick={this.clearFlags}>clear flags</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
