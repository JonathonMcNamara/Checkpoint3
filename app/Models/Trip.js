import { generateId } from "../Utils/generateId.js"
import { ProxyState } from "../AppState.js"

export class Trip{
    constructor(data){
    this.id = data.id || generateId()
    this.type = data.type,
    this.name = data.name,
    this.confirmation = data.confirmation,
    this.address = data.address,
    this.cost = data.cost,
    this.notes = data.notes
    }
    
    get Template(){
        return `
        <form action="" class="row mt-4 mx-4 elevation-2 bg-white" onsubmit="app.reservationsController.createReservation('${this.id}')">
        <h4>${this.name}</h4>
        <div class="col-12">
        <section class="row px-4">
          <div class="col-md-12">
            <div class="row">
              <div class="col-1 p-0">Type</div>
              <div class="col-2 p-0 text-center">Name</div>
              <div class="col-3 p-0 text-center">Confirmation Number</div>
              <div class="col-1 p-0 text-center">Date</div>
              <div class="col-4 p-0 text-center">Address</div>
              <div class="col-1 p-0 text-start">Cost</div>
            </div>
          </div>
        </section>
        </div>
        ${this.Reservations}
          <section class="py-4 col-md-12">
            <div class="row">
              <div class="col-4 col-md-12 d-flex justify-content-between">
              <select class="form-control" required name="type" id="type">
                <option class="form-control" required value="type" disabled selected>Select</option>
                <option class="form-control" required value="Flight">Flight</option>
                <option class="form-control" required value="Food">Food</option>
                <option class="form-control" required value="Hotel">Hotel</option>
              </select> 
                <input class="form-control" required minlength="3" maxlength="15" type="text" id="name" name="name" placeholder="Name..">
                <input class="form-control" required type="text" id="confirmation" name="confirmation" placeholder="Confirmation..">
                <input class="form-control" required type="date" id="date" name="date" placeholder="Date">
                <input class="form-control" required type="text" id="address" name="address" placeholder="Address..">
                <input class="form-control" required type="number" id="cost" name="cost" placeholder="Total $">
            </div>
            <section class="row">
              <div class="col-6 col-md-12 d-flex justify-content-end">
                <button type="submit" class="rounded-pill">Add</button>
              </div>
            </section>
            <section class="row">
              <div class="col-4 col-md-12">
                <label for="notes"><b>Notes</b></label><br>
                <textarea class="form-label" onblur="app.tripsController.editTrip('${this.id}')" name="notes" id="notes" cols="50" rows="5">${this.notes}</textarea>
              </div>
              <section class="row d-flex justify-content-end">
                <div class="col-4 col-md-12 text-end"><h3>Total: $${this.TripTotal}</h3></div>
                <button onclick="app.tripsController.deleteTrip('${this.id}')" class="btn-sm col-4">Delete</button>
              </section>
            </section>
          </section>
            </section>
        </form>

        
    `
    }   
    get Reservations(){
    let template = ''
    let reservations = ProxyState.reservations.filter(reservation => reservation.tripId == this.id)
    reservations.forEach(reservation => template += reservation.Template)
        if (template){
            return template
        } else {
            return `<p class="pt-4">No reservations for this trip</p>`
        }
    }

    get TripTotal(){
      let total = 0
      let reservations = ProxyState.reservations.filter(reservation => reservation.tripId == this.id)
      reservations.forEach(reservation => total += reservation.cost)
    return total
    } 
}