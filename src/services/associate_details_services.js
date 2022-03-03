import {request} from './interceptor';
import {verify_associate_name_api_link,verify_email_name_api_link} from '../stores/facility_store';
import {facility_data_store} from '../stores/facility_store';
let verify_associate_name_link ;
let station_name;
let associate_name;
let fac_id;
let verify_associate_email_link;
verify_associate_name_api_link.subscribe(value => {
    verify_associate_name_link = value;
    
})
facility_data_store.subscribe(value => {
    station_name = value.station_code;
    associate_name = value.facility_name;
    fac_id = value.facility_id;
});
verify_email_name_api_link.subscribe(value => {
    verify_associate_email_link = value;

});


const verify_associate_name = () => {
    // let temp;
    // facility_data_store.subscribe(value => {
    //     temp = value;
    //     console.log(value);
    // });
    
    // console.log("store value",facility_data_store.facility_id);
    
    // associate_name = associate_name.replace(/ /g, "_");
    // let fac_id = associate_name + "_" + station_name.toLowerCase();
    
    
    
   
    console.log("station code",station_name);
    console.log("fac_id",fac_id);
    let link = verify_associate_name_link+fac_id;

    return request(link,{mode: 'no-cors'},true,false,"GET")
}

const verify_associate_email = () =>{
    let email;
    facility_data_store.subscribe(value => {
        email = value.facility_email;
    });
    if(email != undefined || email != null || email != ""){
        return request(verify_associate_email_link,{mode: 'no-cors'},true,false,"GET")

    }
    

}
const set_facility_id = () =>{
    if(associate_name != null){
        associate_name = associate_name.replace(/ /g, "_");
        let fac_id = associate_name + "_" + station_name.toLowerCase();
        console.log("inside set_facility_id");
        return fac_id;

    }
    
   

}

export{
    verify_associate_name,
    verify_associate_email,
    set_facility_id

}
 