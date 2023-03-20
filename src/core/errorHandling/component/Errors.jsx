import "./errors.css";
import { useErrors } from "../context/ErrorsRegister";
import { SingleError } from "./SingleError";

function ErrorsList({ errors }) {
  return errors.map(err => <SingleError key={err.id} {...err} />);
}

export function Errors() {
  const { errors } = useErrors();

  return (
    <div className="errors-wrapper">
      <ErrorsList errors={errors} />
    </div>
  )
}