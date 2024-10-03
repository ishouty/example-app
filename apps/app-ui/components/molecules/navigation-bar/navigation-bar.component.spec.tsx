import { render, screen } from '@testing-library/react';
import { NavigationBar } from './navigation-bar.component';
import { TNavigationBarProps } from './navigation-bar.type';
import { NavigationLayoutMenuType } from 'types';
import { IconUsb } from '@tabler/icons-react';
import { text } from 'stream/consumers';

describe('Navigation Bar Component', () => {
  const setup = () => {
    const navigationItems: TNavigationBarProps = {
      items: [
        {
          link: 'http://www.google.com',
          label: 'example-link',
          selected: true,
          type: NavigationLayoutMenuType.main,
          hideMenu: false,
          icon: IconUsb,
        },
      ],
    };

    return render(<NavigationBar items={navigationItems.items} />);
  };

  test('react component matches snapshot', () => {
    const component = setup();
    expect(component.container).toMatchSnapshot();
  });

  test('renders component with navigation items a links', () => {
    const component = setup();
    expect(component.container.querySelectorAll('a')).toHaveLength(1);
    expect(screen.getByText(/example-link/i).innerHTML).toEqual('example-link');
    expect(component.container.querySelector('a')?.outerHTML).toMatch(
      /http:\/\/\www.google.com/,
    );
    expect(component.container.querySelectorAll('svg')).toHaveLength(1);
  });
});
