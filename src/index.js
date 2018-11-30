const makeFxRuntime = require("./makeFxRuntime");

const assign = (...args) => Object.assign({}, ...args);

const { dispatch } = makeFxRuntime({
  state: { initial: "state" },
  merge: assign
});

const logEffect = (dispatch, { message }) => {
  dispatch(state => {
    //eslint-disable-next-line no-console
    console.log(message, state);
  });
};
const logState = props => ({
  run: logEffect,
  props
});

const delayEffect = (dispatch, { ms, action }) =>
  new Promise(resolve =>
    setTimeout(() => {
      dispatch(action);
      resolve();
    }, ms)
  );
const delay = props => ({
  run: delayEffect,
  props
});

dispatch([() => ({ counter: 0 }), logState({ message: "log 1" })]);
dispatch(
  delay({
    concurrent: true,
    ms: 1000,
    action: ({ counter }) => ({ oneSec: true, counter: counter + 1 })
  })
);
dispatch(logState({ message: "log after", after: true }));
dispatch(
  delay({
    concurrent: false,
    ms: 2000,
    action: ({ counter }) => ({ twoSecs: true, counter: counter + 1 })
  })
);
dispatch(logState({ message: "log 2" }));
dispatch(
  delay({
    concurrent: true,
    ms: 3000,
    action: ({ counter }) => ({ threeSecs: true, counter: counter + 1 })
  })
);
dispatch(logState({ message: "log 3" }));
dispatch(delay({ ms: 3500, cancel: true }));
