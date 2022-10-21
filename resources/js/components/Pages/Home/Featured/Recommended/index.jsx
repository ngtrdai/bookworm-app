import {useState, useEffect} from "react";
import { Col } from "react-bootstrap";
import CardCustom from "../../../../CardCustom/CardCustom";
import "./style.scss";
import bookApi from "../../../../../api/bookApi";

function Recommended(){
    const [books, setBooks] = useState([]);
    // Load API
    useEffect(() => {
        const bookOnSale = async () => {
            try {
                const response = await bookApi.getRecommendedBooks();
                setBooks(response.data);
            } catch (error) {
                console.log('Failed to fetch book list: ', error);
            }
        }
        bookOnSale();
    }, []);
    return (
        books.map((book) => {
            return (
                // Chia làm 4 cột
                <Col key={book.id} xs={12} sm={6} md={3} lg={3} className="bookworm__featured__colitem">
                    <CardCustom book={book} />
                </Col>
            );
        })
    );
}

export default Recommended;