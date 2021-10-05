export interface ITickets {
    id?: string;
    total_money: number;
    id_tickets: string;
    total_ticket: number;
    uid: string;
    state_ticket: string;
}

class Tickets implements ITickets {

    id?: string;
    total_money: number;
    id_tickets: string;
    total_ticket: number;
    uid: string;
    state_ticket: string;

    constructor() {

    }
}

export default Tickets;