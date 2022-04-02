import * as admin from 'firebase-admin';
const serviceAccount = require("../src/config/back-end-firebase-f97df-firebase-adminsdk-4x41f-ed790d421f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import * as functions from "firebase-functions";
import * as express from "express";


import { clientController } from "./controllers/exportController";




//Instanciando Objetos express para usar nas rotas e demais ....
let appApi = express();
let appClients = express();

//Rotas
appApi.get("/", function (req, res) {
  res.send(`STATUS: online${new Date()}`);
});


////#region Aqui estamos instanciando as ROTAS para clients
appClients.get( '/:idClient', async (req, res) => { res.json(await clientController.getClientById(req.params.idClient)) })
appClients.route("/")
  .get( async (req, res) => {
    res.json(await clientController.getClients());
  })
  .post( async (req, res) => {
    res.json(await clientController.createClients(req.body))
  })
  appClients.put('/:idClient', async (req, res) => { res.json(await clientController.updateClients(req.params.idClient, req.body))
  })
  appClients.delete('/:idClient', async (req, res) => { res.json(await clientController.deleteClients(req.params.idClient)) })
////#endregion

//Exports Apps
exports.appApi = functions.https.onRequest(appApi);
exports.clients = functions.https.onRequest(appClients);
