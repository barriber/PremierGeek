var React = require('react');


module.exports = React.createClass ({
    getInitialState() {
        return {input: ""};
    },
    handleInputTeam: function(e) {
        this.setState({input: e.target.value});
    },
    addItem: function(e){
        e.preventDefault();
        console.log('adding team', this.state.input);
    },
    render: function() {
        return (
          <div className="team-addItem" >
              <form onsubmit={this.addItem}>
                  <input value={this.state.input} onChange={this.handleInputTeam}/>
                  <button> Add Item</button>
              </form>
          </div>
        );
    }
})