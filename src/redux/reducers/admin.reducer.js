const adminReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ADMIN_USERS':
            return action.payload;
        default:
            return state;
    }
};

export default adminReducer;