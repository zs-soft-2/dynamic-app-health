import { localStorageSync } from 'ngrx-store-localstorage';

import { Action, ActionReducer, MetaReducer } from '@ngrx/store';

function localStorageSyncReducer(
	reducer: ActionReducer<unknown>
): ActionReducer<unknown> {
	return localStorageSync({
		keys: [
			{
				'dynamic-page': ['ids', 'entities', 'selectedId'],
			},
			{
				'dynamic-config': ['ids', 'entities'],
			},
		],
		rehydrate: true,
	})(reducer);
}

export const metaReducers: Array<MetaReducer<any, Action>> = [
	localStorageSyncReducer,
];
