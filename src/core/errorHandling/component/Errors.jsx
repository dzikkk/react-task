import { useCallback } from "react";
import { useErrors } from "../context/ErrorsRegister";

function SingleError({message, id, severity}) {
  const { removeError } = useErrors();

  const onErrorRemove = useCallback(() => {
    removeError(id);
  }, [removeError, id]);

  return (
    <div className={`${severity}-error-element`}>
      <span>{message}</span>
      <button onClick={onErrorRemove}>X</button>
    </div>
  )
}

function ErrorsList({ errors }) {
  return errors.map(err => <SingleError key={err.id} {...err} />);
}

export function Errors() {
  const { errors } = useErrors();

  return (
    <div>
      <ErrorsList errors={errors} />
    </div>
  )
}