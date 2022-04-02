import { Client } from '../../interfaces/exportInterfaces';
import { clientDatasource} from './../../datasource/exportdatasource';
//import { Client} from '../../interfaces/exportInterfaces';

class ClientBusiness {

    getClientById = (idClient : string) => {
        return clientDatasource.getClientById(idClient);
    }

    getClients = ()  => {
        return clientDatasource.getClients();
    }
    createClients = (client : Client)  => {
        return clientDatasource.createClients(client);
    }
    updateClients = (idClient: string, client : Client) => {
        return clientDatasource.updateClients(idClient, client);
    }
    deleteClients = (idClient : string) => {
        return clientDatasource.deleteClients(idClient);
    }
}
export const clientBusiness = new ClientBusiness();