import axiosClient from "./axiosClient";

const shopApi = {
    getListFiltering: () => {
        const url = "api/shop/filtering";
        return axiosClient.get(url);
    },
    getListProducts: (params) => {
        const url = "api/shop";
        return axiosClient.get(url, { params });
    },
    getDetailProduct: (id) => {
        const url = `api/shop/product/${id}`;
        return axiosClient.get(url);
    }
};

export default shopApi;

