<script>
    ///////////tushar edit/////////////
    import {onMount} from 'svelte';
    // import {dashboard_details} from '../stores/dashboard_store';
    import {dashboard_data} from '../services/dashboard_services';
    import {supplier_data} from '../services/supplier_services';
    import {filter_city_data} from '../services/supplier_services';
    import {filter_status_data} from '../services/supplier_services';
    import {filter_vendortype_data,search_supplier,onboard_by_me_sup,
    deactivate_assocaite} from '../services/supplier_services';
    import {audit_trail_data} from '../services/supplier_services';
    import {logged_user} from '../services/supplier_services';
    import {get_client_org_mapping} from '../services/vmt_verify_services';
    import { page } from '$app/stores';
    import {img_url_name} from '../stores/flags_store';
    import Spinner from "./components/spinner.svelte";
    import { goto } from '$app/navigation';
    import Toast from './components/toast.svelte';
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import {success_toast ,error_toast,warning_toast} from '../services/toast_theme';
    // import { facility_data } from 'src/services/onboardsummary_services';
    
    let show_spinner = false;
    let total_count = 0;
    let toast_type = "";
    let toast_text = "";
    let offset=0;
    let limit=20;
    let show_pagination = false;
    let userdetails,username,userid;
    let supplier_data_from_service = [];
    let total_count_associates = 0;
    let audit_details_array= [];
    let filter_status_res;
    let filter_city_res;
    let filter_status_array= [];
    let filter_city_array = [];
    let filter_vendortype_array = [];
    let city; 
    let next_prev_disable = false;
    let dropdown_disable = false;
    let searchTerm;
    let new_city;
    let total_pages = null;
    let pages = [];
    let new_vendor_type;
    let result;
    let drop_limit;
    let audit_supplier_data = [];
    let audit_supplier_address;
    let filter_vendortype_res;
    let vendor_type_select;
    let vendor_checkbox = false;
    let onboarded_by_me_checkbox = false;
    let workforce_checkbox = true;
    let org_id_selected;
    let org_selected= ""
    $:if(org_id_selected){
        org_id_selection()
    }
    // let status_pill_flag = false;
    let status_for_highlight = "";
    let new_associate_data;
    let logged_user_data;
    let new_new_associate_data;
    let org_data_arr = [];
    let new_dash_data = [];
    $:pagenumber = "";
    let last_num_from_pages;
    let new_drop_limit;
    let fac_obj = {};
    let deact_date = "";
    let new_paramString = "";
    // $:pagenumber = pagenumber;
    // let pages= [];
//pagination////////////
    $:new_pages = [];
    $:pages = pages;
    let mapped_pages = [];

    
    $:if(searchTerm == ''){
        clearedSearchFunc();
    }
    $:status = '-1';

    // $:if(vendor_checkbox === true){
       
    // }

    // $:if(workforce_checkbox === true){
       
    // }
    // $:if(onboarded_by_me_checkbox === true){
    //     onboarded_by_me_checkbox = true;
    // }
    $:onboarded_by_me_checkbox
    new_associate_data=[];
    //////////////////////    onboard summary data if checkbox on ////////////
        //     if(onboarded_by_me_checkbox == true){ 
        //     new_associate_data = {city: "-1",limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status: "Bank Details Pending",username:username,userid:userid}

        // }
        //     else{
        //     new_associate_data = {city: "-1",limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status: "Bank Details Pending"}  
        //     }
        
        
        // async function user_data () {
        // logged_user_data = await logged_user();
        // // console.log("logged_user_datalogged_user_data",logged_user_data)
        // username = logged_user_data.body.data.user.email;
        // userid = logged_user_data.body.data.user.username;
        // // console.log("username and iuserid",username,userid)
        // }
    // user_data();
    

    let id_proof_rejected = 0;
    let bank_details_rejected = 0;
    let id_verification_pending=0;
    let bank_details_pending = 0;
    let pending_offer_letter=0;
     let bgv_rejected = 0;
     let bgv_pending = 0;
     let active=0
     let deactive=0,
    bank_verification_pending,bank_beneficiary_pending,onboarding_in_progress;
    let json_associate_data,json_associate_new_data;
    
    onMount(async () =>{
        next_prev_disable = true;
       
        show_spinner = true;
    let dashboard_res = await dashboard_data();

    if(dashboard_res != null){
        let dashboard = dashboard_res.body.data;
        for(new_dash_data of dashboard){
            
            if(new_dash_data.name == "active"){
                active = new_dash_data.count
            }
            else if(new_dash_data.name == "deactive"){
                deactive = new_dash_data.count
            }
            else if(new_dash_data.name == "id proof rejected"){
                id_proof_rejected = new_dash_data.count
            }
            else if(new_dash_data.name == "background verification pending"){
                bgv_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "bank details rejected"){
                bank_details_rejected = new_dash_data.count
            }
            else if(new_dash_data.name == "id verification pending"){
                id_verification_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "bank details pending"){
                bank_details_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "bank beneficiary pending"){
                bank_beneficiary_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "onboarding in progress"){
                onboarding_in_progress = new_dash_data.count
            }
            else if(new_dash_data.name == "pending offer letter"){
                pending_offer_letter = new_dash_data.count
            }
            else if(new_dash_data.name == "background verification rejected"){
                bgv_rejected = new_dash_data.count
            }
            else if(new_dash_data.name == "background verification pending"){
                bgv_pending = new_dash_data.count
            }
            else if(new_dash_data.name  == "bank verification pending"){
                bank_verification_pending = new_dash_data.count
            }
        }
        // active = dashboard.active;
        // deactive = dashboard.deactive;
        // id_proof_rejected = dashboard.id_proof_rejected
        // bank_details_rejected = dashboard.bank_details_rejected;
        // id_verification_pending = dashboard.id_verification_pending;
        // bank_details_pending = dashboard.bank_details_pending;
        // bank_beneficiary_pending =dashboard.bank_beneficiary_pending;
        // onboarding_in_progress = dashboard.onboarding_in_progress;
        // bank_verification_pending = dashboard.bank_verification_pending;
        // pending_offer_letter = dashboard.pending_offer_letter;
        // bgv_rejected = dashboard.bgv_rejected;
        console.log("total count active",bank_verification_pending)

        total_count = (active+deactive+id_proof_rejected+bank_details_rejected+
        id_verification_pending+bank_verification_pending+pending_offer_letter+bgv_rejected+
        bank_details_pending+bank_beneficiary_pending+onboarding_in_progress);
    
    }
    
    else{
        dropdown_disable = false;
    }
    /////////from dashboard redirect with filter on//////////////

    let urlString = window.location.href;
    // let paramString	
    // if(paramString){
        let paramString = urlString.split('=')[1]
        if(paramString && paramString.includes("#")){
            paramString = paramString.replace("#"," ");
        }
        else{
            paramString = paramString
        }
    // }
    if(paramString == undefined){
    //   show_pagination = true;
      console.log("show_pagination",show_pagination)
    new_drop_limit=parseInt(drop_limit)
   
    new_associate_data = {city:"-1",limit:new_drop_limit,org_id:org_selected,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}
    json_associate_new_data=JSON.stringify(new_associate_data);
    let filter_res_from_dash =await supplier_data(json_associate_new_data);
    
    try{
            if(filter_res_from_dash.body.status == "green"){
                supplier_data_from_service = []
                // supplier_data_from_service = filter_res_from_dash.body.data.data_list;
                // total_count_associates = filter_res_from_dash.body.data.total_records;
                    for(let i=0;i<supplier_data_from_service.length;i++){
                        supplier_data_from_service[i].expand = false;
                    } 
                if(total_count_associates > new_drop_limit){
                    total_pages = Math.ceil(total_count_associates/new_drop_limit)
                    pages = createPagesArray(total_pages)
                }
            }
        }
        catch(err) {
        message.innerHTML = "Error is  " + err;
        }
    }
else
    {
    // console.log("INside if blcok of paramString",paramString)
    new_paramString = decodeURI(paramString)
        
    status = new_paramString;
    // console.log("drop_limit inside urlString",drop_limit)
    new_drop_limit=parseInt(drop_limit)
    new_associate_data = {city:"-1",limit:new_drop_limit,org_id:org_selected,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}
    json_associate_data=JSON.stringify(new_associate_data);
    let res=await supplier_data(json_associate_data);
        try{
            if(res.body.status == "green"){
            // supplier_data_from_service = []
            supplier_data_from_service = res.body.data.data_list;
            total_count_associates = res.body.data.total_records;
                for(let i=0;i<supplier_data_from_service.length;i++){
                    supplier_data_from_service[i].expand = false;
                }
            }
        }
        catch(err) {
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }

         userdetails = await logged_user();
        
        try{
            if(userdetails.body.status == "green"){
                username = userdetails.body.data.user.email;
                userid = userdetails.body.data.user.username;
            }
        }
        catch(err) {
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }
        
        new_drop_limit=parseInt(drop_limit)
        total_count_associates = res.body.data.total_records;
        if(total_count_associates > new_drop_limit){
            next_prev_disable = false;
            total_pages = Math.ceil(total_count_associates/new_drop_limit)
            pages = createPagesArray(total_pages)
        }
        else{
            next_prev_disable = true;
        }
        }

        if(total_count_associates < 20){
            dropdown_disable = true;
        }
////////////filter city status -data///////////
    filter_city_res = await filter_city_data();
        try{
            if(filter_city_res.body.status == "green"){
                filter_city_array = filter_city_res.body.data;
            }
        }
        catch(err) {
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }  
    
    filter_status_res = await filter_status_data();
        try{
            if(filter_status_res.body.status == "green"){
                filter_status_array = filter_status_res.body.data;
            }
        }
        catch(err) {
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }
   

    filter_vendortype_res = await filter_vendortype_data();
        try{
            filter_vendortype_array = filter_vendortype_res.body.data;
        }
        catch(err) {
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }
        for(let pagination in pages){   
            
            if(pagination <= 3 && pagination>0){
                new_pages.push(pagination)
                mapped_pages=new_pages.map(Number)    
            }
        }
        show_spinner = false; 

        ///////////ORG LIST/////////////
        let get_org_data_res =  await get_client_org_mapping();
            try {
            if(get_org_data_res.body.status == "green"){
                for(let i=0;i<get_org_data_res.body.data.length;i++){
                    org_data_arr.push({"org_id":get_org_data_res.body.data[i].org_id,"org_name":get_org_data_res.body.data[i].org_name})
                }
                org_data_arr = org_data_arr;
                console.log("org_data_arr",org_data_arr)
                
            }
            else{
                // toast_type = "error";
                // toast_text = "No client Data";
                error_toast("No client Data")

            }
            } catch(err) {
                // toast_type = "error";
                // toast_text = err;
                error_toast(err)

       
            }
            show_spinner = false;
            ///////////ORG LIST/////////////
    });

    function org_id_selection(){
        for(let i=0;i<org_data_arr.length;i++){
            if(org_id_selected == org_data_arr[i].org_name){
                org_selected = org_data_arr[i].org_id
            }
        }
    }
    
    async function clearedSearchFunc(){
            if(status != "-1"){
                if(onboarded_by_me_checkbox == true){ 
                    new_associate_data = {city:city,limit:limit,org_id:org_selected,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status,username:username,userid:userid}

                }
                else{
                new_associate_data = {city:city,limit:limit,org_id:org_selected,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status: status}  
                }
                json_associate_data=JSON.stringify(new_associate_data);
                //  console.log("json_associate_data",json_associate_data)
                let cleared_search_res=await supplier_data(json_associate_data);
                try{
                    if(cleared_search_res.body.status == "green"){
                        supplier_data_from_service = cleared_search_res.body.data.data_list;
                        total_count_associates = cleared_search_res.body.data.total_records;
                        
                        for(let i=0;i<supplier_data_from_service.length;i++){
                            supplier_data_from_service[i].expand = false;
                        }

                        // console.log("RESULT",result)
                        result = true;
                        // console.log("RESULT",result)
                        // filter_vendortype_res = await filter_vendortype_data();
                        new_drop_limit=parseInt(drop_limit)
                        if(total_count_associates > new_drop_limit){
                            var total_pages=Math.ceil(total_count_associates/new_drop_limit)
                            pages = createPagesArray(total_pages)
                            new_pages =[];
                            // console.log("pagesRESULT",pages)
                            for(let pagination in pages){
                                if(pagination>0 && pagination <= 3){
                                    // console.log("PAGES") 
                                    new_pages.push(pagination)
                                    mapped_pages=new_pages.map(Number)  
                                    // console.log("mappedpagesRESULT inside",mapped_pages)
                                }
                            }
                        }

                    }
                }
                catch(err) {
                    // toast_type = "error";
                    // toast_text = err;
                    error_toast(err)

                }
            }

        }




    function createPagesArray(total) {
    let arr = []
    for(let i = 1; i <= total; i++) {
        arr.push(i)
    }
    return arr
    }

    async function onboarded_check_func(){
        dropdown_disable = false;
        next_prev_disable = false;
        searchTerm = "";
        show_spinner = true;
        
        console.log("onboarded_by_me_checkbox here",onboarded_by_me_checkbox)
        if(onboarded_by_me_checkbox == false){
            // status_pill_clicked(status);
            // console.log("Inside onboarded_by_me_checkbox false")
            logged_user_data = await logged_user();
            try{
                
                username = logged_user_data.body.data.user.name;
                userid = logged_user_data.body.data.user.username;
                let onboard_by_me_sup_res = await onboard_by_me_sup(username,userid);
                try{
                    if(onboard_by_me_sup_res.body.status == "green"){
                        show_spinner=false;
                        new_dash_data = [];
                        console.log("onboard_by_me_sup_res",onboard_by_me_sup_res)
                        let dashboard = onboard_by_me_sup_res.body.data;
                        
                        for(new_dash_data of dashboard){
                            
                            if(new_dash_data.name == "active"){
                                active = new_dash_data.count
                            }
                            else if(new_dash_data.name == "deactive"){
                                deactive = new_dash_data.count
                            }
                            else if(new_dash_data.name == "id proof rejected"){
                                id_proof_rejected = new_dash_data.count
                            }
                            else if(new_dash_data.name == "bank details rejected"){
                                bank_details_rejected = new_dash_data.count
                            }
                            else if(new_dash_data.name == "id verification pending"){
                                id_verification_pending = new_dash_data.count
                            }
                            else if(new_dash_data.name == "bank details pending"){
                                bank_details_pending = new_dash_data.count
                            }
                            else if(new_dash_data.name == "bank beneficiary pending"){
                                bank_beneficiary_pending = new_dash_data.count
                            }
                            else if(new_dash_data.name == "onboarding in progress"){
                                onboarding_in_progress = new_dash_data.count
                            }
                            else if(new_dash_data.name == "pending offer letter"){
                                pending_offer_letter = new_dash_data.count
                            }
                            else if(new_dash_data.name == "background verification rejected"){
                                bgv_rejected = new_dash_data.count
                            }
                            else if(new_dash_data.name == "background verification pending"){
                                bgv_pending = new_dash_data.count
                            }
                            else if(new_dash_data.name  == "bank verification pending"){
                                bank_verification_pending = new_dash_data.count
                            }

                            
                        }
                        total_count = (active+deactive+id_proof_rejected+bank_details_rejected+
                            id_verification_pending+bank_verification_pending+pending_offer_letter+bgv_rejected+
                            bank_details_pending+bank_beneficiary_pending+onboarding_in_progress);
                        show_spinner=false;
                        // console.log("status in false onboard",status)
                        
                        new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,offset:0,prevFlag: false,search_keyword: "",sortDesc: true,status:status,myOnboard: true,username:username,userid:userid}
                        json_associate_data=JSON.stringify(new_associate_data);
                        let onboarded_check_res=await supplier_data(json_associate_data);
                        supplier_data_from_service = onboarded_check_res.body.data.data_list;
                        total_count_associates = onboarded_check_res.body.data.total_records;
                        for(let i=0;i<supplier_data_from_service.length;i++){
                            supplier_data_from_service[i].expand = false;
                        }
                        
                        new_pages =[];
                        mapped_pages=[];
                        if(total_count_associates > new_drop_limit){
                        next_prev_disable = false;
                        total_pages = Math.ceil(total_count_associates/new_drop_limit)

                        pages = createPagesArray(total_pages)
                        
                            // if(show_pagination == true){
                                for(let pagination in pages){
                                    
                                    if(pagination>0 && pagination <= 3){
                                    
                                        new_pages.push(pagination)
                                        mapped_pages=new_pages.map(Number)  
                                    
                                        console.log("mapped_pages",mapped_pages)
                                    }
                            
                                // }
                            }
                        }
                        else{
                            next_prev_disable = true;
                        }


                        // status_pill_clicked(status);
                        // console.log("status afta",status)
                    }
                    else{
                        show_spinner=false;
                        toast_type="error"
                        toast_text = onboard_by_me_sup_res.body.message;
                    }

                }
                catch(err){
                    show_spinner=false;
                    // toast_type = "error"
                    // toast_text = err
                error_toast(err)

                }
                
                // console.log("username and useridddd",username,userid)
                // new_drop_limit=parseInt(drop_limit)  
                
                //     if(onboarded_by_me_checkbox == true){ 
                //         console.log("inside if block onboarded_by_me_checkbox",username,userid)
                //         new_new_associate_data = {city: "-1",limit:new_drop_limit,offset:0,prevFlag: false,search_keyword: "",sortDesc: true,status:status,username:username,userid:userid}  }
                //     else{
                //         console.log("inside else block ")
                //         new_new_associate_data = {city: "-1",limit:new_drop_limit,offset:0,prevFlag: false,search_keyword: "",sortDesc: true,status:status}
                //     }
                //     // }
                //         console.log("onboarded_check_func checked")
                //         json_associate_data=JSON.stringify(new_new_associate_data);
                //         let onboarded_check_res=await supplier_data(json_associate_data);
                    
                //         supplier_data_from_service = onboarded_check_res.body.data.data_list;
                //         total_count_associates = onboarded_check_res.body.data.total_records;
                //         for(let i=0;i<supplier_data_from_service.length;i++){
                //             supplier_data_from_service[i].expand = false;
                //         }
                    }
                
                    
            catch(err) {
                show_spinner=false;
                // toast_type = "error";
                // toast_text = err;
                error_toast(err)

            }



            }
            else if(onboarded_by_me_checkbox == true){
                console.log("here inside TRUE")
                show_spinner=false;
                console.log("status in true onboard",status)
                
            let dashboard_res = await dashboard_data();
            let dashboard = dashboard_res.body.data;
            for(new_dash_data of dashboard){
            
            if(new_dash_data.name == "active"){
                active = new_dash_data.count
            }
            else if(new_dash_data.name == "deactive"){
                deactive = new_dash_data.count
            }
            else if(new_dash_data.name == "id proof rejected"){
                id_proof_rejected = new_dash_data.count
            }
            else if(new_dash_data.name == "background verification pending"){
                bgv_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "bank details rejected"){
                bank_details_rejected = new_dash_data.count
            }
            else if(new_dash_data.name == "bank details pending"){
                bank_details_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "id verification pending"){
                id_verification_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "bank details pending"){
                bank_details_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "bank beneficiary pending"){
                bank_beneficiary_pending = new_dash_data.count
            }
            else if(new_dash_data.name == "onboarding in progress"){
                onboarding_in_progress = new_dash_data.count
            }
            else if(new_dash_data.name == "pending offer letter"){
                pending_offer_letter = new_dash_data.count
            }
            else if(new_dash_data.name == "background verification rejected"){
                bgv_rejected = new_dash_data.count
            }
            else if(new_dash_data.name  == "bank verification pending"){
                bank_verification_pending = new_dash_data.count
            }
        }

            total_count = (active+deactive+id_proof_rejected+bank_details_rejected+
            id_verification_pending+bank_verification_pending+pending_offer_letter+bgv_rejected+
            bank_details_pending+bank_beneficiary_pending+onboarding_in_progress);


            new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,offset:0,prevFlag: false,search_keyword: "",sortDesc: true,status:status} 
            json_associate_data=JSON.stringify(new_associate_data);
            let onboarded_check_res=await supplier_data(json_associate_data);
            supplier_data_from_service = onboarded_check_res.body.data.data_list;
            total_count_associates = onboarded_check_res.body.data.total_records;
            for(let i=0;i<supplier_data_from_service.length;i++){
                supplier_data_from_service[i].expand = false;
            }
            new_pages =[];
            mapped_pages=[];
            if(total_count_associates > new_drop_limit){
                next_prev_disable = false;
                total_pages = Math.ceil(total_count_associates/new_drop_limit)

                pages = createPagesArray(total_pages)
                
                    // if(show_pagination == true){
                        for(let pagination in pages){
                            
                            if(pagination>0 && pagination <= 3){
                              
                                new_pages.push(pagination)
                                mapped_pages=new_pages.map(Number)  
                              
                                console.log("mapped_pages",mapped_pages)
                            }
                    
                        // }
                    }
                }
                else{
                    next_prev_disable = true;
                }
            // status_pill_clicked(status);
            // console.log("status afta",status)
            

            }
            // else{
            //     show_spinner=false;
            // }
            
        }
    // if(status != ""){
        // if(onboarded_by_me_checkbox == true){    
        //     new_associate_data = {city: "-1",limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status: status,username:username,userid:userid}
        // }
        // else if(onboarded_by_me_checkbox == false){
        //     new_associate_data = {city: "-1",limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}  
        // }
    // }

    function next_function(){
        show_spinner = true;
        if(status != "-1"){
            show_spinner = false;
            // console.log("pages.length",pages.length)
            last_num_from_pages = pages.length
            console.log("last_num",last_num_from_pages)
            console.log("pagenumber",pagenumber)
            // if(mapped_pages.includes(last_num_from_pages)){

                // }
                //  else{  
        for (var i = 0; i < mapped_pages.length; i++){       
            mapped_pages[i] = mapped_pages[i] + 1;
            //    }
            }
            // console.log("mapped_pagessss",mapped_pages)
            // console.log("mapped_pagessss",mapped_pages[0])
            pageChange(mapped_pages[2])
        }
        else{
            show_spinner = false;
        }
}
    
    function previous_function(){ 
        show_spinner = true;
        // searchTerm = "";
        if(status != "-1"){
            show_spinner = false;
            let first_num_from_pages = pages[0];
            if(mapped_pages.includes(first_num_from_pages)){
               
            }
            else{
                show_spinner = false;
                for (var i = 0; i < mapped_pages.length; i++){
                    mapped_pages[i] = mapped_pages[i] - 1;
                }
            }
            pageChange(mapped_pages[0])
        }
        else{
            show_spinner = false;
        }
    }

   async function pageChange(pagenum){
    show_spinner = true;
      if(pagenumber != pagenum){
        pagenumber = pagenum;
    //     console.log("pagenumber",pagenumber)
    //    console.log("last_num_from_pages",last_num_from_pages);
       new_drop_limit=parseInt(drop_limit)
    //    console.log("new_drop_limit in pagechange",new_drop_limit)
       
       if(pagenum == 1){
        if(onboarded_by_me_checkbox == true){
            console.log("INside onboarded by me checkbox true")
        new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,offset:0,prevFlag: false,search_keyword: "",sortDesc: true,status:status,myOnboard: true,username:username,userid:userid}
        }
        else{
            console.log("Inside onboarded by me checkbox false")
        new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,offset:0,prevFlag: false,search_keyword: "",sortDesc: true,status:status}  
        }  
        // new_associate_data = {city: "-1",limit:new_drop_limit,offset:0,prevFlag: false,search_keyword: "",sortDesc: true,status: "Bank Details Pending"}
        json_associate_new_data=JSON.stringify(new_associate_data);
        let page_res =await supplier_data(json_associate_new_data);
        supplier_data_from_service = page_res.body.data.data_list;
        for(let i=0;i<supplier_data_from_service.length;i++){
                supplier_data_from_service[i].expand = false;
            }
       }
       else{
        //    console.log("pagenumberrrr",pagenumber - 1)
           let new_offset = (pagenum-1)*drop_limit
        //    console.log(new_offset)
        if(onboarded_by_me_checkbox == true){   
            console.log("INside onboarded by me checkbox true") 
            new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,offset:new_offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status,myOnboard:true,username:username,userid:userid}
        }
        else{
            console.log("INside onboarded by me checkbox false")
            new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,offset:new_offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}  
        }
        //    new_associate_data = {city: "-1",limit:new_drop_limit,offset:new_offset,prevFlag: false,search_keyword: "",sortDesc: true,status: "Bank Details Pending"}
            json_associate_new_data=JSON.stringify(new_associate_data);
            let page_res =await supplier_data(json_associate_new_data);
            // console.log("page_res",page_res)
            supplier_data_from_service = page_res.body.data.data_list;
            for(let i=0;i<supplier_data_from_service.length;i++){
                supplier_data_from_service[i].expand = false;
            }
       }
   }
   show_spinner = false;
}
    // function myFunction() {
    //     var x = document.getElementById("mobilemenu");
    //     if (x.style.display === "none") {
    //         x.style.display = "block";
    //         document.querySelector("#mobileBar").classList.add("bg-bgSideNav");
    //         document
    //             .querySelector("#mobilemenu")
    //             .classList.add("d-block-content");
    //         document.querySelector(".homelogo").classList.add("border-r-none");
    //     } else {
    //         x.style.display = "none";
    //         document
    //             .querySelector("#mobileBar")
    //             .classList.remove("bg-bgSideNav");
    //         document
    //             .querySelector("#mobilemenu")
    //             .classList.remove("d-block-content");
    //         document
    //             .querySelector(".homelogo")
    //             .classList.remove("border-r-none");
    //     }
    // }
    // // modal for filter mobile           {{{Done}}}

    // var modal = document.getElementById("myModal");
    // var btn = document.getElementById("myBtn");
    // var span = document.getElementsByClassName("close")[0];

    function myBtn() {
        myModal.style.display = "block";
    };
    function close() {
        myModal.style.display = "none";
    };
    // window.onclick = function (event) {
    //     if (event.target == myModal) {
    //         myModal.style.display = "none";
    //     }
    // };

    // // modal for supplierInfoModal mobile                {{{{{Done}}}}}

    // var supplierInfoModalId = document.getElementById("supplierInfoModal");
    // var SupplerModalbuttonClick = document.getElementById("SupplerModalbuttonClick");
    // var closeAuditTrailModal = document.getElementById("closeAuditTrailModal");

    // closeAuditTrailModal;

    async function SupplerModalbuttonClick(datalist_name) {
        let audit_res = await audit_trail_data(datalist_name.name)
        try{
            if(audit_res.body.status == "green"){
                audit_details_array = audit_res.body.data
                audit_supplier_data = datalist_name;
                audit_supplier_address = audit_supplier_data.addresess[0].city
            }
        }
        catch(err){
                // toast_type = "error";
                // toast_text = err;
                error_toast(err)

            }
        supplierInfoModal.style.display = "block";
    };
    
    function closeAuditTrailModal() {
        supplierInfoModal.style.display = "none";
    };


    function update_associate(fac_name){
        // console.log("fac_name",fac_name)
        show_spinner = true;
        // let associate_id;
        // console.log("supplier_data_from_service",supplier_data_from_service)
        // for(let i=0;i<supplier_data_from_service.length;i++){
        //     if(fac_name == supplier_data_from_service[i].name){
        //         associate_id = supplier_data_from_service[i].name
        //         console.log("supplier_data_from_service[i].name",supplier_data_from_service[i].name)
        //         console.log("associate_id",associate_id)
        //     }
            // goto("onboardsummary?unFacID="+associate_id,'_blank');
                
            window.open("onboardsummary?unFacID="+fac_name, "_blank");
        // }
        show_spinner = false;
    }


    // window.onclick = function (event) {
    //     if (event.target == supplierInfoMsupplierInfoModalodalId) {
    //         supplierInfoModal.style.display = "none";
    //     }
    // };

    async function resetfilterButton(){
        vendor_checkbox = false;
        workforce_checkbox = false;
        document.getElementById("select_city").value = "-1"
        document.getElementById("select_status").value = "-1"
        document.getElementById("select_vendor_type").value = "-1"
        city = "-1";
        org_id_selected= "-1"
        org_selected = "";
        status = "";
        new_vendor_type = "";
        


        if(onboarded_by_me_checkbox == true){
            
            new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status,myOnboard: true,username:username,userid:userid}
        }
        else
        {
            new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status} 
        }

        json_associate_new_data=JSON.stringify(new_associate_data);
        let filter_res =await supplier_data(json_associate_new_data);
            try{
                if(filter_res.body.status == "green"){
                    show_spinner = false;
                    supplier_data_from_service = filter_res.body.data.data_list;
                    total_count_associates = filter_res.body.data.total_records; 
                    for(let i=0;i<supplier_data_from_service.length;i++){
                        supplier_data_from_service[i].expand = false;
                    }
                //     if(total_count_associates > 20){
                  
                // total_pages = Math.ceil(total_count_associates/new_drop_limit)
                // pages = createPagesArray(total_pages)
                // new_pages =[];
                //     // if(show_pagination == true){
                //         for(let pagination in pages){
                            
                //             if(pagination>0 && pagination <= 3){
                //                 // console.log("PAGES") 
                //                 new_pages.push(pagination)
                //                 mapped_pages=new_pages.map(Number)  
                //                 console.log("mapped_pages",mapped_pages)
                //             }
                    
                //         // }
                //     }
                // }

                if(total_count_associates > new_drop_limit){
                    next_prev_disable = false;
                  
                  total_pages = Math.ceil(total_count_associates/new_drop_limit)
  
                  pages = createPagesArray(total_pages)
                  new_pages =[];
                      // if(show_pagination == true){
                          for(let pagination in pages){
                              
                              if(pagination>0 && pagination <= 3){
                                
                                  new_pages.push(pagination)
                                  mapped_pages=new_pages.map(Number)  
                                
                                  console.log("mapped_pages",mapped_pages)
                              }
                      
                          }
                      }
                
                }
            }
            catch(err){
                error_toast(err)
                show_spinner=false;
            }
    }
    async function filterButton(){
        show_spinner = true;
        pagenumber = 1;
        dropdown_disable = false;
        // mapped_pages = [];
        vendor_type_select = document.getElementById("select_vendor_type").value.trim();
        console.log("vendor_type_select",vendor_type_select)
       


        for(let vendorData  of filter_vendortype_array){
            if (vendor_type_select == vendorData.facility_type_name){
                new_vendor_type = vendorData.facility_type
             
            }    
        } 
        city = document.getElementById("select_city").value.trim();
        new_drop_limit=parseInt(drop_limit)
        for(let cityData  of filter_city_array){
            if (city == cityData.location_name){
                new_city =cityData.location_id;
                city = new_city;
            }    
        } 
        status = document.getElementById("select_status").value.trim();
        if(status != "-1"){
        if(onboarded_by_me_checkbox == true){
            
            new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status,myOnboard: true,username:username,userid:userid}
        }
        else
        {
            new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status} 
        }

        json_associate_new_data=JSON.stringify(new_associate_data);
        let filter_res =await supplier_data(json_associate_new_data);
            try{
                if(filter_res.body.status == "green"){
                    show_spinner = false;
                    supplier_data_from_service = filter_res.body.data.data_list;
                    total_count_associates = filter_res.body.data.total_records; 
                    for(let i=0;i<supplier_data_from_service.length;i++){
                        supplier_data_from_service[i].expand = false;
                    }
                //     if(total_count_associates > 20){
                  
                // total_pages = Math.ceil(total_count_associates/new_drop_limit)
                // pages = createPagesArray(total_pages)
                // new_pages =[];
                //     // if(show_pagination == true){
                //         for(let pagination in pages){
                            
                //             if(pagination>0 && pagination <= 3){
                //                 // console.log("PAGES") 
                //                 new_pages.push(pagination)
                //                 mapped_pages=new_pages.map(Number)  
                //                 console.log("mapped_pages",mapped_pages)
                //             }
                    
                //         // }
                //     }
                // }

                if(total_count_associates > new_drop_limit){
                    next_prev_disable = false;
                  
                  total_pages = Math.ceil(total_count_associates/new_drop_limit)
  
                  pages = createPagesArray(total_pages)
                  new_pages =[];
                      // if(show_pagination == true){
                          for(let pagination in pages){
                              
                              if(pagination>0 && pagination <= 3){
                                
                                  new_pages.push(pagination)
                                  mapped_pages=new_pages.map(Number)  
                                
                                  console.log("mapped_pages",mapped_pages)
                              }
                      
                          // }
                      }
                  }
                  else{
                    next_prev_disable = true;
                  }
                    console.log("supplier_data_from_service here",supplier_data_from_service)
                }
                else{
                    show_spinner = false;
                }
            }
            catch(err) {
                show_spinner = false
                error_toast(err)

            } 
            
        }
        else if(status == "-1"){
            // toast_type = "error"
            // toast_text ="Please select Status"
            error_toast("Please select Status")

            return
        }
        else if(vendor_type_select == "-1"){
            // toast_type = "error"
            // toast_text ="Please select Associate/Vendor type"
            error_toast("Please select Associate/Vendor type")

            return
        }
        
    }

    async function status_pill_clicked(status_selected){
        // searchTerm = "";
        dropdown_disable = false;
        // console.log("status_selected",status_selected)
        pagenumber = 1;
      show_spinner = true;
      status_for_highlight = status_selected;
        status = status_selected;

        new_drop_limit=parseInt(drop_limit)
        if(status_selected == "All"){
            status = "";
        }
        console.log()
        if(onboarded_by_me_checkbox == true){
            console.log("onboarded_by_me_checkbox true in status_pill_clicked")
            new_associate_data = {city:"-1",myOnboard: true,org_id:org_selected,limit:new_drop_limit,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status,username:username,userid:userid}
        }
        else
        {
            console.log("onboarded_by_me_checkbox flase in status_pill_clicked")
            new_associate_data = {city:city,limit:new_drop_limit,org_id:org_selected,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status} 
        }

    // new_associate_data = {city:"-1",limit:new_drop_limit,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status_selected}
    json_associate_new_data=JSON.stringify(new_associate_data);
    let filter_res_from_dash =await supplier_data(json_associate_new_data);
    
    try{
            if(filter_res_from_dash.body.status == "green"){
               show_spinner = false;
                supplier_data_from_service = [];
                
                supplier_data_from_service = filter_res_from_dash.body.data.data_list;
                total_count_associates = filter_res_from_dash.body.data.total_records; 
                for(let i=0;i<supplier_data_from_service.length;i++){
                    supplier_data_from_service[i].expand = false;
                }
                console.log("supplier_data_from_service",total_count_associates)
                new_pages =[];
                mapped_pages=[];
                if(total_count_associates > new_drop_limit){
                next_prev_disable = false;
                total_pages = Math.ceil(total_count_associates/new_drop_limit)

                pages = createPagesArray(total_pages)
                
                    // if(show_pagination == true){
                        for(let pagination in pages){
                            
                            if(pagination>0 && pagination <= 3){
                              
                                new_pages.push(pagination)
                                mapped_pages=new_pages.map(Number)  
                              
                                console.log("mapped_pages",mapped_pages)
                            }
                    
                        // }
                    }
                }
                else{
                    next_prev_disable = true;
                }
                // status_pill_flag = true;
            }
        }
        catch(err) {
            show_spinner = false;
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }
        
    }


    /////////from dashboard redirect with filter on///////////////
// else
//     {
//     // console.log("INside if blcok of paramString",paramString)
//     let new_paramString = decodeURI(paramString)
//     // console.log("drop_limit inside urlString",drop_limit)
//     new_drop_limit=parseInt(drop_limit)
//     new_associate_data = {city:"-1",limit:new_drop_limit,fac_type:new_vendor_type,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:new_paramString}
//     json_associate_data=JSON.stringify(new_associate_data);
//     let res=await supplier_data(json_associate_data);
//         try{
//             if(res.body.status == "green"){
//             // supplier_data_from_service = []
//             supplier_data_from_service = res.body.data.data_list;
//             total_count_associates = res.body.data.total_records;
//             for(let i=0;i<supplier_data_from_service.length;i++){
//                 supplier_data_from_service[i].expand = false;
//             }
            
//             }
//         }
//         catch(err) {
//         message.innerHTML = "Error is " + err;
//         }

//          userdetails = await logged_user();
        
//         try{
//             if(userdetails.body.status == "green"){
//                 username = userdetails.body.data.user.email;
//         userid = userdetails.body.data.user.username;
//             }
//         }
//         catch(err) {
//         message.innerHTML = "Error is " + err;
//         }
        
//         // new_drop_limit=parseInt(drop_limit)
//         total_count_associates = res.body.data.total_records;
        
//         total_pages = Math.ceil(total_count_associates/new_drop_limit)
//         pages = createPagesArray(total_pages)
        
//         }
//     }


    // // modal for filter desktop                  {{{{{Done}}}}}

    function myFunctionFilter() {
        var x = document.getElementById("myModalDesktop");
        var y = document.getElementById("desktopfilterbtn");

        if (x.style.display === "block") {
            x.style.display = "none";
            y.style.background = "#374ea2";
        } else {
            x.style.display = "block";
            y.style.background = "#000";
        }
    }
// // show search textbox hide supplier count          {{{{{{{pending}}}}}}}

    // var btnSearch = document.getElementById("SearchClick");
    // var searchInput = document.getElementById("searchBox");
    // var supplierCount = document.getElementById("supplierCount");
    // var inputboxsearch = document.getElementById("inputboxsearch");
    function SearchClick() {
        searchBox.style.display = "block";
        supplierCount.style.display = "none";
        SearchClick.style.display = "none";
        searchBox.style.width = "100%";
        inputboxsearch.style.width = "100%";
    };

    // var closeSearch = document.getElementById("closeSearch");
    function closeSearch() {
        supplierCount.style.display = "block";
        searchBox.style.display = "none";
        SearchClick.style.display = "block";
    };

    const enterKeyPress = e => {
        // if(searchTerm == undefined){
        //     toast_type = "error";
        //     toast_text = "Search should not be blank !";
        // }
        // else{
    
            if (e.charCode === 13) {
             filterResults();
            }
        // }
  };

    async function filterResults(){
        dropdown_disable = false;
        console.log("Inside filter resukts",searchTerm)
        // console.log("inside seach term = ",searchTerm)
        if(searchTerm == undefined){
            // toast_type = "error";
            // toast_text = "Search should not be blank !";
            error_toast("Search should not be blank !")

        }
        else{
        let searchArray= [];
        let search_obj = 
            {"city":-1,
            "totalSkip":0,
            "prevFlag":false,
            "prevSkip":20,
            "search_keyword":searchTerm,
            "limit":10,
            "offset":0,
            "sortDesc":true}
        
       console.log("search_obj",search_obj)

        let searchresult_res = await search_supplier(JSON.stringify(search_obj))
        try{
            if(searchresult_res.body.status == "green"){
                searchArray = searchresult_res.body.data.data_list;
                console.log("searchArray",searchArray)
                
                // for(let searchK  of supplier_data_from_service){
                //     const seacrh_keyword = searchK.facility_name;
                    mapped_pages.length=0
                    // searchArray = [...searchArray,searchK];
                    total_count_associates = searchArray.length;
                    supplier_data_from_service = searchArray;
                    for(let i=0;i<supplier_data_from_service.length;i++){
                        supplier_data_from_service[i].expand = false;
                    }
                    console.log("supplier_data_from_service",supplier_data_from_service)
                // }
            }
        }
        catch(err) {
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }
        

        // for(let searchK  of supplier_data_from_service){
        //     console.log("supplier_data_from_service",searchK)
        //     const seacrh_keyword = searchK.facility_name;
        //     const search_supplier = searchK.name
        //     console.log("seacrh_keyword",seacrh_keyword.includes(searchTerm))
        //      let name_result = seacrh_keyword.toLowerCase().includes(searchTerm.toLowerCase());
        //      let id_result = search_supplier.toLowerCase().includes(searchTerm.toLowerCase());
        //     // newsearchK = result.append(...result);
        //     // console.log("newsearchKn",newsearchK)
        //     if(id_result === true || name_result === true){
            
        //     console.log("result = true")
        //     mapped_pages.length=0
        //     searchArray = [...searchArray,searchK]
        //     total_count_associates = searchArray.length;
        //     // console.log("searchK-----",total_count_associates)
        //     }
        
        // }
    }
            // console.log("supplier_data_from_service inside filterresult",supplier_data_from_service)
    }
    async function dropdown_function(){
        searchTerm = "";
        pagenumber = 1;
        dropdown_disable = false;
        console.log("new_lllliiimmmiitttt",status)
        new_drop_limit=parseInt(drop_limit)

        if(status != "-1"){
            if(onboarded_by_me_checkbox == true){    
                    new_associate_data = {city: "-1",limit:new_drop_limit,org_id:org_selected,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status,myOnboard: true,username:username,userid:userid}
                }
                else{
                    new_associate_data = {city: "-1",limit:new_drop_limit,org_id:org_selected,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}  
                }
                // new_associate_data = {city: "-1",limit:new_drop_limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status: "Bank Details Pending",onboarded_by_me:true}
                json_associate_new_data=JSON.stringify(new_associate_data);
                let dropdown_res =await supplier_data(json_associate_new_data);
                
                total_count_associates = dropdown_res.body.data.total_records;
                if(total_count_associates > new_drop_limit){
                    new_pages =[];
                    mapped_pages=[];
                    next_prev_disable = false;
                    total_pages = Math.ceil(total_count_associates/new_drop_limit)
                    // console.log("page_count_______",total_pages)
                    pages = createPagesArray(total_pages)
                    last_num_from_pages = pages.length;

                    // if(show_pagination == true){
                        for(let pagination in pages){
                            
                            if(pagination>0 && pagination <= 3){
                              
                                new_pages.push(pagination)
                                mapped_pages=new_pages.map(Number)  
                              
                                console.log("mapped_pages",mapped_pages)
                            }
                    
                        // }
                    }
                }
                else{
                    next_prev_disable = true;
                }
        // console.log("pages,,,,,",pages)


        try{
            if(dropdown_res.body.status == "green"){
            supplier_data_from_service = dropdown_res.body.data.data_list;
            for(let i=0;i<supplier_data_from_service.length;i++){
            supplier_data_from_service[i].expand = false;
        }
            // for(let i=0;i<supplier_data_from_service.length;i++){
            //         supplier_data_from_service[i].expand = false;
            //     }
            }
        }
        catch(err) {
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }
    }
    // new_associate_data = {city:new_city,limit:drop_limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}
    // console.log("dropdown_function",supplier_data_from_service)
        
    }

    // // supplier table collaps

    function collapse(fac_name) {
        // let is_expanded = false;
       
        for(let i=0;i<supplier_data_from_service.length;i++){
            if(supplier_data_from_service[i].name == fac_name){
               supplier_data_from_service[i].expand = true;
            }
        }
        // console.log("supplier_data_from_service AFt",supplier_data_from_service)
           
        // var shortInfo = document.querySelectorAll(".shortInfo");
        // var elems = document.querySelectorAll(".detailsInfo");
        // var trow = document.querySelector(".trow");
    
        // document.querySelector(".trow").classList.add("valgin");

        // for(let i=0;i<supplier_data_from_service.length;i++){
        //     if(supplier_data_from_service[i].expand == true){
        //         console.log("Showing")
        //         elems.forEach.call(elems, function (el) {
        //         el.classList.remove("hidden");
        //         });
               
        //         shortInfo.forEach.call(shortInfo, function (el) {
        //         el.classList.add("hidden");
        //         });
        //     }
        //     else{
        //         console.log("Hiding")
        //     }
        // }
    };

 

    function collapsedown(fac_name) {
        
        for(let i=0;i<supplier_data_from_service.length;i++){
            if(supplier_data_from_service[i].name == fac_name){
               supplier_data_from_service[i].expand = false;
            }
        }
        // var shortInfo = document.querySelectorAll(".shortInfo");
        // var elems = document.querySelectorAll(".detailsInfo");
        // var trow = document.querySelector(".trow");

        // document.querySelector(".trow").classList.remove("valgin");

        // shortInfo.forEach.call(shortInfo, function (el) {
        //     el.classList.remove("hidden");
        // });

        // elems.forEach.call(elems, function (el) {
        //     el.classList.add("hidden");
        // });
    };
 // supplier mobile collaps

    function collapseMobile() {
        var shortInfom = document.querySelectorAll(".shortInfoMobile");
        var detailsInfoMobile = document.querySelectorAll(".detailsInfoMobile");

        shortInfom.forEach.call(shortInfom, function (el) {
            el.classList.add("hidden");
        });

        detailsInfoMobile.forEach.call(detailsInfoMobile, function (el) {
            el.classList.remove("hidden");
        });
    };

    function collapsedownMobile() {
        var shortInfom = document.querySelectorAll(".shortInfoMobile");
        var detailsInfoMobile = document.querySelectorAll(".detailsInfoMobile");

        shortInfom.forEach.call(shortInfom, function (el) {
            el.classList.remove("hidden");
        });

        detailsInfoMobile.forEach.call(detailsInfoMobile, function (el) {
            el.classList.add("hidden");
        });
    };

    function deactivate_associate(fac_data){
        fac_obj = fac_data;
        console.log("inside deactivate fac",fac_obj)
        deactivate_asso_profile.style.display = "block";
    }
    function close_deact_associate(){
        // fac_obj_arr = [];
        deactivate_asso_profile.style.display = "none";
        deact_date = "";
    }
function open_deact_initiate_model(stat){
        if(stat == "deact_later"){
            if(!deact_date){
                error_toast("Please select date for deactivating the profile later")
                return
            }
            initiateDeact.style.display = "block";
        }
        else if(stat == "deact_imm"){
            initiateDeact.style.display = "block";
        }
    }
    function close_deact_initiate_module(){
        // fac_obj_arr = [];
        initiateDeact.style.display = "none";
        deact_date = "";
    }
    // function confirm_initiate_deact(){

    // }


    async function deactivate_profile_imm(){
        // console.log("inside deactivate profile",fac_obj)
        show_spinner = true;
        if(deact_date && fac_obj){
            var deactivate_user_imm_res = await deactivate_assocaite(fac_obj.name,deact_date);
        }
        else if(fac_obj){
            var deactivate_user_imm_res = await deactivate_assocaite(fac_obj.name);
        }
        try{
            if(deactivate_user_imm_res.body.status == "green"){
                close_deact_associate()
                close_deact_initiate_module()
                show_spinner = false;
                // toast_type = "success";
                // toast_text = deactivate_user_imm_res.body.message;
                success_toast(deactivate_user_imm_res.body.message)

            }
            else{
                show_spinner = false;
                // toast_type = "deactivate_user_imm_res.body.messageivate_user_imm_res.body.message
                error_toast(deactivate_user_imm_res.body.message)

            }

        }
        catch(err){
            show_spinner = false;
            // toast_type = "error"
            // toast_text = err;
            error_toast(err)
        }
        show_spinner = false;
    }
    async function deactivate_profile_later(){
        console.log("inside deactivate profile",fac_obj)
        show_spinner = true;
        // if(fac_id && date != ""){
        //     var deactivate_user_imm_res = await deactivate_assocaite(fac_id,date);
        // }
        // else{
            var deactivate_user_imm_res = await deactivate_assocaite(fac_id);
        // }
        try{
            if(deactivate_user_imm_res.body.status == "green"){
                show_spinner = false;
                // toast_type = "success";
                // toast_text = deactivate_user_imm_res.body.status;
                success_toast(deactivate_user_imm_res.body.status)

            }
            else{
                show_spinner = false;
                // toast_type = "error";
                // toast_text = "Error in deactivating profile"
                error_toast("Error in deactivating profile")
            }

        }
        catch(err){
            show_spinner = false;
            // toast_type deactivate_user_imm_res.body.statuseactivate_user_imm_res.body.status;
            error_toast(deactivate_user_imm_res.body.status)
        }
    }



</script>
    {#if show_spinner}
    <Spinner />
    {/if}
<div class="mainContent ">
    <div class="breadcrumb">
        <div class="breadcrumb-section">
            <div class="breadcrumbSupplier">
                <div class="flex whitespace-nowrap">
                    <p>
                        <span class="breadcrumbgrey">Home / 
                            <span class="text-base text-black">
                                Associates
                            </span>
                        </span>
                    </p>
                </div>
                <div class="Onboardedbyme">
                    <div class="checkFormgroup">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            placeholder="Your password"
                            class="inputChecked"
                            autocomplete="off"
                            bind:checked = "{onboarded_by_me_checkbox}"
                            on:click="{onboarded_check_func}"
                        />
                        <label for="remember-me" class="onboardedText ">
                            Onboarded by me
                        </label>
                    </div>
                    <p>
                        <a href="#" class="filterxsl " on:click="{myBtn}">
                            <img src="{$img_url_name.img_name}/filter.svg" alt="" /></a
                        >

                        <a
                            href="#"
                            class="filter "
                            id="desktopfilterbtn"
                            on:click="{myFunctionFilter}"
                        >
                            <span>Filter</span>
                            <img
                                src="{$img_url_name.img_name}/filter.svg"
                                class="pl-2 xs:p-0"
                                alt=""
                            />
                        </a>
                    </p>
                </div>
            </div>

            <div class="filterModal" id="myModal">
                <div class="modalwrapper">
                    <div class="filterModalwrapper ">
                        <div class="filterContainer  ">
                            <div class="filterSection">
                                <div class=" filterXsheader">
                                    <div class="filterxsContent ">
                                        <p class="filterTextLable">Filter</p>
                                        <p>
                                            <img on:click="{close}"
                                                src="{$img_url_name.img_name}/cross.svg"
                                                class="close"
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div class="filterSectionContainer ">
                                    <div class="filterValues  ">
                                        <div>
                                            <div class="flex gap-4">
                                                <div>
                                                    <label
                                                        class="inline-flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                            bind:checked = "{vendor_checkbox}"
                                                        />
                                                        <span class="ml-2"
                                                            >Vendor</span
                                                        >
                                                    </label>
                                                </div>
                                                <div class="pl-4">
                                                    <label
                                                        class="inline-flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                            bind:checked = "{workforce_checkbox}"
                                                        />
                                                        <span class="ml-2"
                                                            >Workforce</span
                                                        >
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="filterActions  ">
                                                <div class="selectOptions">
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Organization
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                                id= "select_org"
                                                            bind:value = {org_id_selected}>
                                                            <option value="-1">Select</option>
                                                            {#each org_data_arr as org}
                                                                <option
                                                                    class="pt-6"
                                                                    >{org.org_name}</option
                                                                >
                                                               {/each}
                                                            </select>
                                                            <button
                                                                class="formSelectArrow  cursor-pointer"
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/downarrow.svg"
                                                                    class="w-5 h-auto" 
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select City
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >
                                                            <!-- <option class="pt-6">All</option> -->
                                                            <option value="-1">Select</option>
                                                            {#each filter_city_array as data_city}
                                                           
                                                                <option
                                                                    class="pt-6">
                                                                    {data_city.location_name}
                                                                    </option>
                                                                {/each}
                                                                
                                                            </select>
                                                            <button
                                                                class="formSelectArrow  cursor-pointer "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Vendor/Associate Type
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >
                                                            
                                                            {#if workforce_checkbox == true}
                                                            {#each filter_vendortype_array as vendor_type}
                                                            {#if vendor_type.category == "Workforce"}
                                                            <option value="-1">Select</option>
                                                            <option
                                                                    class="pt-6"
                                                                    >{vendor_type.facility_type_name}</option
                                                                >
                                                                {/if}
                                                                {/each}
                                                           
                                                           {/if}

                                                           {#if vendor_checkbox == true}
                                                            {#each filter_vendortype_array as vendor_type}
                                                            {#if vendor_type.category == "Vendor"}
                                                            <option value="-1">Select</option>
                                                            <option
                                                                    class="pt-6"
                                                                    >{vendor_type.facility_type_name}</option
                                                                >
                                                            {/if}
                                                            {/each}
                                                           
                                                           {/if}
                                                            </select>
                                                            <button
                                                                class="formSelectArrow  cursor-pointer "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Status
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >
                                                            <!-- <option class="pt-6">All</option> -->
                                                            <option value="-1">Select</option>
                                                            {#each filter_status_array as data_status}   
                                                                {#if data_status.display_name != undefined}
                                                              
                                                                <option class="pt-6"> {data_status.display_name}
                                                                </option>
        
                                                                {/if}
                                                            {/each}
                                                            
                                                            </select>
                                                            <button
                                                                class="formSelectArrow  cursor-pointer "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="applyfilterbutton ">
                                                    <a
                                                        href="#"
                                                        class="filterCancelbtn close"
                                                        >Cancel</a
                                                    >
                                                    <button
                                                        href="#"
                                                        class="filterApplybtn mr-4" on:click={resetfilterButton}
                                                        >Reset</button
                                                    >
                                                    <button
                                                        href="#"
                                                        class="filterApplybtn" on:click={filterButton}
                                                        >Apply</button
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="filterModalDesktop hidden " id="myModalDesktop">
                <div class="caret" />
                <div class="modalwrapper">
                    <div class="filterModalwrapper ">
                        <div class="filterContainer  ">
                            <div class="filterSection">
                                <div class=" filterXsheader">
                                    <div class="filterxsContent ">
                                        <p class="filterTextLable">Filter</p>
                                        <p>
                                            <img on:click="{close}"
                                                src="{$img_url_name.img_name}/cross.svg"
                                                class="close"
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div class="filterSectionContainer ">
                                    <div class="filterValues  ">
                                        <div>
                                            <div class="flex gap-4">
                                                <div>
                                                    <label
                                                        class="inline-flex items-center"
                                                    >
                                                        <!-- <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                            checked
                                                            value = "Vendor"
                                                        /> -->
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                            bind:checked = "{vendor_checkbox}"
                                                        />
                                                        <span class="ml-2"
                                                            >Vendor</span
                                                        >
                                                    </label>
                                                </div>
                                                <div class="pl-4">
                                                    <label
                                                        class="inline-flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                            bind:checked = "{workforce_checkbox}"
                                                        />
                                                        <span class="ml-2"
                                                            >Workforce</span
                                                        >
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="filterActions  ">
                                                <div class="selectOptions">
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Organization
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                        <select
                                                        class="selectInputbox"
                                                        id= "select_org"
                                                        bind:value = {org_id_selected}>
                                                        
                                                        <option value="-1">Select</option>
                                                        {#each org_data_arr as org}
                                                            <option
                                                                class="pt-6"
                                                                >{org.org_name}</option
                                                            >
                                                        {/each}
                                                        </select>
                                                            <button
                                                                class="formSelectArrow  cursor-pointer "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection" >
                                                        <label
                                                            class="formLableSelect "
                                                            >Select City
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                                id= "select_city"
                                                                >
                                                                
                                                                <option class="pt-6" value="-1"
                                                                >All</option>
                                                            {#each filter_city_array as data_city}
                                                                <option
                                                                    class="pt-6">
                                                                    {data_city.location_name}
                                                                    </option>
                                                                {/each}
                                                            </select>
                                                            <button
                                                                class="formSelectArrow  cursor-pointer "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Vendor / Associate Type
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                                id= "select_vendor_type"
                                                            >
                                                            <option value="-1">Select</option>
                                                           {#if workforce_checkbox == true}
                                                            {#each filter_vendortype_array as vendor_type}
                                                            {#if vendor_type.category == "Workforce"}
                                                            
                                                            <option
                                                                    class="pt-6"
                                                                    >{vendor_type.facility_type_name}</option
                                                                >
                                                                {/if}
                                                                {/each}
                                                           
                                                           {/if}

                                                           {#if vendor_checkbox == true}
                                                            {#each filter_vendortype_array as vendor_type}
                                                            {#if vendor_type.category == "Vendor"}
                                                            <option
                                                                    class="pt-6"
                                                                    >{vendor_type.facility_type_name}</option
                                                                >
                                                            {/if}
                                                            {/each}
                                                           
                                                           {/if}
                                                            
                                                            </select>
                                                            <button
                                                                class="formSelectArrow  cursor-pointer "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection " >
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Status
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                                    <!-- DESKTOP VIEW -->
                                                        <select
                                                        class="selectInputbox" id= "select_status"> 
                                                        <!-- <option class="pt-6" value="-1">All</option> -->
                                                        <option value="-1">Select</option>
                                                        <option value=" ">All</option>
                                                        {#each filter_status_array as data_status}   
                                                        {#if data_status.display_name != undefined}
                                                       
                                                        <option class="pt-6"> {data_status.display_name}
                                                        </option>
   
                                                       {/if}
                                                        {/each}
                                                        
                                                    </select>
                                                            <button
                                                                class="formSelectArrow  cursor-pointer "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="applyfilterbutton ">
                                                    <a
                                                        href="#"
                                                        class="filterCancelbtn close"
                                                        >Cancel</a
                                                    >
                                                    <button
                                                    href="#"
                                                    class="filterApplybtn mr-4" on:click={resetfilterButton}
                                                    >Reset</button
                                                >
                                                    <button
                                                        href="#"
                                                        class="filterApplybtn" on:click={filterButton}
                                                        >Apply</button
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="countsSection ">
                <div class="SectionsCounts ">
                    <p class="docReject">Documents Rejected</p>
                    <div class="docRejctedCon flex gap-2">
                        
                        {#if status == "ID Proof Rejected"} 
                        <button class="idproof flex-grow" style="background-color: #dddd; border: 1px solid black;">
                            <div class="countHeading">
                                ID Proof <span class="idproofcount">{id_proof_rejected}</span>
                            </div>
                        </button>
                        {:else}
                        <button class="idproof flex-grow">
                            <div class="countHeading" on:click={()=>status_pill_clicked("ID Proof Rejected")}>
                                ID Proof <span class="idproofcount">{id_proof_rejected}</span>
                            </div>
                        </button>
                        {/if}

                        {#if status == "Bank Details Rejected"}
                        <button class="idproof flex-grow" style="background-color: #dddd; border: 1px solid black;">
                            <div class="countHeading">
                                Bank Details <span class="idproofcount"
                                    >{bank_details_rejected}</span
                                >
                            </div>
                        </button>
                        {:else}
                        <button class="idproof flex-grow">
                            <div class="countHeading" on:click={()=>status_pill_clicked("Bank Details Rejected")}>
                                Bank Details <span class="idproofcount"
                                    >{bank_details_rejected}</span
                                >
                            </div>
                        </button>
                        {/if}

                        

                        {#if status == "Background Verification Rejected"}
                        <button class="idproof flex-grow" style="background-color: #dddd; border: 1px solid black;">
                            <div class="countHeading">
                                BGV Rejected <span class="idproofcount">{bgv_rejected}</span
                                >
                                </div>
                        </button>
                        {:else}
                        <button class="idproof flex-grow">
                            <div class="countHeading" on:click={()=>status_pill_clicked("Background Verification Rejected")}>
                                BGV Rejected <span class="idproofcount">{bgv_rejected}</span
                                >
                                </div>
                        </button>
                        {/if}

                    </div>
                </div>
                <div class="SectionsCounts ">
                    <p class="PendingVeri">Pending Verification</p>
                    <div class="docRejctedCon flex gap-2">
                        {#if status == "ID Verification Pending"}
                        <button class="bgdocreject flex-grow" style="background-color: #dddd; border: 1px solid black;">
                            <div class="countHeading">
                                ID Proof <span class="docRejectCount">{id_verification_pending}</span
                                >
                                </div>
                        </button>
                        {:else}
                        <button class="bgdocreject flex-grow">
                            <div class="countHeading" on:click={()=>status_pill_clicked("ID Verification Pending")}>
                                ID Proof <span class="docRejectCount">{id_verification_pending}</span
                                >
                                </div>
                        </button>
                        {/if}
                        {#if status == "Bank Details Pending"}
                        <button class="bgdocreject flex-grow" style="background-color: #dddd; border: 1px solid black;">
                            <div class="countHeading">
                                Bank Details <span class="docRejectCount"
                                    >{bank_details_pending}</span
                                >
                            </div>
                        </button>
                        {:else}
                        <button class="bgdocreject flex-grow">
                            <div class="countHeading" on:click={()=>status_pill_clicked("Bank Details Pending")}>
                                Bank Details <span class="docRejectCount"
                                    >{bank_details_pending}</span
                                >
                            </div>
                        </button>
                        {/if}

                        {#if status == "Background Verification Pending"}
                        <button class="bgdocreject flex-grow" style="background-color: #dddd; border: 1px solid black;">
                            <div class="countHeading">
                                BGV Pending <span class="docRejectCount">{bgv_pending}</span
                                >
                                </div>
                        </button>
                        {:else}
                        <button class="bgdocreject flex-grow">
                            <div class="countHeading" on:click={()=>status_pill_clicked("Background Verification Pending")}>
                                BGV Pending <span class="docRejectCount">{bgv_pending}</span
                                >
                                </div>
                        </button>
                        {/if}

                        {#if status == "Pending Offer Letter"}
                        <button class="bgdocreject flex-grow"  style="background-color: #dddd; border: 1px solid black;">
                            <div class="countHeading" >
                                Offer Letter <span class="docRejectCount"
                                    >{pending_offer_letter}</span
                                >
                            </div>
                        </button>
                        {:else}
                        <button class="bgdocreject flex-grow">
                            <div class="countHeading" on:click={()=>status_pill_clicked("Pending Offer Letter")}>
                                Offer Letter <span class="docRejectCount"
                                    >{pending_offer_letter}</span
                                >
                            </div>
                        </button>
                        {/if}
                    </div>
                </div>
                <div class="SectionsCountsSaved ">
                    <!-- <div class="savedcount ">
                        <p class="otherCounts">Saved</p>
                        <div class="bgsavedCount flex-grow">
                            <p class="otherCountNumbers">05</p>
                        </div>
                    </div> -->
                   
                    <button class="savedcount">
                        <p class="otherCounts">Active</p>
                        {#if status == "Active"}
                        <div class="bgActiveCount flex-grow"  style="background-color: #dddd; border: 1px solid black;">
                            <p class="otherCountNumbers" style="color:black;">{active}</p>
                        </div>
                        {:else}
                        <div class="bgActiveCount flex-grow" on:click={()=>status_pill_clicked("Active")}>
                            <p class="otherCountNumbers">{active}</p>
                        </div>
                        {/if}
                    </button>
                    
                   
                    <button class="savedcount" >
                        <p class="otherCounts">Deactive</p>
                        {#if status == "Deactive"}
                        <div class="bgDeactiveCount flex-grow" style="background-color: #dddd; border: 1px solid black;">
                            <p class="otherCountNumbers" style="color:black;">{deactive}</p>
                        </div>
                        {:else}
                        <div class="bgDeactiveCount flex-grow" on:click={()=>status_pill_clicked("Deactive")} >
                            <p class="otherCountNumbers">{deactive}</p>
                        </div>
                        {/if}
                    </button>
                    <!-- {:else}
                    <button class="savedcount">
                        <p class="otherCounts">Deactive</p>
                        <div class="bgDeactiveCount flex-grow" on:click={()=>status_pill_clicked("Deactive")}>
                            <p class="otherCountNumbers">{deactive}</p>
                        </div>
                    </button>
                    {/if} -->
                   
                    <button class="savedcount">
                        <p class="otherCounts" >All</p>
                        {#if status == ""}
                        <div class="bgAllCount flex-grow"  style="background-color: #dddd; border: 1px solid black;"> 
                            <p class="otherCountNumbers" style = "color:black;">{total_count}</p>
                        </div>
                        {:else}
                        <div class="bgAllCount flex-grow" on:click={()=>status_pill_clicked("All")}>
                            <p class="otherCountNumbers">{total_count}</p>
                        </div>
                        {/if}

                    </button>
                    
                    <!-- <div class="savedcount">
                        <p class="otherCounts">All</p>
                        <button class="bgAllCount flex-grow" on:click={()=>status_pill_clicked("-1")}>
                            <p class="otherCountNumbers">{total_count}</p>
                        </button>
                    </div> -->
                </div>
            </div>

            <div class="mobiletabsSection ">
                <!-- Tabs -->
                <ul id="tabs" class="tabsmobile">
                    <li class="tablink border-b-2">
                        <a id="default-tab" href="#first">Rejected</a>
                    </li>
                    <li class="tablink">
                        <a href="#second">Pending Verification</a>
                    </li>
                    <li class="tablink">
                        <a href="#third">Other</a>
                    </li>
                </ul>

                <!-- Tab Contents -->
                <div id="tab-contents">
                    <div id="first" class="">
                        <div class="SectionsCountsmobile">
                            <div class="docRejctedCon flex gap-2 ">
                                <div
                                    class="idproof flex-grow flex whitespace-nowrap "
                                >
                                    <p class="countHeading">
                                        ID Proof <span class="idproofcount"
                                            >{id_proof_rejected}</span
                                        >
                                    </p>
                                </div>
                                <div
                                    class="idproof flex-grow flex whitespace-nowrap"
                                >
                                    <p class="countHeading">
                                        Bank Details <span class="idproofcount"
                                            >{bank_verification_pending}</span
                                        >
                                    </p>
                                </div>
                                <div
                                    class="idproof flex-grow flex whitespace-nowrap"
                                >
                                    <p class="countHeading">
                                        BGV Pending <span class="idproofcount"
                                            >{bgv_rejected}</span
                                        >
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="second" class="hidden">
                        <div class="SectionsCountsmobile">
                            <div class="docRejctedCon flex gap-2">
                                <div class="bgdocreject flex-grow">
                                    <p class="countHeading whitespace-nowrap">
                                        ID Proof <span class="docRejectCount"
                                            >{id_proof_rejected}</span
                                        >
                                    </p>
                                </div>
                                <div class="bgdocreject flex-grow">
                                    <p class="countHeading whitespace-nowrap">
                                        Bank Details <span
                                            class="docRejectCount">{bank_verification_pending}</span
                                        >
                                    </p>
                                </div>
                                <div class="bgdocreject flex-grow">
                                    <p class="countHeading whitespace-nowrap">
                                        Offer Letter <span
                                            class="docRejectCount">{pending_offer_letter}</span
                                        >
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="third" class="hidden">
                        <div class="SectionsCountsmobileLast ">
                            <!-- <div class="savedcount ">
                                <p class="otherCounts">Saved</p>
                                <div class="bgsavedCount flex-grow">
                                    <p class="otherCountNumbers">05</p>
                                </div>
                            </div> -->
                            <div class="savedcount">
                                <p class="otherCounts">Active</p>
                                <div class="bgActiveCount flex-grow">
                                    <p class="otherCountNumbers">{active}</p>
                                </div>
                            </div>
                            <div class="savedcount">
                                <p class="otherCounts">Deactive</p>
                                <div class="bgDeactiveCount flex-grow">
                                    <p class="otherCountNumbers">{deactive}</p>
                                </div>
                            </div>
                            <div class="savedcount">
                                <p class="otherCounts">All</p>
                                <div class="bgAllCount flex-grow">
                                    <p class="otherCountNumbers">{total_count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="searchPagi ">
                <div class="leftsearchPagi ">
                    <div class="recordCount ">
                        <div class="allsupplier" id="supplierCount">
                            <h4 class="supplierRecords">
                                <span
                                    class="xs:text-rejectcolor sm:text-rejectcolor"
                                    >{total_count_associates}</span
                                > <span class="text-grey">ASSOCIATES</span>
                                {#if status != "-1"}
                                <p style="color: rgba(255, 149, 52, var(--tw-text-opacity));">
                                    {status}</p>
                                {/if}
                            </h4>
                            
                        </div>

                        <div class="searchSupplier " id="searchBox">
                            <div class="formInnerGroup ">
                                <!-- <span class="searchicon">
                                    <img
                                        src="{$img_url_name.img_name}/search.svg"
                                        class="placeholderIcon"
                                        alt=""
                                        on:click="{filterResults}"/>
                                </span> -->
                                <span class="searchicon">
                                    <img
                                        src="{$img_url_name.img_name}/search.svg"
                                        class="placeholderIcon"
                                        alt=""
                                       />
                                </span>
                                <input bind:value="{searchTerm}"
                                    class="inputboxsearch"
                                    id="inputboxsearch"
                                    placeholder="Search"
                                    on:keypress="{enterKeyPress}"
                                    
                                />
                                <!-- <input
                                        placeholder="Type some gibberish here"
                                        id="text"
                                        on:input={myFunc}
                                > -->
                                <div class="serchCloseIconSection " id="">
                                    <div class="closeIconCon " on:click="{closeSearch}">
                                        <img
                                            src="{$img_url_name.img_name}/closeSearch.svg"
                                            class="w-4 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" searchClickbtn" on:click="{SearchClick}" >
                            <p class="searchIconPlace">
                                <img
                                    src="{$img_url_name.img_name}/search.svg"
                                    class="placeholderIcon"
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                </div>
                <div class="rightSearchPagi ">
                    <div class="itemsPagi flex items-center gap-10">
                        <div class="itemsNo ">
                            <div class="selectSection">
                                <div class="formInnerGroupSelect ">
                                    {#if dropdown_disable == true}
                                    <select class="selectInputbox" style="background: #dddddd; pointer-events: none;">
                                        <option value="20">20 items</option>
                                        <option value="30">30 items</option>
                                    </select>
                                    {:else}
                                    <select class="selectInputbox" bind:value ="{drop_limit}" on:change="{dropdown_function}">
                                        <option value="20">20 items</option>
                                        <option value="30">30 items</option>
                                    </select>
                                    {/if}
                                    <button class="formSelectArrow  cursor-pointer ">
                                        <img
                                            src="{$img_url_name.img_name}/downarrow.svg"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                            <div class="perpage">
                                <p>per page</p>
                            </div>
                        </div>
                        <div class="paginationButton">
                            <nav aria-label="Page navigation">
                                <ul class="pagiWrapper ">
                                    <li>
                                        {#if pagenumber == "1" || next_prev_disable == true}
                                        <button class="preNextbtn" style="background: #dddddd; pointer-events: none;">
                                            Previous</button
                                        >
                                        {:else}
                                        <button class="preNextbtn"on:click={previous_function}>
                                            Previous</button
                                        >
                                        {/if}
                                        <!-- <button on:click={setValuechange}>value change</button> -->
                                    </li>
                                    
                                    <!-- {#if result === false}
                                    <li >
                                        <button id = "curr_page" class="pagiItemsNumber">
                                           1
                                        </button>
                                        </li>
                                    {:else} -->
                                    {#each mapped_pages as page}
                                     {#if pagenumber == page}
                                     <li >
                                        <button id = "curr_page" class="pagiItemsNumber" on:click="{pageChange(page)}" style="background-color: darkgray;">
                                           {page}
                                        </button>
                                    </li>
                                     {:else}
                                    <li >
                                        <button id = "curr_page" class="pagiItemsNumber" on:click="{pageChange(page)}">
                                           {page}
                                        </button>
                                    </li>
                                    {/if}
                                    {/each}
                                    
                                    <!-- {/if} -->
                                    
                                    <!-- <li>
                                        <button class="pagiItemsNumber"
                                            >
                                            {#each {length:page_count} as _,i}
                                                {i+1}
                                            {/each}
                                            </button
                                        >
                                    </li> -->
                                    <!-- <li>
                                        <button class="pagiItemsNumberActive"
                                            >2</button
                                        >
                                    </li>
                                    <li>
                                        <button class="pagiItemsNumber"
                                            >3</button
                                        >
                                    </li> -->

                                    <li>
                                        {#if pagenumber > last_num_from_pages  || next_prev_disable == true}
                                        <button class="preNextbtn" style="background: #dddddd; pointer-events: none;">
                                            Next</button
                                        >
                                        {:else}
                                        <button class="preNextbtn" on:click={next_function}>
                                            Next</button
                                        >
                                        {/if}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div class="supplerDetails sm:hidden xs:hidden">
                <div class="tableSectionSuppliers ">
                    <div class="py-2 ">
                        <div class="tableWrapper">
                            <table class="mainTable associate_expanded">
                                <thead class="bg-bgthead ">
                                    <tr>
                                        <th
                                            scope="col"
                                            width="20%"
                                            class="theading px-3"
                                        >
                                            Associate
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            class="theading"
                                        >
                                            Status
                                        </th>
                                        <th
                                        scope="col"
                                        width="20%"
                                        class="theading px-3"
                                    >
                                        What is Pending?
                                    </th>
                                        <th
                                            scope="col"
                                            width="10%"
                                            class="theading"
                                        >
                                            Remarks
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            class="theading"
                                        >
                                            Required Action
                                        </th>
                                        <th scope="col" class="theading">
                                            Audit Trail
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="bg-white ">
                                    
                                    {#each supplier_data_from_service as facility_data} 
                                    
                                    <tr class="border-b-2 trow ">
                                        
                                        <td>
                                            {#if facility_data.expand == false}
                                            <div
                                                class="tdfirstshortInfo shortInfo"
                                                id="shortInfo"> 
        
                                                <p class="hText">{facility_data.facility_name}</p>
                                                <p class="text-xs text-grey">
                                                
                                                </p>
                                            </div>
                                            {/if}
                                            {#if facility_data.expand == true}
                                            <div class="detailsInfo">
                                                <div class="tdfirstDetails">
                                                    <div class="itemList ">
                                                        <div
                                                            class="smallText w-w115px"
                                                        >
                                                            Associate
                                                        </div>
                                                        <div class="smLable"  style="max-width: 60%;">
                                                            {facility_data.facility_name}
                                                        </div>
                                                    </div>
                                                    <div class="itemList ">
                                                        <div
                                                            class="smallText w-w115px"
                                                        >
                                                            Associate Type
                                                        </div>
                                                        <div class="smLable">
                                                            {facility_data.facility_type}
                                                        </div>
                                                    </div>
                                                    <div class="itemList ">
                                                        <div
                                                            class="smallText w-w115px"
                                                        >
                                                            Associate ID
                                                        </div>
                                                        <div class="smLable">
                                                            {facility_data.name}
                                                        </div>
                                                    </div>
                                                    <div class="itemListAddress">
                                                        <div
                                                            class="smallText w-w115px"
                                                        >
                                                            Location
                                                        </div>
                                                        <div class="smLableAddress"  style="max-width: 60%;">
                                                            {#each facility_data.addresess as curr_address}
                                                            {facility_data.station_code} - {curr_address.city}
                                                            {/each}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                       {/if}
                                        </td>
                                        <td>
                                            {#if facility_data.expand == false}
                                            <div
                                                class="paddingrt shortInfo"
                                                id="shortInfo"
                                            >
                                                <div class="statusWrapper  ">
                                                    {#if facility_data.status == "Bank Details Rejected" || facility_data.status == "ID Proof Rejected" || facility_data.status == "Deactive" || facility_data.status == "Background Verification Rejected"}
                                                    <div
                                                        class="statusredcircle "
                                                    />
                                                    {:else if facility_data.status == "Background Verification Pending" || facility_data.status == "Bank Details Pending" || facility_data.status == "ID Verification Pending" || facility_data.status == "Bank Beneficiary Pending" || facility_data.status == "Pending Offer Letter" || facility_data.status == "Onboarding in Progress" || facility_data.status == "Bank Verification Pending"}
                                                    <div
                                                    class="statusOrangecircle "
                                                    />
                                                    {:else}
                                                    <div
                                                    class="statusGreencircle "
                                                    />
                                                    {/if}
                                                    {facility_data.status}
                                                    
                                                </div>
                                                
                                                <!-- <p
                                                    class="text-xs text-grey ml-4"
                                                >
                                                    ({facility_data.status})
                                                </p> -->
                                            </div>
                                            {/if}
                                            {#if facility_data.expand == true}
                                            <div class="detailsInfo">
                                                <div class="paddingrt">
                                                    <div class="statusWrapper">
                                                        {#if facility_data.status == "Bank Details Rejected" || facility_data.status == "ID Proof Rejected" || facility_data.status == "Deactive" || facility_data.status == "Background Verification Rejected"  || facility_data.status == "Background Verification Rejected" }
                                                        <div
                                                            class="statusredcircle "
                                                        />
                                                        {:else if facility_data.status == "Background Verification Pending" || facility_data.status == "Bank Details Pending" || facility_data.status == "ID Verification Pending" || facility_data.status == "Bank Beneficiary Pending" || facility_data.status == "Pending Offer Letter" || facility_data.status == "Onboarding in Progress" || facility_data.status == "Bank Verification Pending"}
                                                        <div
                                                        class="statusOrangecircle "
                                                        />
                                                        {:else}
                                                        <div
                                                        class="statusGreencircle "
                                                        />
                                                        {/if}
                                                        {facility_data.status}
                                                    </div>
                                                    {#if facility_data.status != "Deactive"}
                                                     <div class="actionBtn mt-3">
                                                        <button on:click={deactivate_associate(facility_data)}
                                                            href="#"
                                                            class="ErBlueButton"
                                                            >Deactivate Profile</button
                                                        >
                                                    </div>
                                                    {/if}
                                                    <!-- <div class="statusDetails">
                                                        <p
                                                            class="vendorDetailsText"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/checked.png"
                                                                class="pr-p7px"
                                                                alt=""
                                                            />
                                                            Vendor Details
                                                        </p>
                                                        <p
                                                            class="idproofRejected"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/reject.png"
                                                                class="pr-p7px"
                                                                alt=""
                                                            /> ID Proof Rejected
                                                        </p>
                                                        <p
                                                            class="pendingBankVerfi"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/timer.png"
                                                                class="pr-p7px"
                                                                alt=""
                                                            /> Pending Bank Verification
                                                        </p>
                                                    </div> -->
                                                </div>
                                            </div>
                                            {/if}
                                        </td>
                                        <td>
                                            {#if facility_data.expand == false}
                                            <div class="shortInfo">
                                                <div class="paddingrt">
                                                    {#if facility_data.remarks.length == ""} 
                                                    <p class="smallText">-</p>
                                                    {:else}

                                                    <!-- {#each facility_data.remarks as remark} -->
                                                    <p class="smallTextWrap">{facility_data.remarks[0]}
                                                        {#if facility_data.remarks.length-1 != 0}
                                                        +({facility_data.remarks.length-1})
                                                        {/if}
                                                    </p>
                                                    <!-- {/each} -->

                                                    {/if}
                                                </div>
                                            </div>
                                            {/if}
                                            {#if facility_data.expand == true}
                                            <div class="detailsInfo">
                                                <div
                                                    class="remarklist ml-5 paddingrt"
                                                >
                                                    <ul class="list-disc ">
                                                        {#each facility_data.remarks as remark}
                                                        <li class="listitems">
                                                        {remark}
                                                        </li>
                                                        {/each}
                                                    </ul>
                                                </div>
                                            </div>
                                            {/if}
                                        </td>
                                        <td>
                                            {#if facility_data.expand == false}
                                            <div class="shortInfo">
                                                <div class="paddingrt ml-5">{#if facility_data.error ="" && facility_data.message == ""}
                                                        <p class="smallText">-</p>
                                                        {:else}
                                                        <p class="smallText">1</p>
                                                        {/if}
                                                </div>
                                            </div>
                                            {/if}
                                            {#if facility_data.expand == true}
                                            <div class="detailsInfo">
                                                <div
                                                    class="remarklist ml-5 paddingrt"
                                                >
                                                    <ul class="list-disc ">
                                                        <div class="paddingrt">
                                                             {#if facility_data.error}
                                                             <li class="smallTextWrap">{facility_data.error}</li>
                                                             {:else}
                                                                {#if facility_data.message == ""} 
                                                                <li class="smallText">-</li>
                                                                {:else}
                                                                <li class="smallTextWrap">{facility_data.message}</li>
                                                                {/if}
                                                            {/if}
                                                        </div>
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                            {/if}
                                        </td>
                                        <td>
                                            {#if facility_data.expand == false}
                                            <div class="shortInfo">
                                                <div class="paddingrt">
                                                    <p class="smallText">
                                                        {#if facility_data.action == ""}
                                                        -
                                                        {:else}
                                                        {facility_data.action}
                                                        {/if}
                                                        </p>
                                                </div>
                                            </div>
                                            {/if}
                                            {#if facility_data.expand == true}
                                            <div class="detailsInfo">
                                                <div
                                                    class="remarklist ml-5 paddingrt"
                                                >
                                                {#if facility_data.action}
                                                    <ul class="list-disc ">
                                                        <li class="listitems">
                                                            {facility_data.action}
                                                        </li>
                                                    </ul>
                                                    <!-- {:else}
                                                    <p>-</p> -->
                                                {/if}
                                                    <div class="actionBtn mt-3">
                                                        <button on:click="{update_associate(facility_data.name)}"
                                                            href="#"
                                                            class="ErBlueButton"
                                                            >Update</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                            {/if}
                                        </td>
                                        <td>
                                            <div
                                                class="auditTrailtd  paddingrt"
                                            >
                                                <button
                                                    class="auditTrail"
                                                    on:click="{SupplerModalbuttonClick(facility_data)}"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="chatIcon"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        ></span>
                                                </button>
                                                <!-- <p class="mtextaudit">11 M</p> -->
                                                {#if facility_data.expand == false}
                                                <div class="shortInfo">
                                                    <p
                                                        on:click="{collapse(facility_data.name)}"
                                                        class="arrowCollaps"
                                                    >
                                                        <img
                                                            src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                            class="downArrowIcon"
                                                            alt=""
                                                        />
                                                    </p>
                                                </div>
                                                {/if}
                                                {#if facility_data.expand == true}
                                                <div class="detailsInfo">
                                                    <p
                                                        on:click="{collapsedown(facility_data.name)}"
                                                        class="detailsarrowCollaps "
                                                    >
                                                        <img
                                                            src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                            class=" downArrowIconDetails"
                                                            alt=""
                                                        />
                                                    </p>
                                                </div>
                                                {/if}
                                            </div>
                                        </td>
                                       
                                    </tr>
                                   
                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Rajesh Kumar
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Associate)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center"
                                                >
                                                    <p
                                                        class="bg-green rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                    Active
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >12
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    30 M
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">Sumeet T.</p>
                                                <p class="designationTextsmall">
                                                    (Associate)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-bluecolor"
                                                >
                                                    <p
                                                        class="bg-bgbluecolor rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Saved
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->
                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Sri Anjaneya Enterprises
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-boldyellow"
                                                >
                                                    <p
                                                        class="bg-bgyellow rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Verification Pending
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Santosh Kumar
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="paddingrt">
                                                <div class="statusWrapper  ">
                                                    <div
                                                        class="statusredcircle"
                                                    />
                                                    Documents Rejected
                                                </div>
                                                <p
                                                    class="text-xs text-grey ml-4"
                                                >
                                                    (Bank Details)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">1</p>
                                        </td>
                                        <td>
                                            <p class="smallText">1</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Sri Sai Agency
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="paddingrt">
                                                <div class="statusWrapper  ">
                                                    <div
                                                        class="statusredcircle"
                                                    />
                                                    Documents Rejected
                                                </div>
                                                <p
                                                    class="text-xs text-grey ml-4"
                                                >
                                                    (ID Proof, Bank Details)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">2</p>
                                        </td>
                                        <td>
                                            <p class="smallText">2</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >4
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->
                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Mr Hemant Chouhan
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-boldyellow"
                                                >
                                                    <p
                                                        class="bg-bgyellow rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Verification Pending
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >2
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">Junaid S</p>
                                                <p class="designationTextsmall">
                                                    (Associate)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-bluecolor"
                                                >
                                                    <p
                                                        class="bg-bgbluecolor rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Saved
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >14
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">Prakash B</p>
                                                <p class="designationTextsmall">
                                                    (Associate)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-pinkcolor whitespace-nowrap"
                                                >
                                                    <p
                                                        class="bg-bgpinkcolor rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                    Pending Beneficiary Creation
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">Rahul F</p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-boldyellow"
                                                >
                                                    <p
                                                        class="bg-bgyellow rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Verification Pending
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr>
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Kannawar Agencies
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-pinkcolor whitespace-nowrap"
                                                >
                                                    <p
                                                        class="bg-bgpinkcolor rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                    Pending Beneficiary Creation
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="{$img_url_name.img_name}/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->
                                    
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="supplierDetailMobile md:hidden lg:hidden xl:hidden 2xl:hidden px-p10"
            >
            {#each supplier_data_from_service as facility_data}
                <div class="mobilecardSup mb-m5">
                    <div class="supDetailsrow flex">
                        <div class="supDetailsTitle ">
                            <p>Supplier</p>
                        </div>
                        <div class="supDetailsData">
                            
                            <div class="pl-p7px pt-p7px shortInfoMobile ">
                                <p class="supName"> </p>
                                <p class="subDeg ">(Associate)</p>
                            </div>

                            <div
                                class="pl-p7px pt-p7px detailsInfoMobile hidden"
                            >
                                <div class="venderListDetails">
                                    <p class="subDeg ">Associate</p>
                                    <p class="supName">{facility_data.facility_name}</p>
                                </div>
                                <div class="venderListDetails">
                                    <p class="subDeg ">Associate Type</p>
                                    <p class="supName">{facility_data.facility_type}</p>
                                </div>
                                <div class="venderListDetails">
                                    <p class="subDeg ">Associate ID</p>
                                    <p class="supName">{facility_data.name}</p>
                                </div>
                                <div class="venderListDetails">
                                    <p class="subDeg ">Station</p>
                                    <p class="supName">
                                        {#each facility_data.addresess as curr_address}
                                        {curr_address.address}
                                        {/each}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div class="paddingArrow">
                                    <div class="shortInfoMobile">
                                        <p
                                            class="arrowCollaps "
                                            on:click="{collapseMobile}"
                                        >
                                            <img
                                                src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                class="downArrowIcon"
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                    <div class="detailsInfoMobile hidden">
                                        <p
                                            on:click="{collapsedownMobile}"
                                            class="detailsarrowCollaps "
                                        >
                                            <img
                                                src="{$img_url_name.img_name}/arrowDownCollaps.svg"
                                                class=" downArrowIconDetails"
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                    <div class="supDetailsrow flex">
                        <div class="supDetailsTitle ">
                            <p>Status</p>
                        </div>
                        <div class="supDetailsData ">
                            <div class="pl-p7px pt-p7px shortInfoMobile ">
                                <div class="">
                                    <div class="statusWrapper">
                                        <div class="statusredcircle" />
                                        Documents Rejected
                                    </div>
                                    <div class="statusWrapper">
                                        <div class="statusGreencircle"></div>
                                    Active
                                    </div>
                                    <!-- <p class="subDeg ml-4">(ID Proof)</p> -->
                                </div>
                            </div>
                            <div
                                class="pl-p7px pt-p7px detailsInfoMobile hidden"
                            >
                                <div>
                                    <div class="statusWrapper">
                                        <div class="statusredcircle" />
                                        Documents Rejected
                                    </div>
                                </div>
                                <!-- <div class="statusDetails">
                                    <p class="vendorDetailsText">
                                        <img
                                            src="{$img_url_name.img_name}/checked.png"
                                            class="pr-p7px"
                                            alt=""
                                        />
                                        Vendor Details
                                    </p>
                                    <p class="idproofRejected">
                                        <img
                                            src="{$img_url_name.img_name}/reject.png"
                                            class="pr-p7px"
                                            alt=""
                                        /> ID Proof Rejected
                                    </p>
                                    <p class="pendingBankVerfi">
                                        <img
                                            src="{$img_url_name.img_name}/timer.png"
                                            class="pr-p7px"
                                            alt=""
                                        /> Pending Bank Verification
                                    </p>
                                </div> -->
                            </div>
                            <div />
                        </div>
                    </div>
                    <div class="supDetailsrow flex">
                        <div class="supDetailsTitle ">
                            <p>Remarks</p>
                        </div>
                        <div class="supDetailsData ">
                            <div class="pl-p7px pt-p7px shortInfoMobile ">
                                <p class="smallText">2</p>
                            </div>

                            <div
                                class="pl-p7px pt-p7px remarklist ml-5  detailsInfoMobile hidden"
                            >
                                <ul class="list-disc ">
                                    <li class="listitems">
                                        Pancard number mismatch
                                    </li>
                                    <li class="listitems">
                                        Voter ID not clear
                                    </li>
                                </ul>
                            </div>

                            <div />
                        </div>
                    </div>
                    <div class="supDetailsrow flex">
                        <div class="supDetailsTitle ">
                            <p>Required Action</p>
                        </div>
                        <div class="supDetailsData ">
                            <div class="pl-p7px pt-p7px shortInfoMobile ">
                                <p class="smallText">2</p>
                            </div>

                            <div
                                class="pl-p7px pt-p7px remarklist ml-5 detailsInfoMobile hidden"
                            >
                                <ul class="list-disc ">
                                    <li class="listitems">
                                        Pancard number mismatch
                                    </li>
                                    <li class="listitems">
                                        Voter ID not clear
                                    </li>
                                </ul>
                                <div class="actionBtn mt-3">
                                    <a href="#" class="ErBlueButton">Update</a>
                                </div>
                            </div>

                            <div />
                        </div>
                    </div>
                    <div class="supDetailsrow flex">
                        <div
                            class="supDetailsTitle flex justify-end items-center"
                        >
                            <p>Audit Trail</p>
                        </div>
                        <div class="supDetailsData ">
                            <div class="pl-p7px pt-p7px">
                                <div class="auditTrailtd">
                                    <button
                                        class="auditTrail"
                                        
                                        on:click={SupplerModalbuttonClick}
                                    >
                                        <img
                                            src="{$img_url_name.img_name}/chat1.svg"
                                            class="chatIcon"
                                            alt=""
                                        />
                                        <span class="text-sm">12 </span>
                                    </button>
                                    <p class="mtextaudit">11 M</p>
                                    <div class="shortInfo" />
                                </div>
                            </div>
                            <div />
                        </div>
                    </div>
                </div>

                <div class="paginationButton flex justify-center mt-7">
                    <nav aria-label="Page navigation">
                        <ul class="pagiWrapper ">
                            <li>
                                <button class="preNextbtn"> Previous</button>
                            </li>
                            <li><button class="pagiItemsNumber">1</button></li>
                            <li>
                                <button class="pagiItemsNumberActive">2</button>
                            </li>
                            <li><button class="pagiItemsNumber">3</button></li>

                            <li><button class="preNextbtn"> Next</button></li>
                        </ul>
                    </nav>
                </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<div class="supplierInfoModalSection" id="supplierInfoModal">
    <!-- {#each audit_supplier_data as audit_data}  -->
    <div class="mainSupInfo">
        <div class="p-4">
            <div class="supInfoWrapper ">
                <div class="infoUserdetailsSection ">
                    <div class="detailsInfoSection">
                        <div class="tdfirstDetailsformodal">
                            <div class="itemListForBaseline">
                                <div class="smallText w-w115px ">
                                    Associate Name
                                </div>
                                <div class="smLable w-64 xsl:w-48">{audit_supplier_data.facility_name}</div>
                            </div>
                            <div class="itemList ">
                                <div class="smallText w-w115px">
                                    Associate Type
                                </div>
                                <div class="smLable">{audit_supplier_data.facility_type}</div>
                            </div>
                            <div class="itemList ">
                                <div class="smallText w-w115px">Associate ID</div>
                                <div class="smLable">{audit_supplier_data.name}</div>
                            </div>
                            <div class="itemList">
                                <div class="smallText w-w115px">Location</div>
                                <div class="smLable"  style="max-width: 50%;">
                                    <!-- {#each audit_supplier_data.addresess as curr_address}
                                    {curr_address.address}
                                    {/each} -->
                                    {audit_supplier_address}
                                   
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="smallText w-w115px">Status</div>
                                <div class="statusinformation">
                                    <div class="statusWrapper  ">
                                        {#if audit_supplier_data.status == "Bank Details Rejected" || audit_supplier_data.status == "ID Proof Rejected" || audit_supplier_data.status == "Deactive" || audit_supplier_data.status == "Background Verification Rejected" }
                                        <div
                                            class="statusredcircle "
                                        />
                                        {:else if audit_supplier_data.status == "Background Verification Pending" || audit_supplier_data.status == "Bank Details Pending" || audit_supplier_data.status == "ID Verification Pending" || audit_supplier_data.status == "Bank Beneficiary Pending" || audit_supplier_data.status == "Pending Offer Letter" || audit_supplier_data.status == "Onboarding in Progress" || audit_supplier_data.status == "Bank Verification Pending"}
                                        <div
                                        class="statusOrangecircle "
                                        />
                                        {:else}
                                        <div
                                        class="statusGreencircle "
                                        />
                                        {/if}
                                        {audit_supplier_data.status}
                                    </div>
                                    <!-- <p class="text-xs text-grey ml-4">
                                        (ID Proof)
                                    </p> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="updatebutton ">
                        <button class="ErBlueupdated">Update</button>
                    </div> -->
                    <div class="closebuttonsection">
                        <img
                            src="{$img_url_name.img_name}/close.png"
                            on:click="{closeAuditTrailModal}"
                            class="closesup"
                            alt=""
                        />
                    </div>
                </div>
                <!-- <div class="commentBox">
                    <div class="textAndSubmitButton ">
                        <p class="text-base text-white">Add your comment</p>
                        <button class="btnsubmitComment " type="submit">
                            Submit</button
                        >
                    </div>

                    <textarea
                        name=""
                        class="textareaComment "
                        id=""
                        cols="30"
                        rows="3"
                    />
                </div> -->

                <div class="timelinescroll ">
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            {#each audit_details_array as new_audit_data}
                            <h3 class="timeCommenterName ">
                                {new_audit_data.owner}
                                <span class="timeCommentDate "
                                    >{new_audit_data.creation}</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                {new_audit_data.remarks}
                            </div>
                            {/each}
                        </div>
                    </div>
                    <!-- <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Selvaraj Jayaraman
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Pancard number mismatch
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Akshay Saini
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPurple">
                                <p class="timeCircle" />
                                 Vendor details verified
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Selvaraj Jayaraman
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPurple">
                                <p class="timeCircle" />
                                 Vendor Details
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightGreen">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="{$img_url_name.img_name}/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</div>


    <!--  Deactivate Associate  modal -->
        <div class="actionDialogueOnboard hidden" id ="deactivate_asso_profile">
            <div class="pancardDialogueOnboardWrapper ">
                <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                    <div class="modalHeadConmb-0">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                               Deactivate Associate
                            </p>
                        </div>
                        <button class="rightmodalclose" on:click|preventDefault={close_deact_associate}>
                            <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">
                        </button>
                    </div>
                    <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 mt-5" >
                      <div class="flex">
                        <button class="ErBlueButton" on:click|preventDefault={open_deact_initiate_model("deact_imm")}>Deactivate Immediately </button>
                      </div>  
                   
                      <div class="formInnerGroup ">
                        <input type="date" class="inputboxcursortext px-4" bind:value={deact_date} onkeydown="return false" min={new Date(new Date().getTime()+(1*24*60*60*1000)).toISOString().split('T')[0]}>
                     </div>
                     <div class="flex">
                        <button class="ErButton bg-bgmandatorysign" on:click|preventDefault={open_deact_initiate_model("deact_later")}>Deactivate on Date </button>
                      </div>  
                          <div class="pt-3 flex justify-center">
                            <button type="button" class="dialogueSingleButton" on:click|preventDefault={close_deact_associate}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>



         <!--Initiate Module -->
    
    
    <div id="initiateDeact" hidden>
        <div  class="actionDialogueOnboard ">
            <div class="pancardDialogueOnboardWrapper ">
                <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                    <div class="modalHeadConmb-0">
                        <div class="leftmodalInfo">
                            <!-- <p class=""> Reject Reason</p> -->
                        </div>
                        <div class="rightmodalclose">
                            <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click={close_deact_initiate_module}>
                        </div>
                    </div>
                    <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
        
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                            <label class="block  tracking-wide text-gray-700 font-bold mb-2" for="grid-state" >
                                Do you want to deactivate fac_id {fac_obj.name}?
                            </label>
                            <div class="relative">
                             
                             
                              <br>
                              <div
                                    class="flex  py-1 items-center flex-wrap"
                                >
                                    <div class="formInnerGroup">
                                       
                                        <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium mr-2" on:click={close_deact_initiate_module}>Cancel</button>
                                        <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click={deactivate_profile_imm}>Ok</button>
                                    </div>
                                </div>
                              
                            </div>
                          </div>
                    </form>
                </div>
            </div>
        </div> 
    </div>
    
    <!--Initiate Module -->
        
<Toast type={toast_type}  text={toast_text}/>
<SvelteToast />
