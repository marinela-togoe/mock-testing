import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('ToDo', () => {
  const { getByText, getByLabelText } = render(<App />);
  // after rendering our component
  getByText('TODO');
  getByLabelText('Add todo:');
  getByText('Add #1');
});

test('add items to list', () => {
  const { getByText, getByLabelText } = render(<App />);
  // after rendering our component
  getByText('TODO');
  const input = getByLabelText('Add todo:');
  fireEvent.change(input, { target: { value: 'wash car' } });
  fireEvent.click(getByText('Add #1'));

  // confirm data
  getByText('Add #2');
  getByText('wash car');
});

// userEvent expresses intent better
test('user-events allows users to add...', () => {
  const { getByText, getByLabelText } = render(<App />);

  const input = getByLabelText('Add todo:');
  const button = getByText('Add #1');

  userEvent.type(input, 'Learn Spanish');
  userEvent.click(button);

  getByText('Learn Spanish');
  getByText('Add #2');
});
