import { ProxyState } from "../AppState.js";
import { reservationsService }from "../Services/ReservationsService.js"
import { Pop } from "../Utils/Pop.js";



export class ReservationsController{
    constructor(){
        console.log('reservations controller loaded');
        }
    
        createReservation(tripId){
        window.event.preventDefault()
        console.log('creating a trip',tripId);
        let form = window.event.target
        let newReservation = {
            type: form.type.value,
            name: form.name.value,
            address: form.address.value,
            confirmation: form.confirmation.value,
            cost: parseInt(form.cost.value),
            date: form.date.value,
            tripId: tripId
            }
        console.log(newReservation);
        reservationsService.createReservation(newReservation)
    }

        async deleteReservation(id){
            if(await Pop.confirm()){
              console.log('deleting reservation', id);
              reservationsService.deleteReservation(id)
            }
          }
    }
