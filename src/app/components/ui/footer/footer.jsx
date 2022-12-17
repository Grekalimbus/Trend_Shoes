import React from "react";
import stylesFooter from "./footer.module.css";
import imgLogo2 from "../../../../img/logoFooter.svg";
import logoInst from "../../../../img/inst.svg";
const Footer = () => {
    return (
        <footer className={stylesFooter.footer}>
            <div className={stylesFooter.flex}>
                <img
                    src={logoInst}
                    className={stylesFooter.img}
                    alt="imgLogoInst"
                />
                <p>@danilimbus</p>
            </div>
            <div>
                <img
                    src={imgLogo2}
                    className={stylesFooter.imgLogo}
                    alt="imgLogo2"
                />
            </div>
            <p>+008312452</p>
        </footer>
    );
};

export default Footer;
