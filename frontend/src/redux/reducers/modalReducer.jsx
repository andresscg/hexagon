const initialState = {
  showModal: false,
  registerLogin: false,
}

function modalReducer(state = initialState, {payload, type}) {
  switch (type) {
    case "modal@@SHOW_MODAL":
      return {
        ...state,
        showModal: !state.showModal,
      }
    case "modal@@SWITCH_MODAL":
      return {
        ...state,
        registerLogin: !state.registerLogin,
      }

    default:
      return state
  }
}

export default modalReducer
