const DEFAULT_PAGE_HEADER = 'React Page';

export function PageHeader({label = DEFAULT_PAGE_HEADER}) {
  return (
    <div className="page-header">
      <h1>{label}</h1>
    </div>)
}