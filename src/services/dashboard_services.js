import {request} from './interceptor';

let demo_api_url = '/api/resource/Organization?fields=["*"]&filters=[["domain","=","Ecom"]]';

const demo_api_fun = () => {
    return request(demo_api_url,{mode: 'no-cors'},true,false,"GET")
}

export{
    demo_api_fun
}