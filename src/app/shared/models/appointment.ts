import {SimpleUser} from '../models/simpleUser'

export class DTOAppointment{
    constructor(){
        this.title = "";
        this.text = "";
        this.maxParticipants = 1;
        this.participants = [];
        this.startTime = new Date();
        this.endTime = new Date();    
        this.name = "";
        this.creatorId = "";
    }
    id: string;
    title: string;
    text: string;
    maxParticipants: number;
    participants: SimpleUser[]
    startTime: Date;
    endTime: Date;
    name: string;
    creatorId: string;
    // participants    
  }

  export class Appointment{
    constructor(){
        this.title = "";
        this.text = "";
        this.maxParticipants = 1;
        this.participants = [];
        this.startTime = "";
        this.endTime = "";    
        this.name = "";
        this.creatorId = "";
    }
    id: string;
    title: string;
    text: string;
    maxParticipants: number;
    participants: SimpleUser[]
    startTime: string;
    endTime: string;
    name: string;
    creatorId: string;
    // participants    
  }