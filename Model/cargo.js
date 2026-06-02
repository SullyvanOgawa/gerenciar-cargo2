
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

    set id(id){
        this.#id = id;
    }

    get cargo(){
        return this.#cargo;
    }
    
    get descricao(){
        return this.#descricao;
    }

    

    
}