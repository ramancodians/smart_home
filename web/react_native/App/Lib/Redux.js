
function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var R = _interopDefault(require('ramda'));

/**
  Creates a reducer.
  @param {string} initialState - The initial state for this reducer.
  @param {object} handlers - Keys are action types (strings), values are reducers (functions).
  @return {object} A reducer object.
 */
export const createReducer = (function (initialState, handlers) {
  // initial state is required
  if (R.isNil(initialState)) {
    throw new Error('initial state is required');
  }

  // handlers must be an object
  if (R.isNil(handlers) || !R.is(Object, handlers)) {
    throw new Error('handlers must be an object');
  }

  // create the reducer function
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    // wrong actions, just return state
    if (R.isNil(action)) return state;
    if (!R.has('type', action)) return state;

    // look for the handler
    var handler = handlers[action.type];

    // no handler no cry
    if (R.isNil(handler)) return state;

    // execute the handler
    return handler(state, action);
  };
});

export const createTypes = (function (types) {
  //if (RS.isNilOrEmpty(types)) throw new Error('valid types are required');
  if(!types || types.length == 0) throw new Error('valid types are required');

  return R.pipe(R.trim, R.split(/\s/), R.map(R.pipe(R.trim)), R.without([null, '']), R.map(function (x) {
    return [x, x];
  }), R.fromPairs)(types);
});
