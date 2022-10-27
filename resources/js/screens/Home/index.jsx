import "./style.scss";
import { OnSale, Featured } from "./components";
function Home(){
    return (
        <div className="home">
            <OnSale />
            <Featured />
        </div>
    );
}

export default Home;