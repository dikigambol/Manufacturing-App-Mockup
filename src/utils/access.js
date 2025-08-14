
import { jwtDecode } from "jwt-decode";

export const Access = {
    setAccess: (token) => {
        localStorage.setItem('access', JSON.stringify(token))
        return true
    },

    userAccess: (key = null) => {
        const token = localStorage.getItem('access')
        if (token) {
            const tokenDecode = jwtDecode(token)
            return key ? tokenDecode[key] : tokenDecode
        }
        return null
    },

    session: () => {
        return JSON.parse(localStorage.getItem('access')) ?? null
    },

    destroy: () => localStorage.removeItem('access')
}

export const local = {
    save: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
        return true
    },

    get: (key = null) => {
        const data = localStorage.getItem(key)
        if (data) {
            return JSON.parse(data)
        }
        return null
    },

    delete: (key) => {
        localStorage.removeItem(key)
    }
}

