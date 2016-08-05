const App = React.createClass({
  getInitialState: function () {
    return {
      isEdit: true,
      items: []
    }
  },
  add: function (item) {
    const items = this.state.items;
    items.push(item);
    this.setState({items});
  },
  delete: function (index) {
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({items});
  },
  render: function() {
    return <div>
      <div className="row">
        {this.props.children && React.cloneElement(this.props.children, {
          items: this.state.items,
          onAdd: this.add,
          onDelete: this.delete
        })}
      </div>
    </div>;
  }
});
const Edit = React.createClass({
  render: function() {
    return <div className="row">
      <ReactRouter.Link to="/Preview">
        Preview
      </ReactRouter.Link>
      <div className="col-md-6" id="left">
        <Left items={this.props.items} onDelete={this.props.onDelete}/>
      </div>
      <div className="col-md-6" id="right">
        <Right onAdd={this.props.onAdd}/>
      </div>
    </div>;
  }
});
const Left = React.createClass({
  delete: function (index) {
    this.props.onDelete(index);
  },
  render: function() {
    const items = this.props.items.map((item, index) => {
      return <div key={index} className="item">
        <input type={item} />
        <button onClick={this.delete.bind(this, index)} className="glyphicon glyphicon-minus btn btn-default"></button>
      </div>
    })
    return <div>
      {items}
    </div>;
  }
});
const Right = React.createClass({
  add: function () {
    const item = $("input[name=item]:checked").val();
    this.props.onAdd(item);
  },
  render: function() {
    return <div>
      <input type="radio" name="item" value="text"/>text
      <input type="radio" name="item" value="date"/>date
      <button onClick={this.add} className="glyphicon glyphicon-plus btn btn-primary" id="add-btn"></button>
    </div>;
  }
});
const Preview = React.createClass({
  render: function() {
    const items = this.props.items.map((item, index) => {
      return <div key={index} className="item">
        <input type={item} />
      </div>
    })
    return <div id="preview">
      <ReactRouter.Link to="/Edit">
        Edit
      </ReactRouter.Link>
      <div id="result">
        {items}
      </div>
      <button className="btn btn-primary" id="submit">Submit</button>
    </div>;
  }
});
ReactDOM.render(
    <ReactRouter.Router>
      <ReactRouter.Route path="/" component={App}>
        <ReactRouter.IndexRoute component={Edit}/>
        <ReactRouter.Route path="Preview" component={Preview} />
        <ReactRouter.Route path="Edit" component={Edit} />
      </ReactRouter.Route>
    </ReactRouter.Router>
    , document.getElementById('content'));
