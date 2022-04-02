import * as admin from 'firebase-admin';
const firestore = admin.firestore();

import { Client, MessageTreatment } from "../../interfaces/exportInterfaces";
import { messageTreatmentBusiness } from '../../business/exportBusiness'

class ClientDatasource {

  getClientById = async (idClient: string): Promise<MessageTreatment> => {
    const collection = firestore.collection('clients');
    return await collection
      .doc(idClient)
      .get()
      .then(async (result) => {
        if(!result.exists){
          return messageTreatmentBusiness.eroorMsg('Falha ao buscar Cliente tente novamente')
        }
        else{
          return messageTreatmentBusiness.sucessMsg(`Cliente encontrado`, result.data());
        }
       
      })
      .catch((error) => {
        return messageTreatmentBusiness.eroorMsg('Registro não encontrado tente novamente', error)
      })

  }
  getClients = async (): Promise<MessageTreatment> => {
    let clientsRef = firestore.collection('clients');
    let clients : Array<Client> = [];
    return await clientsRef.get()
    .then(async (snapshot) => {
      if(snapshot.empty){
        return messageTreatmentBusiness.infoMsg('Nenhum documento encontrado');
      }
      snapshot.forEach(doc => {
        let client : Client;
        client = <Client>doc.data();
        clients.push(client);
      });
      return messageTreatmentBusiness.sucessMsg('Lista de clientes', clients);
    })
    .catch(error => {
      return messageTreatmentBusiness.eroorMsg('Falha ao buscar clientes, tente novamente', error)
    });

  }


  createClients = async (client: Client): Promise<MessageTreatment> => {
    let setDoc = await firestore.collection('clients').doc().set(client)
    return messageTreatmentBusiness.sucessMsg(`Cliente ${client.email} adicionado`, setDoc);
  }


  updateClients = async (idClient : string, client : Client): Promise<MessageTreatment> => {
    const collection = firestore.collection('clients')
    return await collection
    .doc(idClient)
    .update(client)
    .then(async function() {
      if(idClient == null){
        return messageTreatmentBusiness.eroorMsg('Erro interno por favor tente novamente');

      }else{
        return messageTreatmentBusiness.sucessMsg(' Cliente Atualizado');

      }
    })
    .catch(function(error){
      return messageTreatmentBusiness.eroorMsg('Não foi possivel atualizar o cliente')
    });
  }


  deleteClients = async (idClient: string): Promise<MessageTreatment> => {
   return await firestore.collection('clients')
    .doc(idClient)
    .delete()
    .then(async function () {
if(idClient == null){
  return  messageTreatmentBusiness.eroorMsg(`Error interno por favor tente novamente`);
}else
      return  messageTreatmentBusiness.sucessMsg(`Cliente Deletado`);
    }).catch(function(error){
      return messageTreatmentBusiness.eroorMsg('Não foi possivel deletar o cliente tente novamente');
    });
  }
}
export const clientDatasource = new ClientDatasource();