import './grid.css';

function PointsPerMonth({month, points}) {
  return (
    <p data-testid="points-per-month">{month}: <strong>{points} Points</strong></p>
  )
}

function createMonthsSections(pointsPerMonth) {
  return Object
    .keys(pointsPerMonth)
    .map(month => (
      <PointsPerMonth
        key={month}
        points={pointsPerMonth[month]}
        month={month}
      />
    ))
}

export function GridItem({ pointsPerMonth, pointsSum, clientName }) {
  const monthsSection = createMonthsSections(pointsPerMonth);

  return (
    <div className="grid-item" data-testid="transaction-item">
      <h3 data-testid="name">{clientName}</h3>
      {monthsSection}
      <h2 data-testid="points">SUM: {pointsSum}</h2>
    </div>
  )
}