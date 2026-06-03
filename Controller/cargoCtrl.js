import Cargo from '../Model/cargo.js';
export default class CargoCtrl{
    async gravar(requisicao, resposta){
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const cargoNome = requisicao.body.cargo;
            const descricao = requisicao.body.descricao;

            if(cargoNome && descricao){
                const cargos = new Cargo(null, cargoNome, descricao);

                cargos.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Cargo cadastrado com sucesso!"
                    });
                }).catch(erro => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Nao foi possivel cadastrar o cargo, tente mais tarde! Erro: " + erro.message
                    });
                });
            }else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os campos devem ser preenchidos!"
                });
            }
        }else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido. Consulte a documentação da API."
            });
        }
    }

    async editar(requisicao, resposta){
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")){
            const id = requisicao.params.id;
            const cargoNome = requisicao.body.cargo;
            const descricao = requisicao.body.descricao;

            if(id > 0 && cargoNome && descricao){
                const cargos = new Cargo(id, cargoNome, descricao);

                cargos.editar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cargo atualizado com sucesso!"
                    });
                }).catch(erro => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o cargo! Erro: " + erro.message
                    });
                });
            }else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os campos devem ser preenchidos!"
                });
            }
        }else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido. Consulte a documentação da API."
            });
        }
    }

    async excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const id = requisicao.params.id;

            if(id > 0){
                const cargos = new Cargo(id);

                cargos.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cargo excluido com sucesso!"
                    });
                }).catch(erro => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o cargo! Erro: " + erro.message
                    });
                });
            }else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um id valido. Consulte a documentação da API."
                });
            }
        }else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido. Consulte a documentação da API."
            });
        }
    }

    async consultar(requisicao, resposta){
        if(requisicao.method === "GET"){
              let termo;

            const id = requisicao.params.id;
            if(!isNaN(id)){ 
                termo = id; 
            }else{
                termo = ''; 
            }

            const cargos = new Cargo();
            cargos.consultar(termo)
            .then(listCargos => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Consulta realizada com sucesso!",
                    "cargos": listCargos
                });
            }).catch(erro => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o cargo! Erro: " + erro.message
                });
            });
        }
    }
}