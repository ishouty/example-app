import { createSelector } from '@reduxjs/toolkit';
import { TAppState } from 'redux/store';

export const selectNavigationItemsState = (state: TAppState) =>
  state.navigation;
// memo selectors to help reduce rendering
export const createSelectorLinksFilterHiddenItem = createSelector(
  [selectNavigationItemsState],
  (links) => links.filter((link) => !link.hideMenu),
);
