<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense"> </ion-header>
            <ion-header collapse="condense"> </ion-header>
            <div id="container" class="text-center px-3">
                <ion-card>
                    <ion-card-header class="mb-3">
                        <strong>Sign in to your account</strong>
                        <p>New Here? <a href="#">Create an Account</a></p>
                    </ion-card-header>
                    <ion-card-content>
                        <form @submit.prevent="submit">
                            <ion-item class="mb-3">
                                <ion-label position="floating">Email</ion-label>
                                <ion-input
                                    type="email"
                                    v-model="email"
                                    class=""
                                    autofocus
                                ></ion-input>
                            </ion-item>
                            <div class="text-end">
                                <a href="#" class="text-end"
                                    >Forget Password?</a
                                >
                            </div>
                            <ion-item>
                                <ion-label position="floating"
                                    >Password</ion-label
                                >
                                <ion-input
                                    type="password"
                                    v-model="password"
                                ></ion-input>
                            </ion-item>
                            <ion-item class="text-start">
                                <ion-checkbox
                                    color="primary"
                                    checked
                                    class="me-3"
                                ></ion-checkbox>
                                <ion-label>Remember me</ion-label>
                            </ion-item>

                            <ion-button
                                color="primary"
                                type="submit"
                                :disabled="!email || !password || loading"
                                class="my-3"
                                expand="block"
                            >
                                Continue
                            </ion-button>
                            <p class="text-muted">OR</p>
                            <ion-button
                                color="primary"
                                type="button"
                                :disabled="loading"
                                class="my-3"
                                expand="block"
                                fill="outline"
                            >
                                Continue with RezID
                            </ion-button>
                        </form>
                    </ion-card-content>
                </ion-card>
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
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCheckbox,
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
        IonButton,
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonCheckbox,
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
                getUser(response.token).then((user) => {
                    setUser(user, true);
                    payload.password = '';
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
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>