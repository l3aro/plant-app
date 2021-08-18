<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Login</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <strong>Sign in to your account</strong>
                <form @submit.prevent="submit">
                    <ion-item>
                        <ion-label>Email</ion-label>
                        <ion-input
                            type="email"
                            placeholder="Email"
                            v-model="email"
                            autofocus
                        ></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>Password</ion-label>
                        <ion-input
                            type="password"
                            placeholder="Password"
                            v-model="password"
                        ></ion-input>
                    </ion-item>

                    <button
                        type="submit"
                        :disabled="!email || !password || loading"
                        class="button button-block button-positive"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonInput,
    IonItem,
} from '@ionic/vue';
import { defineComponent, reactive, toRefs } from 'vue';
import { client } from '@/modules/Client';
import { useAuth } from '@/modules/Auth';
import { useRouter } from 'vue-router';

interface LoginPayload {
    email: string;
    password: string;
}

export default defineComponent({
    name: 'Login',
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonLabel,
        IonInput,
        IonItem,
    },
    setup() {
        const { loading, post, errorMessage } = client(
            process.env.VUE_APP_API_LOGIN
        );
        const { getUser, setUser } = useAuth();
        const router = useRouter();
        const payload = reactive<LoginPayload>({
            email: '',
            password: '',
        });

        const submit = () => {
            post(payload).then((response) => {
                getUser(response).then((user) => {
                    setUser(user, true);
                    router.push({ name: 'home' });
                });
            });
        };

        return {
            loading,
            submit,
            errorMessage,
            ...toRefs(payload),
        };
    },
});
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>