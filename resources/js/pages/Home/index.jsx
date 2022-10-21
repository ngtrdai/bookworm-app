import { useEffect, useState } from 'react'
import { Button, Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import "./style.scss";
import OnSale from '../../components/Pages/Home/OnSale';
import Featured from '../../components/Pages/Home/Featured';
function Home(){
    const [topBooksRecommeded, setTopBooksRecommeded] = useState([]);
    const [topBooksPopular, setTopBooksPopular] = useState([]);
    
        

    // Load API
    return (
        <div className="home">
            <OnSale />
            <Featured />
        </div>
    );
}

export default Home;