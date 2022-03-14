import {pravesh_properties} from '../stores/pravesh_properties_store';

//make sure you put correct binary format of allowed MB. eg 1MB = 1048576, 2MB = 2097152 and so on.
export const allowed_pdf_size = Number(2097152); 

function sorting_pravesh_properties(pravesh_properties_data){
    let final_object = {};
        
       
       
        let keys= Object.keys(pravesh_properties_data);
        console.log("keys", keys);
        for(let i=0;i<keys.length;i++){
            let temp_array =[];
            temp_array = pravesh_properties_data[keys[i]].split(",");
            final_object[keys[i]] = temp_array;



        }
        console.log("final_object",final_object);
        pravesh_properties.set({
            properties : final_object
        });
        let temp;
        pravesh_properties.subscribe(value => {
            temp = value.properties;
            
        })
console.log("store value",temp);


}

export{
    sorting_pravesh_properties

}