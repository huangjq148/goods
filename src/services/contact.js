import request from "@/utils/request"

export const createContact = async (data) => {
    return request(`/contact`, { method: "POST", data })
}

export const queryContact = async (conditions) => {
    return request(`/contact`, { method: "GET", params: conditions })
}

export const queryContactById = async (id) => {
    return request(`/contact/${id}`, { method: "GET" })
}

export const updateContact = async (data) => {
    return request(`/contact`, { method: "PATCH", data })
}

export const deleteContact = async (id) => {
    return request(`/contact/${id}`, { method: "DELETE" })
}

export const queryContactByName = async (name) => {
    return request(`/contact/search`, { method: "GET", params: { name } })
}