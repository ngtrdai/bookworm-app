import React, { useEffect, useState } from "react";
import { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure } from '../../../../../reducers/books';
import { setPagination, setPage } from '../../../../../reducers/filterBook';
import { useSelector, useDispatch } from "react-redux"; 
import { CardCustom } from "../../../../../components";
import { Row, Col, Nav } from "react-bootstrap";
import { shopApi} from "../../../../../services";
import ReactPaginate from "react-paginate";
import "./style.scss";

function Products(){
    const dispatch = useDispatch();
    const books = useSelector(state => state.booksReducer.books);
    const loading = useSelector(state => state.booksReducer.loading);
    const error = useSelector(state => state.booksReducer.error);
    const params = useSelector(state => state.filterBookReducer.params);
    const paginate = useSelector(state => state.filterBookReducer.pagination);
    useEffect(() => {
        dispatch(fetchBooksRequest());
        const fetchBooks = async () => {
            try {
                const response = await shopApi.getListProducts(params);
                dispatch(fetchBooksSuccess(response.data));
                dispatch(setPagination({
                    current_page: response.meta.current_page,
                    total_items: response.meta.total,
                    last_page: response.meta.last_page,
                    from: response.meta.from,
                    to: response.meta.to
                }));
            } catch (error) {
                dispatch(fetchBooksFailure(error));
            }
        }
        fetchBooks();
    }, [params]);
    const handlePageClick = (data) => {
        dispatch(setPage(data.selected + 1));
    }

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
            <div className='shop__listproduct__pagination'>
                <ReactPaginate 
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageRangeDisplayed={3}
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    pageCount={paginate.last_page}
                    onPageChange={(e) => handlePageClick(e)}
                    forcePage={paginate.current_page - 1}
                />
            </div>
        </React.Fragment>
    );
}

export default Products;