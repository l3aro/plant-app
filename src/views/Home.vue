<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Blank</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Blank</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <strong>Ready to create an app?</strong>
                <p>
                    Start with Ionic
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://ionicframework.com/docs/components"
                        >UI Components</a
                    >
                </p>
                <button @click.prevent="logoutAction">Logout</button>
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
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useAuth } from '@/modules/Auth';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Home',
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
    },
    setup() {
        const { logout } = useAuth();
        const router = useRouter();
        const logoutAction = () => {
            logout().then(() => router.push({ name: 'login' }));
        };

        return {
            logoutAction,
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