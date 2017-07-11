import React, { Component } from 'react';
//import $ from 'jquery';
//import Bootstrap from 'bootstrap';
import axios from 'axios';
import Item from './Item'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    axios.get(`http://localhost/data.json`)
      .then(res => {
        //const posts = res.rgDescriptions.children.map(obj => obj.rgDescriptions);
        const posts = Object.keys(res.data.rgDescriptions).map(obj => res.data.rgDescriptions[obj]);
        console.log(res.data.rgDescriptions);
        // console.log($().jquery);
        this.setState({ posts });
      });
  }

  
  render() {
    return (
      <div className="row">
      {this.state.posts.map((post) => <Item data={post} / >)}
      </div>
    );
  }
}

export default App;
