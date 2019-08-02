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

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit = e => {
    superagent
      .get(`https://polar-springs-72876.herokuapp.com/moisture`)
      .query({year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD')})
      .then(response => {
        // console.log('RESPONSE', JSON.parse(response.text)[0].reads);
        let data = JSON.parse(response.text)[0].reads
        this.setState({days: data});
      })
      .catch(err => console.error(err));
  };

  renderTableData() {
    return this.state.days.map((day, index) => {
      return (
        <tr className='tr' key={index}>
          <td className='td'>
           {moment(day.timestamp).format('YYYY')}
          </td>
          <td className='td'>
           {moment(day.timestamp).format('MM')}
          </td>
          <td className='td'>
           {moment(day.timestamp).format('DD')}
          </td>
          <td className='td'>
           {moment(day.timestamp).format('hh')}:{moment(day.timestamp).format('mm')}
          </td>
          <td className='td'>{day.moistureNumber}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <>
        <th className='th'>Years</th>
        <th className='th'>Months</th>
        <th className='th'>Days</th>
        <th className='th'>Time</th>
        <th className='th'>Data</th>
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
        <p>Displays saved data</p>
        <table className='table'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
