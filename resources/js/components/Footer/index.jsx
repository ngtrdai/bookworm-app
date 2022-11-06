import React from "react";
import "./style.scss"
import IMAGE from "../../../assets";
function Footer(){
    return (
        <footer className="bookworm__footer">
            <img src={IMAGE['logo']} alt="" />
            <div className="bookworm__footer__text">
                <h1>Bookworm</h1>
                <h5>Address: Etown 1, Level 3, 364 Cong Hoa Street</h5>
                <h5>Phone: (+84).979.808.617</h5>
            </div>
        </footer>
    );
}

export default Footer;