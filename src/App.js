import nullStyle from './App.css';
import styles from './index.module.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './app/layouts/mainPage';
import ProductPage from './app/layouts/productPage';
import CardPage from './app/components/page/cardPage/cardPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgBack from './img/backdrop.png';
import Header from './app/components/common/header/header';
import Footer from './app/components/common/footer/footer';

function App() {
  return (
    <div className={styles.wrapperPage}>
      <img src={imgBack} alt="imgBack" className={styles.img}></img>
      <Header />
      <main className={styles.mainPage}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/productPage/:cardID?" component={ProductPage} />
          <Route exact path="/cardPage/:id?" component={CardPage} />
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
