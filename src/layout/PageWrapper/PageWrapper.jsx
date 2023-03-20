import { PageHeader } from "./PageHeader";

export function PageWrapper({
  headerLabel,
  children
}) {
  return (
    <div className="page-wrapper">
      <PageHeader label={headerLabel} />
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  )
}