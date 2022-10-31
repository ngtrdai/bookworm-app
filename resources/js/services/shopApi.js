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
    getDetailProduct: (params) => {
        const url = `api/shop/product`;
        return axiosClient.get(url, { params });
    },
    orderProducts: (data) => {
        const url = `api/shop/order`;
        return axiosClient.post(url, data);
    }

};

export default shopApi;

