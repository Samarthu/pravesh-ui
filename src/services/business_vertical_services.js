import {request} from './interceptor';


let get_verticles_api_url = '/api/method/pravesh.facility.routes.organisation.get_org_list?org_field=[%22*%22]'

const get_verticles_fun = () => {
    return request(get_verticles_api_url,{mode: 'no-cors'},true,false,"GET")
}

export{
    get_verticles_fun
}