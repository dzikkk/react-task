import { createContext, useContext, useMemo, useReducer } from "react";

const SEVERITY = { critical: 'critical', warning: 'warning' };

const ErrorsRegisterContext = createContext({});

function generateErrorId(message, severity) {
  const severityIdPart = severity === SEVERITY.critical? 'C': 'W';
  const msgIdPart = message.replaceAll(/\s+/g, '').substring(0, 5);

  return `${severityIdPart}${msgIdPart}`;
}

const ERRORS_ACTION = {
  add: 'addError',
  remove: 'removeError',
}

function addErrorIfNotDuplicated(errors, errorToAdd) {
  const isMessageDuplicated = errors.some(({message}) => errorToAdd.message === message);
  if (isMessageDuplicated) {
    return errors;
  }

  return [
    ...errors,
    { 
      severity: errorToAdd.severity,
      message: errorToAdd.message,
      id: generateErrorId(errorToAdd.message, errorToAdd.severity),
    }
  ];
}

const errorsReducer = (state, action) => {
  switch (action.type) {
    case ERRORS_ACTION.add:
      return addErrorIfNotDuplicated(state, action);
    case ERRORS_ACTION.remove:
      return state.filter(({id}) => id !== action.id);
    default:
      return state;
  }
}

export function ErrorsRegisterProvider({children}) {
  const [errors, dispatch] = useReducer(errorsReducer, []);

  const actions = useMemo(() => {
    const addError = (message, severity = SEVERITY.critical) => {
      dispatch({ type: ERRORS_ACTION.add, message, severity })
    }

    const removeError = (id) => {
      dispatch({ type: ERRORS_ACTION.remove, id })
    }

    return { addError, removeError }
  }, []);

  return (
    <ErrorsRegisterContext.Provider value={{ ...actions, errors }}>
      {children}
    </ErrorsRegisterContext.Provider>
  )
}

export const useErrors = () => useContext(ErrorsRegisterContext);