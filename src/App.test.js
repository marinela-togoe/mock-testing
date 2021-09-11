import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import App from './App';
import { api } from './api';

// mock API
const mockCreateItem = (api.createItem = jest.fn());

test('add items to list', async () => {
  const todoText = 'Learn Spanish';
  mockCreateItem.mockResolvedValueOnce(todoText);
  const { getByText, getByLabelText } = render(<App />);

  // enter content, interract with page
  const input = getByLabelText('Add todo:');
  fireEvent.change(input, { target: { value: 'wash car' } });
  fireEvent.click(getByText('Add #1'));

  await wait(() => getByText('wash car'));

  expect(mockCreateItem).toBeCalledTimes(1);
  expect(mockCreateItem).toBeCalledWith(expect.stringContaining('wash car'));
});
