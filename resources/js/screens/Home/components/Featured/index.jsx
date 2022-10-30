import React from "react";
import { useState, useEffect } from 'react';
import { Container, Row } from "react-bootstrap";
import ListFeatured from "./ListFeatured";
import { bookApi } from "../../../../services";
import "./style.scss";
function Featured(){
    const [featured, setFeatured] = useState('recommended');
    const [popular, setPopular] = useState([]);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        const books = async () => {
            try {
                const response = await bookApi.getFeaturedBooks();
                setPopular(response.popular.data);
                setRecommended(response.recommended.data);
            } catch (error) {
                console.log('Failed to fetch book list: ', error);
            }
        }
        books();
    }, []);

    return (
        <React.Fragment>
            <Container className="bookworm__featured">
                <h1>Featured Books</h1>
                <div className="bookworm__featured__tabs py-2">
                    <button className={`${featured === 'recommended' ? 'bookworm__featured__tab--active' : ''}`} onClick={() => setFeatured('recommended')}>Recommended</button>
                    <button className={`${featured === 'popular' ? 'bookworm__featured__tab--active' : ''}`} onClick={() => setFeatured('popular')}>Popular</button>
                </div>
            </Container>
            <Container className="p-12 mt-2">
                <div className="carousel">
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {featured === 'recommended' ? <ListFeatured books={recommended} /> : <ListFeatured books={popular} />}
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default Featured;