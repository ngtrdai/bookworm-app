import axiosClient from "./axiosClient";

const bookApi = {
    getBooks: () => {
        const url = "/books";
        return axiosClient.get(url);
    },
    getBook: (id) => {
        const url = `/books/${id}`;
        return axiosClient.get(url, { id });
    },
    getOnSaleBooks: () => {
        const url = "/books/onsale";
        return axiosClient.get(url);
    },
    getPopularBooks: () => {
        const url = "/books/featured/popular";
        return axiosClient.get(url);
    },
    getRecommendedBooks: () => {
        const url = "/books/featured/recommended";
        return axiosClient.get(url);
    }
};

export default bookApi;

