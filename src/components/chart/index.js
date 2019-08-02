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
            label: "Moisture Level",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
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
      .get(`https://polar-springs-72876.herokuapp.com/moisture`)
      .query({year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD')})
      .then(response => {
        // console.log('RESPONSE', JSON.parse(response.text)[0].reads);
        let data = JSON.parse(response.text)[0].reads
        this.setState({reading: data});
        console.log('READING', this.state.reading);
        this.getDataFromDB();
      })
      .catch(err => console.error(err));
  };

  getDataFromDB = e => {
    let newTime = this.state.reading.reduce((acc, curr) => {
      // console.log(curr.timestamp);
      // curr = new Date(curr.timeStamp);
      curr = `${moment(curr.timestamp).format('HH')}:${moment(curr.timestamp).format('mm')}`;
      acc.push(curr);
      return acc;
    }, []);

    let newMoistureNum = this.state.reading.reduce((acc, curr) => {
      curr = curr.moistureNumber;
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
        {/* <form onSubmit={e => this.getDatafromdb(e)}>
          <input type="Submit" />
        </form> */}
      </div>
    );
  }
}
