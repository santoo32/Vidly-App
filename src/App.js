import React, { Component } from "react";
import Movies from "./components/movies";
import jwtDecode from "jwt-decode"; // import dependency
import "./App.css";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/navBar";
import NotFound from "./components/notFound";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/forms/logout";
import RegisterForm from "./components/forms/registerForm";
import NewMovieForm from "./components/forms/newMovieForm";
import ProtectedRoute from "./components/common/protectedRoute";
class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("loginToken");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <NavBar user={user}></NavBar>
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            {/* <Route path="/movies/new" component={NewMovieForm} /> */}
            <ProtectedRoute path="/movies/:id" component={NewMovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
