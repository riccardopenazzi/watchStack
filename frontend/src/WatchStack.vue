<template>
    <v-app>
        <v-app-bar flat border>
            <v-app-bar-title class="font-weight-bold">WatchStack</v-app-bar-title>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
        <v-bottom-navigation
                v-show="bottomBarVisible"
                grow
                color="primary"
                >
            <v-btn value="home">
                <v-icon>mdi-home</v-icon>
                <span>Home</span>
            </v-btn>
            <v-btn value="search">
                <v-icon>mdi-magnify</v-icon>
                <span>Cerca</span>
            </v-btn>
            <v-btn value="profile">
                <v-icon>mdi-account</v-icon>
                <span>Profilo</span>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script>
export default {
    name: 'WatchStack',
    data() {
        return {

        }
    },
    computed: {
        bottomBarVisible() {
            return true
                    && !this.$route.meta.hideBottomBar
                    ;
        },
    },
    methods: {
        goTo(routeName) {
            this.$router.push({ name: routeName });
        }
    },
}
</script>