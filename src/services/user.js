import request from "../utils/request"

export const getUserInfo = () => {
    return request(`/api/user/info`, { method: "GET" })
}

export const login = (data) => {
    return request("/auth/login", {
        method: "POST",
        data
    })
}