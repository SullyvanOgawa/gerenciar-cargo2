import obterConexao from "./conexao.js";
import Cargo from "../Model/cargo.js";
export default class CargoDB{
    async gravar(cargo){
        if(cargo instanceof Cargo){
            const sql = `INSERT INTO cargos (cargo, descricao) 
                                                VALUES (?, ?)`;

            const parametros = [
                cargo.cargo,
                cargo.descricao
            ];

            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql, parametros);
            cargo.id = resultado[0].insertId;

            conexao.release();
        }
    }

    async editar(cargo){
        if(cargo instanceof Cargo){
        const sql = `UPDATE cargos
                     SET cargo = ?, 
                     descricao = ? 
                     WHERE id_cargo = ?`;

            const parametros = [
                cargo.cargo,
                cargo.descricao,
                cargo.id
            ];

            const conexao = await obterConexao();
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }

    async excluir(cargo){
        if(cargo instanceof Cargo){
            const sql = `DELETE FROM cargos
                         WHERE id_cargo = ?`;                    

            const conexao = await obterConexao();
            await conexao.execute(sql, [cargo.id]);
            conexao.release();
        }
    }  
    
    async consultar(termo){
        let sql = "";
        let parametros = [];

        if(!isNaN(Number(termo)) && Number(termo) > 0){
            sql = `SELECT   id_cargo, 
                            cargo, 
                            descricao 
                    FROM cargos 
                    WHERE id_cargo = ?`;

            parametros = [termo];
        }
        else{
            sql = `SELECT   id_cargo, 
                            cargo, 
                            descricao 
                   FROM cargos 
                   WHERE cargo LIKE ?`;

            parametros = [`%${termo}%`];
        }

        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listCargos = [];    

        for(const resultado of resultados[0]){
            const cargo = new Cargo(resultado.id_cargo,
                                    resultado.cargo,
                                    resultado.descricao
            );
            
            listCargos.push(cargo);
        }
        
        return listCargos;
    }
}