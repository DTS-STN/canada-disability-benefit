import { createRoutesStub } from 'react-router';

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

import { AppBar } from '~/components/app-bar';

beforeEach(() => {
  // Mock t function to return key
  // TODO: Find some way to actually use real translations
  vi.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: vi.fn(),
        language: 'fr',
      },
    }),
  }));
});

describe('AppBar', () => {
  it('should correctly render an AppBar with a MenuItem when the file property is provided', () => {
    globalThis.__appEnvironment = mock({
      MSCA_BASE_URL: 'https://msca.example.com/',
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/fr/',
        Component: () => <AppBar />,
      },
    ]);

    const { container } = render(<RoutesStub initialEntries={['/fr/']} />);

    expect(container).toMatchSnapshot('expected html');
  });

  it('should correctly render an AppBar with a MenuItem when the to property is provided', () => {
    globalThis.__appEnvironment = mock({
      MSCA_BASE_URL: 'https://msca.example.com/',
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/fr/',
        Component: () => <AppBar />,
      },
    ]);

    const { container } = render(<RoutesStub initialEntries={['/fr/']}></RoutesStub>);

    expect(container).toMatchSnapshot('expected html');
  });

  it('should render render an AppBar with a name provided', () => {
    globalThis.__appEnvironment = mock({
      MSCA_BASE_URL: 'https://msca.example.com/',
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/fr/',
        Component: () => <AppBar />,
      },
    ]);

    const { container } = render(<RoutesStub initialEntries={['/fr/']}></RoutesStub>);

    expect(container).toMatchSnapshot('expected html');
  });

  it('should render render an AppBar with a profile item provided', () => {
    globalThis.__appEnvironment = mock({
      MSCA_BASE_URL: 'https://msca.example.com/',
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/fr/',
        Component: () => <AppBar name="Test User" />,
      },
    ]);
    const { container } = render(<RoutesStub initialEntries={['/fr/']}></RoutesStub>);
    expect(container).toMatchSnapshot('expected html');
  });
});
