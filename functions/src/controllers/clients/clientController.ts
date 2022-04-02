// CLASSE CONTROLLERS PARA BARRAR E FILTRAR TUDO ANTES DE CHEGAR NA NOSSA CLASSE DE NEGÓCIO (BUSINESS)
import { clientBusiness } from '../../business/exportBusiness';
import { Client } from '../../interfaces/exportInterfaces';
//import { Client } from '../../interfaces/exportInterfaces';

class ClientController {

    getClientById = (idClient : string) => {
        return clientBusiness.getClientById(idClient);
    }

    getClients = ()  => {
        return clientBusiness.getClients();
    }
    createClients = (client : Client) => {
        return clientBusiness.createClients(client);
    }
    updateClients = ( idClient : string, client : Client) => {
        return clientBusiness.updateClients(idClient, client);
    }
    deleteClients = (idClient: string) => {
        return clientBusiness.deleteClients(idClient);
    }
}
export const clientController = new ClientController();