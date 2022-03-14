import {request} from './interceptor';
import {bank_data_to_store} from '../stores/onboardsummary_store'
import {facility_id} from '../stores/facility_id_store';


let new_facility_id
facility_id.subscribe(value => {
   new_facility_id = value.facility_id_number;
});
console.log("FACILITY ID from service IN BGV SERVICE",new_facility_id)
const get_states = () =>{
    let get_states_url = '/api/method/pravesh.facility.routes.organisation.get_states?_=1647243494831'
    return request(
        get_states_url, {
        method: "GET",
        }, true)
}
const get_cities = (state_name) => {
    let get_cities_url = '/api/resource/ER%20Location?fields=["location_id","location_name"]&filters=[["location_state","=","'+state_name+'"]]'
    return request(
        get_cities_url, {
        method: "GET",
        }, true)
}

  
export {
    get_states,
    get_cities
}