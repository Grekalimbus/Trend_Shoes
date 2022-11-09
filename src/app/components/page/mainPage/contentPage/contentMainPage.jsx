import React from 'react';
import styles from './mainPage.module.css';
const ContentMainPage = () => {
  return (
    <div className={styles.wrapp}>
      <div className={styles.contentWrapp}>
        <h3 className={styles.h3}>
          Чтобы посмотреть все товары, перейдите в магазин по кнопке ниже
        </h3>
        <div className={styles.button}>
          <p className={styles.p}>Перейти в магазин</p>
        </div>

        <div className={styles.flex}>
          <div className={styles.flexElem}>
            <div className={styles.flexImg}>
              <img
                className={styles.img}
                src="https://i.postimg.cc/c12JBVMg/1-gu-RFa4-L27-transformed.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.flexElem}>
            <div className={styles.flexImg}>
              <img
                className={styles.img}
                src="https://i.postimg.cc/4y2sL203/1-Photo-Room.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.flexElem}>
            <div className={styles.flexImg}>
              <img
                className={styles.img}
                src="https://i.postimg.cc/rmTfyVpw/Photo-Room.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.flexElem}>
            <div className={styles.flexImg}>
              <img
                className={styles.img}
                src="https://i.postimg.cc/HLHWLhfr/1-Photo-Room-4.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentMainPage;
