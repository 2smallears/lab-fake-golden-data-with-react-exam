const App = React.createClass({
  getInitialState: function () {
    return {
      isEdit: true
    }
  },
  toggle: function () {
    this.setState({isEdit: !this.state.isEdit});
  },
  render: function() {
    const isEdit = this.state.isEdit;
    return <div>
      <button onClick={this.toggle}>{isEdit ? "Preview" : "Edit"}</button>
      <div className={isEdit ? "" : "hidden"}>
        <Edit />
      </div>
      <div className={isEdit ? "hidden" : ""}>
        <Preview/>
      </div>
    </div>;
  }
});

const Edit = React.createClass({
  render: function() {
    return <div>
      Edit
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

ReactDOM.render(<App/>, document.getElementById('content'));