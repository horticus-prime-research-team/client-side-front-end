import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../components/table';

describe("`<Table />` component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table />, div);
  });

  it("renders a table as expected", () => {
    const app = global.shallow(<Table />);

    expect(app.find("tbody").exists()).toBeTruthy();
  });

  it("renders title 'Moisture Level'", () => {
    const app = global.shallow(<Table />);

    expect(app.find("h1").text()).toEqual('Moisture Level');
  });

  it("renders table header as expected", () => {
    const app = global.shallow(<Table />);

    expect(app.find("th").exists()).toBeTruthy();
  });

  it("renders table rows as expected", () => {
    const app = global.shallow(<Table />);

    expect(app.find("tr").exists()).toBeTruthy();
  });
});