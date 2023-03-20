import { useCallback } from "react";
import { useErrors } from "../context/ErrorsRegister";

export function SingleError({message, id, severity}) {
  const { removeError } = useErrors();

  const onErrorRemove = useCallback(() => {
    removeError(id);
  }, [removeError, id]);

  return (
    <div className={`error-element ${severity}`}>
      <button className="remove-error-btn" onClick={onErrorRemove}>CLOSE</button>
      <span className="error-message">Error: {message}</span>
    </div>
  )
}
