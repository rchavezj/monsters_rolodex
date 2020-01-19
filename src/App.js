import './App.css';
import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    // this.setState controlls everything
    // inside this.state for dynamic changes in the UI
    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      this.setState({ monsters: users });
    } catch (error) {
      console.log(error);
    }
  }

  // (1)  event get's return from
  //      the searchbar input callback.
  // (2)  event is one of the 'optional'
  //      properties inside input jsx
  //      tag onChange.
  // (3)  another way to call our jsx tag
  //      handleChange is {this.handleChange}
  //      instead of {event => this.handleChange(event)}
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;