import React from 'react';
import Table from 'react-bootstrap/Table';

class Atividades extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projetos : []
        }

        this.atividade = {
            atividades : []
        }
    }

    componentDidMount() {

        fetch("http://localhost/modelo/projeto/getall")
        .then(result => result.json())
        .then(dados => 
            this.setState({projetos : dados}
        ));
    }

    render (){

        return (
    
            <div>
                <h4 className="title">Lista de Projetos</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descricao</th>
                            <th>Atividades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.projetos.map((projeto) =>                                                                            
                                <tr>
                                    <td>{projeto.id}</td>
                                    <td>{projeto.descricao}</td>
                                    <td>{projeto.atividades}</td>
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