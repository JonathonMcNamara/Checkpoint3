import { ProxyState } from "../AppState.js";
import { tripsService} from "../Services/TripsService.js"
import {loadState,saveState} from "../Utils/LocalStorage.js"
import { Pop } from "../Utils/Pop.js"

function _draw(){
    let template = ''
    let trips = ProxyState.trips.sort((a,b)=> a.date - b.date)
    trips.forEach(t => template += t.Template)
    document.getElementById('trips').innerHTML = template
}

export class TripsController{
    constructor(){
        ProxyState.on('trips',_draw)
        ProxyState.on('reservations',_draw)
        ProxyState.on('trips', saveState)
        ProxyState.on('reservations',saveState)
        _draw()
        loadState()

    }


    createTrip(){
        window.event.preventDefault()
        let form = window.event.target
        let newTrip = {
        name: form.name.value,
        notes: form.notes.value,
        confirmation: form.confirmation.value,
        cost: parseInt(form.cost),
        address: form.address.value,
        type: form.type.value
    }
    console.log(newTrip);
    tripsService.createTrip(newTrip)
    Pop.toast('trip created','success')
    
    }


    async deleteTrip(id){
        if(await Pop.confirm()){
          console.log('deleting trip', id);
          tripsService.deleteTrip(id)
        }
    }
    
    editTrip(id){
        console.log('editing trip',id);
        console.log(window.event.target.value)
        let newText = window.event.target.value
        tripsService.editTrip(id,newText);
    }
}