import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import md5 from "md5";
import { UsuarioModel } from "../../models/UsuarioModel";


const endpointLogin = async (
    req : NextApiRequest,
    res : NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body;

        const usuariosEncontrado = await UsuarioModel.find({email : login, senha : md5(senha)});
        if(usuariosEncontrado && usuariosEncontrado.length > 0){
            const usuarioEncontrado = usuariosEncontrado[0];
            return res.status(200).json({msg : `Usuario ${usuarioEncontrado.nome} autenticado com sucesso`});
        }
        return res.status(405).json({erro : 'Usuario ou senha não encontrado'});
    }
    return res.status(405).json({erro : 'Metodo informado não é valido'});
}

export default conectarMongoDB(endpointLogin);