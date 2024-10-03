import { NavigationLayoutMenuType } from 'types';

export type TNavigationBarProps = {
  items: {
    link: string;
    label: string;
    selected: boolean;
    type: NavigationLayoutMenuType;
    hideMenu: boolean;
    icon: React.ElementType;
  }[];
};
