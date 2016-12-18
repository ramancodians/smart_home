
export const stateChangeHandler = function(name) {
  return (function(text) {
    var state = {};
    state[name] = text;
    this.setState(state);
  }).bind(this);
}

export const generateArrayOfVal = function(size, val) {
  var arr = [];
  for(var i = 0; i < size; i++)
    arr.push(val);
  return arr;
}
