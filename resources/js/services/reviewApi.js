import axiosClient from "./axiosClient";

const reviewApi = {
    getReviewProduct: (params) => {
        const url = `api/shop/product/review`;
        return axiosClient.get(url, {params});
    },
    postReviewProduct: (params) => {
        const url = `api/shop/product/review`;
        return axiosClient.post(url, params);
    },
    getRating: (params) => {
        const url = `api/shop/product/review/rating`;
        return axiosClient.get(url, {params});
    }
};

export default reviewApi;

