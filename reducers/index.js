const initialState = {
  totalCorrect: 0,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TOTAL_CORRECT':
      return { ...state, totalCorrect: state.totalCorrect + action.payload }
    default:
      return state
  }
}
