import { render, screen } from '@testing-library/react';
import ListingSkeleton from './listing-skeleton.component';

describe('ListingSkeleton Component', () => {
  test('matches snapshot', () => {
    const { container } = render(<ListingSkeleton />);

    expect(container).toMatchSnapshot();
  });
  test('renders 5 skeleton items', () => {
    const { container } = render(<ListingSkeleton />);

    // Check if the skeleton avatar renders 5 times
    const skeletonAvatars = container.querySelectorAll('.listitem');
    expect(skeletonAvatars).toHaveLength(5);
  });

  test('each skeleton has an avatar and two text lines', () => {
    render(<ListingSkeleton />);
    const listItem = screen.getAllByTestId('listitem');
    expect(listItem.length).toBe(5);

    listItem.map((item) => {
      expect(item.getElementsByClassName('line').length).toBe(2);
    });
  });
});
