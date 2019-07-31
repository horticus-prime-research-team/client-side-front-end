import React from "react";
import DATA from "./data.json";

import "./table.scss"

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],

    };
  }

  renderTableData() {
    return this.state.days.map((days, index) => {
      const { id, day, month, reads } = days;
      return (
        <tr key={index}>
          <td>
            {id}
            {month}/{day}
          </td>
          <td>{reads[0].moistureNum}</td>
          <td>{reads[1].moistureNum}</td>
          <td>{reads[2].moistureNum}</td>
          <td>{reads[3].moistureNum}</td>
          <td>{reads[4].moistureNum}</td>
          <td>{reads[5].moistureNum}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <>
        <th>Day</th>
        <th>00:00</th>
        <th>04:00</th>
        <th>08:00</th>
        <th>12:00</th>
        <th>16:00</th>
        <th>20:00</th>
      </>
    );
  }

  getDatafromdb = e => {
    e.preventDefault();
    this.setState({days: DATA.DAYS})
  };

  render() {
    return (
      <div>
        <h1 id="title">Moisture Level</h1>
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        <form onSubmit={e => this.getDatafromdb(e)}>
          <input type="Submit" />
        </form>
      </div>
    );
  }
}

export default Table;
