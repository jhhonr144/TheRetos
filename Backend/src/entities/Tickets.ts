export interface ITickets {
    id?: string;
    total_money: number;
    date_creation:string; 
    hour_creation:string;
    date_update:string;
    total_ticket: number;
    uid: string;
    state_ticket: string;
    state_register: number;

}

class Tickets implements ITickets {

    id?: string;
    total_money: number;
    date_creation:string; 
    hour_creation:string;
    date_update:string;    
    total_ticket: number;
    uid: string;
    state_ticket: string;
    state_register: number;

    constructor() {

    }
}

export default Tickets;