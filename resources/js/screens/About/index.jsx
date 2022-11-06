import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.scss";
function About() {
    useEffect(() => {
        document.title = "Bookworm - About";
    }, []);
    return (
        <Container className="bookworm__about">
            <div>
                <h3>About Us</h3>
                <hr />
            </div>
            <Row className="bookworm__about__welcome">
                <h3>Welcome to Bookworm</h3>
                <p>"Bookworm is an independent New York bookstore and language school with locations in Manhattan and Brooklyn. We specialize in travel books and language classes."</p>
            </Row>
            <Row className="bookworm__about__storyandvision">
                <Col xs={12} sm={12} md={6} lg={6} className="bookworm__about__story">
                    <h3>Our Story</h3>
                    <p>The name Bookworm was taken from the original name for New York International Airport, which was renamed JFK in December 1963.</p>
                    <p>Our Manhattan store has just moved to the West Village. Our new location is 170 7th Avenue South, at the corner of Perry Street.</p>
                    <p>From March 2008 through May 2016, the store was located in the Flatiron District.</p>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} className="bookworm__about__vision">
                    <h3>Our Vision</h3>
                    <p>One of the last travel bookstores in the country, our Manhattan store carries a range of guidebooks (all 10% off) to suit the needs and tastes of every traveller and budget.</p>
                    <p>We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook, and our well-read, well-travelled staff is happy to make reading recommendations for any traveller, book lover, or gift giver.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default About;