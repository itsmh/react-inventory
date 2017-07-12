import React, { Component } from 'react';
import axios from 'axios';
import Item from './Item'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.get(`http://localhost/data.json`)
      .then(res => {
        const posts = Object.keys(res.data.rgDescriptions).map(obj => res.data.rgDescriptions[obj]);
        this.setState({ posts });
      });
  }

  handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    let result = {};
    let data = new FormData(document.querySelector('form'));
    for (var entry of data.entries())
    {
        if(/.*\[\]/i.test(entry[0])) {
          result[entry[0]] = result[entry[0]] || [];
          result[entry[0]].push(entry[1]);
        }else {
          result[entry[0]] = entry[1];
        }
    }
    result = JSON.stringify(result)

    axios.post(`http://172.16.39.57:8088/`,result);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div className="row">
          {this.state.posts.map((post) => 
            <Item 
              key={post.classid + '_' + post.instanceid} 
              data={post} / >)}
        </div>
        <input className="btn btn-success" type="submit" />
      </form>
    );
  }
}

export default App;
