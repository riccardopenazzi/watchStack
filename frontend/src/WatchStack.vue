<template>
    <v-app>
        <v-app-bar
                v-if="topBarVisible"
                flat 
                border
                >
            <v-app-bar-title class="font-weight-bold">WatchStack</v-app-bar-title>
        </v-app-bar>
        <v-main>
			<v-skeleton-loader
					v-if="!reqDataLoaded"
					type="card"
					></v-skeleton-loader>
            <router-view v-else />
        </v-main>
        <v-bottom-navigation
                v-show="bottomBarVisible"
                v-model="activePage"
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
import { mapStores, mapState } from 'pinia';
import { useDataHolderStore } from '@/stores/_data-holder';

export default {
    name: 'WatchStack',
    data() {
        return {
            activePage: 'home',
        }
    },
    computed: {
        ...mapStores(useDataHolderStore),
        ...mapState(useDataHolderStore, [
            'reqDataLoaded',
        ]),

        bottomBarVisible() {
            return true
                    && !this.$route.meta.hideBottomBar
                    ;
        },

		topBarVisible() {
			return true
					&& !this.$route.meta.hideTopBar
					;
		},
    },
    methods: {
        goTo(routeName) {
            this.$router.push({ name: routeName });
        },
    },
    watch: {
        activePage(val) {
            this.goTo(val);
        },
    },
    mounted() {
        //Probabilmente subottimo metterlo qui (i dati si caricano prima del login) ma per ora va bene così
        this.dataHolderStore.loadEssentialsData();
    },
}
</script>

<style lang="scss">
.v-btn--variant-elevated.v-btn--primary {
  box-shadow: 0 0 15px rgba(124, 131, 253, 0.4) !important;
}
.v-bottom-navigation {
  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
}

h1, .text-h4 {
  letter-spacing: -0.5px !important;
}
</style>