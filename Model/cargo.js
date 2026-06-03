import CargoDB from "../DB/cargoDB.js";
export default class Cargo {
    #id
    #cargo
    #descricao

    constructor(id, cargo, descricao) {
        this.#id = id
        this.#cargo = cargo
        this.#descricao = descricao
    }

    get id(){
        return this.#id;
    }

    set id(novoId){
        this.#id = novoId;
    }

    get cargo(){
        return this.#cargo;
    }
    
    get descricao(){
        return this.#descricao;
    }

    toString(){
        return `
        Cargo: ${this.#cargo}
        Descrição: ${this.#descricao} `;
    }

    async gravar(){
        const cargoDB = new CargoDB();
        return await cargoDB.gravar(this);
    }

    async editar(){
        const cargoDB = new CargoDB();
        return await cargoDB.editar(this);
    }

    async excluir(){
        const cargoDB = new CargoDB();
        return await cargoDB.excluir(this);
    }

    async consultar(termo){
        const cargoDB = new CargoDB();
        return await cargoDB.consultar(termo);
    }

    toJSON(){
        return {
            id: this.#id,
            cargo: this.#cargo,
            descricao: this.#descricao
        }
    }

    
}