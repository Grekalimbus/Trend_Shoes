import React from 'react';
import Footer from './footer/footer';
import Header from './header/header';
import WrapperPageCss from './wrapperPage.module.css';
import imgBack from '../../../../img/backdrop.png';

const WrapperPage = ({ componentPage }) => {
  const component = componentPage().props.children;
  return (
    <div className={WrapperPageCss.wrapperPage}>
      <img
        src={imgBack}
        alt="imgBack"
        className={WrapperPageCss.imgBackClass}
      />
      <Header />

      <main className={WrapperPageCss.mainPage}>{component}</main>
      <Footer />
    </div>
  );
};

export default WrapperPage;
