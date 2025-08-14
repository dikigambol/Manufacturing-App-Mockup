import { createContext, useMemo, useReducer } from "react";

export const AlertContext = createContext(undefined);

const initialState = {
    time: 5000,
    status: 'success',
    message: '',
};

const actionReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return { ...state, ...action.data };
        case 'HIDDEN':
            return {...action.data};
        default:
            return state;
    }
};

export const AlertProvider = ({ children }) => {
    const [state, dispatch] = useReducer(actionReducer, initialState);

    const alert = (data) => {
        data.time = data.time * 1000
        dispatch({ type: 'SHOW', data });
    };
    
    const hidden = () => {
        dispatch({ type: 'HIDDEN', initialState});
    };

    useMemo(() => {
        setTimeout(() => {
            hidden()
        }, state.time)
    }, [state.message]);

    return (
        <AlertContext.Provider value={{ ...state, alert }}>
            {children}
        </AlertContext.Provider>
    );
};
