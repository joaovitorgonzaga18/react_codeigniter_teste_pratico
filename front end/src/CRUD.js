import React from 'react';
import {useState, useEffect, useReducer} from 'react';
import {useRef} from 'react';

import Axios from 'axios';
import qs from 'qs';

function CRUD() {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const buscaInput = useRef(null);
    const idAtividade = useRef(null);
    const descAtividade = useRef(null);
    const projetoAtividade = useRef(null);

    const ableEdita = useRef();
    const ableDeleta = useRef();
    const ableLimpa = useRef();
    const ableCadastra = useRef();

    const [showFormBusca, setShowFormBusca] = useState(false);
    const [showFormCadastro, setShowFormCadastro] = useState(false);

    const [options, setOptions] = useState([]);

    const [errorMessage, setMessage] = useState(''); 

    function formBusca() {
        (!showFormBusca) ? setShowFormBusca(true) : setShowFormBusca(false); 
        setShowFormCadastro(false);
    }

    function formCadastro() {
        (!showFormCadastro) ? setShowFormCadastro(true) : setShowFormCadastro(false);
        setShowFormBusca(false); 
    }

    function cadastraAtividade () {

        const params = {
            descricao: descAtividade.current.value,
            id_projeto: projetoAtividade.current.value
        }

        Axios.post('http://localhost/modelo/atividade/create', qs.stringify(params))
        .then(resp => {

            var result = resp.data;

            (result.length === 0) ? setMessage('Não foi possível cadastrar a Atividade!') : setMessage('Atividade cadastrada com sucesso!', result);

            limpaCampos();

        })
        
        window.location.reload(false);

    }

    function buscaAtividade() {

        console.log(buscaInput.current.value)

        const params = {
          id: buscaInput.current.value
        }

        console.log(params.id);
    
        Axios.post('http://localhost/modelo/atividade/get', qs.stringify(params))
        .then(resp => {

            var result = resp.data;
            console.log('result', result);
          
            if (result.length === 0) {

                setMessage('Atividade não encontrada!');
                return;

            } else {
            
            setMessage('Atividade encontrada!');

            idAtividade.current.value = result.id;
            descAtividade.current.value = result.descricao;
            projetoAtividade.current.value = result.projeto.id;

            }
            

        });

    }

    function editaAtividade () {

        const params = {
            id: idAtividade.current.value,
            descricao: descAtividade.current.value,
            id_projeto: projetoAtividade.current.value
        }

        Axios.post('http://localhost/modelo/atividade/update', qs.stringify(params))
        .then(resp => {

            var result = resp.data;

            (result.length === 0) ? setMessage('Não foi possivel editar a Atividade!') : setMessage('Atividade editada com sucesso!', result);

            limpaCampos();

        })
        
        window.location.reload(false);

    }

    function deletaAtividade () {

        const params = {
            id: idAtividade.current.value
        }

        Axios.post('http://localhost/modelo/atividade/delete', qs.stringify(params))
        .then(resp => {

            var result = resp.data;

            (result.length === 0) ? setMessage('Não foi possível deletar a Atividade!') : setMessage('Atividade deletada com sucesso!', result);

            limpaCampos();

        })

        window.location.reload(false);

    }

    useEffect(() => {

        async function buscaProjetos() {

            const { data } = await Axios.get("http://localhost/modelo/projeto/getall");
            const results = [];

            data.forEach((projeto) => {
                results.push({
                    id: projeto.id,
                    descricao: projeto.descricao,
                });                    
            });

            setOptions([
                {key: 'Selecione um projeto', value: 'Selecione um projeto'},
                ...results
            ])
        }

        buscaProjetos();

    }, []);

    function limpaCampos() {        
        
        idAtividade.current.value = '';
        descAtividade.current.value = '';
        projetoAtividade.current.value = '';
        if (buscaInput.current != null) { buscaInput.current.value = '' }

    }

    return (
        <div>
            <h2 className="title">Gerenciar Atividades</h2>
            <small>{errorMessage}</small><br></br>
            <button className="botaoGerencia" onClick={() => formBusca()}>Pesquisar</button>
            <button className="botaoGerencia" onClick={() => formCadastro()}>Cadastrar</button>

            {showFormBusca && <div>
                <div className="formBusca">
                <label>Informe ID da Atividade </label><br></br>
                <input type="number" className="formInput" ref={buscaInput}></input>
                <button type="submit" className="botaoGerencia" onClick={() => buscaAtividade()}>Buscar</button>
            </div>
            <div className="formEditaDeleta">
                <input type="hidden" className="formInput" id="id" ref={idAtividade}></input>
                <label className="nomeInput"> Descrição: </label><br></br><input type="text" defaultValue="" className="formInput" id="descricao" ref={descAtividade} ></input><br></br>
                <label className="nomeInput"> Projeto: </label><br></br><select ref={projetoAtividade} className="formInput" >
                    {
                        options.map((option) =>{
                            
                            return (

                                <option value={option.id}>{option.descricao}</option>

                            );

                        })  
                    }
                </select>
                    <br></br>
                <button className="botaoGerencia" ref={ableEdita} onClick={() => editaAtividade()} >Editar</button>
                <button className="botaoGerencia" ref={ableDeleta} onClick={() => deletaAtividade()} >Deletar</button>   
                <button className="botaoGerencia" ref={ableLimpa} onClick={() => limpaCampos()} >Limpar</button>   
                
            </div>
            </div>}

            {showFormCadastro && <div>
                <div className="formBusca">
            </div>
            <div className="formEditaDeleta">
                <input type="hidden" className="formInput" id="id" ref={idAtividade}></input>
                <label className="nomeInput"> Descrição: </label><br></br><input type="text" defaultValue="" className="formInput" id="descricao" ref={descAtividade}></input><br></br>
                <label className="nomeInput"> Projeto: </label><br></br><select ref={projetoAtividade} className="formInput">
                    {
                        options.map((option) =>{
                            
                            return (

                                <option value={option.id}>{option.descricao}</option>

                            );

                        })  
                    }
                </select>
                    <br></br>
                <button className="botaoGerencia" ref={ableCadastra} onClick={() => cadastraAtividade()} >Cadastrar</button>   
                <button className="botaoGerencia" ref={ableLimpa} onClick={() => limpaCampos()} >Limpar</button>  
            </div>
            </div>}

        </div>
    );

}

export default CRUD;
