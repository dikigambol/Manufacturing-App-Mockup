import { createContext, useReducer } from "react";

export const SheetContext = createContext(undefined);

const initialState = {
    sheetOpen: false,
    sheetProps: {
        title: "",
        desc: "",
        children: {}
    },
    sheetForm: {}
};

const actionReducer = (state, action) => {
    switch (action.type) {
        case "SET_SHEET_OPEN":
            return { ...state, sheetOpen: action.data };

        case "SET_SHEET_PROPS":
            return { ...state, sheetProps: action.data };

        case "SET_SHEET_FORM_VALUE":
            return {
                ...state,
                sheetForm: {
                    ...state.sheetForm,
                    [action.key]: action.value,
                },
            };

        case "RESET_SHEET_FORM":
            return {
                ...state,
                sheetForm: {}
            };

        default:
            return state;
    }
};

export const SheetProvider = ({ children }) => {
    const [state, dispatch] = useReducer(actionReducer, initialState);

    const setSheetOpen = (open) => {
        dispatch({ type: "SET_SHEET_OPEN", data: open });
    };

    const setSheetProps = (props) => {
        dispatch({ type: "SET_SHEET_PROPS", data: props });
    };

    const setSheetFormValue = (key, value) => {
        dispatch({ type: "SET_SHEET_FORM_VALUE", key, value });
    };

    const resetSheetForm = () => {
        dispatch({ type: "RESET_SHEET_FORM" });
    };

    return (
        <SheetContext.Provider
            value={{
                ...state,
                setSheetOpen,
                setSheetProps,
                setSheetFormValue,
                resetSheetForm,
            }}
        >
            {children}
        </SheetContext.Provider>
    );
};
