import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "react-bootstrap";
import { reviewApi } from "../../../../services";
import "./style.scss";

function ReviewForm({ id }) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        const review = {
            book_id: id,
            ...data
        };
        console.log(review);
        const submitReview = async () => {
            try {
                const response = await reviewApi.postReviewProduct(review);
                console.log(response);
            } catch (error) {
                console.log("Failed to create review: ", error);
            }
        }
        submitReview();
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="bookworm__review__form">
                    <Card.Header>
                        <h3>Write a review</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="form-group mb-3">
                            <label htmlFor="reviewTitle">Add a title</label>
                            <input id="reviewTitle" {...register('title')}  className="form-control"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="review">Detail please! Your review helps other shoppers.</label>
                            <textarea className="form-control" id="review" rows="3" {...register('detail')}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Select a rating star</label>
                            <select className="form-control" id="rating" {...register('rating')}>
                                <option value="1">1 Star</option>
                                <option value="2">2 Star</option>
                                <option value="3">3 Star</option>
                                <option value="4">4 Star</option>
                                <option value="5">5 Star</option>
                            </select>
                        </div>
                    </Card.Body>
                    <Card.Footer className="px-5">
                        <button type="submit" className="btn btn-primary w-100">Submit Review</button>
                    </Card.Footer>
                </Card>
            </form>
        </React.Fragment>
    );
}

export default ReviewForm;