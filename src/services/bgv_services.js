import {request} from './interceptor';
import {bank_data_to_store} from '../stores/onboardsummary_store'
import {facility_id} from '../stores/facility_id_store';


let new_facility_id
facility_id.subscribe(value => {
   new_facility_id = value.facility_id_number;
});
console.log("FACILITY ID from service IN BGV SERVICE",new_facility_id)



const facility_bgv_check =() =>{
    let facility_bgv_check_url = '/api/resource/Facility%20BGV?filters=[[%22facility_id%22,%22=%22,%22'+new_facility_id+'%22]]&fields=[%22*%22]';
      return request(
          facility_bgv_check_url,{
              method: "GET"
          },true)
  }

  
export {
    facility_bgv_check
}