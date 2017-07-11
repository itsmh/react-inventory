import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon_baseUrl : 'https://steamcommunity-a.akamaihd.net/economy/image/',
      icon_postfix : ''
    }
    this.state.rarity = this.props.data.tags.reduce((a,b)=>b.category=="Rarity" ? b.name: a)
    

  }

  componentDidMount() {

  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="col col-md-2 col-lg-2 col-sm-4 Item {this.state.rarity}">
        <img src={this.state.icon_baseUrl + this.props.data.icon_url + 
          this.state.icon_postfix} 
        className="img-fluid img-thumbnail" />
      </div>
    );
  }
}

export default Item;
