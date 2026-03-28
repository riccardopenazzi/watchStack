import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('userData', {
	state(){
		return {
			userInfo: {
				userId: null,
				name: null,
				surname: null,
				username: null,
			},
		};
	},
	getters: {
	},
	actions: {
		initUserInfo(vars) {
			if (!vars.data) {
				console.error('Missing data for initUserInfo ', vars);
				return;
			}
			Object.keys(this.userInfo)
					.forEach((key) => {
						if (vars.data[key]) {
							this.userInfo[key] = vars.data[key] || '';
						}
					})
					;
			console.log('Init userInfo with: ', this.userInfo);
		},
	},
});