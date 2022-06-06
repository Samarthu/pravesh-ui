import {pravesh_properties} from '../stores/pravesh_properties_store';
// import {facility_data_store} from '../stores/facility_store';
import {facility_data_store} from '../stores/facility_store';
import { facility_id } from '../stores/facility_id_store';

//make sure you put correct binary format of allowed MB. eg 1MB = 1048576, 2MB = 2097152 and so on.
export const allowed_pdf_size = Number(2097152); 

function sorting_pravesh_properties(pravesh_properties_data){
    let final_object = {};
        
       
       
        let keys= Object.keys(pravesh_properties_data);
        // console.log("keys", keys);
        for(let i=0;i<keys.length;i++){
            let temp_array =[];
            if(pravesh_properties_data[keys[i]]){
                
                console.log("pravesh property",keys[i]);
                if(keys[i] == "id_proof_rejection_reasons" ||keys[i] ==  "bank_rejection_reasons"){
                    // console.log("inside iffffff");
                    // console.log("inside ifffff",pravesh_properties_data[keys[i]]);
                temp_array = pravesh_properties_data[keys[i]].split("\n");
                // console.log("temp array",temp_array[0].split("\n"));
                final_object[keys[i]] = temp_array;


                }
                else if(keys[i] =="document_types"){
                    // console.log("inside else if");
                    // console.log("inside else keysi ",pravesh_properties_data[keys[i]]);
                    let doc_array = pravesh_properties_data[keys[i]].split("\n");
                    // console.log("temp array",doc_array);
                    for (var j = 0; j < doc_array.length-1; j++) {
                        var ele = doc_array[j];
                        var doc_name = ele.split("=")[0]
                        var doc_val = ele.split("=")[1]
                        temp_array.push({"doc_name":doc_name ,"doc_value":doc_val});
                        final_object[keys[i]] = temp_array;
                        }
                }
                else if(keys[i] == "id_card_config"){
                    temp_array = JSON.parse(pravesh_properties_data[keys[i]]);
                    // console.log("temp array",temp_array[0].split("\n"));
                    final_object[keys[i]] = temp_array;
                }
                else{
                    temp_array = pravesh_properties_data[keys[i]].split(",");
                    final_object[keys[i]] = temp_array;

                }
                

            }
           



        }
        console.log("final_object",final_object);
        pravesh_properties.set({
            properties : final_object
        });
        let temp;
        pravesh_properties.subscribe(value => {
            temp = value.properties;
            
        })
console.log("pravesh properties values",temp);


}

function reset_all_stores(){
    console.log("inside reset all stores");
    let facility_data = {
        address:"",
        user_type: "FieldAuditor",
        dob:null,
        station_code:null,
        er_network_facility:true,
        owner_name:null,
        status:"Onboarding in Progress",
        phone_number:null,
        facility_id:null,
        store_id:null,
        facility_name:null,
        org_id:null,
        node_type:"Distributor",
        facility_type:null,
        store_name:null,
        vendor_code:null,
        vendor_name:null,
        non_msme_confirmed_by:null,
        non_msme_confirmed_on:null,
        msme_registered:null,        
        facility_email:null,
        details_updated_by:null,
        
}
facility_data_store.set(facility_data);
// console.log("facility data",facility_data);
facility_id.set({
    facility_id_number : null
})
let temp ;
facility_data_store.subscribe(value => {
    temp = value;
    
})
console.log("facility data",temp);

console.log("inside reset all stores");
return 1;


}

function sorting_facility_details_for_edit(facility_data){
    // address:"",
    //     user_type: "FieldAuditor",
    //     dob:null,
    //     station_code:null,
    //     er_network_facility:true,
    //     owner_name:null,
    //     status:"Onboarding in Progress",
    //     phone_number:null,
    //     facility_id:"-",
    //     store_id:null,
    //     facility_name:"-",
    //     org_id:null,
    //     node_type:"Distributor",
    //     facility_type:"-",
    //     store_name:null,
    //     vendor_code:null,
    //     vendor_name:null,
    //     non_msme_confirmed_by:null,
    //     non_msme_confirmed_on:null,
    //     msme_registered:null,        
    //     facility_email:null,
    //     details_updated_by:"-",
    let filterred_data = {};


    filterred_data["address"] = facility_data.address;
    filterred_data['dob'] = facility_data.dob;
    filterred_data['station_code'] = facility_data.station_code;
    filterred_data['er_network_facility'] = facility_data.er_network_facility;
    filterred_data['owner_name'] = facility_data.owner_name;
    filterred_data['status'] = facility_data.status;
    filterred_data['phone_number'] = facility_data.phone_number;
    filterred_data['facility_id'] = facility_data.facility_id;
    filterred_data['store_id'] = facility_data.store_id;
    filterred_data['facility_name'] = facility_data.facility_name;
    filterred_data['org_id'] = facility_data.org_id;
    filterred_data['node_type'] = facility_data.node_type;
    filterred_data['facility_type'] = facility_data.facility_type;
    filterred_data['store_name'] = facility_data.store_name;
    filterred_data['vendor_code'] = facility_data.vendor_code;
    filterred_data['vendor_name'] = facility_data.vendor_name;
    filterred_data['non_msme_confirmed_by'] = facility_data.non_msme_confirmed_by;
    filterred_data['non_msme_confirmed_on'] = facility_data.non_msme_confirmed_on;
    filterred_data['msme_registered'] = facility_data.msme_registered;
    filterred_data['facility_email'] = facility_data.facility_email;
    filterred_data['details_updated_by'] = facility_data.details_updated_by;
    filterred_data['name'] = facility_data.name;

    return filterred_data;
    



}

export{
    sorting_pravesh_properties,
    sorting_facility_details_for_edit,
    reset_all_stores

}
