import request from "@/utils/request"

export const createOrder = async (data) => {
    return request(`/order`, { method: "POST", data })
}

export const statistics = async (conditions) => {
    return request(`/order/statistics`, { method: "GET", params: conditions })
}

export const queryOrder = async (conditions) => {
    return request(`/order`, { method: "GET", params: conditions })
}

export const queryOrderById = async (id) => {
    return request(`/order/${id}`, { method: "GET" })
}

export const updateOrder = async (data) => {
    return request(`/order`, { method: "PATCH", data })
}

export const deleteOrder = async (id) => {
    return request(`/order/${id}`, { method: "DELETE" })
}

export const changeOrderStatus = async (id, status) => {
    return request(`/order/${id}/status/${status}`, { method: "PATCH" })
}

export const revokeStockOrder = async (id) => {
    return request(`/order/revoke/stock/${id}`, { method: "DELETE" })
}