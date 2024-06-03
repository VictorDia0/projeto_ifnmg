const sidebarReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return { ...state, isSidebarOpen: !state.isSidebarOpen };
        case "TOGGLE_SIDEBAR_EXPANSION":
            return { ...state, isSidebarExpanded: !state.isSidebarExpanded };
        default:
            throw new Error(`No matching "${action.type}" action type`);
    }
};

export default sidebarReducer;