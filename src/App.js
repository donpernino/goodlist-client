import React from "react";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/circular-progress.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AppProvider } from "./context/appContext";
import { AuthProvider } from "./context/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Home from "./components/Pages/Home/Home";
import MovieList from "./components/Pages/MovieList";
import SerieList from "./components/Pages/SerieList";
import BookList from "./components/Pages/BookList";
import PrivateRoute from "./components/PrivateRoute";

// apollo client setup
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_DB_GRAPHQL}`,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
        <AuthProvider>
          <AppProvider>
            <Router>
              <div className="flex flex-col lg:flex-row">
                <Header />
                <aside className="hidden lg:flex lg:flex-col lg:items-center lg:w-2/10">
                  <div className="lg:mt-6 lg:sticky lg:top-0 lg:mr-16 lg:ml-12">
                    <Logo topSpacing="lg:mt-10" />
                    <Nav />
                  </div>
                </aside>
                <main className="flex flex-col flex-1">
                  <div className="antialiased mt-6 lg:mt-16 mb-24 container mx-auto px-4 lg:pr-12">
                    <Switch>
                      <Route exact path="/login">
                        <Login />
                      </Route>
                      <Route exact path="/signup">
                        <Signup />
                      </Route>
                      <PrivateRoute exact path="/" component={Home} />
                      <PrivateRoute exact path="/movies" component={MovieList} />
                      <PrivateRoute exact path="/series" component={SerieList} />
                      <PrivateRoute exact path="/books" component={BookList} />
                    </Switch>
                  </div>
                </main>
                <Footer />
              </div>
            </Router>
          </AppProvider>
        </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
