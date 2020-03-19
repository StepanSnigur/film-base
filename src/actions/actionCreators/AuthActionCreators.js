export let setUserData = (userData, sessionID) => ({
    type: 'SET_USER_DATA',
    payload: {
        ...userData,
        ...sessionID
    }
})
export let setUserLoading = isLoading => ({
    type: 'SET_USER_LOADING',
    payload: isLoading
})
export let clearUserData = () => ({
    type: 'CLEAR_USER_DATA'
})