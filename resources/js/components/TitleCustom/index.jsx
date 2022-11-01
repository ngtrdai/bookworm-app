import React from 'react';
import { Row } from "react-bootstrap";

function TitleCustom({ firstStr, number, lastStr }) {
    return (
        <Row className="bookworm__title">
            <h3>{firstStr} {number} {lastStr}</h3>
            <hr />
        </Row>
    );
}

export default TitleCustom;