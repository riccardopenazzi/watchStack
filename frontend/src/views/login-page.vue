<template>
    <v-container class="fill-height justify-center pa-4 login-page--wrapper" fluid>
        <div class="text-center mb-4">Accedi</div>
        <v-card
                variant="flat"
                class="pa-2"
                >
            <v-form>
                <v-text-field
                        v-model="form.data.username"
                        label="Username"
                        ></v-text-field>
                <v-text-field
                        v-model="form.data.password"
                        label="Password"
                        type="password"
                        ></v-text-field>
                <v-btn
                        color="primary"
                        @click="executeLogin"
                        >
                    Login
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import api from '@/services/api-service';

import { mapStores } from 'pinia';
import { useUserDataStore } from '@/stores/user-data';

export default {
    data() {
        return {
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

            vars.url = '/login';
            vars.body = { ...this.form.data };
            const result = await api.post(vars);

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
    margin-top: 25%;
}
</style>