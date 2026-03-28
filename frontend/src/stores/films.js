import { defineStore } from 'pinia';

import api from '@/services/api-service';

export const useFilmsStore = defineStore('films', {
	state(){
		return {
			filmsList: null,
			loadingFilmsList: false,
		};
	},
	getters: {
	},
	actions: {
		async loadFilmsList(vars) {
			vars ||= {};

			this.loadingFilmsList = true;
			
			vars.url = '/movies';
			const result = await api.get(vars);
			
			this.filmsList = result.data || [];
			this.loadingFilmsList = false;
		},
	},
});