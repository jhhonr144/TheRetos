export interface IParticipate {
    id?: string;
    id_Challenges :string;
    uid: string;
    total_ticket: number;
    date_Participate:string; 
    hour_Participate:string;
    state_Participate: string;
    answer : string
    number_participate : number;
    is_win: number;
  
}

class Participate implements IParticipate {

    id?: string;
    id_Challenges :string;
    uid: string;
    total_ticket: number;
    date_Participate:string; 
    hour_Participate:string;
    state_Participate: string;
    answer : string
    number_participate : number;
    is_win: number;
    
    constructor() {

    }
}

export default Participate;