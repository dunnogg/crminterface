import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        baseDomain: null,
    }),
    actions: {
        async authenticate() {
            if (this.accessToken && this.baseDomain) return;

            try {
                const authResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth`);
                const authData = await authResponse.json();

                if (!authData.access_token || !authData.base_domain) {
                    console.error("Ошибка получения авторизационных данных");
                    return;
                }

                this.accessToken = authData.access_token;
                this.baseDomain = authData.base_domain;
            } catch (error) {
                console.error("Ошибка авторизации:", error);
            }
        }
    },
    persist: true,
});
