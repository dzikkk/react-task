import './loading.css'

export function Loading() {
  return (
    <div className="loader-wrapper" data-testid="loading-spinner">
      <div className="circle circle-1" />
      <div className="circle circle-2" />
      <div className="circle circle-3" />
    </div>
  )
}