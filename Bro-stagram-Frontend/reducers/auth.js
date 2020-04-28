import produce from 'immer';

export const initialState = {};

export const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAMPLE_ACTION: {
        console.log(draft);
      }

      default:
        return {
          ...state,
        };
    }
  });
};

export default reducer;
