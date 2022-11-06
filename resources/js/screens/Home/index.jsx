import React, { useEffect } from "react";
import "./style.scss";
import { OnSale, Featured } from "./components";
function Home(){
    useEffect(() => {
        document.title = "Bookworm - Home";
    }, []);
    return (
        <div className="home">
            <OnSale />
            <Featured />
        </div>
    );
}

export default Home;