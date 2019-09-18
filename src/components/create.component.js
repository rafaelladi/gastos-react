import React from 'react';
import axios from 'axios';
import './styles.css';
import {Collapse} from 'react-bootstrap';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      valor: undefined,
      tipo: '',
      data: ''
    }
  }

  onChangeValor(e) {
    this.setState({
      valor: parseFloat(e.target.value)
    });
  }

  onChangeTipo(e) {
    this.setState({
      tipo: e.target.value
    });
  }

  onChangeData(e) {
    this.setState({
      data: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      valor: this.state.valor,
      tipo: this.state.tipo,
      data: this.state.data
    };
    console.log("Submit");
    console.log(obj);
    axios.post('http://localhost:4000/gasto/add', obj)
      .then(res => {
        console.log(res.data);
        console.log(res.status);
      });

    this.setState({
      valor: '',
      tipo: '',
      data: ''
    })

    //this.props.close(); PARA FECHAR APOS NOVA INSERCAO
    const t = this;
    setTimeout(function() {
      t.props.refresh();
    }, 100);
  }

  render() {
    return (
      <Collapse in={this.props.open}>
        <div style={{marginTop: 10}}>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Valor: </label>
              <input type="number" className="form-control" value={this.state.valor} onChange={this.onChangeValor} />
            </div>
            <div className="form-group">
              <label>Tipo: </label>
              <input type="text" className="form-control" value={this.state.tipo} onChange={this.onChangeTipo} />
            </div>
            <div className="form-group">
              <label>Data: </label>
              <input type="date" className="form-control" value={this.state.data} onChange={this.onChangeData} />
            </div>
            <div className="form-group">
              <input type="submit" value="Salvar" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </Collapse>
    );
  }
}
