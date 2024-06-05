import React, { createContext, useReducer } from 'react';
import reducer from "../reducer/sidebarReducer";
import PropTypes from 'prop-types';

const initialState = {
    isSidebarOpen: false,
    isSidebarExpanded: true,
}

export const SidebarContext = createContext({});


export const SidebarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const toggleSidebar = () => {
        dispatch({ type: "TOGGLE_SIDEBAR" })
    }
    const toggleSidebarExpansion = () => dispatch({ type: 'TOGGLE_SIDEBAR_EXPANSION' });
    return (
        <SidebarContext.Provider value = {{
            ...state,
            toggleSidebar,
            toggleSidebarExpansion
        }}>
            { children }
        </SidebarContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebarContext = () => React.useContext(SidebarContext);


SidebarProvider.propTypes = {
    children: PropTypes.node
}
