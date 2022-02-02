import {request} from './interceptor';
import {get_organization_link} from '../stores/verticle_store';



let get_org_api;

get_organization_link.subscribe(value => {
    get_org_api = value;
    
});


const get_organistaion_method = () => {
    return request(get_org_api,{mode: 'no-cors'},true,false,"GET")
}
export{
    get_organistaion_method
}