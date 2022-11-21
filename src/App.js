import nullingStyles from './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './app/layouts/mainPage';
import ProductPage from './app/layouts/productPage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/mainPage" component={MainPage} />
        <Route exact path="/productPage" component={ProductPage} />
        <Redirect to="/mainPage" />
      </Switch>
    </div>
  );
}

export default App;
