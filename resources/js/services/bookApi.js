import axiosClient from "./axiosClient";

const bookApi = {
    getBooks: () => {
        const url = "api/books";
        return axiosClient.get(url);
    },
    getBook: (id) => {
        const url = `api/books/${id}`;
        return axiosClient.get(url, { id });
    },
    getOnSaleBooks: () => {
        const url = "api/books/onsale";
        return axiosClient.get(url);
    },
    getPopularBooks: () => {
        const url = "api/books/featured/popular";
        return axiosClient.get(url);
    },
    getRecommendedBooks: () => {
        const url = "api/books/featured/recommended";
        return axiosClient.get(url);
    },
    getFeaturedBooks: () => {
        const url = "api/books/featured";
        return axiosClient.get(url);
    }
};

export default bookApi;

