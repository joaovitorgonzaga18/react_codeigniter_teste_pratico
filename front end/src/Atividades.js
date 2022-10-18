import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class Atividades extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            atividades : [],
        }

    }

    componentDidMount() {        
        
        fetch("http://localhost/modelo/atividade/getall")
        .then(result => result.json())
        .then(dados => {
            this.setState({atividades : dados});
        });
        
    }

    render (){       

        return (
            <div className="Box-Lista">
                <h4  className="title">Lista de atividades</h4>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descricao</th>
                            <th>Data de Cadastro</th>
                            <th>Projeto</th>
                        </tr>
                    </thead>
                    <tbody className="listagem">
                        {
                            this.state.atividades.map((atividade) =>
                                <tr>
                                    <td>{atividade.id}</td>
                                    <td>{atividade.descricao}</td>
                                    <td>{atividade.data}</td>
                                    <td>{atividade.projeto.descricao}</td>
                                </tr>                       

                            )
                        }
                    </tbody>
                </Table>    
            </div>
        );

    }

}

export default Atividades;