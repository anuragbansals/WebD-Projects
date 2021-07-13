import { BrowserRouter, Router, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SimpleBottomNavigation from './components/MainNav';
import Trending from './components/Pages/Trending/Trending';
import Movies from './components/Pages/Movies/Movies';
import Series from './components/Pages/Series/Series';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="App">
        <Container>
          <Switch>
            <Router path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
