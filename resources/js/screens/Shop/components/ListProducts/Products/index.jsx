import React, { useEffect, useState } from "react";
import { CardCustom } from "../../../../../components";
import { Row, Col } from "react-bootstrap";
import { shopApi} from "../../../../../services";
import ReactPaginate from "react-paginate";
import "./style.scss";

function Products({ params, setPage, paginate, setPaginate }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchBooks = async () => {
            try {
                const response = await shopApi.getListProducts(params);
                setBooks(response.data);
                setPaginate({
                    current_page: response.meta.current_page,
                    total_items: response.meta.total,
                    last_page: response.meta.last_page,
                    from: response.meta.from,
                    to: response.meta.to
                });
                setLoading(false);
            } catch (error) {
                // 
            }
        }
        fetchBooks();
    }, [params]);
    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        window.scrollTo(0, 0);
    }
    return (
        <React.Fragment>
            <Row>
                {
                    loading ? (
                        <div className="loading">
                            <div className="spinner-border text-dark" role="status"></div>
                        </div>
                    ) : null
                }
                {books.map((book, index) => (
                    <Col xs={12} md={3} key={index} className="d-flex justify-content-center">
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