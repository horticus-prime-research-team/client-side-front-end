import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      days: [
        {
          year: 2019,
          month: 7,
          day: 28,
          reads: [
            { timeStamp: "2019-07-28T00:00:53.798Z", moistureNum: 300 },
            { timeStamp: "2019-07-28T00:15:53.798Z", moistureNum: 250 },
            { timeStamp: "2019-07-28T00:30:53.798Z", moistureNum: 225 }
          ]
        },
        {
          year: 2019,
          month: 7,
          day: 29,
          reads: [
            { timeStamp: "2019-07-29T00:00:53.798Z", moistureNum: 50 },
            { timeStamp: "2019-07-29T00:15:53.798Z", moistureNum: 75 },
            { timeStamp: "2019-07-29T00:30:53.798Z", moistureNum: 60 }
          ]
        },
        {
          year: 2019,
          month: 7,
          day: 30,
          reads: [
            { timeStamp: "2019-07-30T00:00:53.798Z", moistureNum: 101 },
            { timeStamp: "2019-07-30T00:15:53.798Z", moistureNum: 60 },
            { timeStamp: "2019-07-30T00:30:53.798Z", moistureNum: 320 }
          ]
        },
        {
          year: 2019,
          month: 7,
          day: 31,
          reads: [
            { timeStamp: "2019-07-31T00:00:53.798Z", moistureNum: 0 },
            { timeStamp: "2019-07-31T00:15:53.798Z", moistureNum: 50 },
            { timeStamp: "2019-07-31T00:30:53.798Z", moistureNum: 300 }
          ]
        }
      ]
    };
  }

  renderTableData() {
    return this.state.days.map((days, index) => {
      const { id, day, month, reads } = days; //destructuring
      return (
        <tr key={index}>
          <td>
            {id}
            {month}/{day}
          </td>
          <td>
            <span onClick={e => console.log(days)}>{reads[0].moistureNum}</span>
          </td>
          <td>
            <span onClick={e => console.log(e.target)}>
              {reads[1].moistureNum}
            </span>
          </td>
          <td>
            <span onClick={e => console.log(e.target)}>
              {reads[2].moistureNum}
            </span>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <>
        <th>Day</th>
        <th>00:00</th>
        <th>00:15</th>
        <th>00:30</th>
      </>
    );
  }

  getDatafromdb = e => {
    e.preventDefault();

    // Api db request AKA results then...
    let incomingData = {
      year: 2019,
      month: 7,
      day: 28,
      reads: [
        { timeStamp: "2019-07-30T00:00:53.798Z", moistureNum: 300 },
        { timeStamp: "2019-07-30T00:15:53.798Z", moistureNum: 250 },
        { timeStamp: "2019-07-30T00:30:53.798Z", moistureNum: 225 }
      ]
    };

    let newTime = incomingData.reads.reduce((acc, curr) => {
      curr = new Date(curr.timeStamp);
      curr = `${curr.getHours()}:${curr.getMinutes()}`;
      acc.push(curr);
      return acc;
    }, []);

    let newMoistureNum = incomingData.reads.reduce((acc, curr) => {
      curr = curr.moistureNum;
      acc.push(curr);
      return acc;
    }, []);

    this.setState(prevState => ({
      data: {
        labels: newTime,
        datasets: [{ ...prevState.data.datasets[0], data: newMoistureNum }]
      }
    }));
  };

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
      <div>
        <h1 id="title">Moisture Level</h1>
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table; //exporting a component make it reusable and this is the beauty of react
