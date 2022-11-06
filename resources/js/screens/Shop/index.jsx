import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FilterBar, ListProducts, TitleShop } from './components';
import "./style.scss";

function Shop(){
    const [category, setCategory] = useState({id: null, name: null});
    const [author, setAuthor] = useState({id: null, name: null});
    const [rating, setRating] = useState(null);
    const [sortBy, setSortBy] = useState("sale");
    const [noItems, setNoItems] = useState(15);
    const [page, setPage] = useState(1);

    useEffect(() => {
        document.title = "Bookworm - Shop";
    }, []);

    const [paginate, setPaginate] = useState({
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 1,
        total_items: 1
    });

    const [params, setParams] = useState({
        category: category.id,
        author: author.id,
        rating: rating,
        sort_by: sortBy,
        no_items: noItems,
        page: page
    });

    useEffect(() => {
        setParams({
            ...params,
            category: category.id,
            category_name: category.name,
            page: 1
        })
    }, [category]);

    useEffect(() => {
        setParams({
            ...params,
            author: author.id,
            author_name: author.name,
            page: 1
        })
    }, [author]);

    useEffect(() => {
        setParams({
            ...params,
            rating: rating,
            page: 1
        })
    }, [rating]);

    useEffect(() => {
        setParams({
            ...params,
            sort_by: sortBy,
            page: 1
        })
    }, [sortBy]);

    useEffect(() => {
        setParams({
            ...params,
            no_items: noItems,
            page: 1
        })
    }, [noItems]);

    useEffect(() => {
        setParams({
            ...params,
            page: page
        })
    }, [page]);

    return (
        <Container className='bookworm__shop'>
            <TitleShop params={params}/>
            <Row>
                <Col xs={12} md={12} lg={3}>
                    <FilterBar params={params}
                               setCategory={setCategory}
                               setAuthor={setAuthor}
                               setRating={setRating}/>
                </Col>
                <Col xs={12} md={12} lg={9}>
                    <ListProducts params={params} 
                                  setPage={setPage} 
                                  setSortBy={setSortBy}
                                  setNoItems={setNoItems}
                                  paginate={paginate} setPaginate={setPaginate}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Shop;