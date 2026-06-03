
import { Router } from "express";
import CargoCtrl from "../Controller/cargoCtrl.js";

const rotaCargo = Router();
const cargoCtrl = new CargoCtrl();

rotaCargo.get("/", cargoCtrl.consultar);
rotaCargo.get("/:id", cargoCtrl.consultar);
rotaCargo.post("/", cargoCtrl.gravar);
rotaCargo.patch("/:id", cargoCtrl.editar);
rotaCargo.put("/:id", cargoCtrl.editar);
rotaCargo.delete("/:id", cargoCtrl.excluir);

export default rotaCargo;