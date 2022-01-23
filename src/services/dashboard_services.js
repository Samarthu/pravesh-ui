import {request} from './interceptor';

let demo_api_url = '/api/resource/ER%20location'

const demo_api_fun = () => {
    return request(demo_api_url,{mode: 'no-cors'},true,false,"GET")
}

export{
    demo_api_fun
}