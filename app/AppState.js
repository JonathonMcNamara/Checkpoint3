import { Reservation } from "./Models/Reservation.js"
import { Trip } from "./Models/Trip.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = []

  trips = [
    new Trip({
      type: "Flight",
      name: "Hawaii",
      confirmation: "1234",
      address: "1234 Street",
      cost: 100,
      notes: "here are some random notes for the trip"
    })
  ]
  reservations = [
    new Reservation({
      type: "Hotel",
      name: "Oahu Resort",
      confirmation: "1234",
      address: "4567 Street",
      cost: 500,
      tripId: "tripId",
      notes: " "
    })
  ]


}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
