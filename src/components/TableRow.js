import React from 'react';
import axios from 'axios';

export class TableRow extends React.Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.openEdit = this.openEdit.bind(this);
  }

  delete() {
    console.log("Delete id: " + this.props.obj._id);
    axios.get('http://localhost:4000/gasto/delete/'+this.props.obj._id)
      .then(console.log("deleted"))
      .catch(err => console.log(err));

      const t = this;
      setTimeout(function() {
        t.props.refresh();
      }, 100);
  }

  openEdit() {
    console.log("edit id: " + this.props.obj._id);
    this.props.edit(this.props.obj._id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.valor}</td>
        <td>{this.props.obj.tipo}</td>
        <td>{this.props.obj.data}</td>
        <td><button onClick={this.openEdit} className="btn btn-primary">Edit</button></td>
        <td><button onClick={this.delete} className="btn btn-danger">Delete</button></td>
      </tr>
    );
  }
}
