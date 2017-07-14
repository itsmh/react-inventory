import React, { Component } from 'react';
import Item from './Item'
import fetch from 'node-fetch';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fetched: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }


  componentDidMount() {
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.get(`http://localhost/data.json`)
    //   .then(res => {
    //     const data = Object.keys(res.data.rgDescriptions).map(obj => res.data.rgDescriptions[obj]);
    //     this.setState({ data });
    //   });
  }
  handleFetch(e) {
    e.preventDefault();
    let result = {};
    let data = new FormData(document.querySelector('form'));
    for (var entry of data.entries()) {
      if (/.*\[\]/i.test(entry[0])) {
        result[entry[0]] = result[entry[0]] || [];
        result[entry[0]].push(entry[1]);
      } else {
        result[entry[0]] = entry[1];
      }
    }
    result = JSON.stringify(result);

    fetch('http://localhost:8088/inventory', {
      method: 'POST',
      body: result,
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.ok ? res.json() : false)
      .then(data => data ? this.setState({ data, fetched: true }) : false)
  }


  handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    let result = {};
    let data = new FormData(document.querySelector('#tradeForm'));
    for (var entry of data.entries()) {
      if (/.*\[\]/i.test(entry[0])) {
        entry[0] = entry[0].replace("[]","");
        result[entry[0]] = result[entry[0]] || [];
        result[entry[0]].push(entry[1]);
      } else {
        result[entry[0]] = entry[1];
      }
    }
    result = JSON.stringify(result);

    fetch('http://localhost:8088/trade', {
      method: 'POST',
      body: result,
      headers: { 'Content-Type': 'application/json' },
    });
    // axios.post(`http://172.16.39.57:8088/`, result);
  }


  render() {
    let form = null;
    if (this.state.data.length === 0) {
      form = <form>
        <input type="text" name="user_id" className="form-control" placeholder="steam user id" />
        <input type="submit" value="fetch" className="btn btn-success" onClick={this.handleFetch} />
      </form>
    } else {
      form = null;
    }
    return (
      <div>
        {form}
        <form id="tradeForm" onSubmit={this.handleSubmit} >
          <div className={this.state.fetched ? "row" : "hidden-xl-down"}>
            <div className="col col-md-8 col-lg-8 col-sm-10 col-12">
              <input type="text" name="trade_url"
                className="form-control"
                style={{ width: 400 + 'px' }}
                placeholder="steam trade url" />
            </div>
            <div className="col col-md-4 col-lg-4 col-sm-2 col-12">
              <input className="btn btn-success"
                type="submit" />
            </div>
          </div>
          <div className="row" >
            {this.state.data.map((post) =>
              <Item
                key={post.assetid + '_' + post.instanceid}
                data={post} />)}
          </div>
        </form>
      </div>
    );
  }
}

export default App;
