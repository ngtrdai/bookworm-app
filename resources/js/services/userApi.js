import axiosClient from "./axiosClient";

const userApi = {
    signin: (params) => {
        const url = "api/auth/signin";
        return axiosClient.post(url, params);
    },
    signout: () => {
        const url = "api/auth/signout";
        return axiosClient.post(url, {});
    }
};

export default userApi;