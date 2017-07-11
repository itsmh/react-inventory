import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon_baseUrl : 'https://steamcommunity-a.akamaihd.net/economy/image/',
      icon_postfix : ''
    }
    this.state.rarity = this.props.data.tags.reduce((a,b)=>b.category=="Rarity" ? b.name: a)
    this.state.className = "img-fluid img-thumbnail " + this.state.rarity
    
  }

  componentDidMount() {

  }
  componentWillUnmount() {
  }
  render() {
    return (
      this.props.data.tradable ? 
      <div className="col col-md-2 col-lg-2 col-sm-6 col-xs-12 Item">
        <img src={this.state.icon_baseUrl + this.props.data.icon_url + 
          this.state.icon_postfix} 
        className={this.state.className} />
      </div>  : false
    );
  }
}

export default Item;
