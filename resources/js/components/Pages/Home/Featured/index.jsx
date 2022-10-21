import React from "react";
import { useState, useEffect } from 'react';
import { Container, Row } from "react-bootstrap";
import Popular from "./Popular";
import Recommended from "./Recommended";
import "./style.scss";
function Featured(){
    const [featured, setFeatured] = useState('recommended');

    return (
        <>
            <Container className="bookworm__featured">
                <h1>Featured Books</h1>
                <div className="bookworm__featured__tabs">
                    <h2 className={`${featured === 'recommended' ? 'bookworm__featured__tab--active' : ''}`} onClick={() => setFeatured('recommended')}>Recommended</h2>
                    <h2 className={`${featured === 'popular' ? 'bookworm__featured__tab--active' : ''}`} onClick={() => setFeatured('popular')}>Popular</h2>
                </div>
            </Container>
            <Container className="p-12 mt-2">
                <div className="carousel">
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {featured === 'recommended' ? <Recommended /> : <Popular />}
                    </Row>
                </div>
            </Container>
        </>
    );
}

export default Featured;