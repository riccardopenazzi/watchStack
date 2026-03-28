import { defineStore } from 'pinia';

import api from '@/services/api-service';

export const useDataHolderStore = defineStore('dataHolder', {
	state(){
		return {
			genresList: [], genresMap: {},
		};
	},
	getters: {
		reqDataLoaded() {
			return true
					&& this.genresList.length
					;
		},
	},
	actions: {
		loadEssentialsData() {
			let vars = {};

			vars.url = '/genres';
			api.get(vars)
					.then(res => {
						if (!res.data || !res.data.length) {
							alert(`Errore nel caricamento dei generi\nURL: ${vars.url}\nMessaggio: Nessun dato ricevuto`);
							return;
						}
						this.genresList = res.data;
						this.genresMap = this.genresList.toMap(x => x.id);
					})
					.catch(err => {
						alert(`Errore nel caricamento dei generi\nURL: ${vars.url}\nMessaggio: ${err.message || err}`);
					})
					;
		}
	},
});