import axiosClient from "./axiosClient";

const shopApi = {
    getListFiltering: () => {
        const url = "api/shop/filtering";
        return axiosClient.get(url);
    }
};

export default shopApi;

