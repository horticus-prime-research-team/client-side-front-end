import React from "react";
import { Line } from "react-chartjs-2";

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Moisture Level",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      }
    };
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
    return (
      <div>
        <Line data={this.state.data} />
        <form onSubmit={e => this.getDatafromdb(e)}>
          <input type="Submit" />
        </form>
      </div>
    );
  }
}
