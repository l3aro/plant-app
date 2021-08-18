import AuthState from '@/types/AuthState';
import User from '@/types/User';
import { reactive, toRefs, watch } from 'vue';
import { client } from '@/modules/Client';

const AUTH_KEY = 'plant_token';
export const AUTH_TOKEN = 'access_token';

const state = reactive<AuthState>({
    isAuthenticated: false,
    user: undefined,
    error: undefined
});

const token = localStorage.getItem(AUTH_KEY);
if (token) {
    state.isAuthenticated = true;
    const { loading, error, data, get } = client(
        process.env.VUE_APP_API_USER,
        token
    );
    get();
    watch([loading], () => {
        if (error.value) {
            state.isAuthenticated = false;
            localStorage.removeItem(AUTH_KEY);
        } else if (data.value) {
            state.user = {
                ...data.value,
                [AUTH_TOKEN]: token
            };
            state.isAuthenticated = true;
        }
    });
}

export const useAuth = () => {
    const getUser = (token?: string) => {
        const { loading, data, get } = client(
            process.env.VUE_APP_API_USER,
            token
        );
        get();

        return new Promise<User | undefined>((resolve, reject) => {
            watch([loading], () => {
                if (data.value) {
                    state.user = {
                        ...data.value,
                        [AUTH_TOKEN]: token
                    };
                    resolve(state.user);
                } else {
                    reject(data.value);
                }
            });
        });
    };

    const setUser = (payload: User | undefined, remember: boolean): void => {
        if (payload === undefined) {
            return;
        }

        if (remember) {
            localStorage.setItem(AUTH_KEY, payload[AUTH_TOKEN]);
        }

        state.user = payload;
        state.error = undefined;
    };

    const logout = (): Promise<void> => {
        localStorage.removeItem(AUTH_KEY);
        return Promise.resolve((state.user = undefined));
    };

    return {
        getUser,
        setUser,
        logout,
        ...toRefs(state)
    };
};
