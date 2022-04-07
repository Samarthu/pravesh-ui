import { goto } from "$app/navigation";

function goto_wrapper(path_name,replacestate){
    let new_path ="http://"+window.location.host+"/pravesh-ui/"+path_name
    console.log("new_path",new_path);
    goto(new_path,replacestate)
}

export{
    goto_wrapper
}