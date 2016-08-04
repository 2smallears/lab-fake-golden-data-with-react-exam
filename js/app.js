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
      <button onClick={this.toggle}>{isEdit ? "Preview" : "Edit"}</button>
      <div className={isEdit ? "" : "hidden"}>
        <Edit onAdd={this.add} items={this.state.items} onDelete={this.delete}/>
      </div>
      <div className={isEdit ? "hidden" : ""}>
        <Preview />
      </div>
    </div>;
  }
});

const Edit = React.createClass({
  render: function() {
    return <div>
      <Left items={this.props.items} onDelete={this.props.onDelete}/>
      <Right onAdd={this.props.onAdd}/>
    </div>;
  }
});

const Left = React.createClass({
  delete: function (index) {
    this.props.onDelete(index);
  },
  render: function() {
    const items = this.props.items.map((item ,index) => {
      return <div key={index}>
        <input type={item} />
        <button onClick={this.delete.bind(this, index)}>X</button>
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
      <input type="radio" name="item" value="text" />文本
      <input type="radio" name="item" value="date" />日期
      <button onClick={this.add}>+</button>
    </div>;
  }
});
const Preview = React.createClass({
  render: function() {
    return <div>
      Preview
    </div>;
  }
});

ReactDOM.render(<App />,document.getElementById('content'));