import {request} from './interceptor';
import {dashboard_details} from '../stores/dashboard_store'

let demo_api_url = '/api/resource/Organization?fields=["*"]&filters=[["domain","=","Ecom"]]';
let dashboard_data_url = '/api/method/pravesh.facility.routes.dashboard.get_dashboard_summary';
const demo_api_fun = () => {
    return request(demo_api_url,{mode: 'no-cors'},true,false,"GET")
}

const dashboard_data = () =>{
    return request(
        dashboard_data_url,{
            method: "GET"
        },true
    ).then((data)=>{
        console.log("inside service",data)
        dashboard_details.set({
        // dashboard_details : data
        id_proof_rejected : data.body.data[4].count,
        bank_details_rejected : data.body.data[2].count,
        bgv_pending : data.body.data[12].count,
        id_verification_pending : data.body.data[5].count,
        bank_verification_pending : data.body.data[8].count,
        pending_offer_letter : data.body.data[7].count,
        bgv_rejected : data.body.data[11].count
        })
        console.log("dashboard_detaissss ls",dashboard_details)
    })
}


export{
    demo_api_fun,
    dashboard_data
}