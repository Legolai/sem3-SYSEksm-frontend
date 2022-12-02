import { useMemo, useReducer } from "react";

interface ValidationElement {
  expression: () => boolean;
  inputName: string;
  msg: string;
}

type Action = {
  type: "doValidation";
  inputName?: string;
  validationItems: ValidationElement[];
} | {
  type: "reset";
};


function validationReducer(state: { [key: string]: string[]; }, action: Action): { [key: string]: string[]; } {
  switch (action.type) {
    case "doValidation": {
      const todo = (action.inputName && action.inputName.length != 0) ? action.validationItems.filter(i => i.inputName === action.inputName) : action.validationItems;
      let curr = state;
      for (const item of todo) {
        if (item.expression()) {
          const array = curr[item.inputName] || [];
          array.push(item.msg);
          curr = { ...curr, [item.inputName]: array };
        }
      }
      return { ...state, ...curr };
    }
    case "reset": {
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}


function useValidator(validationItems: ValidationElement[]) {
  const [validationState, validationDispatch] = useReducer(validationReducer, {});
  const validator = useMemo(() => ({ state: validationState, dispatch: validationDispatch }), [validationState]);

  const doValidation = (inputName?: string) => {
    validator.dispatch({
      type: "doValidation",
      inputName: inputName,
      validationItems: validationItems
    });

  };

  const getErrorMsg = (inputName: string) => {
    const errors = validator.state[inputName];
    return (errors && errors.length > 0) ? errors[0] : "";
  };

  const resetValidation = () => {
    validator.dispatch({ type: "reset" });
  };


  const isOk = () => {
    return Object.keys(validator.state).length == 0;
  };

  return {
    validationState: validator.state,
    resetValidation,
    doValidation,
    getErrorMsg,
    isOk
  };
};

export { useValidator };