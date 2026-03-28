<template>
    <v-card class="film-card--wrapper rounded-lg" elevation="2">
        <v-img
                :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
                :alt="film.title"
                height="250"
                cover
                class="rounded-t-lg"
                >
            <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate size="32" />
                </div>
            </template>
        </v-img>

        <v-card-text class="pa-4">
            <div class="d-flex align-center justify-space-between mb-2">
                <span class="text-body-2 text-medium-emphasis">{{ releaseYear }}</span>
                <v-chip
                        size="small"
                        :color="ratingColor"
                        variant="tonal"
                        prepend-icon="mdi-star"
                        >
                    {{ film.vote_average?.toFixed(1) }}
                </v-chip>
            </div>

            <h2 class="text-h6 font-weight-bold mb-2">{{ film.title }}</h2>

            <div class="d-flex flex-wrap ga-1 mb-3" v-if="genreNames.length">
                <v-chip
                        v-for="genre in genreNames"
                        :key="genre"
                        size="small"
                        variant="outlined"
                        >
                    {{ genre }}
                </v-chip>
            </div>

            <p class="text-body-2 text-medium-emphasis" v-if="film.overview">
                {{ film.overview }}
            </p>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState } from 'pinia';
import { useDataHolderStore } from '@/stores/_data-holder';

export default {
    props: {
        film: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState(useDataHolderStore, ['genresMap']),

        releaseYear() {
            return this.film.release_date?.split('-')[0] || '';
        },
        ratingColor() {
            const rating = this.film.vote_average || 0;
            if (rating >= 7) return 'success';
            if (rating >= 5) return 'warning';
            return 'error';
        },
        genreNames() {
            if (!this.film.genre_ids || !this.genresMap) return [];
            return this.film.genre_ids
                    .map(id => this.genresMap[id]?.name)
                    .filter(Boolean)
                    ;
        },
    },
}
</script>

<style lang="scss">
.film-card--wrapper {
    transition: transform 0.2s ease;

    &:active {
        transform: scale(0.98);
    }
}
</style>