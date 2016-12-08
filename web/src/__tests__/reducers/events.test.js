
import reducer, {actions, initialState} from '../../reducers/events';
import {deepFreeze} from '../../lib/utilities';

describe('events reducer', () => {
  it('initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('fetch', () => {
    const before = initialState;
    const action = actions.fetch(['...']);
    const after = {};
    deepFreeze(before);
    deepFreeze(action);
    expect(reducer(before, action)).toEqual(after);
  });
});