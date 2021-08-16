import axios, { AxiosRequestConfig } from 'axios'
import { computed, ref, watch } from 'vue'
import { stringifyQuery } from 'vue-router'
import { AUTH_TOKEN, useAuth } from './Auth'

export const clientWithAuth = (endpoint: string) => {
    const { user } = useAuth()

    return client(endpoint, user?.value ? user.value[AUTH_TOKEN] : undefined)
}

export const client = (endpoint: string, token?: string) => {
    const client = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = ref()
    const loading = ref(false)
    const error = ref()

    const get = (query?: Record<string, any>, config?: AxiosRequestConfig) => {
        loading.value = true
        error.value = null

        let queryString = ''
        if (query) {
            queryString = '?' + stringifyQuery(query)
        }

        return client
            .get(endpoint + queryString, config)
            .then(response => (data.value = response.data))
            .catch(reject => {
                error.value = reject
                throw reject
            })
            .finally(() => (loading.value = false))
    }

    const post = (
        payload?: Record<string, any>,
        config?: AxiosRequestConfig
    ) => {
        loading.value = true
        error.value = null

        return client
            .post(endpoint, payload, config)
            .then(response => (data.value = response.data))
            .catch(reject => {
                error.value = reject
                throw reject
            })
            .finally(() => (loading.value = false))
    }

    const put = (
        payload?: Record<string, any>,
        config?: AxiosRequestConfig
    ) => {
        loading.value = true
        error.value = null

        return client
            .put(endpoint, payload, config)
            .then(response => (data.value = response.data))
            .catch(reject => {
                error.value = reject
                throw reject
            })
            .finally(() => (loading.value = false))
    }

    const destroy = (config?: AxiosRequestConfig) => {
        loading.value = true
        error.value = null

        return client
            .delete(endpoint, config)
            .then(response => (data.value = response.data))
            .catch(reject => {
                error.value = reject
                throw reject
            })
            .finally(() => (loading.value = false))
    }

    const errorDetails = computed(() => {
        if (error.value && error.value.response) {
            return error.value.response.data.message
        }
    })

    return {
        get,
        post,
        put,
        destroy,
        errorDetails,
        loading,
        data,
        error
    }
}
