import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TableRow} from './components/TableRow';
import axios from 'axios';
import Create from './components/create.component';
import {EditModal} from './components/EditModal';



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {gasto: [], editmodal: false, open: false};

    this.tabRow = this.tabRow.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onOpenEdit = this.onOpenEdit.bind(this);
    this.onCloseEdit = this.onCloseEdit.bind(this);
    this.toggleNovo = this.toggleNovo.bind(this);

    this.obj = {};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/gasto')
      .then(response => {
        this.setState({gasto: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  toggleNovo() {
    this.setState({
      open: !this.state.open
    })
  }

  refresh() {
    axios.get('http://localhost:4000/gasto')
      .then(response => {
        this.setState({gasto: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.gasto.map(function(obj, i) {
      return <TableRow obj={obj} key={i} refresh={this.refresh} edit={this.onOpenEdit}/>;
    }, this);
  }

  onCloseEdit() {
    this.setState({
      editmodal: false
    });
    console.log("Fechando edit");
    const t = this;
    setTimeout(function() {
      t.refresh();
    }, 100);
  }

  onOpenEdit(id) {
    console.log("id: "+id);
    axios.get('http://localhost:4000/gasto/edit/'+id)
      .then(response => {
        this.obj = response.data;
        console.log(this.obj);
        this.setState({
          editmodal: true
        });
      });
  }

  render() {
    return (
      <div className="container">
        <EditModal visible={this.state.editmodal} hide={this.onCloseEdit} obj={this.obj} refresh={this.refresh} close={this.toggleNovo}/>
        <br /><h1 align="center">Agenda de Gastos</h1><br />
        <div align="center">
          <button align="center" className="btn btn-outline-success" onClick={this.toggleNovo}>+</button>
        </div>
        <Create refresh={this.refresh} open={this.state.open} close={this.toggleNovo}/>
        <table className="table table-striped" style={{marginTop: 20}}>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Data</th>
              <th colSpan="2"> </th>
            </tr>
          </thead>
          <tbody>
            {this.tabRow()}
          </tbody>
        </table>
      </div>
    )
  }
}
