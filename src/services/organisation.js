import { request } from "./interceptor";

let  api = "/api/method/workorder.api.routes.organisation";

const get_org = async () =>{
    return request("/api/method/workorder.api.controllers.organisation.get_org", {mode: 'no-cors'},true,false,"GET");
}
const get_org_list = async () =>{
    let get_org_list_api = api + ".get_org_list";
    return request(get_org_list_api,{mode: 'no-cors'},true,false,"GET");
}
const get_org_station =async (org_id) =>{
    let get_org_station_api = api + ".get_org_station?org_id="+org_id;
    return  request(get_org_station_api,{mode: 'no-cors'},true,false,"GET");
}
const get_org_cost_center_and_warehouse_details = async( station_name,org_id) =>{
    let get_ccw_details_api = api + ".get_cost_center_and_warehouse_details?station_name="+station_name+"&org_id="+org_id;
    return  request(get_ccw_details_api,{mode: 'no-cors'},true,false,"GET");    
}

const bulkUploadFile = (filedata) =>{
    let bulkUploadFile_api = api+ ".bulkUploadFile";
    const filters = {"args": filedata}
    //return await fetch(bulkUploadFile_api,{body:JSON.stringify("stringss"),method:"POST"})
     return request(bulkUploadFile_api,{method:"POST", body: JSON.stringify(filters)},true,false);
}

export{
    get_org_list,
    get_org_station,
    get_org_cost_center_and_warehouse_details as get_ccw_details,
    get_org,
    bulkUploadFile
}

