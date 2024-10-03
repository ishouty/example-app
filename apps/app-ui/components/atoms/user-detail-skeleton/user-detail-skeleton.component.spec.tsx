import { render, RenderResult, screen } from '@testing-library/react';
import UserDetailSkeleton from './user-detail-skeleton.component';

let component: RenderResult;
describe('UserDetailSkeleton Component', () => {
  beforeEach(() => {
    component = render(<UserDetailSkeleton />);
  });

  test('matches snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });

  test('renders 5 skeleton descriptioon and one avatar', () => {
    const { container } = component;
    const skeletonLines = component.container.querySelectorAll('.space-y-1');

    expect(component.getAllByTestId('userdetail-container')).toHaveLength(1);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
    expect(skeletonLines).toHaveLength(5);
  });
});
