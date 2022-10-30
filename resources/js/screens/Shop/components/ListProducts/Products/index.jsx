import React, { useEffect } from "react";
import { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure } from '../../../../../reducers/books';
import { useSelector, useDispatch } from "react-redux"; 
import { CardCustom } from "../../../../../components";
import { Row, Col, Nav } from "react-bootstrap";
import { shopApi} from "../../../../../services";
import "./style.scss";

function Products(){
    const dispatch = useDispatch();
    const books = useSelector(state => state.booksReducer.books);
    const loading = useSelector(state => state.booksReducer.loading);
    const error = useSelector(state => state.booksReducer.error);
    const params = useSelector(state => state.filterBookReducer.params);
    useEffect(() => {
        dispatch(fetchBooksRequest());
        const fetchBooks = async () => {
            try {
                const response = await shopApi.getListProducts(params);
                dispatch(fetchBooksSuccess(response.data));
            } catch (error) {
                dispatch(fetchBooksFailure(error));
            }
        }
        fetchBooks();
    }, [params]);
    return (
        <React.Fragment>
            <Row>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {books.map((book, index) => (
                    <Col xs={12} md={3} key={index}>
                        <CardCustom book={book} />
                    </Col>
                ))}
            </Row>
            <Nav className="justify-content-center" aria-label="Page navigation example">
                <Nav.Item>
                    <Nav.Link href="#">1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#">2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#">3</Nav.Link>
                </Nav.Item>
            </Nav>
        </React.Fragment>
    );
}

export default Products;