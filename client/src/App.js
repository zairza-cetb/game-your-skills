import React, { createContext } from 'react';
import './App.css';

export const SessionContext = createContext({
  user: {},
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '',
    };
  };
  
  componentDidMount() {
    // Fetch user from local storage maybe
    if (!this.state.user) {
      console.log('No user');
    } else console.log('User added!');
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const payload = {
      username,
      password
    }
    // sends a request to the backend, changes state and 
    // possibly re-renders the page
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      return response.json();
    }).then(data => {
      console.log(data);
    });
  }

  render() {
    const { user } = this.state;
    if (user) {
      return (
        // render user place
        <SessionContext.Provider value={user}>
          <React.Fragment>
            App
          </React.Fragment>
        </SessionContext.Provider>
    )} else return (
        // Register component which will be 
        // on the page itself
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="username" onChange={(e) => this.setState({username: e.target.value}) }/><br/>
            <input type="password" name="password" onChange={(e) => this.setState({password: e.target.value}) }/><br/>
            <input type='submit' value='submit'/>
          </form>
        </div>
    );
  };
};

export default App;
