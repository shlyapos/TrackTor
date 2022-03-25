import { createAction } from "@ngrx/store";

export const trackSearchActions = {
  setSearchInput: createAction('[TRACK SEARCH] set search input', (searchInput: string) => ({searchInput})),
}