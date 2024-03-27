import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import mediaQuery from 'css-mediaquery';
import { theme } from '@/theme';
import 'regenerator-runtime/runtime';
import { setupStore } from '@/components/state/services/store';
import CreateQuestion from '@/pages/dashboard/create-question';

const createquestionMock = jest.fn();
// Mocking the useApiServicesAppQuestionPostMutation hook
jest.mock('@/state/services/questionsApi', () => ({
  useApiServicesAppQuestionPostMutation: () => [
    createquestionMock(),
    { isLoading: false, isSuccess: true, isError: false },
  ],
}));
// jest.mock('@/state/services/questionsApi', () => ({
//   useApiServicesAppQuestionPostMutation: jest.fn(),
// }));

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  pathname: '/',
}));

const preloadedState = undefined;
const store = setupStore(preloadedState);
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
describe('CreateQuestion Component', () => {
  beforeEach(() => {
    window.matchMedia = createMatchMedia(1500);
  });
  beforeEach(() => {
    createquestionMock.mockReturnValue([
      () => ({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: [],
      }),
    ]);
  });
  afterEach(() => {
    createquestionMock.mockReset();
  });
  it('submits question with options successfully', async () => {
    render(
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <CreateQuestion />
        </MantineProvider>
      </Provider>
    );

    // Fill out question input
    const questionInput = screen.getByTestId('question');
    fireEvent.change(questionInput, { target: { value: 'Sample question?' } });

    // Fill out option input
    const optionInput = screen.getByTestId('add-question');
    fireEvent.change(optionInput, { target: { value: 'Option A' } });
    fireEvent.change(optionInput, { target: { value: 'Option B' } });
    fireEvent.change(optionInput, { target: { value: 'Option C' } });

    // Click add option button
    const addButton = screen.getByTestId('add');
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    // Click submit button
    const submitButton = screen.getByText('Submit Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createquestionMock).toHaveBeenCalledWith();
    });
    // Assert that success toast appears
    expect(screen.getByText('Question created successfully')).toBeInTheDocument();
  });

  it('displays error message if question is not provided', async () => {
    // Mocking the mutation function
    const mockRegisterNewQuestion = jest.fn();
    mockRegisterNewQuestion.mockReturnValue([
      undefined,
      { isSuccess: false, isError: true, isLoading: false },
    ]);

    render(
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <CreateQuestion />
        </MantineProvider>
      </Provider>
    );

    // Click submit button without filling out question
    const submitButton = screen.getByText('Submit Question');
    fireEvent.click(submitButton);

    // Assert that error toast appears
    await waitFor(() => {
      expect(screen.getByText('Question cannot be empty')).toBeInTheDocument();
    });

    // Assert that mutation function is not called
    expect(mockRegisterNewQuestion).not.toHaveBeenCalled();
  });
});
