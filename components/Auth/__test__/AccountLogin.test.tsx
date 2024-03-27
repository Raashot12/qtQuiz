import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import mediaQuery from 'css-mediaquery';
import AccountLogin from '../AccountLogin';
import 'regenerator-runtime/runtime';
import { theme } from '@/theme';
import { setupStore } from '@/components/state/services/store';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  pathname: '/',
}));

function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }) as boolean,
    media: '',
    addListener: () => {},
    removeListener: () => {},
    onchange: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  });
}
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const preloadedState = undefined;
const store = setupStore(preloadedState);

jest.mock('@/state/services/getTokenApi', () => ({
  useApiServicesAppEmailTokenMutation: () => [
    async () =>
      // Mock the register function behavior here
      ({ token: 'mockedToken' }),
    { isSuccess: true, isError: false, isLoading: false },
  ],
  // useApiServicesAppPatientsGetoutpatientlandinglistGetQuery: () => ({
  //   data: landingPageDataMock(),
  //   isLoading: false,
  //   error: [],
  // }),
  // useApiServicesAppPatientsGetallpatientinclinicfortodayGetQuery: () => ({
  //   data: allPaitientPageDataMock(),
  //   isLoading: false,
  //   error: [],
  // }),
}));
describe('AccountLogin Component', () => {
  beforeEach(() => {
    window.matchMedia = createMatchMedia(1500);
  });
  it('submits form with valid email', async () => {
    render(
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <AccountLogin />
        </MantineProvider>
      </Provider>
    );

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText('Get Token');
    fireEvent.click(submitButton);

    expect(screen.getByText('Get Token')).toBeInTheDocument();

    // Simulate a successful API call
    await waitFor(() => {
      expect(screen.getByText('Congratulation!')).toBeInTheDocument();
    });
  });

  it('displays error message for invalid email', async () => {
    render(
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <AccountLogin />
        </MantineProvider>
      </Provider>
    );

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: '' } });
    const submitButton = screen.getByText('Get Token');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Please enter address')).toBeInTheDocument();
    });
  });
});
