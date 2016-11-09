export const types = {
  DIALOG: 'DIALOG',
  CHOICE: 'CHOICE'
};

export const initialState = {
  isChoosing: false,
  messages: [{name: 'test'}]
};

export const actions = {
  moveDialog: () => ({ type: types.DIALOG }),
  makeChoice: (choice) => ({ type: types.CHOICE, choice})
};

export const selectors = {
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.DIALOG:
    return {isChoosing: true};
  case types.CHOICE:
    return {isChoosing: false};
  default:
    return state;
  }
};