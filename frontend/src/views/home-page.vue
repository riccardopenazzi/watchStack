<template>
    <v-container class="fill-height justify-center pa-4 home-page--wrapper" fluid>
		<v-row>
			<v-col
					cols=12
					class="text-center"
					>
				<div class="welcome-title">{{ `Benvenuto ${userInfo.username || ''}` }}</div>
			</v-col>
		</v-row>
		<v-row>
			<v-col
					cols=12
					>
				<v-skeleton-loader
						v-if="loadingFilmsList"
						type="card"
						></v-skeleton-loader>
				<div
						v-else-if="currentFilm"
						class="swipe-container"
						@touchstart="onTouchStart"
						@touchmove="onTouchMove"
						@touchend="onTouchEnd"
						>
					<film-card
							ref="swipeCard"
							:film="currentFilm"
							class="swipe-card"
							:style="swipeStyle"
							></film-card>
				</div>
			</v-col>
		</v-row>
    </v-container>
</template>

<script>
import api from '@/services/api-service';

import { mapStores, mapState } from 'pinia';
import { useUserDataStore } from '@/stores/user-data';
import { useFilmsStore } from '@/stores/films';

import FilmCard from '../components/film-card.vue';

const SWIPE_THRESHOLD = 80;

export default {
    data() {
        return {
            currentIndex: 1,
			// Swipe state
			touchStartX: 0,
			touchCurrentX: 0,
			isSwiping: false,
			isAnimating: false,
        }
    },
	computed: {
		...mapStores(
			useUserDataStore,
			useFilmsStore,
		),
		...mapState(useUserDataStore, [
			'userInfo',
		]),
		...mapState(useFilmsStore, [
			'loadingFilmsList',
			'filmsList',
		]),

		currentFilm() {
			return this.filmsList?.[this.currentIndex] || null;
		},

		swipeDeltaX() {
			return this.isSwiping ? this.touchCurrentX - this.touchStartX : 0;
		},

		swipeStyle() {
			if (this.isAnimating) return {};
			if (!this.isSwiping) return {};

			const rotate = this.swipeDeltaX * 0.05;
			const opacity = Math.max(1 - Math.abs(this.swipeDeltaX) / 400, 0.3);

			return {
				transform: `translateX(${this.swipeDeltaX}px) rotate(${rotate}deg)`,
				opacity,
				transition: 'none',
			};
		},

		canSwipeLeft() {
			return this.currentIndex < (this.filmsList?.length || 0) - 1;
		},
		canSwipeRight() {
			return this.currentIndex > 0;
		},
	},
    methods: {
		onTouchStart(e) {
			if (this.isAnimating) return;
			this.touchStartX = e.touches[0].clientX;
			this.touchCurrentX = e.touches[0].clientX;
			this.isSwiping = true;
		},

		onTouchMove(e) {
			if (!this.isSwiping) return;
			this.touchCurrentX = e.touches[0].clientX;
		},

		onTouchEnd() {
			if (!this.isSwiping) return;
			this.isSwiping = false;

			const delta = this.touchCurrentX - this.touchStartX;

			// Swipe a sinistra → film successivo
			if (delta < -SWIPE_THRESHOLD && this.canSwipeLeft) {
				this.animateOut('left');
			}
			// Swipe a destra → film precedente
			else if (delta > SWIPE_THRESHOLD && this.canSwipeRight) {
				this.animateOut('right');
			}
			// Sotto la soglia → torna al centro
			else {
				this.resetPosition();
			}
		},

		animateOut(direction) {
			this.isAnimating = true;
			const card = this.$refs.swipeCard?.$el;
			if (!card) return;

			const translateX = direction === 'left' ? -500 : 500;
			const rotate = direction === 'left' ? -15 : 15;

			card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
			card.style.transform = `translateX(${translateX}px) rotate(${rotate}deg)`;
			card.style.opacity = '0';

			setTimeout(() => {
				if (direction === 'left') {
					this.currentIndex++;
				} else {
					this.currentIndex--;
				}

				// Reset per la nuova card
				card.style.transition = 'none';
				card.style.transform = '';
				card.style.opacity = '';

				this.$nextTick(() => {
					this.isAnimating = false;
				});
			}, 300);
		},

		resetPosition() {
			const card = this.$refs.swipeCard?.$el;
			if (!card) return;

			card.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
			card.style.transform = '';
			card.style.opacity = '';

			setTimeout(() => {
				card.style.transition = '';
			}, 250);
		},
    },
	mounted() {
		if (!this.filmsList) {
			this.filmsStore.loadFilmsList();
		}
	},
	components: {
		FilmCard,
	},
}
</script>

<style lang="scss">
.home-page--wrapper {
	.welcome-title {
		font-size: 1.2rem;
	}

	.swipe-container {
		position: relative;
		overflow: hidden;
	}

	.swipe-card {
		will-change: transform, opacity;
		transform-origin: center bottom;
	}
}
</style>