import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Dropdown, Nav } from "react-bootstrap";
import { CardDetail, ReviewForm } from "../../components";
import { reviewApi } from "../../../../services";
import { StringUtils } from "../../../../utils";
import "./style.scss";
function BookReview({ id }) {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [fromToPage, setFromToPage] = useState({ from: 0, to: 0});
    const [sortType, setSortType] = useState('newest');
    const [showType, setShowType] = useState('15');

    const [filterParams, setFilterParams] = useState({
        page: 1,
        limit: 5,
        book_id: id,
    });

    const sortTypes = {
        "newest": 'date: newest to oldest',
        "oldest": 'date: oldest to newest',
    };

    const showTypes = {
        "5": '5',
        "10": '10',
        "15": '15',
        "20": '20',
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await reviewApi.getReviewProduct({book_id: id});
                setReviews(response.data);
                setCurrentPage(response.current_page);
                setTotalPage(response.total);
                setFromToPage({
                    from: response.from,
                    to: response.to
                });
            }
            catch (error) {
                console.log("Failed to fetch book reviews: ", error);
            }
        };
        fetchReviews();
    }, [filterParams]);
    return (
        <React.Fragment>
            {reviews.length === 0 ? (
                <div className="bookworm__detail__loading">
                    <div className="bookworm__detail__loading__spinner"></div>
                </div>
            ) : (
                <React.Fragment>
                    <Row className='mb-3'>
                        <Col xs={12} md={8} lg={8} className="bookworm__detail__colitem">
                            <Card className="bookworm__reviews">
                                <Card.Body className="bookworm__reviews__body">
                                    <div className="bookworm__reviews__title">
                                        <h5>Customer Reviews</h5>
                                        <span>(Filter by 5 star)</span>
                                    </div>
                                    <Row className="bookworm__reviews__statistics">
                                        <Col xs={12} md={2} lg={1}>
                                            <h3>4.6</h3>
                                            <span className='bookworm__reviews__statistics__filtertext'>(21,233)</span>
                                        </Col>
                                        <Col xs={12} md={10} lg={11}>
                                            <h3>Star</h3>
                                            <div className='bookworm__reviews__statistics__filter'>
                                                <span className='bookworm__reviews__statistics__filtertext'>5 star (200)</span><span> | </span>
                                                <span className='bookworm__reviews__statistics__filtertext'>4 star (200)</span><span> | </span>
                                                <span className='bookworm__reviews__statistics__filtertext'>3 star (200)</span><span> | </span>
                                                <span className='bookworm__reviews__statistics__filtertext'>2 star (200)</span><span> | </span>
                                                <span className='bookworm__reviews__statistics__filtertext'>1 star (200)</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="bookworm__reviews__filterbar">
                                        <h6>Showing 6 - 10 of 126 books</h6>
                                        <div className="bookworm__reviews__filterbar__dropdown">
                                            <Dropdown className="bookworm__reviews__filterbar__dropdown__sorting">
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Sort by {sortTypes[sortType]}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setSortType('newest')}>Sort by {sortTypes['newest']}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSortType('oldest')}>Sort by {sortTypes['oldest']}</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Dropdown className="bookworm__reviews__filterbar__dropdown__showing">
                                                <Dropdown.Toggle variant="success" id="dropdown-basic-2">
                                                    Show {showType}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setShowType('5')}>Show {showTypes['5']}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setShowType('10')}>Show {showTypes['10']}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setShowType('15')}>Show {showTypes['15']}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setShowType('20')}>Show {showTypes['20']}</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    {reviews.map((review) => {
                                        return (
                                            <div>
                                                <h4>
                                                    {review.review_title} <span className="bookworm__reviews__rating">| {review.rating_start} starts</span>
                                                </h4>
                                                <p className="bookworm__reviews__content">{review.review_details}</p>
                                                <p className="bookworm__reviews__date">{StringUtils.convertDate(review.review_date)}</p>
                                                <hr />
                                            </div>
                                        );
                                    })}
                                    <Nav className='d-flex justify-content-center'>
                                        <ul className='bookworm__reviews__pagination'>
                                            <li className={`bookworm__reviews__pagination__item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <a className='bookworm__reviews__pagination__link' href='#' onClick={() => setFilterParams({ ...filterParams, page: currentPage - 1 })}>
                                                    Previous
                                                </a>
                                            </li>
                                            {
                                                [... Array(totalPage).keys()].map(x => x + 1).map((pageIndex, index) => {
                                                    if (currentPage === 1) {
                                                        if([1, 2, 3].includes(pageIndex)) {
                                                            return (
                                                                <li className={`bookworm__reviews__pagination__item ${currentPage === pageIndex ? 'active' : ''}`}>
                                                                    <a className='bookworm__reviews__pagination__link' href='#' onClick={() => setFilterParams({ ...filterParams, page: pageIndex })}>
                                                                        {pageIndex}
                                                                    </a>
                                                                </li>
                                                            );
                                                        }
                                                    } else if (currentPage === totalPage) {
                                                        if([totalPage - 2, totalPage - 1, totalPage].includes(pageIndex)) {
                                                            return (
                                                                <li className={`bookworm__reviews__pagination__item ${currentPage === pageIndex ? 'active' : ''}`}>
                                                                    <a className='bookworm__reviews__pagination__link' href='#' onClick={() => setFilterParams({ ...filterParams, page: pageIndex })}>
                                                                        {pageIndex}
                                                                    </a>
                                                                </li>
                                                            );
                                                        }
                                                    } else if ([currentPage - 1, currentPage, currentPage + 1].includes(pageIndex)) {
                                                        return (
                                                            <li className={`bookworm__reviews__pagination__item ${currentPage === pageIndex ? 'active' : ''}`}>
                                                                <a className='bookworm__reviews__pagination__link' href='#' onClick={() => setFilterParams({ ...filterParams, page: pageIndex })}>  
                                                                    {pageIndex}
                                                                </a>
                                                            </li>
                                                        );
                                                    }
                                                })
                                            }
                                        </ul>
                                    </Nav>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} lg={4} className="bookworm__detail__colitem">
                            <ReviewForm id={id}/>
                        </Col>
                    </Row>
                </React.Fragment>
            )}
        </React.Fragment>

    ); 
}

export default BookReview;