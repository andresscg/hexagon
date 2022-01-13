const modalAction = {
  showCloseModal: () => {
    return (dispatch, getState) => {
      dispatch({
        type: "modal@@SHOW_MODAL",
      })
    }
  },
  HandleLoginRegisterModal: () => {
    return (dispatch, getState) => {
      dispatch({
        type: "modal@@SWITCH_MODAL",
      })
    }
  },
}
export default modalAction
