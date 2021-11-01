import { createContext, useReducer, useMemo, useContext} from "react";

const ModalContext = createContext();

const initialModalState = false;

function ModalReducer(state, action) {
  switch (action.type) {
    case "SET_MODAL": {
      return action.payload;
    }
    case "UNSET_MODAL": {
      return initialModalState;
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export function ModalProvider(props) {
  const [state, dispatch] = useReducer(ModalReducer, initialModalState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <ModalContext.Provider value={value} {...props} />
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(`useModal must be used within a ModalProvider`);
  }
  const [state, dispatch] = context;

  const setModal = (payload) => {
    dispatch({ type: "SET_MODAL", payload })
  };

  const closeModal = () => {
    dispatch({ type: "UNSET_MODAL" })
  };

  return { modal: state, setModal, closeModal };
}
