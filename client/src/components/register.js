import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {REGISTER_USER} from "../graphQL/mutations";
// import { Module } from "module";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  handleUpdate(field){
    return e => {
      this.setState({[field]: e.target.value})
    }
  }

  handleSubmit(e, registerUser){
    e.preventDefault
    registerUser({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    })
  }

  updateCache(cache, { data }) {
    console.log(data);
    // here we can write directly to our cache with our returned mutation data
    cache.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          console.log(data)
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push('/');
        }}

        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(registerUser) => (
          <form onSubmit={e => this.handleSubmit(e, registerUser)}>
            <label>
              Name
            <input type="text" value={this.state.name} onChange={this.handleUpdate("name")}/>
            </label>

            <label>
              Email
            <input type="email" value={this.state.email} onChange={this.handleUpdate("email")} />
            </label>

            <label>
              Password
            <input type="password" value={this.state.password} onChange={this.handleUpdate("password")} />
            </label>
            <button>Submit</button>
          </form>

        )}
      </Mutation>
    );
  }

}

export default Register;