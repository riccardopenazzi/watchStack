<template>
    <v-container class="fill-height login-page--wrapper pa-0" fluid>
        <div class="login-page--content d-flex flex-column align-center w-100">
            <!-- Header con logo e tagline -->
            <div class="login-page--header text-center mb-6">
                <v-img
                        src="/logo-vertical.png"
                        max-width="100"
                        class="mx-auto mb-4"
                        ></v-img>
                <h1 class="text-h4 font-weight-bold" style="color: rgb(var(--v-theme-primary))">
                    WatchStack
                </h1>
                <p class="text-body-2 text-medium-emphasis mt-1">
                    Curate your cinematic journey
                </p>
            </div>

            <!-- Form card -->
            <v-card class="login-page--card w-100 pa-6" max-width="400">
                <v-form @submit.prevent="executeLogin">
                    <label class="text-overline text-medium-emphasis">USERNAME</label>
                    <v-text-field
                            v-model="form.data.username"
                            placeholder="username"
                            prepend-inner-icon="mdi-account"
                            class="mb-2"
                            ></v-text-field>

                    <label class="text-overline text-medium-emphasis">PASSWORD</label>
                    <v-text-field
                            v-model="form.data.password"
                            placeholder="••••••••"
                            :type="showPassword ? 'text' : 'password'"
                            prepend-inner-icon="mdi-lock"
                            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append-inner="showPassword = !showPassword"
                            class="mb-4"
                            ></v-text-field>

                    <v-btn
                            color="primary"
                            size="large"
                            block
                            type="submit"
                            :loading="loginLoading"
                            append-icon="mdi-arrow-right"
                            class="mb-4"
                            >
                        Login
                    </v-btn>
                </v-form>

                <div class="text-center">
                    <v-divider class="mb-4"></v-divider>

                    <p class="text-body-2 text-medium-emphasis mb-3">New to the stack?</p>
                    <v-btn
                            variant="outlined"
                            block
                            size="large"
                            prepend-icon="mdi-account-plus"
                            >
                        Sign up for free
                    </v-btn>
                </div>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import api from '@/services/api-service';

import { mapStores } from 'pinia';
import { useUserDataStore } from '@/stores/user-data';

export default {
    data() {
        return {
            showPassword: false,
            loginLoading: false,
            form: {
                data: {
                    username: '',
                    password: '',
                },
            },
        }
    },
    computed: {
        ...mapStores(useUserDataStore),
    },
    methods: {
        async executeLogin(vars) {
            vars ||= {};

            if (!this.form.data.username || !this.form.data.password) {
                console.error('Missing required data ', this.form);
                return;
            }

            this.loginLoading = true;

            vars.url = '/login';
            vars.body = { ...this.form.data };
            const result = await api.post(vars);

            this.loginLoading = false;

            if (!result.data || !result.data?.userId) {
                console.error('Login failed ', result);
                return;
            }

            this.userDataStore.initUserInfo({ data: result.data });
            this.$router.push({ name: 'home' });
        },
    }
}
</script>

<style lang="scss">
.login-page--wrapper {
    background: linear-gradient(
        180deg,
        rgba(var(--v-theme-primary), 0.15) 0%,
        rgba(var(--v-theme-background), 1) 50%
    );

    .login-page--content {
        max-width: 400px;
        margin: 0 auto;
        padding: 48px 16px 24px;
    }

    .login-page--header {
        .v-img {
            filter: drop-shadow(0 0 20px rgba(var(--v-theme-primary), 0.3));
        }
    }

    .login-page--card {
        border: 1px solid rgba(255, 255, 255, 0.06);
    }
}
</style>