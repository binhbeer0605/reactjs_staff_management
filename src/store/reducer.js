import { SET_SHOW_HIDE_MENU } from './constants';

const initState = {
    showMenu: false,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SHOW_HIDE_MENU:
            return {
                showMenu: !action.payload,
            };
        default:
            throw new Error('Invalid action');
    }
}

export { initState };
export default reducer;
