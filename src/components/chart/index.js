import React from "react";
import { Line } from "react-chartjs-2";
import superagent from "superagent";
import * as moment from 'moment';

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: "Moisture Level Day 1",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [],
            fill: false
          },
          {
            label: "Moisture Level Day 2",
            backgroundColor: "rgb(42,168,255)",
            borderColor: "rgb(42,168,255)",
            data: [],
            fill: false
          }
        ]
      },
      reading: []
    };
  }

  componentDidMount() {
    console.log('handleSubmit');
    this.handleSubmit();
  }

  handleSubmit = e => {
    superagent
      .get(`https://polar-springs-72876.herokuapp.com/moistures`)
      .then(response => {
        // console.log('RESPONSE', JSON.parse(response.text)[0].reads);
        let data1 = response.body[0];
        let data2 = response.body[1];
        this.setState({reading: response.body});
        this.getDataFromDB([data1, data2]);
      })
      .catch(err => console.error(err));
  };

  getDataFromDB = (dataArr) => {
    let arr = [];
    for (let i = 0; i < dataArr.length; i++) {
      let newTime = dataArr[i].reads.reduce((acc, curr) => {
        // console.log(curr.timestamp);
        // curr = new Date(curr.timeStamp);
        curr = `${moment(curr.timestamp).format('HH')}:${moment(curr.timestamp).format('mm')}`;
        acc.push(curr);
        return acc;
      }, []);

      let newMoistureNum = dataArr[i].reads.reduce((acc, curr) => {
        curr = curr.moistureNumber;
        acc.push(curr);
        return acc;
      }, []);

      arr.push([newTime, newMoistureNum]);
    }

    this.setChartData(arr);
  };

  setChartData(arr) {
    this.setState(prevState => ({
      data: {
        labels: arr[0][0],
        datasets: [
          {
            label: "Moisture Level Day 1",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: arr[0][1],
            fill: false
          },
          {
            label: "Moisture Level Day 2",
            backgroundColor: "rgb(42,168,255)",
            borderColor: "rgb(42,168,255)",
            data: arr[1][1],
            fill: false
          }
        ]
      }
    }));
  }




  render() {
    return (
      <div>
        <Line data={this.state.data} />
        {/* <form onSubmit={e => this.getDatafromdb(e)}>
          <input type="Submit" />
        </form> */}
      </div>
    );
  }
}
