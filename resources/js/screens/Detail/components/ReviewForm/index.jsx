import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "react-bootstrap";
import { reviewApi } from "../../../../services";
import { AlertCustom } from "../../../../components";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"; 
import "./style.scss";

function ReviewForm({ id }) {

    const schema = yup.object().shape({
        title: yup.string().required(),
        detail: yup.string().required(),
        rating: yup.number().required(),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [showAlert, setShowAlert] = useState(false);
    const onSubmit = (data) => {
        const review = {
            book_id: id,
            ...data
        };
        console.log(review);
        const submitReview = async () => {
            try {
                const response = await reviewApi.postReviewProduct(review);
                response.book_id == id && setShowAlert(true);
            } catch (error) {
                if(error.response.status === 422){
                    for (const key in error.response.data.errors) {
                        if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                            const element = error.response.data.errors[key];
                            alert(element[0])
                        }
                    }
                }
            }
        }
        submitReview();
    }

    return (
        <React.Fragment>
            {
                showAlert && <AlertCustom variant="success" message="Review successfully" timeShow={10000} reload={true}/>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="bookworm__review__form">
                    <Card.Header>
                        <h3>Write a review</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="form-group mb-3">
                            <label htmlFor="reviewTitle">Add a title</label>
                            <input id="reviewTitle" {...register('title')}  className="form-control"/>
                            <span className="text-danger">{errors.title?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="review">Detail please! Your review helps other shoppers.</label>
                            <textarea className="form-control" id="review" rows="3" {...register('detail')}></textarea>
                            <span className="text-danger">{errors.detail?.message}</span>
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
                    <Card.Footer className="px-5 py-3 bookworm__detail__card__body__addtocart mt-0">
                        <button type="submit" >Submit Review</button>
                    </Card.Footer>
                </Card>
            </form>
        </React.Fragment>
    );
}

export default ReviewForm;