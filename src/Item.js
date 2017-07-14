import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';


class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon_baseUrl : 'https://steamcommunity-a.akamaihd.net/economy/image/',
      icon_postfix : ''
    }
    this.state.rarity = this.props.data.tags.reduce((a,b)=>b.category==="Rarity" ? b.name: a)
    this.state.className = "img-fluid img-thumbnail " + this.state.rarity
    this.state.checked = false;
    
    this.divCheckBoxHandler = this.divCheckBoxHandler.bind(this);

  }

  divCheckBoxHandler(event) {
    this.setState({
      checked : !this.state.checked
    });

  }
  componentDidMount() {

  }

  componentWillUnmount() {
  }
  render() {
    return (
      this.props.data.tradable ? 
      <div onClick={this.divCheckBoxHandler} 
           className={"col col-md-2 col-lg-2 col-sm-6 col-12 Item " + (this.state.checked ? "Checked": "")}>
        <img alt={this.props.data.name} src={this.state.icon_baseUrl + this.props.data.icon_url + 
          this.state.icon_postfix} 
        className={this.state.className} />
        <input  className="hidden-xl-down" 
                type="checkbox" 
                checked={this.state.checked}
                name="items[]" 
                value={this.props.data.assetid + '_' + this.props.data.instanceid} />
      </div>  : false
    );
  }
}

export default Item;
