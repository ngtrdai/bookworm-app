import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IMAGE from "../../../assets";
import "./style.scss";

function CardCustom({ book }) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/shop/${book.id}`);
  };
  return (  
    <Card className="card__custom" onClick={() => handleOnClick()}>
      <Card.Img variant="top" src={book.book_cover_photo ? IMAGE[book.book_cover_photo] :IMAGE['bookDefault']} className="card__custom__img"/>
      <Card.Body>
        <Card.Title className="card__custom__title">{book.book_title}</Card.Title>
        <Card.Text>{book.author_name}</Card.Text>
      </Card.Body>
      <Card.Footer className="card__custom__price">
            {
                book.final_price !== book.book_price ? (
                    <Card.Text className="card__price__discount">
                        <span className="card__price--original">${book.book_price}</span>
                        <span className="card__price--final">${book.final_price}</span>
                    </Card.Text>
                ) : (
                    <Card.Text className="card__price">
                        <span className="card__price--final">${book.final_price}</span>
                    </Card.Text>
                )
            }
      </Card.Footer>
    </Card>
  );
}

export default CardCustom;