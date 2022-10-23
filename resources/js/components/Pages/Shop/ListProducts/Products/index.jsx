import { useEffect } from "react";
import { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure } from '../../../../../reducers/books';
import { useSelector, useDispatch } from "react-redux"; 
import CardCustom from "../../../../CardCustom/CardCustom";
import { Row, Col, Nav } from "react-bootstrap";
import shopApi from "../../../../../api/shopApi";
import "./style.scss";

function Products(){
    const dispatch = useDispatch();
    const books = useSelector(state => state.booksReducer.books);
    const loading = useSelector(state => state.booksReducer.loading);
    const error = useSelector(state => state.booksReducer.error);
    const params = {
        category: '1',
        sort_by: 'sale',
    }
    useEffect(() => {
        dispatch(fetchBooksRequest());
        const fetchBooks = async () => {
            try {
                const response = await shopApi.getListProducts(params);
                console.log(response);
                dispatch(fetchBooksSuccess(response.data));
            } catch (error) {
                dispatch(fetchBooksFailure(error));
            }
        }
        fetchBooks();
    }, [dispatch]);

    return (
        <>
            <Row>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {books.map((book, index) => (
                    // Devide the row into 4 columns and if the index is divisible by 4, then create a new row
                    <Col xs={12} md={3} key={index}>
                        <CardCustom book={book} />
                    </Col>
                ))}
            </Row>
            {/* Navigate */}
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
        </>
    );
}

export default Products;