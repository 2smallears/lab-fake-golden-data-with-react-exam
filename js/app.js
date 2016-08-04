const App = React.createClass({
  getInitialState: function () {
    return {
        isEdit: true,
        items: []
    }
  },
  toggle: function () {
    this.setState({
       isEdit: !this.state.isEdit
    });
  },
  addItem: function (item) {
    const items = this.state.items;
    items.push(item);
    this.setState({items});
  },
  render: function() {
      const isEdit = this.state.isEdit;
      return <div>
          <button onClick={this.toggle}>{isEdit ? "Preview" : "Edit"}</button>
          <div className={isEdit ? "" : "hidden"}>
              <Edit items={this.state.items} onAdd={this.addItem}/>
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
      <Left items={this.props.items}/>
      <Right onAdd={this.props.onAdd}/>
    </div>;
  }
});

const Left = React.createClass({
  render: function () {
      const items = this.props.items.map((item, index) => {
         return <div key={index}>
             <input type={item}/>
         </div>
      })
      return <div>
          {items}
      </div>
  }
});

const Right = React.createClass({
  addItem: function () {
    const item = $("input[name=formItem]:checked").val();
    this.props.onAdd(item);
  },
  render: function() {
    return <div>
      <input type="radio" name="formItem" value="text" />文本
      <input type="radio" name="formItem" value="date" />日期
      <button onClick={this.addItem}>+</button>
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

ReactDOM.render(<App />, document.getElementById('content'));
