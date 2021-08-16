import AuthState from '@/models/AuthState'
import User from '@/models/User'
import { reactive, toRefs, watch } from 'vue'
import { clientWithAuth } from '@/modules/Client'

const AUTH_KEY = 'plant_token'
export const AUTH_TOKEN = 'access_token'

const state = reactive<AuthState>({
    isAuthenticated: false,
    user: undefined,
    error: undefined
})

const token = localStorage.getItem(AUTH_KEY)

if (token) {
    const { loading, error, data, get } = clientWithAuth(
        process.env.API_URL_USER
    )
    state.isAuthenticated = true
    get({}, { headers: { Authorization: `Bearer ${token}` } })

    watch([loading], () => {
        if (error.value) {
            state.isAuthenticated = false
            localStorage.removeItem(AUTH_KEY)
        } else if (data.value) {
            state.user = data.value
        }
    })
}

export const useAuth = () => {
    const setUser = (payload: User, remember: boolean): void => {
        if (remember) {
            localStorage.setItem(AUTH_KEY, payload[AUTH_TOKEN])
        }

        state.user = payload
        state.error = undefined
    }

    const logout = (): Promise<void> => {
        localStorage.removeItem(AUTH_KEY)
        return Promise.resolve((state.user = undefined))
    }

    return {
        setUser,
        logout,
        ...toRefs(state)
    }
}
