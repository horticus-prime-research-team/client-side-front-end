import React from "react";
import DATA from "./data.json";
import superagent from "superagent";
import * as moment from 'moment';

import "./table.scss"

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],

    };
  }

  handleSubmit = e => {
    e.preventDefault();

    superagent
      .get(`http://localhost:3020/moisture`)
      .query({year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD')})
      .then(response => {
        // console.log('RESPONSE', JSON.parse(response.text)[0].reads);
        let data = JSON.parse(response.text)[0].reads
        this.setState({days: data});
      })
      .catch(err => console.error(err));
  };

  renderTableData() {
    console.log('state', this.state.days);
    return this.state.days.map((day, index) => {
      console.log(day.moistureNumber);
      return (
        <tr key={index}>
          <td>
            {day.timestamp }
          </td>
          <td>{day.moistureNumber}</td>
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
        <form onSubmit={this.handleSubmit}>
          <input type="Submit" />
        </form>
      </div>
    );
  }
}

export default Table;
