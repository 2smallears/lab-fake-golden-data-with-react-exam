const App = React.createClass({
  getInitialState: function () {
    return {
      isEdit: true,
      items: []
    }
  },
  toggle: function () {
    this.setState({isEdit: !this.state.isEdit});
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
    const isEdit = this.state.isEdit;
    return <div>
      <div className="row">
        <button className="btn btn-primary center-block" onClick={this.toggle}>{isEdit ? "Preview" : "Edit"}</button>
      </div>
      <div className="row">
        <div className={isEdit ? "" : "hidden"}>
          <Edit onAdd={this.add} items={this.state.items} onDelete={this.delete}/>
        </div>
        <div className={isEdit ? "hidden" : ""}>
          <Preview items={this.state.items}/>
        </div>
      </div>
    </div>;
  }
});
const Edit = React.createClass({
  render: function() {
    return <div className="row">
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
      <div id="result">
        {items}
      </div>
      <button className="btn btn-primary" id="submit">Submit</button>
    </div>;
  }
});
ReactDOM.render(<App />, document.getElementById('content'));
