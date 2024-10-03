import { ConditionalLayout } from './conditional-layout.component.layout';
import { render, RenderResult, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { TAppState } from 'redux/store';
import { NavigationLayoutMenuType } from 'types';
import { IconUsers } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
describe('Conditional Layout Component', () => {
  const mockStore = configureMockStore();
  const initialState = {
    global: {},
    navigation: [
      {
        label: 'Users',
        link: '/users',
        selected: false,
        type: NavigationLayoutMenuType.main,
        hideMenu: false,
        requiredAuth: true,
        icon: IconUsers,
      },
    ],
    user: {},
  };
  const store = mockStore(initialState);

  let component: RenderResult;

  test('render just children only and no other elements', async () => {
    // mock app router
    // Mock the usePathname hook
    jest.mocked(usePathname).mockReturnValue('/login');

    component = render(
      <Provider store={store}>
        <ConditionalLayout>hello i am child</ConditionalLayout>
      </Provider>,
    );
    expect(component.container.querySelectorAll('nav')).toHaveLength(0);

    expect(component.container.outerHTML).toEqual(
      '<div>hello i am child</div>',
    );
  });

  test('render out nav for about and children', () => {
    jest.mocked(usePathname).mockReturnValue('/about');

    component = render(
      <Provider store={store}>
        <ConditionalLayout>hello i am child</ConditionalLayout>
      </Provider>,
    );
    expect(component.container.querySelectorAll('nav')).toHaveLength(1);

    expect(screen.getAllByText('hello i am child')).toHaveLength(1);
  });

  test('render out default layout', () => {
    // mock app router
    jest.mock('next/navigation', () => {
      return {
        usePathname: () => '/about',
      };
    });

    component = render(
      <Provider store={store}>
        <ConditionalLayout>hello i am child</ConditionalLayout>
      </Provider>,
    );

    expect(component.container.querySelectorAll('nav')).toHaveLength(1);
    expect(screen.getAllByText('Users')).toHaveLength(1);
    expect(component.container.querySelectorAll('a')).toHaveLength(1);
  });
});
