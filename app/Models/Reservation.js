import { generateId } from "../Utils/generateId.js"

export class Reservation{
    constructor(data){
        this.id = data.id || generateId()
        this.type = data.type,
        this.name = data.name,
        this.confirmation = data.confirmation,
        this.date = new Date(data.date),
        this.address = data.address,
        this.cost = data.cost,
        this.tripId = data.tripId
    }
    
    get Template(){
        return `
        <div class="col-md-12 selectable" onclick="app.reservationsController.deleteReservation('${this.id}')">
        <div class="row py-2 px-4 bg-primary text-light">
          <div class="col-1 p-0">${this.type}</div>
          <div class="col-2 p-0 text-center">${this.name}</div>
          <div class="col-3 p-0 text-center">${this.confirmation}</div>
          <div class="col-1 p-0 text-center">${this.date.toLocaleDateString('en-US')}</div>
          <div class="col-4 p-0 text-center">${this.address}</div>
          <div class="col-1 p-0 text-start">${this.cost}</div>
        </div>
        </div>
        `
    }
}