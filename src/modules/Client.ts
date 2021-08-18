import axios, { AxiosRequestConfig } from 'axios'
import { computed, ref } from 'vue'
import { stringifyQuery } from 'vue-router'
import { AUTH_TOKEN, useAuth } from './Auth'

export const client = (endpoint: string, token?: string) => {
    const client = axios.create({
        baseURL: process.env.VUE_APP_API,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined
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

    const errorMessage = computed(() => {
        if (error.value) {
            return error.value.message
        }
        return ''
    })

    return {
        get,
        post,
        put,
        destroy,
        errorMessage,
        loading,
        data,
        error
    }
}

export const clientWithAuth = (endpoint: string) => {
    const { user } = useAuth()

    return client(endpoint, user.value ? user.value[AUTH_TOKEN] : undefined)
}
