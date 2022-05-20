import {pravesh_properties} from '../stores/pravesh_properties_store';

//make sure you put correct binary format of allowed MB. eg 1MB = 1048576, 2MB = 2097152 and so on.
export const allowed_pdf_size = Number(2097152); 

function sorting_pravesh_properties(pravesh_properties_data){
    let final_object = {};
        
       
       
        let keys= Object.keys(pravesh_properties_data);
        console.log("keys", keys);
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
                    console.log("temp array",doc_array);
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

export{
    sorting_pravesh_properties

}