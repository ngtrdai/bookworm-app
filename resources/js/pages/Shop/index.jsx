import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FilterBar, ListProducts } from '../../components/Pages/Shop';
import "./style.scss";

function Shop(){
    return (
        <Container className='shop'>
            <Row>
                <Col xs={12} md={3}>
                    <FilterBar />
                </Col>
                <Col xs={12} md={9}>
                    <ListProducts />
                </Col>
            </Row>
        </Container>
    );
}

export default Shop;