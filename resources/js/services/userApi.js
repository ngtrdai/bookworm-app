import axiosClient from "./axiosClient";

const userApi = {
    signIn: (params) => {
        const url = "api/auth/signin";
        return axiosClient.post(url, params);
    },
    signOut: () => {
        const url = "api/auth/signout";
        return axiosClient.post(url, {});
    }
};

export default userApi;