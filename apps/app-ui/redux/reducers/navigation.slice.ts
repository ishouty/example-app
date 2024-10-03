// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { NavigationLayoutMenuType } from '../../types';
import {
  IconBrandGitlab,
  IconLogout,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import React from 'react';

// Initial state for user slice
const initialState: {
  link: string;
  label: string;
  selected: boolean;
  type: NavigationLayoutMenuType;
  hideMenu: boolean;
  requiredAuth: boolean;
  icon: React.ElementType;
}[] = [
  {
    label: 'Users',
    link: '/users',
    selected: false,
    type: NavigationLayoutMenuType.main,
    hideMenu: false,
    requiredAuth: true,
    icon: IconUsers,
  },
  {
    label: 'About',
    link: '/about',
    selected: false,
    type: NavigationLayoutMenuType.main,
    hideMenu: false,
    requiredAuth: true,
    icon: IconBrandGitlab,
  },
  // {
  //   label: 'Posts',
  //   link: '/posts',
  //   selected: false,
  //   type: 'main-nav',
  //   hideMenu: false,
  //   requiredAuth: true,
  // },
  {
    label: 'Logout',
    link: '/logout',
    selected: false,
    type: NavigationLayoutMenuType.settings,
    hideMenu: false,
    requiredAuth: true,
    icon: IconLogout,
  },
  {
    label: 'login',
    link: '/login',
    type: NavigationLayoutMenuType.none,
    selected: false,
    hideMenu: true,
    requiredAuth: false,
    icon: IconUsers,
  },
];

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    updateNavgation: (state, action) => {
      console.log('update navigation');
      // state.label = action.payload.name;
      // state.link = action.payload.age;
    },
  },
});

// Export the action created by createSlice
export const { updateNavgation } = navigationSlice.actions;

// Export the reducer to be used in store configuration
export default navigationSlice.reducer;
