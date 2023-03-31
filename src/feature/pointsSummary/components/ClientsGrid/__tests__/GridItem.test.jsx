import { render } from "@testing-library/react";
import { GridItem } from "../GridItem";

const oneMonthData = {"01/2023": "50"};
const threeMonthsData = {
  "01/2023": "50",
  "02/2023": "25",
  "03/2023": "75",
};

const fiveMonthsData = {
  "01/2023": "50",
  "02/2023": "60",
  "03/2023": "70",
  "04/2023": "80",
  "05/2023": "90",
};

const itemMockedProps = {
  clientName:"Test Client name",
  pointsPerMonth: threeMonthsData,
  pointsSum: 150,
}

describe("COMPONENT ClientsGrid / GridItem", () => {
  it('renders component without issues', () => {
    const { container } = render(<GridItem {...itemMockedProps} />);

    expect(container).not.toBeEmptyDOMElement()
  });

  it('lists points in lines equals to months passed in pointsPerMonth props', () => {
    const testPropsWithOneMonth = {
      ...itemMockedProps,
      pointsPerMonth: oneMonthData,
    }

    const testPropsWithFiveMonths = {
      ...itemMockedProps,
      pointsPerMonth: fiveMonthsData
    }
    
    const { rerender, getAllByTestId } = render(
      <GridItem {...testPropsWithOneMonth} />
    );

    expect(getAllByTestId("points-per-month")).toHaveLength(1);

    rerender(<GridItem {...testPropsWithFiveMonths} />)

    expect(getAllByTestId("points-per-month")).toHaveLength(5);
  });

  it('displays labels with proper data', () => {
    const expectedName = itemMockedProps.clientName;
    const expectedFirstMonth = "01/2023: 50 Points";
    const expectedSecondMonth = "02/2023: 25 Points";
    const expectedSum = "SUM: 150";
    
    const { getAllByTestId, getByTestId } = render(
      <GridItem {...itemMockedProps} />
    );

    expect(getByTestId('name').textContent).toEqual(expectedName);
    expect(getAllByTestId('points-per-month')[0].textContent).toEqual(expectedFirstMonth);
    expect(getAllByTestId('points-per-month')[1].textContent).toEqual(expectedSecondMonth);
    expect(getByTestId('points').textContent).toEqual(expectedSum);
  });
});