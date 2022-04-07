export interface IChallenges {
    id_challengs?:string,
    category:string,
    date_creation:string,
    date_limit:string,
    description:string,
    id_creator:string,
    name_challeng:string,
    person_limit:number,
    privacy:string,
    state_challeng:string,
    state_game:string,
    time_creation:string,
    time_limit:string,
    token_in:number,
  
}
class Challenges implements IChallenges {

    id_challengs?:string;
    category:string;
    date_creation:string;  
    date_limit:string;
    description:string;
    id_creator:string;
    name_challeng:string;
    person_limit:number;
    privacy:string;
    state_challeng:string;
    state_game:string;
    time_creation:string;
    time_limit:string;
    token_in:number;
    
    constructor() {

    }
}
export default Challenges;