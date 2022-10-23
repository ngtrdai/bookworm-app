import "./style.scss";
import OnSale from '../../components/Pages/Home/OnSale';
import Featured from '../../components/Pages/Home/Featured';
function Home(){
    console.log('rendering Home');
    return (
        <div className="home">
            <OnSale />
            <Featured />
        </div>
    );
}

export default Home;