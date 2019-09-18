import React from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './styles.css';

export class EditModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      valor: '',
      tipo: '',
      data: ''
    }

    this.onChangeValor = this.onChangeValor.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  onChangeValor(e) {
    this.setState({
      valor: e.target.value
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
    axios.post('http://localhost:4000/gasto/update/'+this.props.obj._id, obj)
      .then(res => console.log(res.data));
      this.props.hide();
  }

  refresh() {
    this.setState({
      valor: this.props.obj.valor,
      tipo: this.props.obj.tipo,
      data: this.props.obj.data
    });
  }

  render() {
    return (
      <Modal show={this.props.visible} onHide={this.props.hide} onEnter={this.refresh} >
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label>Valor: </label>
              <input
                type="number"
                className="form-control"
                value={this.state.valor}
                onChange={this.onChangeValor}
              />
            </div>
            <div className="form-group">
              <label>Tipo: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.tipo}
                onChange={this.onChangeTipo}
              />
            </div>
            <div className="form-group">
              <label>Data: </label>
              <input
                type="date"
                className="form-control"
                value={this.state.data}
                onChange={this.onChangeData}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="form-group">
              <input
                type="button"
                className="btn btn-secondary"
                onClick={this.props.hide}
                value="Cancelar"
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Salvar"
                className="btn btn-primary"
              />
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}
