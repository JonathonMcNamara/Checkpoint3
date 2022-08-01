import { ProxyState } from "../AppState.js";
import { Trip } from "../Models/Trip.js";
import { Reservation } from "../Models/Reservation.js";




export function saveState(){
  console.log('saving');
  let data = {
    reservations : ProxyState.reservations,
    trips: ProxyState.trips
  }
  localStorage.setItem('', JSON.stringify(data))

}

export function loadState(){
  console.log('loading');
  
  let rawData = localStorage.getItem('')
  if(rawData){
    let data = JSON.parse(rawData)
    ProxyState.trips = data.trips.map(trip => new Trip(trip))
    ProxyState.reservations = data.reservations.map(reservation => new Reservation(reservation))
  }
  
}
