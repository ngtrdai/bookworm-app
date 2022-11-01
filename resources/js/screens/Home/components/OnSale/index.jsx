import Carousel from 'react-multi-carousel';
import React, { useEffect, useState } from 'react'
import { Container, DropdownButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CardCustom } from "../../../../components";
import { bookApi } from '../../../../services';
import 'react-multi-carousel/lib/styles.css';
import "./style.scss";

function OnSale(){

    const [books, setBooks] = useState([]);
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

    useEffect(() => {
        const bookOnSale = async () => {
            try {
                const response = await bookApi.getOnSaleBooks();
                setBooks(response.data);
            } catch (error) {
                console.log('Failed to fetch book list: ', error);
            }
        }
        bookOnSale();
    }, []);

    return (
        <React.Fragment>
            <Container className="bookworm__onsale">
                <div className='bookworm__onsale__title'>
                    <h2>On Sale</h2>
                    <DropdownButton className='bookworm__onsale_button' drop='end' title='View All' onClick={() => {navigate('/shop')}}/>
                </div>
            </Container>
            <Container className="p-12 mt-2">
                <div className="carousel">
                    <Carousel responsive={responsive} className="carousel__books" infinite={true}>
                        { books.map((book, index) => {
                            return (<CardCustom book={book} key={index}/>)
                        })}
                    </Carousel>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default OnSale;