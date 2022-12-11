import request from "@/utils/request"

export const createProduct = async (data) => {
    return request(`/product`, { method: "POST", data })
}

export const queryProduct = async (conditions) => {
    return request(`/product`, { method: "GET", params: conditions })
}

export const queryProductById = async (id) => {
    return request(`/product/${id}`, { method: "GET" })
}

export const updateProduct = async (data) => {
    return request(`/product`, { method: "PATCH", data })
}

export const deleteProduct = async (id) => {
    return request(`/product/${id}`, { method: "DELETE" })
}