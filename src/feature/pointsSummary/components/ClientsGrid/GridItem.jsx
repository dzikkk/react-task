import './grid.css';

function PointsPerMonth({month, points}) {
  return (
    <p>{month}: <strong>{points} Points</strong></p>
  )
}

function createMonthsSections(pointsPerMonth) {
  return Object
    .keys(pointsPerMonth)
    .map(month => (
      <PointsPerMonth points={pointsPerMonth[month]} month={month} />
    ))
}

export function GridItem({ pointsPerMonth, pointsSum, clientName }) {
  const monthsSection = createMonthsSections(pointsPerMonth);

  return (
    <div className="grid-item">
      <h3>{clientName}</h3>
      {monthsSection}
      <h2>SUM: {pointsSum}</h2>
    </div>
  )
}