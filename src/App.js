import nullingStyles from './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './app/layouts/mainPage';
import ProductPage from './app/layouts/productPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/productPage" component={ProductPage} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
