import { useEffect, useState } from 'react'
import { Button, Container, Col, Row } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';
import CardCustom from "../../components/CardCustom/CardCustom";
import 'react-multi-carousel/lib/styles.css';
import "./style.scss";
function Home(){
    const [topBooksOnSale, setTopBooksOnSale] = useState([]);
    const [topBooksRecommeded, setTopBooksRecommeded] = useState([]);
    const [topBooksPopular, setTopBooksPopular] = useState([]);
    const [featured, setFeatured] = useState('recommended');
    const navigate = useNavigate();


    const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 3000, min: 1224 },
			items: 4
		},
		tablet: {
			breakpoint: { max: 1224, min: 990 },
			items: 3
		},
		mobile: {
			breakpoint: { max: 990, min: 767 },
			items: 2
		},
		smallmobile: {
			breakpoint: { max: 767, min: 0 },
			items: 1
		}
	};
    const books = [
        {
            id: 1,
            book_title: "The Book of Lost Things",
            author_name: "John Connolly",
            book_price: 20,
            final_price: 15,
            book_image: "book1",
        },
        {
            id: 2,
            book_title: "The Book of Lost Things",
            author_name: "John Connolly",
            book_price: 20,
            final_price: 15,
            book_image: "book2",
        },{
            id: 1,
            book_title: "The Book of Lost Things",
            author_name: "John Connolly",
            book_price: 20,
            final_price: 15,
            book_image: "book1",
        },
        {
            id: 2,
            book_title: "The Book of Lost Things",
            author_name: "John Connolly",
            book_price: 20,
            final_price: 15,
            book_image: "book2",
        }
    ]
        

    // Load API
    return (
        <div className="home">
            <Container className="onsale">
                <div className='onsale__title'>
                    <h2>On Sale</h2>
                    <span><Button>View All</Button></span>
                </div>
            </Container>
            <Container className="p-12 mt-2">
                <div className="carousel">
                    <Carousel responsive={responsive} className="carousel__books">
                        { books.map((book, index) => {
                            return (<CardCustom book={book} key={index}/>)
                        })}
                    </Carousel>
                </div>
            </Container>
        </div>
    );
}

export default Home;