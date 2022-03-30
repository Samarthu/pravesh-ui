<script>
    import { Router, Link, Route } from "svelte-routing";
    import Catagory from "./catagory.svelte";
    import { goto } from "$app/navigation";
    import Breadcrumb from "./breadcrumb.svelte";
    import { onMount } from "svelte";
    import { DateInput, DatePicker } from "date-picker-svelte";
    import {bank_details,cheque_details} from "../services/onboardsummary_services";
    import { bank_data_to_store } from "../stores/onboardsummary_store";
    import { cheque_data_to_store } from "../stores/onboardsummary_store";
    import { addnew_cheque_details } from "../services/onboardsummary_services";
    import { facility_document } from "../services/onboardsummary_services";
    import { audit_trail_data } from "../services/supplier_services";
    import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
        show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor} from "../services/onboardsummary_services";
    import {get_date_format} from "../services/date_format_servives";
    import {facility_id} from "../stores/facility_id_store"
    import {facility_data_store} from "../stores/facility_store"
    import {bgv_config_store} from '../stores/bgv_config_store'
import { object_without_properties } from "svelte/internal";
    import Toast from './components/toast.svelte';

    let toast_text;
    let toast_type;
    let routeNext = "";
    let routeBgv = "";
    let temp = "Add";
    let temp1 = "change";
    let temp2 = "gst1";
    let temp3 = "e-contracts";
    let temp4 = "p-contracts-1";
    let temp5 = "newMap";
    let temp6 = "cheque";
    let child = "linkchild";
    let childlink = "childlink";
    let bank_values_from_store = [];
    let cheque_values_from_store = [];
    let audit_details_array = [];
    let facility_document_data = [];
    let all_tags_data= [];
    let all_tags_obj= {};
    let show_fac_array = [];
    let tag_data_arr = [];
    let show_creation_date;
    let all_tags_res;
    let text_pattern = /^[a-zA-Z_ ]+$/;
    let recrun_pattern =  /^[^-\s](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9 _-]+)$/;
    
    let img_name="",bank_name="",type ="",cheque_date,cheque_number="",amount="",
    recrun_number="",file_number = "";
    let bank_name_message ="",type_message="",cheque_date_message="",cheque_number_message=""
    ,amount_message="",recrun_number_message="",file_number_message="",cheque_upload_message="";

    let bank_details_res,bank_new_date,
    facility_modified_date,facility_created_date,facility_doc_date;
    // $: cheque_date = new Date();
    let file_data;
    let showbtn = 0;
    let selectTag,addRemark,selectserCh;
    let facility_address,facility_postal,facility_password,city,location_id,status_name;
    let new_fac_remarks = [];
    let select_tag_data,serv_ch_data;
   
    let tag_date,tag_remark;
    let tag_data_obj=[];

    //  let vendor_id,vendor_name; 
    let pan_num="-";
    let aadhar_num="-";
    let checkupload,pan_attach,aadhar_attach,dl_lic_attach,dl_lic_url,offer_url = "-";
    let profile_url = "";
    let address_url,pan_verified,aadhar_verified,profile_verified,address_verified,
    gst_url,gst_verified,can_check_url;
   
    let aadhar_name = "Not Submitted",pan_name = "Not Submitted",dl_lic_name = "Not Submitted",address_name = "Not Submitted",
    can_check_name = "Not Submitted",gst_name = "Not added",offer_name="Not Submitted";
    
    let hidden_field ="hidden";
    // let facility_data_obj = {
    //     new_facility_id : facility_details_data[0].facility_id
    //     }
    export let url = "";
    let ven_loc_id;

    $:{
        for(let key in all_tags_obj){
            if(select_tag_data == key){
                if(all_tags_obj[key] == "vendor_required"){
                hidden_field = "";
                }
                else{
                hidden_field = "hidden"; 
                }
            }
            
        }
    }

    

    onMount(async () => {
        toast_text = "Toast Successfull";
            toast_type = "success";
        ///////bank details/////////////
        facility_id.set({
            // facility_id_number: "CRUN00374"
            // facility_id_number: "CRUN00320"
            facility_id_number: "NAOD00048"
        })
        // console.log("facility_id_number",$facility_id.facility_id_number)

        bank_details_res = await bank_details();
        try{
            if(!bank_details_res){
                console.log("No Data Found")
            }

            else{
                // console.log("VALUES IN BANK DETAILS")
                $bank_data_to_store.bank_details_data = bank_details_res;
                bank_data_to_store.subscribe((value) => {
                    bank_values_from_store = value.bank_details_data;
                });
                let bank_date_format = new Date(bank_values_from_store.modified);
                bank_new_date = get_date_format(bank_date_format,"dd-mm-yyyy-hh-mm");
                
                }
            }
        catch(err) {
        // message.innerHTML = "Error is " + err;
        }
        let cheque_details_res = await cheque_details();
        try{

            if(cheque_details_res.body.status == "green" && cheque_details_res != "null"){
        // $cheque_data_from_store
        console.log("cheque_details_res in SVELTE UI", cheque_details_res);
        $cheque_data_to_store.cheque_details_data = cheque_details_res;
        
        cheque_data_to_store.subscribe((value) => {
            cheque_values_from_store = value.cheque_details_data;
        });
    }
}
    catch(err) {
        // message.innerHTML = "Error is " + err;
        }
    
        /////////bank details/////////////
        let facility_document_res = await facility_document();
        try{
            if(facility_document_res != "null"){
        // console.log("facility_document_res RES", facility_document_res);
        // console.log( "facility_document_res.Object.body.data",facility_document_res.body.data);
        facility_document_data = facility_document_res.body.data;
        
        for (var i = 0; i < facility_document_data.length; i++) {
        // if(!facility_document_data[i].doc_type){
            
        // }
            if(facility_document_data[i].doc_type == "pan-photo"){
                pan_num = facility_document_data[i].doc_number
                pan_attach = facility_document_data[i].file_url
                pan_name = facility_document_data[i].file_name;
                pan_verified = facility_document_data[i].verified;
            }
            else if(facility_document_data[i].doc_type == "aadhar-id-proof"){
                aadhar_num = facility_document_data[i].doc_number
                aadhar_attach = facility_document_data[i].file_url
                aadhar_name = facility_document_data[i].file_name;
                aadhar_verified = facility_document_data[i].verified;
            }
            else if(facility_document_data[i].doc_type == "fac-photo"){
                // profile_name = facility_document_data[i].file_name;
                profile_url = facility_document_data[i].file_url;
                profile_verified = facility_document_data[i].verified;
            }
            else if(facility_document_data[i].doc_type == "addproof-photo"){
                address_name = facility_document_data[i].file_name;
                address_url = facility_document_data[i].file_url;
                address_verified = facility_document_data[i].verified;
            }
            else if(facility_document_data[i].doc_type == "gst-certificate-27"){
                gst_name = facility_document_data[i].file_name;
                gst_url = facility_document_data[i].file_url;
                // gst_verified = facility_document_data[i].verified;
            }
            else if(facility_document_data[i].doc_type == "can-cheque"){
                can_check_name = facility_document_data[i].file_name;
                can_check_url = facility_document_data[i].file_url;
                // can_check_verified = facility_document_data[i].verified;
            }
            else if(facility_document_data[i].doc_type == "dl-photo"){
                dl_lic_name = facility_document_data[i].file_name;
                dl_lic_url = facility_document_data[i].file_url;
                // can_check_verified = facility_document_data[i].verified;
            }
            else if(facility_document_data[i].doc_type == "newOffFile"){
                offer_name = facility_document_data[i].file_name;
                offer_url = facility_document_data[i].file_url;
                // can_check_verified = facility_document_data[i].verified;
            }
            
            // else if(facility_document_data[i].doc_type == "blcheque"){
            //     bl_check_name = facility_document_data[i].file_name;
            //     bl_check_url = facility_document_data[i].file_url;
            //     // can_check_verified = facility_document_data[i].verified;
            // }

        }
            }
    
    }
    catch(err) {
        // message.innerHTML = "Error is " + err;
        }

        let facility_data_res = await facility_data();
        try{
            if(facility_data_res != "null"){
              
        facility_data_store.set(
            facility_data_res.body.data[0]
        )
        
        new_fac_remarks = $facility_data_store.remarks.split("\n");
        console.log("new_fac_remarks",new_fac_remarks)
        
        let new_facility_date_format = new Date($facility_data_store.creation);
        facility_created_date = get_date_format(new_facility_date_format,"dd-mm-yyyy-hh-mm");
        
        let new_doc_date_format = new Date($facility_data_store.creation);
        facility_doc_date =get_date_format(new_doc_date_format,"dd-mm-yyyy-hh-mm");
        
        let facility_date_format = new Date($facility_data_store.modified);
        facility_modified_date = get_date_format(facility_date_format,"dd-mm-yyyy-hh-mm");
        
        

            if($facility_data_store.status.includes("Rejected")){
               
                $facility_data_store.status = "Rejected";
                status_name = $facility_data_store.status;
            }
            if ($facility_data_store.password == "") {
                facility_password = "-";
            }
            for (var j = 0;j < $facility_data_store.addresess.length;j++) 
            {
                if (
                    $facility_data_store.addresess[j].default_address == "1"
                ) {
                    facility_address =$facility_data_store.addresess[j].address;
                    facility_postal =$facility_data_store.addresess[j].postal;
                    city = $facility_data_store.addresess[j].city;
                    location_id = $facility_data_store.addresess[j].location_id;
                }
            }
        }
    }
    catch(err) {
        // message.innerHTML = "Error is " + err;
        }

    let bgv_pass_data=[
        $facility_data_store.org_id,
        $facility_data_store.station_code,
        $facility_data_store.facility_type,
    ]    

    console.log("bgv_pass_dataaa",  $facility_data_store.org_id,
        $facility_data_store.station_code,
        $facility_data_store.facility_type);
    let bgv_init_res = await facility_bgv_init(bgv_pass_data);
    console.log("bgv_inittt",bgv_init_res)
    if (bgv_init_res.body.status == "green"){
        // bgv_config_store.set(
        // bgv_init_res.body.data
        // )
            showbtn = 1;
    //         let bgv_check_res = await facility_bgv_check();
    //         // console.log("bgv_check_res",bgv_check_res)
    //         if(bgv_check_res.body.data.length == "0"){
    //         initiate_bgv = 1;
    // }
    }

    all_tags_res = await all_facility_tags($facility_data_store.name);
    
    try {
        if(all_tags_res.body.status == "green"){
        for(i=0;i < all_tags_res.body.data.length;i++){
       
        all_tags_data.push(all_tags_res.body.data[i].tag_name);
        // all_tags_obj[i] = all_tags_res.body.data[i].tag_name;
        all_tags_obj[all_tags_res.body.data[i].tag_name] = all_tags_res.body.data[i].tag_description;
        // console.log("all_tags_obj[i]",all_tags_obj)
        }
        all_tags_data = all_tags_data;
        // console.log("all_tags_obj",all_tags_obj)
        // for(let key in all_tags_obj){
        //     console.log("key",key)
        //     console.log("values",all_tags_obj[key])
        // }
    }
        
    } 
    catch(err) {
        // message.innerHTML = "Error is " + err;
    }
    

    // console.log("all_tags_data",all_tags_data,all_tags_id)
    
  });

/////////bank details//////;///////
    const onFileSelected = (e) => {
        let img = e.target.files[0];
        console.log("img", img);
        img_name = img.name;
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
        file_data = reader.result;
            // console.log(reader.result);
            // console.log("img_name", img_name);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    async function cheque_button_click() {
        // cheque_date = "2022-03-08";
        
        let new_cheque_date = new Date(cheque_date)
        // cheque_date=get_date_format(new_cheque_date,"yyyy-mm-dd")
        
        // // console.log("cheque Date", changed_date);
        // // console.log("bank_name",bank_name,type,cheque_date,cheque_number,amount,
        // recrun_number,file_number);
        let validations = 0;

        if(!bank_name.match(text_pattern)){
        bank_name_message = "Invalid Bank Name";
        }
        else{
            validations = 1;
            bank_name_message = "";
        }
        if(!type){
            type_message = "Invalid type";
        }
        else{
            validations = 1;
            type_message = "";
        }
        if(!cheque_date){
            cheque_date_message = "Invalid Cheque Date";
        }
        else{
            validations = 1;
            cheque_date_message = "";
        }
        if(!cheque_number || isNaN(cheque_number)){
            cheque_number_message = "Invalid Cheque Number";
        }
        else{
            validations = 1;
            cheque_number_message = "";
        }
        if(!amount || isNaN(amount)){
            amount_message = "Invalid Amount";
            
        }
        else{
            validations = 1;
            amount_message = "";
        }
        if(!recrun_number || !recrun_number.match(recrun_pattern)){
            recrun_number_message = "Invalid Recrun Number";
        }
        else{
            validations = 1;
            recrun_number_message = "";
        }
        if(!file_number || isNaN(file_number)){
            file_number_message = "Invalid File Number";
        }
        else{
            validations = 1;
            file_number_message = "";
        }
        if(!checkupload){
            cheque_upload_message = "Invalid Cheque Upload"
        }
        else{
            validations = 1;
            cheque_upload_message = "";
        }
        if(validations == "1"){
            const cheque_details_form = {
                bank_name,
                type,
                cheque_date:(get_date_format(new_cheque_date,"yyyy-mm-dd")),
                cheque_number,
                amount,
                recrun_number,
                file_number,
                file_data,
                file_name:img_name,
                facility_id:($facility_id.facility_id_number),
            };
            addnew_cheque_details(cheque_details_form);
        }
        else{
        console.log("Error Use Toast")
    }
    }
    
    

    /////////bank details/////////////

    function editWorkDetail() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }

    async function routeToBgv() {
        let replaceState = false;
        goto(routeBgv, { replaceState });
        
    }

    function myBtn() {
        associateModal.style.display = "block";
    }

    async function tagAddRemove() {
        addRemoveModal.style.display = "block";
        console.log("INSIDE TAG ADD REMOVE")
        let tag_res = await show_fac_tags($facility_data_store.facility_type);
        try {
                show_fac_array = tag_res.body.data;
                console.log("show_fac_array",show_fac_array)
                for(let i=0;i < show_fac_array.length;i++){
                    
                    let new_date =new Date(show_fac_array[i].creation)
                    
                    show_fac_array[i].creation=new_date;
                    // console.log("new_date",new_date);
                }
                    show_fac_array.sort(function(a, b) {
                    if (a.creation > b.creation) return -1;
                    if (a.creation < b.creation) return 1;
                    return 0;
                    });

                    for(let i=0;i < show_fac_array.length;i++){
                    let show_creation_date =get_date_format(show_fac_array[i].creation,"yyyy-mm-dd")
                    show_fac_array[i].creation=show_creation_date;
                    }
                    console.log("sorted_date_array",show_fac_array)
        } 
        catch(err) {
        console.log("ERROR")
        // message.innerHTML = "Error is " + err;
         }

        let service_vend_res = await service_vendor();
        console.log("service_vend_res",service_vend_res)
        try {
            if(service_vend_res.body.status == "green"){
                
                for(let i=0;i<service_vend_res.body.data.length;i++){
                    if(service_vend_res.body.data[i].location_id == location_id){
                        // tag_data_obj[service_vend_res.body.data[i].vendor_id] = service_vend_res.body.data[i].vendor_name;
                        tag_data_obj.push(service_vend_res.body.data[i]);
                    }
                }
                tag_data_obj = tag_data_obj;
                console.log("tag_data_obj",tag_data_obj)
            }
            else{
                console.log("No Data")
            }
        }
        catch(err) {
        console.log("ERROR")
        // message.innerHTML = "Error is " + err;
         }


    }
    async function handleTagClick(){
        let new_tag_id
    try {   
    //     if(all_tags_res.body.status == "green"){
        
        for(let i=0; i < all_tags_res.body.data.length; i++){
            // console.log("INDISDE FOR LOOPform_data from html",select_tag_data,all_tags_res.body.data[i].tag_name)
            if(select_tag_data == all_tags_res.body.data[i].tag_name){
                new_tag_id = all_tags_res.body.data[i].tag_id;
            }
            
        }
        if(!select_tag_data){
            selectTag = 1;
            if(!tag_remark){
            addRemark = 1;
                if(!serv_ch_data){
                    selectserCh=1;
                }
            }   

        }
        else{
            console.log("select_tag_data",select_tag_data)
            show_fac_array = [];
            console.log("serv_ch_data",serv_ch_data)
            let submit_fac_res = await submit_fac_tag_data(new_tag_id,select_tag_data,tag_date,tag_remark,serv_ch_data)
            try {
                if(submit_fac_res.body.status == "green"){
                    let temp_res = await show_fac_tags($facility_data_store.facility_type);
                    show_fac_array = temp_res.body.data;
                    for(let i=0;i < show_fac_array.length;i++){
                        let new_date =new Date(show_fac_array[i].creation)
                        show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
                        show_fac_array[i].creation=show_creation_date;
                    }
                    show_fac_array = show_fac_array;
                }
                // console.log("submit_fac_res.body",submit_fac_res.body)
                else if(submit_fac_res.body.message == "Tag already exist..!"){
                        console.log("Cannot Add Tag already exist..!")
                }
            }
                catch(err) {
                console.log("ERROR")
                // message.innerHTML = "Error is " + err;
                }
        }

    }
    catch(err) {
        console.log("ERROR")
        // message.innerHTML = "Error is " + err;
    }
      
}

    async function removeTag(tag_id,tag_name,owner,tag_status){
        show_fac_array = [];
        let fac_id
        if(owner == $facility_data_store.owner){
                fac_id = $facility_data_store.name
                console.log("fac_id",fac_id)
        }
        let remove_tag_res = await remove_tag(fac_id,tag_id,tag_name);
        if(remove_tag_res.body.status == "green")
        {
        let temp_res = await show_fac_tags($facility_data_store.facility_type);
        try {
                show_fac_array = temp_res.body.data;
                
                // console.log("show_fac_array IN remove",show_fac_array)
                for(let i=0;i < show_fac_array.length;i++){
                    
                    let new_date =new Date(show_fac_array[i].creation)
                    show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
                    show_fac_array[i].creation=show_creation_date;
        }
       
    }
        catch(err) {
        console.log("ERROR")
        // message.innerHTML = "Error is " + err;
         }

    }
}


   async function tagAuditFunc(){
        temp = "tag";
        let tag_audit_res =await tag_audit_trail();
        try {
            if(tag_audit_res.body.status == "green"){
            console.log("tag_audit_res",tag_audit_res);
            tag_data_arr = tag_audit_res.body.data
            for(let i=0;i < tag_data_arr.length;i++){
                let new_date =new Date(tag_data_arr[i].creation)
                show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
                tag_data_arr[i].creation=show_creation_date;
            }
            console.log("TAG DATA ARRA",tag_data_arr)
            tag_data_arr = tag_data_arr;
               
        }} catch(err) {
        console.log("ERROR")
        // message.innerHTML = "Error is " + err;
         }
       
    }

    function clear() {
        addRemoveModal.style.display = "none";
    }

    function close() {
        associateModal.style.display = "none";
    }

    function allDoc() {
        modalid.style.display = "block";
    }

    function closeDoc() {
        modalid.style.display = "none";
    }

    routeBgv = "bgv";

    routeNext = "workdetails";

    async function auditTrial() {
       
        let audit_res = await audit_trail_data($facility_id.facility_id_number);
        try {
            if (audit_res.body.status == "green") {
                audit_details_array = audit_res.body.data;
            }
        } catch (err) {
            message.innerHTML = "Error is  " + err;
        }
        supplierInfoModal.style.display = "block";
    }

    function closeAuditTrailModal() {
        supplierInfoModal.style.display = "none";
    }

    function gstModel() {
        modalidgst.style.display = "block";
    }

    function closeGST() {
        modalidgst.style.display = "none";
    }

    function erpModel() {
        erpIdModel.style.display = "block";
    }

    function closeERP() {
        erpIdModel.style.display = "none";
    }

    function workContract() {
        workContractModel.style.display = "block";
    }

    function closeWorkContract() {
        workContractModel.style.display = "none";
    }

    function workorganization() {
        workorganizationModel.style.display = "block";
    }

    function closeWorkorganization() {
        workorganizationModel.style.display = "none";
    }

    function chequeDetails() {
        chequeModel.style.display = "block";
    }

    function closechequeDetails() {
        chequeModel.style.display = "none";
    }

    function linkChild() {
        linkChildModel.style.display = "block";
    }

    function linkChildModelclose() {
        linkChildModel.style.display = "none";
    }
</script>

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section xsl:px-p10">
            <div class="breadcrumbtextDetails breadcrumbmedia">
                <p class="flex items-center">
                    <span class="text-textgrey pr-1 text-base"
                        >Home / Workforce</span
                    >

                    <span class="Username ">
                        <img
                            src="../src/img/delivery.png"
                            class="userIconMedia"
                            alt=""
                        /><span class="xs:hidden sm:hidden">
                            {$facility_data_store.facility_name}</span
                        >
                        <span class="userDesignation"
                            >(Associate - {$facility_data_store.facility_type})</span
                        >
                    </span>
                </p>
                <p class="breadcrumbRight">
                    <a href="">
                        <span class="breadRightIcons" on:click={erpModel}>
                            ERP Details
                        </span>
                    </a>
                    <a href="">
                        <span class="breadRightIcons" on:click={allDoc}>
                            <img
                                src="../src/img/document.png"
                                class="pr-2"
                                alt=""
                            /> Documents</span
                        >
                    </a>
                    <a href="">
                        <span class="breadRightIcons" on:click={auditTrial}>
                            <img
                                src="../src/img/audittrail.png"
                                class="pr-2"
                                alt=""
                            /> Audit Trial (12)</span
                        >
                    </a>
                    <span class="backlistText">
                        <img
                            src="../src/img/backlist.png"
                            class="pr-2"
                            alt=""
                        /> Backlist Vendor</span
                    >
                </p>
            </div>
            <div class="statusbar ">

                <div class="leftStatus">
                    <div class="text-sm">
                        <div class="statusBarSec ">
                            <div class="statusbarLeft">
                                <p class="statusText">Status -</p>
                                {#if $facility_data_store.status == "Active"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                            >
                                <img
                                    src="../src/img/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> {$facility_data_store.status}
                            </p>
                                {:else if $facility_data_store.status == "Deactive"}
                                <p
                                class="statusContentTag font-normal text-sm  "
                            >
                                <img
                                    src="../src/img/redcircle.png"
                                    alt=""
                                    class="w-3 h-3 mr-2"
                                />
                                {$facility_data_store.status}
                            </p>
                            {:else if $facility_data_store.status == "Rejected"}
                                <p
                                class="statusContentTag font-normal text-sm  "
                            >
                                <img
                                    src="../src/img/redcircle.png"
                                    alt=""
                                    class="w-3 h-3 mr-2"
                                />
                                {status_name}
                            </p>
                            {:else}
                            
                            <p class="statusContent font-normal xs:w-5/12">
                                <img
                                    src="../src/img/timer.png"
                                    class="pr-2"
                                    alt=""
                                />{$facility_data_store.status}
                            </p>
                                {/if}
                                <div class="hidden">
                                    <p class="statusContent font-medium italic">
                                        <img
                                            src="../src/img/circleicon.png"
                                            alt=""
                                            class="w-3 h-3 pr-2"
                                        />
                                        Verification Pending
                                    </p>
                                </div>
                                <div class="hidden">
                                <p
                                    class="statusContentTag font-normal text-sm  "
                                >
                                    <img
                                        src="../src/img/redcircle.png"
                                        alt=""
                                        class="w-3 h-3 mr-2"
                                    />
                                    Documents Rejected
                                </p>
                            </div>
                            </div>
                            <div class="statusbarMiddle">
                                <div class="hidden">
                                    <p
                                        class="statusContent font-normal xs:w-5/12"
                                    >
                                        <img
                                            src="../src/img/timer.png"
                                            class="pr-2"
                                            alt=""
                                        /> Address Proof
                                    </p>
                                </div>
                                <div class="hidden">
                                <p
                                    class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                    <img
                                        src="../src/img/checked.png"
                                        class="pr-2"
                                        alt=""
                                    /> Address Proof
                                </p>
                                </div>

                                <p class="xsl:hidden">
                                    <img src="../src/img/Line.png" alt="" />
                                </p>
                                <div class="hidden">
                                    <p
                                        class="statusContent font-normal xs:w-5/12"
                                    >
                                        <img
                                            src="../src/img/timer.png"
                                            class="pr-2"
                                            alt=""
                                        />Offer Letter
                                    </p>
                                </div>

                                <!-- <p
                                    class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                    <img
                                        src="../src/img/reject.png"
                                        class="pr-2"
                                        alt=""
                                    />ID Reject
                                </p> -->

                                <!-- <p class="xsl:hidden">
                                    <img src="../src/img/Line.png" alt="" />
                                </p> -->
                                {#if $facility_data_store.is_id_prof_verified == "1"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                            >
                                <img
                                    src="../src/img/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> ID Verified
                            </p>
                                {:else if $facility_data_store.is_id_prof_rejected == "1"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                            >
                                <img
                                    src="../src/img/reject.png"
                                    class="pr-2"
                                    alt=""
                                />ID Reject
                            </p>
                            <!-- {:else} -->
                            {:else if $facility_data_store.is_id_prof_rejected == "0" && $facility_data_store.is_id_prof_verified == "0"}
                            <p class="statusContent font-normal xs:w-5/12">
                                <img
                                    src="../src/img/timer.png"
                                    class="pr-2"
                                    alt=""
                                />ID Pending
                            </p>
                                {/if}
                               
                                <!-- <p>{bank_values_from_store.approved}</p> -->
                                {#if !bank_values_from_store}
                                   <p></p>
                                    {:else}
                                   
                                   
                                        {#if bank_values_from_store.approved == "1"}
                                        <p class="xsl:hidden">
                                            <img src="../src/img/Line.png" alt="" />
                                        </p>
                                    <p
                                        class="statusContentTag text-green font-normal xs:w-5/12"
                                    >
                                        <img
                                            src="../src/img/checked.png"
                                            class="pr-2"
                                            alt=""
                                        />Bank Details Approved
                                    </p>
                                    {:else if bank_values_from_store.rejected == "1"}
                                    <p class="xsl:hidden">
                                        <img src="../src/img/Line.png" alt="" />
                                    </p>
                                    <p
                                        class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                    >
                                        <img
                                            src="../src/img/reject.png"
                                            class="pr-2"
                                            alt=""
                                        />Bank Details Rejected
                                    </p>
                                    {:else if bank_values_from_store.rejected == "0" && bank_values_from_store.approved == "0"}
                                    <p class="xsl:hidden">
                                        <img src="../src/img/Line.png" alt="" />
                                    </p>
                                    
                                    <p class="statusContent font-normal xs:w-5/12">
                                        <img
                                            src="../src/img/timer.png"
                                            class="pr-2"
                                            alt=""
                                        />Bank Verification Pending
                                    </p>
                                    {/if} 
                                {/if}  
                            </div>
                        </div>
                    </div>
                </div>
                <div class="statusrightlink">
                    <div>
                        {#if showbtn == "1"}
                            {#if $facility_data_store.is_bgv_intiated == "0"}
                            
                            <p on:click={routeToBgv} class="initiateText">
                                <a href="" class="flex">
                                    <img
                                        src="../src/img/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    /> Initiate BGV Verification</a
                                >
                            </p>
                            {:else if $facility_data_store.is_bgv_rejected == "1"}
                            <p on:click={routeToBgv} class="initiateText">
                                <a href="" class="flex" style="color: rgba(255, 0, 0, var(--tw-text-opacity));">
                                    <img
                                        src="../src/img/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    />BGV Rejected</a
                                >
                            </p>
                            {:else if $facility_data_store.is_bgv_verified == "1"}
                            <p on:click={routeToBgv} class="initiateText">
                                <a href="" class="flex" style="color:rgba(106, 194, 89, var(--tw-text-opacity));">
                                    <img
                                        src="../src/img/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    />BGV Verified</a
                                >
                            </p>
                            {:else}
                            <p on:click={routeToBgv} class="initiateText">
                                <a href="" class="flex" style="color: color: rgba(255, 134, 46, var(--tw-text-opacity));">
                                    <img
                                        src="../src/img/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    />BGV Pending</a
                                >
                            </p>
                            {/if}

                        {:else}
                        <p></p>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="contentsectionDetailview ">
        <div class="associateDetails ">
            <div class="detailsHeader ">
                <div class="left">
                    <p class="detailsTitle">Associate Details</p>
                    <p class="detailsUpdate">
                        <span
                            ><span class="font-medium">Last updated -</span>> {facility_created_date}
                            <span class="font-medium">
                                By-</span
                            >{$facility_data_store.owner}</span
                        >
                    </p>
                </div>
                <div class="right flex">
                    <a href="" class="smButton" on:click={editWorkDetail}>
                        <img src="../src/img/edit.png" alt="" />
                    </a>
                </div>
            </div>

            <div class="profilepic">
                {#if !profile_url}
            
                <img src="../src/img/delivery.png"alt="" /> 
                <p class="imgName">{$facility_data_store.facility_name}</p>
                {:else}
                <img src={profile_url} alt="" /> 
                 <p class="imgName">{$facility_data_store.facility_name}</p>
                {/if}
            </div>

            <div class="userInfoSec px-5  flex items-start ">
                <img src="../src/img/location1.png" alt="" />
                <div class="pl-4">
                    <p class="detailLbale">Address & Pincode</p>
                    <p class="detailData ">
                        {facility_address}
                        {facility_postal}
                    </p>
                </div>
            </div>

            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/mobilephone.png" alt="" />
                    <div class="pl-4">
                        <p class="detailLbale">Mobile Number</p>
                        <p class="detailData">{$facility_data_store.phone_number}</p>
                    </div>
                </div>

                {#if $facility_data_store.phone_verified == "1"}
                    <div class="userStatus ">
                        <p class="userStatusTick">
                            <img
                                src="../src/img/checked.png"
                                alt=""
                                class="pr-1"
                            /> Verified
                        </p>
                    </div>
                    {:else}
                    <div class="userStatus ">
                        <p class="verifyText">
                            <img
                                src="../src/img/timer.png"
                                alt=""
                                class="pr-1"
                            />
                            Verification Pending
                        </p>
                    </div>
                {/if}
            </div>

            <div class="userInfoSec3">
                <div class="flex items-start">
                    <img src="../src/img/email.png" alt="" />
                    <div class="pl-4">
                        <p class="detailLbale">Email</p>
                        <p class="detailData">{$facility_data_store.facility_email}</p>
                    </div>
                </div>
            </div>

            <div class="userInfoSecPadding">
                <div class="wrapperInfoFirst">
                    <div class="flex items-start">
                        <img src="../src/img/addressproof.png" alt="" />
                        <div class="pl-4">
                            <p class="detailLbale">Address proof</p>
                        </div>
                    </div>
                    <div class="userStatus ">
                        <!-- <p class="verifyText">
                            <img
                                src="../src/img/timer.png"
                                alt=""
                                class="pr-1"
                            /> Verification Pending
                        </p> -->
                        {#if $facility_data_store.phone_verified == "1"}
                    <div class="userStatus ">
                        <p class="userStatusTick">
                            <img
                                src="../src/img/checked.png"
                                alt=""
                                class="pr-1"
                            /> Verified
                        </p>
                    </div>
                    {:else}
                    <div class="userStatus ">
                        <p class="verifyText">
                            <img
                                src="../src/img/timer.png"
                                alt=""
                                class="pr-1"
                            />
                            Verification Pending
                        </p>
                    </div>
                {/if}
                    </div>
                </div>
                <div class="wrapperInfo ">
                    {#if address_name == "Not Submitted"}
                    <p>
                        {address_name}
                    </p>
                    {:else}
                    <div class="flex items-start">
                        <img
                            src="../src/img/addressproof.png"
                            class="invisible"
                            alt=""
                        />
                        <div class="pl-4 flex items-center">
                            <img src="../src/img/jpeg.png" class="" alt="" />

                            <p class="detailLbale">{address_name}</p>
                        </div>
                    </div>
                  
                <div class="userStatus ">
                <p class="verifyText">
                    <a href="" class="smButton">
                        <img src="../src/img/edit.png" alt="" />
                    </a>
                </p>
                </div>
                {/if}
                   
                </div>
            </div>


            <div class="userInfoSecPadding">
                <div class="wrapperInfoFirst">
                    <div class="flex items-start">
                        <img src="../src/img/addressproof.png" alt="" />
                        <div class="pl-4">
                            <p class="detailLbale">GST Details</p>
                        </div>
                    </div>
                    <!-- <div class="userStatus "> -->
                        <!-- <p class="verifyText">
                            <img
                                src="../src/img/timer.png"
                                alt=""
                                class="pr-1"
                            /> Verification Pending
                        </p> -->
                        <!-- {#if verified_gst == "1"}
                    <div class="userStatus ">
                        <p class="userStatusTick">
                            <img
                                src="../src/img/gst.png"
                                alt=""
                                class="pr-1"
                            /> Verified
                        </p>
                    </div>
                    {:else}
                    <div class="userStatus ">
                        <p class="verifyText">
                            <img
                                src="../src/img/timer.png"
                                alt=""
                                class="pr-1"
                            />
                            Verification Pending
                        </p>
                    </div>
                {/if} -->
                    <!-- </div> -->
                </div>
                <div class="wrapperInfo ">
                    <div class="flex items-start">
                        <img
                            src="../src/img/addressproof.png"
                            class="invisible"
                            alt=""
                        />
                        <div class="pl-4 flex items-center">
                            <img src="../src/img/gst.png" alt="" />

                            <p class="detailLbale">{gst_name}</p>
                        </div>
                    </div>
                    <p class="flex items-center smButtonText">
                        <a href="" class="smButton" on:click={gstModel}>
                            Add
                        </a>
                    </p>
                </div>
            </div>

            <!-- <div class="userInfoSec3">
                <div class="wrapperInfoFirst">
                <div class="flex items-start">
                    <img src="../src/img/gst.png" alt="" />
                    <div class="pl-4">
                        <p class="detailLbale">GST Details</p>
                        <p class="detailData">Not added</p>
                    </div>
                </div>
            </div>
            <div class="wrapperInfo ">
                    <div class="flex items-start">
                        <img
                            src="../src/img/addressproof.png"
                            class="invisible"
                            alt=""
                        />
                        <div class="pl-4 flex items-center">
                            <img src="../src/img/jpeg.png" class="" alt="" />

                            <p class="detailLbale">{address_name}</p>
                        </div>
                    </div>
                    <div class="userStatus ">
                     </div>
                </div>
                <div class="userStatus ">
                    <p class="flex items-center smButtonText">
                        <a href="" class="smButton" on:click={gstModel}>
                            Add
                        </a>
                    </p>
                </div>
            </div> -->

            <div class="border-gray-200 px-5">
                <hr />
            </div>

            <div class="appcredentials">
                <div class="headingWithIcon">
                    <img src="../src/img/mobileblue.png" alt="" />
                    <p class="detailsTitle">Libear App Credentials</p>
                </div>
            </div>

            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/pan.png" alt="" />
                    <div class="pl-4">
                        <p class="detailLbale">User ID</p>
                        {#if !$facility_data_store.facility_id}
                        <p>-</p>
                        {:else}
                        <p class="detailData">{$facility_data_store.facility_id}</p>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/password.png" alt="" />
                    <div class="pl-4">
                        <p class="detailLbale">Password</p>
                        <p class="detailData">{facility_password}</p>
                    </div>
                </div>
            </div>
            <div class="border-gray-200 px-5">
                <hr />
            </div>

            <div class="userInfoSec px-5 py-5 flex justify-end">
                <div class="addOwner ">
                    <p class="flex items-center smButtonText">
                        <a href="" class="smButton"> Add Owner </a>
                    </p>
                </div>
            </div>

            <div class="border-gray-200 px-5">
                <hr />
            </div>

            <div class="userInfoSec3">
                <div class="flex items-start">
                    <img src="../src/img/workforce.svg" alt="" />
                    <div class="pl-4">
                        <p class="detailLbale">Link Child Associate</p>
                        <p class="detailData">2</p>
                    </div>
                </div>
                <div class="userStatus ">
                    <p
                        class="flex items-center smButtonText"
                        on:click={linkChild}
                    >
                        <a href="" class="smButton"> Link/View </a>
                    </p>
                </div>
            </div>
        </div>
        <div class=" w-widthforWorkDetailSection fullsection ">
            <div class="WorkDetailSection bg-white rounded-lg mb-5">
                <div class="detailsHeader xsl:flex-wrap ">
                    <div class="left">
                        <p class="detailsTitle">Work Details</p>
                        <p class="detailsUpdate">
                            <span
                                ><span class="font-medium">Last updated -</span
                                >> {facility_modified_date}
                                <span class="font-medium"> By-</span>
                                {$facility_data_store.modified_by}</span
                            >
                        </p>
                    </div>
                    <div class="right flex">
                        <!-- {#each tag_data_arr as arr }
                        {arr}
                            
                        {/each} -->
                        <p
                            class="flex items-center smButtonText pr-3"
                            on:click={tagAddRemove}
                        >
                            <a href="" class="smButton"> Add/Remove Tags </a>
                        </p>

                        <!-- Add Remove Tag Modal -->

                        <div class="hidden" id="addRemoveModal">
                            <div class="ChangeAssociateTypeWrapper">
                                <div class="changeAssoMain ">
                                    <div
                                        class=" w-full bg-white rounded shadow-2xl"
                                    >
                                        <div class="relative  rounded-t ">
                                            <svg
                                                class="absolute top-36 transform rotate-90 -right-6 -mt-5 block md:hidden xs:hidden"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="26"
                                                height="23"
                                                viewBox="0 0 26 23"
                                                fill="none"
                                            >
                                                <path
                                                    id="Polygon 2"
                                                    d="M13 0L25.9904 22.5H0.00961876L13 0Z"
                                                    fill="#ffffff"
                                                    stroke="#E7E7E7"
                                                />
                                            </svg>
                                        </div>
                                        <div class="w-full h-full  pb-5 ">
                                            <div
                                                class="bg-black px-4 flex py-4 justify-between rounded-t-md rounded-tr-md"
                                            >
                                                <div
                                                    class="leftHeadingpopover text-white"
                                                >
                                                    <p>Add / Remove Tags</p>
                                                </div>
                                                <div
                                                    class="rightcloseIconBlack"
                                                    on:click={clear}
                                                >
                                                    <img
                                                        src="../src/img/closewhite.svg"
                                                        class="cursor-pointer"
                                                        id="closeAddRemove"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                class="tabwrapper flex justify-between text-center"
                                            >
                                                <div
                                                    class="changetype py-3 w-2/4 "
                                                    on:click={() => {
                                                        temp = "Add";
                                                    }}
                                                >
                                                    <p>Add Tags</p>
                                                </div>
                                                <div
                                                    class="Historytab py-3 w-2/4	 bg-bglightgreye"
                                                    on:click={tagAuditFunc}
                                                
                                                >
                                                    <p>Tag Audit Trail</p>
                                                </div>
                                            </div>

                                            {#if temp == "Add"}
                                                <div class="changetypeSection ">
                                                    <div
                                                        class="flex px-2 pt-3 items-center xs:flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey"
                                                        >
                                                            Select Tag
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <select
                                                                class="inputboxpopover"
                                                            bind:value="{select_tag_data}">
                                                            
                                                            <!-- <option
                                                                    class="pt-6"
                                                                    >Select</option
                                                                > -->
                                                            <option value="">Select</option>
                                                            {#if !all_tags_data}
                                                            <p></p>
                                                            {:else}
                                                            {#each all_tags_data as tag_data}
                                                            <option>{tag_data}</option>
                                                                <!-- <option
                                                                    >Axis</option
                                                                >
                                                                <option
                                                                    >SIB</option
                                                                > -->
                                                                {/each}
                                                                {/if}
                                                            </select>
                                                            {#if selectTag == "1"}
                                                            <div class="text-red-500">
                                                                "Select tag name"
                                                            </div>
                                                            {/if}
                                                            
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                    class="flex px-2 pt-3 items-center xs:flex-wrap {hidden_field}"
                                                >
                                                    <div
                                                        class="light14grey"
                                                    >
                                                    Select Sevice Charge Vendor
                                                    </div>
                                                    <div
                                                        class="formInnerGroup "
                                                    >
                                                        <select
                                                            class="inputboxpopover"
                                                        bind:value={serv_ch_data}>
                                                        
                                                        <!-- <option
                                                                class="pt-6"
                                                                >Select</option
                                                            > -->
                                                        <option value="">Select</option>
                                                        {#if !tag_data_obj}
                                                        <p></p>
                                                        {:else}
                                                        <!-- {#each Object.keys(tag_data_obj),tag_data_obj[Object.keys(tag_data_obj)] as key,value} -->
                                                        {#each tag_data_obj as obj}
                                                        <option value={obj.vendor_id}>{obj.vendor_name} - {obj.vendor_id}</option>
                                                            <!-- <option
                                                                >Axis</option
                                                            >
                                                            <option
                                                                >SIB</option
                                                            > -->
                                                            
                                                        {/each}
                                                        {/if}

                                                       
                                                        </select>
                                                        {#if selectserCh == "1"}
                                                        <div class="text-red-500">
                                                            "Select Sevice Charge Vendor"
                                                        </div>
                                                        {/if}
                                                        
                                                        <div
                                                            class="formSelectArrow "
                                                        >
                                                            <img
                                                                src="../src/img/selectarrow.png"
                                                                class="w-5 h-auto"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                    <div
                                                        class="flex px-2 py-3 items-center xs:flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey"
                                                        >
                                                            Remove On
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <input
                                                                type="date"
                                                                class="inputboxpopoverdate"
                                                                placeholder=" "
                                                                min={new Date().toISOString().split('T')[0]}
                                                                bind:value="{tag_date}" 
                                                            />
                                                            <p
                                                                class="text-grey whitespace-nowrap text-xs px-1 mt-1"
                                                            >
                                                                Note: Use only
                                                                if required
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="flex px-2 py-0 items-center xs:flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey w-36"
                                                        >
                                                            Remarks
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                                bind:value="{tag_remark}"
                                                            />
                                                        </div>
                                                        
                                                    </div>
                                                    <div
                                                        class="flex px-2 py-0 items-center xs:flex-wrap"
                                                    >
                                                    
                                                    {#if addRemark == "1"}
                                                    
                                                            <div class="text-red-500">
                                                                "Please enter a remark"
                                                            </div>
                                                        {/if}
                                                        </div>
                                                    

                                                    <div
                                                        class="flex px-3 justify-between mt-4"
                                                    >
                                                        <div
                                                            class="light14grey w-36"
                                                        />
                                                        <button
                                                            class="saveandproceed"
                                                            on:click="{handleTagClick(select_tag_data,tag_date,tag_remark,tag_data_obj)}"
                                                            >Add</button
                                                        >
                                                    </div>

                                                    <div
                                                        class="OtherAppliedTagsTable px-3"
                                                    >
                                                        <p
                                                            class="text-lg text-blackshade font-medium"
                                                        >
                                                            Other Applied Tags
                                                        </p>
                                                        <table
                                                            class="table  w-full text-center mt-2 xs:hidden sm:hidden"
                                                        >
                                                            <thead
                                                                class="theadpopover"
                                                            >
                                                                <tr>
                                                                    <th>Tag</th>
                                                                    <th
                                                                        >Remarks</th
                                                                    >
                                                                    <th
                                                                        >Added
                                                                        by</th
                                                                    >
                                                                    <th
                                                                        >Added
                                                                        On</th
                                                                    >
                                                                    <th
                                                                        >Auto
                                                                        Removal
                                                                        On</th
                                                                    >
                                                                    <th
                                                                        >Remove</th
                                                                    >
                                                                </tr>
                                                            </thead>
                                                            <tbody
                                                                class="tbodypopover"
                                                            >{#each show_fac_array as show_fac}
                                                            
                                                                <tr
                                                                    class="border-b"
                                                                >
                                                                    <td
                                                                        >{show_fac.tag_name}</td
                                                                    >
                                                                    <td
                                                                        >
                                                                        {#if !show_fac.remarks}
                                                                        <p>-</p>
                                                                        {:else}
                                                                        {show_fac.remarks}{/if}</td
                                                                    >
                                                                    <td
                                                                        >{show_fac.owner}</td
                                                                    >
                                                                    <td
                                                                        >{show_fac.creation}</td
                                                                    >
                                                                    <td
                                                                        >
                                                                        {#if !show_fac.deactivation_date}
                                                                        <p>-</p>
                                                                        {:else}
                                                                        {show_fac.deactivation_date}{/if}</td
                                                                    >
                                                                    <td>
                                                                        <div
                                                                            class="flex justify-center"
                                                                        >
                                                                            <img
                                                                                src="../src/img/reject.png"
                                                                                alt=""
                                                                                on:click="{removeTag(show_fac.name,show_fac.tag_name,show_fac.owner)}"
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <!-- <tr
                                                                    class="border-b"
                                                                >
                                                                    <td
                                                                        >Addhoc
                                                                        Facility</td
                                                                    >
                                                                    <td
                                                                        >No
                                                                        Remarks</td
                                                                    >
                                                                    <td
                                                                        >User
                                                                        name</td
                                                                    >
                                                                    <td
                                                                        >10-09-2020</td
                                                                    >
                                                                    <td
                                                                        >No date</td
                                                                    >
                                                                    <td>
                                                                        <div
                                                                            class="flex justify-center"
                                                                        >
                                                                            <img
                                                                                src="../src/img/reject.png"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr> -->
                                                
                                                                {/each}
                                                            </tbody>
                                                        </table>
                                                        ​
                                                        <div
                                                            class="associateCard  border p-p7px  rounded-md hidden xs:block sm:block"
                                                        >
                                                            <div
                                                                class="flex px-4 py-1 items-center"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    Tag
                                                                </div>
                                                                <div
                                                                    class="dataValue"
                                                                >
                                                                    Addhoc
                                                                    Facility
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-1 items-center"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    Remarks
                                                                </div>
                                                                <div
                                                                    class="dataValue"
                                                                >
                                                                    No Remarks
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-1 items-center"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    Added by
                                                                </div>
                                                                <div
                                                                    class="dataValue"
                                                                >
                                                                    User name
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-1 items-center"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    Added On
                                                                </div>
                                                                <div
                                                                    class="dataValue"
                                                                >
                                                                    13-Apr-2021
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-1 items-center"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    Auto Removal
                                                                    On
                                                                </div>
                                                                <div
                                                                    class="dataValue"
                                                                >
                                                                    No date
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-1 items-center"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    Remove
                                                                </div>
                                                                <div
                                                                    class="dataValue"
                                                                >
                                                                    <img
                                                                        src="../src/img/reject.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/if}

                                            {#if temp == "tag"}
                                                <div
                                                    class="changeAssociateSection mx-3 "
                                                >
                                                    <table
                                                        class="table  mt-2 w-full xs:hidden sm:hidden"
                                                    >
                                                   
                                                        <thead
                                                            class="theadpopover"
                                                        >
                                                            <tr>
                                                                <th>Tag</th>
                                                                <th>Date</th>
                                                                <th>Given by</th
                                                                >
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody
                                                            class="tbodypopover"
                                                        >
                                                        {#each tag_data_arr as new_tag_audit}   
                                                        <tr
                                                                class="border-b"
                                                            >
                                                            <!-- {#each tag_data_arr as new_tag_audit}
                                                                <td
                                                                    >{new_tag_audit.parenttype}</td
                                                                >
                                                                <td
                                                                    >{new_tag_audit.creation}</td
                                                                >
                                                                <td
                                                                    >{new_tag_audit.owner}</td
                                                                >
                                                                <td>{new_tag_audit.status}</td>
                                                                {/each} -->
                                                                
                                                               
                                                                <td
                                                                    >{new_tag_audit.parenttype}</td
                                                                >
                                                                <td
                                                                    >{new_tag_audit.creation}</td
                                                                >
                                                                <td
                                                                    >{new_tag_audit.owner}</td
                                                                >
                                                                <td>{new_tag_audit.status}</td>
                                                               
                                    
                                                               
                                                                <!-- <td>demo</td> -->
                                                            </tr>
                                                            {/each}
                                                            <!-- <tr
                                                                class="border-b"
                                                            >
                                                                <td
                                                                    >Addhoc
                                                                    Facility</td
                                                                >
                                                                <td
                                                                    >10-09-2020</td
                                                                >
                                                                <td
                                                                    >User name</td
                                                                >
                                                                <td>Active</td>
                                                            </tr> -->
                                                            
                                                        </tbody>
                                                        
                                                    </table>
                                                    <div
                                                        class="associateCard  border p-p7px rounded-md hidden xs:block sm:block"
                                                    >
                                                        <div
                                                            class="flex px-4 py-1 items-center"
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                Tag
                                                            </div>
                                                            <div
                                                                class="dataValue"
                                                            >
                                                                Addhoc Facility
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex px-4 py-1 items-center"
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                Date
                                                            </div>
                                                            <div
                                                                class="dataValue"
                                                            >
                                                                10-09-2020
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex px-4 py-1 items-center"
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                Given by
                                                            </div>
                                                            <div
                                                                class="dataValue"
                                                            >
                                                                User name
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex px-4 py-1 items-center"
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                Status
                                                            </div>
                                                            <div
                                                                class="dataValue"
                                                            >
                                                                Active
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="associateCard  border p-p7px  rounded-md hidden xs:block sm:block"
                                                    >
                                                        <div
                                                            class="flex px-4 py-1 items-center"
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                Tag
                                                            </div>
                                                            <div
                                                                class="dataValue"
                                                            >
                                                                Addhoc Facility
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex px-4 py-1 items-center"
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                Date
                                                            </div>
                                                            <div
                                                                class="dataValue"
                                                            >
                                                                10-09-2020
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex px-4 py-1 items-center"
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                Given by
                                                            </div>
                                                            <div
                                                                class="dataValue"
                                                            >
                                                                User name
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex px-4 py-1 items-center"
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                Status
                                                            </div>
                                                            <div
                                                                class="dataValue"
                                                            >
                                                                Active
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- </div> -->

                        <p class="flex items-center smButtonText pr-3">
                            <a href="" class="smButton" on:click={workContract}>
                                Work Contract
                            </a>
                        </p>
                        <a href="" class="smButton">
                            <img src="../src/img/edit.png" alt="" />
                        </a>
                    </div>
                </div>
                <div class="detailsrow ">
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3">
                            <div class="flex items-start">
                                <img
                                    src="../src/img/Subtract.png"
                                    alt=""
                                    class="w-5 h-auto"
                                />
                                <div class="pl-4">
                                    <p class="detailLbale">Associate Type</p>
                                    <p class="detailData">{$facility_data_store.facility_type}</p>
                                </div>
                            </div>
                            <div class="userStatus ">
                                <p
                                    class="flex items-center smButtonText"
                                    on:click={myBtn}
                                >
                                    <a href="" class="smButton"> Change </a>
                                </p>

                                <div class="hidden" id="associateModal">
                                    <div class="ChangeAssociateTypeWrapper">
                                        <div class="changeAssoMain ">
                                            <div
                                                class=" w-full bg-white rounded shadow-2xl"
                                            >
                                                <div
                                                    class="relative  rounded-t "
                                                >
                                                    <svg
                                                        class="absolute top-36 transform rotate-90 -right-6 -mt-5 block md:hidden xs:hidden"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="26"
                                                        height="23"
                                                        viewBox="0 0 26 23"
                                                        fill="none"
                                                    >
                                                        <path
                                                            id="Polygon 2"
                                                            d="M13 0L25.9904 22.5H0.00961876L13 0Z"
                                                            fill="#ffffff"
                                                            stroke="#E7E7E7"
                                                        />
                                                    </svg>
                                                </div>
                                                <div
                                                    class="w-full h-full  pb-5 "
                                                >
                                                    <div
                                                        class="bg-black px-4 flex py-4 justify-between rounded-t-md rounded-tr-md"
                                                    >
                                                        <div
                                                            class="leftHeadingpopover text-white"
                                                        >
                                                            <p>
                                                                Change Associate
                                                                Type
                                                            </p>
                                                        </div>
                                                        <div
                                                            class="rightcloseIconBlack"
                                                            on:click={close}
                                                        >
                                                            <img
                                                                src="../src/img/closewhite.svg"
                                                                class="cursor-pointer"
                                                                id="closeAssociate"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="tabwrapper flex justify-between text-center"
                                                    >
                                                        <div
                                                            class="changetype py-4 w-2/4"
                                                            on:click={() => {
                                                                temp1 =
                                                                    "change";
                                                            }}
                                                        >
                                                            <p>Change Type</p>
                                                        </div>
                                                        <div
                                                            class="Historytab py-4 w-2/4	 bg-bglightgreye"
                                                            on:click={() => {
                                                                temp1 =
                                                                    "history";
                                                            }}
                                                        >
                                                            <p>History</p>
                                                        </div>
                                                    </div>

                                                    {#if temp1 == "change"}
                                                        <div
                                                            class="changetypeSection "
                                                        >
                                                            <div
                                                                class="flex px-4 pt-4 items-center gap-10 xs:gap-4 xs:flex-wrap"
                                                            >
                                                                <div
                                                                    class="flex items-center"
                                                                >
                                                                    <div
                                                                        class="light14greylable"
                                                                    >
                                                                        Current
                                                                        Type
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                    {$facility_data_store.facility_type}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="flex items-center"
                                                                >
                                                                    <div
                                                                        class="light14greylable"
                                                                    >
                                                                        Pravesh
                                                                        ID
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                        EFVS00072
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div
                                                                class="flex px-4 py-3 items-center xs:flex-wrap"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    New Type
                                                                </div>
                                                                <div
                                                                    class="formInnerGroup "
                                                                >
                                                                    <select
                                                                        class="inputboxpopover"
                                                                    >
                                                                        <option
                                                                            class="pt-6"
                                                                            >Select</option
                                                                        >
                                                                        <option
                                                                            >ICICI</option
                                                                        >
                                                                        <option
                                                                            >Axis</option
                                                                        >
                                                                        <option
                                                                            >SIB</option
                                                                        >
                                                                    </select>
                                                                    <div
                                                                        class="formSelectArrow "
                                                                    >
                                                                        <img
                                                                            src="../src/img/selectarrow.png"
                                                                            class="w-5 h-auto"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-0 items-center xs:flex-wrap"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    Type of
                                                                    Attendance
                                                                </div>
                                                                <div
                                                                    class="formInnerGroup"
                                                                >
                                                                    <select
                                                                        class="inputboxpopover"
                                                                    >
                                                                        <option
                                                                            class="pt-6"
                                                                            >Select</option
                                                                        >
                                                                        <option
                                                                            >ICICI</option
                                                                        >
                                                                        <option
                                                                            >Axis</option
                                                                        >
                                                                        <option
                                                                            >SIB</option
                                                                        >
                                                                    </select>
                                                                    <div
                                                                        class="formSelectArrow "
                                                                    >
                                                                        <img
                                                                            src="../src/img/selectarrow.png"
                                                                            class="w-5 h-auto"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-3 items-center xs:flex-wrap"
                                                            >
                                                                <div
                                                                    class="light14grey"
                                                                >
                                                                    From Date
                                                                </div>
                                                                <div
                                                                    class="formInnerGroup "
                                                                >
                                                                    <input
                                                                        type="date"
                                                                        class="inputboxpopoverdate"
                                                                        placeholder=" "
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-0 items-center xs:flex-wrap"
                                                            >
                                                                <div
                                                                    class="light14grey w-36"
                                                                >
                                                                    To Date
                                                                </div>
                                                                <div
                                                                    class="formInnerGroup"
                                                                >
                                                                    <input
                                                                        type="date"
                                                                        class="inputboxpopoverdate"
                                                                    />
                                                                    <p
                                                                        class="light14grey whitespace-nowrap text-xs px-1"
                                                                    >
                                                                        Leave
                                                                        empty if
                                                                        no end
                                                                        date
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-4 py-3 items-center xs:flex-wrap"
                                                            >
                                                                <div
                                                                    class="light14grey w-36"
                                                                >
                                                                    Remarks
                                                                </div>
                                                                <div
                                                                    class="formInnerGroup"
                                                                >
                                                                    <input
                                                                        class="inputboxpopover"
                                                                        type="text"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flex px-9 justify-between"
                                                            >
                                                                <div
                                                                    class="light14grey w-36"
                                                                />
                                                                <button
                                                                    class="saveandproceed"
                                                                    >Submit</button
                                                                >
                                                            </div>
                                                        </div>
                                                    {/if}

                                                    {#if temp1 == "history"}
                                                        <div
                                                            class="changeAssociateSection"
                                                        >
                                                            <table
                                                                class="table mx-3 mt-2 xs:hidden sm:hidden"
                                                            >
                                                                <thead
                                                                    class="theadpopover"
                                                                >
                                                                    <tr>
                                                                        <th
                                                                            >Associate
                                                                            Type</th
                                                                        >
                                                                        <th
                                                                            >Type
                                                                            of
                                                                            Attendance</th
                                                                        >
                                                                        <th
                                                                            >Effective
                                                                            From</th
                                                                        >
                                                                        <th
                                                                            >Effective
                                                                            Till</th
                                                                        >
                                                                        <th
                                                                            >Requested
                                                                            On</th
                                                                        >
                                                                        <th
                                                                            >Requested
                                                                            By</th
                                                                        >
                                                                        <th
                                                                            >Remarks</th
                                                                        >
                                                                    </tr>
                                                                </thead>
                                                                <tbody
                                                                    class="tbodypopover"
                                                                >
                                                                    <tr
                                                                        class="border-b"
                                                                    >
                                                                        <td
                                                                            >NDA</td
                                                                        >
                                                                        <td
                                                                            >HDA</td
                                                                        >
                                                                        <td
                                                                            >11-06-2020</td
                                                                        >
                                                                        <td
                                                                            >10-09-2020</td
                                                                        >
                                                                        <td
                                                                            >10-06-2020</td
                                                                        >
                                                                        <td
                                                                            >suraj.takale@el...</td
                                                                        >
                                                                        <td
                                                                            >OK</td
                                                                        >
                                                                    </tr>
                                                                    <tr
                                                                        class="border-b"
                                                                    >
                                                                        <td
                                                                            >NDA</td
                                                                        >
                                                                        <td
                                                                            >HDA</td
                                                                        >
                                                                        <td
                                                                            >11-06-2020</td
                                                                        >
                                                                        <td
                                                                            >10-09-2020</td
                                                                        >
                                                                        <td
                                                                            >10-06-2020</td
                                                                        >
                                                                        <td
                                                                            >suraj.takale@el...</td
                                                                        >
                                                                        <td
                                                                            >OK</td
                                                                        >
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            ​
                                                            <div
                                                                class="associateCard  border p-p7px m-2.5 rounded-md hidden xs:block sm:block"
                                                            >
                                                                <div
                                                                    class="flex px-4 py-1 items-center"
                                                                >
                                                                    <div
                                                                        class="light14grey"
                                                                    >
                                                                        Associate
                                                                        Type
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                    {$facility_data_store.facility_type}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="flex px-4 py-1 items-center"
                                                                >
                                                                    <div
                                                                        class="light14grey"
                                                                    >
                                                                        Type for
                                                                        Attendance
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                    {$facility_data_store.facility_type}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="flex px-4 py-1 items-center"
                                                                >
                                                                    <div
                                                                        class="light14grey"
                                                                    >
                                                                        Efffective
                                                                        From
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                        11-Jun-2020
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="flex px-4 py-1 items-center"
                                                                >
                                                                    <div
                                                                        class="light14grey"
                                                                    >
                                                                        Effective
                                                                        Till
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                        13-Apr-2021
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="flex px-4 py-1 items-center"
                                                                >
                                                                    <div
                                                                        class="light14grey"
                                                                    >
                                                                        Requested
                                                                        on
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                        14-Apr-2021
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="flex px-4 py-1 items-center"
                                                                >
                                                                    <div
                                                                        class="light14grey"
                                                                    >
                                                                        Requested
                                                                        by
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                        suraj.takale@elasti...
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="flex px-4 py-1 items-center"
                                                                >
                                                                    <div
                                                                        class="light14grey"
                                                                    >
                                                                        Remarks
                                                                    </div>
                                                                    <div
                                                                        class="dataValue"
                                                                    >
                                                                        Ok
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img
                                    src="../src/img/pan.png"
                                    alt=""
                                    class="w-5 h-5"
                                />
                                <div class="pl-4">
                                    <p class="detailLbale">Associate ID</p>
                                    <p class="detailData">{$facility_data_store.name}</p>
                                </div>
                            </div>
                        </div>
                        <div class="userInfoSec3">
                            <div class="flex items-start">
                                <img
                                    src="../src/img/organization.png"
                                    alt=""
                                    class="w-5 h-5"
                                />
                                <div class="pl-4">
                                    <p class="detailLbale">Organization</p>
                                    <p class="detailData">
                                        {$facility_data_store.org_id}
                                    </p>
                                </div>
                            </div>
                            <div class="userStatus ">
                                <p
                                    class="flex items-center smButtonText"
                                    on:click={workorganization}
                                >
                                    <a href="" class="smButton"> Add/Edit </a>
                                </p>
                            </div>
                        </div>
                        <div class="userInfoSecPadding">
                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img
                                        src="../src/img/offerlatter.png"
                                        alt=""
                                        class="w-5 h-5"
                                    />
                                    <div class="pl-4">
                                        <p class="detailLbale">Offer Letter</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <img
                                            src="../src/img/timer.png"
                                            alt=""
                                            class="pr-1"
                                        />
                                        Verification Pending
                                    </p>
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                {#if offer_name == "Not Submitted"}
                                <p>
                                    {offer_name}
                                </p>
                                {:else}
                                <div class="flex items-start">
                                   <img
                                        src="../src/img/addressproof.png"
                                        class="invisible"
                                        alt=""
                                    />
                                    <div class="pl-4 flex items-center">
                                        <img
                                            src="../src/img/jpeg.png"
                                            class=""
                                            alt=""
                                        />

                                        <p class="detailLbale">
                                            {offer_name}
                                        </p>
                                    </div>
                                    
                                </div>
                                <!-- {#if offer_name == "Not Submitted"} -->
                               
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img
                                                src="../src/img/view.png"
                                                alt=""
                                            />
                                        </a>
                                    </p>
                                </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img
                                    src="../src/img/location.png"
                                    class="w-6 h-6"
                                    alt=""
                                />
                                <div class="pl-4">
                                    <p class="detailLbale">City</p>
                                    <p class="detailData">{city}</p>
                                </div>
                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img
                                    src="../src/img/warehouse.png"
                                    class="w-5 h-5"
                                    alt=""
                                />
                                <div class="pl-4">
                                    <p class="detailLbale">Station</p>
                                    <p class="detailData">{$facility_data_store.station_code}</p>
                                </div>
                            </div>
                        </div>

                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img
                                    src="../src/img/managerVendor.png"
                                    class="w-5 h-5"
                                    alt=""
                                />
                                <div class="pl-4">
                                    <p class="detailLbale">Vendor</p>
                                    <p class="detailData">
                                        {$facility_data_store.vendor_name} - {$facility_data_store.vendor_code}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="WorkDetailSection bg-white rounded-br5 mb-5">
                <div class="detailsHeader xsl:flex-wrap">
                    <div class="left">
                        <p class="detailsTitle">Identity Proof</p>
                        <p class="detailsUpdate">
                            <span
                                ><span class="font-medium">Last updated -</span
                                >>{bank_new_date}
                                <span class="font-medium"> By-</span>
                                {$facility_data_store.details_updated_by}</span
                            >
                        </p>
                    </div>
                    <div class="right flex">
                        
                        {#if $facility_data_store.is_id_prof_rejected == "1"}
                        <p class="rejectText pr-3">
                            <img
                                src="../src/img/reject.png"
                                alt=""
                                class="pr-2"
                            /> Reject
                        </p>
                        {:else if $facility_data_store.is_id_prof_verified == "1"}
                        
                            <p class="verifiedTextGreen pr-3">
                                <img
                                    src="../src/img/checked.png"
                                    alt=""
                                    class="pr-1"
                                />
                                Verified
                            </p>
                       
                        {:else if $facility_data_store.is_id_prof_verified == "0" && $facility_data_store.is_id_prof_rejected == "0"}
                            <p class="verifyText pr-3">
                                <img
                                    src="../src/img/timer.png"
                                    alt=""
                                    class="pr-2"
                                />
                                Verification Pending
                            </p>
                       {/if}
                        <a href="" class="smButton">
                            <img src="../src/img/edit.png" alt="" />
                        </a>
                    </div>
                </div>
                <div class="userInfoSecPadding ">
                    <div class="innercardSection">
                        <div class="remark">
                            <p
                                class="text-base text-greycolor font-medium mb-2"
                            >
                                Remarks
                            </p>
                            <ul class="text-sm text-greycolor list-disc	ml-m15">
                                {#if !$facility_data_store.remarks}
                                    <p>-</p>
                                {:else}
                                    {#each new_fac_remarks as remark}
                                    <li>{remark}</li>
                                    {/each}
                                    
                                    <!-- <li>{new_fac_remarks}</li> -->
                                    
                                {/if}
                                <!-- <li>Voter ID not clear</li> -->
                            </ul>
                        </div>
                        <div class="requiredaction">
                            <p
                                class="text-base text-redRequired font-medium mb-2"
                            >
                                Required Action
                            </p>
                            <ul class="text-sm text-greycolor list-disc ml-m15	">
                                <li>{$facility_data_store.action}</li>
                                
                            </ul>
                        </div>
                        <div class="updateAction xs:w-full">
                            <button class="ErBlueButton">Update</button>
                        </div>
                    </div>
                </div>
                <div class="detailsrow">
                    <!-- {#each facility_document_data as doc_data} -->
                    <div class="workDetailSection w-full">
                        <div class="userInfoSecPadding">
                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" alt="" />
                                    <div class="pl-4">
                                        <p class="detailLbale">PAN Number</p>
                                        <p class="detailData">{pan_num}</p>
                                        <p class="detailData" />
                                    </div>
                                </div>
                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img
                                        src="../src/img/pan.png"
                                        class="invisible"
                                        alt=""
                                    />
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">
                                            PAN Card Attachment
                                        </p>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                {#if pan_name == "Not Submitted"}
                                <p>{pan_name}</p>
                                {:else}
                                <div class="flex items-start">
                                    <img
                                        src="../src/img/pan.png"
                                        class="invisible"
                                        alt=""
                                    />
                                    <div class="pl-4 flex items-center">
                                        <img
                                            src="../src/img/jpeg.png"
                                            class=""
                                            alt=""
                                        />

                                        <p class="detailLbale">
                                            {pan_name}
                                        </p>
                                        
                                    </div>
                                </div>
                                
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img
                                                src="../src/img/view.png"
                                                alt=""
                                            />
                                        </a>
                                    </p>
                                </div>
                                {/if}
                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/pan.png" alt="" />
                                <div class="pl-4">
                                    <p class="detailLbale">Driving License</p>
                                    <p class="detailData">{dl_lic_name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSecPadding">
                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" alt="" />
                                    <div class="pl-4">
                                        <p class="detailLbale">Aadhar Number</p>
                                        <p class="detailData">{aadhar_num}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img
                                        src="../src/img/pan.png"
                                        class="invisible"
                                        alt=""
                                    />
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">
                                            Aadhar Card Attachment
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                {#if aadhar_name == "Not Submitted"}
                                <!-- <div class="flex items-start">
                                <div class="pl-4 flex items-center"> -->
                                    <p>
                                        {aadhar_name}
                                    </p>
                                <!-- </div>
                                </div> -->
                               
                                {:else}
                                <div class="flex items-start">
                                    <img
                                        src="../src/img/addressproof.png"
                                        class="invisible"
                                        alt=""
                                    />
                                    <div class="pl-4 flex items-center">
                                        <img
                                            src="../src/img/jpeg.png"
                                            class=""
                                            alt=""
                                        />

                                        <p class="detailLbale">
                                            {aadhar_name}
                                        </p>
                                    </div>
                                </div>
                                
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img
                                                src="../src/img/view.png"
                                                alt=""
                                            />
                                        </a>
                                    </p>
                                </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <!-- {/each} -->
                </div>
            </div>

            {#if !bank_details_res}
            <p></p>
            {:else}

            <div class="WorkDetailSection bg-white rounded-lg">
                <div class="detailsHeader  xsl:flex-wrap">
                    <div class="left">
                        <p class="detailsTitle">Bank Details</p>
                        <p class="detailsUpdate">
                            <span
                                ><span class="font-medium text-greycolor"
                                    >Last updated -</span
                                >> {bank_new_date}
                                <span class="font-medium text-greycolor">
                                    By-</span
                                >{bank_values_from_store.modified_by}</span
                            >
                        </p>
                    </div>
                    <div class="right flex">
                        <!-- <p class="verifyText pr-3">
                            <img
                                src="../src/img/timer.png"
                                alt=""
                                class="pr-1"
                            />
                            Verification Pending
                        </p> -->
                        {#if bank_values_from_store.approved == "1"}
                                <p
                                    class="statusContentTag text-green font-normal xs:w-5/12 pr-3"
                                >
                                    <img
                                        src="../src/img/checked.png"
                                        class="pr-2"
                                        alt=""
                                    />Bank Details Approved
                                </p>
                                {:else if bank_values_from_store.rejected == "1"}
                                <p
                                    class="statusContentTag text-rejectcolor font-normal xs:w-5/12 pr-3"
                                >
                                    <img
                                        src="../src/img/reject.png"
                                        class="pr-2"
                                        alt=""
                                    />Bank Details Rejected
                                </p>
                                {:else }
                                <p class="statusContent font-normal xs:w-5/12 pr-3">
                                    <img
                                        src="../src/img/timer.png"
                                        class="pr-2"
                                        alt=""
                                    />Bank Verification Pending
                                </p>
                                {/if}
                        <a href="" class="smButton">
                            <img src="../src/img/edit.png" alt="" />
                        </a>
                    </div>
                </div>

                <div class="userInfoSecPadding ">
                    <div class="innercardSection">
                        <div class="remark">
                            <p
                                class="text-base text-greycolor font-medium mb-2"
                            >
                                Remarks
                            </p>
                            <ul class="text-sm text-greycolor list-disc	ml-m15">
                                {#if !bank_values_from_store.remarks}
                                    <p>-</p>
                                {:else}
                                    <li>{bank_values_from_store.remarks}</li>
                                {/if}
                            </ul>
                        </div>
                        <!-- <div class="requiredaction">
                                    <p class="text-base text-redRequired font-medium mb-2">Required Action</p>
                                    <ul class="text-sm text-greycolor list-disc ml-m15	">
                                        <li>Resubmit bank documents
                                        </li>
                                    </ul>
                                </div> -->
                        <div class="updateAction xs:w-full">
                            <button class="ErBlueButton">Update</button>
                        </div>
                    </div>
                </div>

                <div class="detailsrow">
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/bank.png" alt="" />
                                <div class="pl-4">
                                    <p class="detailLbale">Bank Name</p>
                                    <p class="detailData">
                                        {bank_values_from_store.bank_name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/account.png" alt="" />
                                <div class="pl-4">
                                    <p class="detailLbale">Account Number</p>
                                    <p class="detailData">
                                        {bank_values_from_store.account_number}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/account.png" alt="" />
                                <div class="pl-4">
                                    <p class="detailLbale">IFSC Code</p>
                                    <p class="detailData">
                                        {bank_values_from_store.ifsc_code}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/pincode.png" alt="" />
                                <div class="pl-4">
                                    <p class="detailLbale">Branch</p>
                                    <p class="detailData">
                                        {bank_values_from_store.branch_name},{bank_values_from_store.branch_pin_code}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="userInfoSecPadding">
                            <div class="wrapperInfoFirst">
                                <div class="flex items-start justify-between">
                                    <div class="flex">
                                        <img
                                            src="../src/img/bankdoc.png"
                                            alt=""
                                        />
                                        <!-- <div class="pl-4">
                                            <p class="detailLbale">
                                                Aadhar Number
                                            </p>
                                            
                                        </div> -->
                                    </div>
                                    <div class="pl-4">
                                        <p
                                            class="flex items-center smButtonText"
                                            on:click={chequeDetails}
                                        >
                                            <a href="" class="smButton">
                                                Cheque Details
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img
                                        src="../src/img/addressproof.png"
                                        class="invisible"
                                        alt=""
                                    />
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">
                                            Cancel Cheque Attachment
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                {#if can_check_name == "Not Submitted"}
                                <p>{can_check_name}</p>
                                {:else}
                                <div class="flex items-start">
                                    <img
                                        src="../src/img/addressproof.png"
                                        class="invisible"
                                        alt=""
                                    />
                                    <div class="pl-4 flex items-center">
                                        <img
                                            src="../src/img/jpeg.png"
                                            class=""
                                            alt=""
                                        />

                                        <p class="detailLbale">
                                            {can_check_name}
                                        </p>
                                    </div>
                                </div>
                               
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img
                                                src="../src/img/view.png"
                                                alt=""
                                            />
                                        </a>
                                    </p>
                                </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
        </div>
        
    </div>
</div>

<div class="supplierInfoModalSection " id="supplierInfoModal">
    <div class="mainSupInfo">
        <div class="p-4">
            <div class="supInfoWrapper ">
                <div class="infoUserdetailsSection ">
                    <div class="detailsInfoSection">
                        <div class="tdfirstDetailsformodal">
                            <div class="itemList ">
                                <div class="smallText w-w115px">
                                    Vendor Name
                                </div>
                                <div class="smLable">Nandkishore Services</div>
                            </div>
                            <div class="itemList ">
                                <div class="smallText w-w115px">
                                    Vendor Type
                                </div>
                                <div class="smLable">Man Power Contractor</div>
                            </div>
                            <div class="itemList ">
                                <div class="smallText w-w115px">Vendor ID</div>
                                <div class="smLable">SUPP-35479</div>
                            </div>
                            <div class="itemList">
                                <div class="smallText w-w115px">Location</div>
                                <div class="smLable">{city}</div>
                            </div>
                            <div class="itemList">
                                <div class="smallText w-w115px">Status</div>
                                <div class="statusinformation">
                                    <div class="statusWrapper  ">
                                        <div class="statusredcircle" />
                                        Documents Rejected
                                    </div>
                                    <p class="text-xs text-grey ml-4">
                                        (ID Proof)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="updatebutton ">
                        <button class="ErBlueupdated">Update</button>
                    </div>
                    <div
                        class="closebuttonsection"
                        on:click={closeAuditTrailModal}
                    >
                        <img
                            src="../src/img/close.png"
                            id="closeAuditTrailModal"
                            class="closesup"
                            alt=""
                        />
                    </div>
                </div>
                <div class="commentBox">
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
                </div>

                <div class="timelinescroll ">
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="../src/img/chat2.svg"
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
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="../src/img/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <!-- <div class="timelineContent ">
                                    <h3 class="timeCommenterName "> Selvaraj Jayaraman
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Pancard number mismatch
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Akshay Saini
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPurple">
                                        <p class="timeCircle"></p> Vendor details verified
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName "> Selvaraj Jayaraman
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPurple">
                                        <p class="timeCircle"></p> Vendor Details
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightGreen">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- All Documents modal -->
<div class="hidden" id="modalid">
    <div class=" viewDocmodal  ">
        <div class="bglightcolormodal" />
        <div class="allDocmodalsuccessbody rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> All Documents</span>
                            </p>
                            <p class="text-sm ">
                                <span class="font-medium text-lg">
                                    Dhiraj Shah</span
                                >
                                <span class="userDesignation">
                                    - Associate- {$facility_data_store.facility_type}, MHPD - Mulsi
                                    SP</span
                                >
                            </p>
                        </div>
                        <div class="rightmodalclose" on:click={closeDoc}>
                            <img src="../src/img/blackclose.svg" alt="" />
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div class="scrollbar ">
                            <div class="mainContainerWrapper ">
                                <div class="DocCardlist ">
                                    <div class="cardDocWrapper ">
                                        <div class="infoDivCard ">
                                            <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img
                                                            src="../src/img/pancard.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Document Type
                                                        </p>
                                                        <p class="detailData">
                                                            PAN Card
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded By
                                                        </p>
                                                        <p class="detailData">
                                                            Admin
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded On
                                                        </p>
                                                        <p class="detailData">
                                                            27-Apr-2021 23:29 pm
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="secSecond xs:mt-3">
                                                    <div class="pl-4">
                                                        <p class="verifyText">
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statusSecForDoc">
                                            <p class="userStatusTick ">
                                                <img
                                                    src="../src/img/checked.png"
                                                    alt=""
                                                    class="pr-1"
                                                /> Verify
                                            </p>
                                        </div>
                                    </div>
                                    <div class="cardDocWrapper ">
                                        <div class="infoDivCard ">
                                            <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img
                                                            src="../src/img/pancard.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Document Type
                                                        </p>
                                                        <p class="detailData">
                                                            PAN Card
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded By
                                                        </p>
                                                        <p class="detailData">
                                                            Admin
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded On
                                                        </p>
                                                        <p class="detailData">
                                                            27-Apr-2021 23:29 pm
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="secSecond xs:mt-3">
                                                    <div class="pl-4">
                                                        <p class="verifyText">
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statusSecForDoc">
                                            <p class="userStatusTick ">
                                                <img
                                                    src="../src/img/checked.png"
                                                    alt=""
                                                    class="pr-1"
                                                /> Verify
                                            </p>
                                        </div>
                                    </div>
                                    <div class="cardDocWrapper ">
                                        <div class="infoDivCard ">
                                            <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img
                                                            src="../src/img/pancard.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Document Type
                                                        </p>
                                                        <p class="detailData">
                                                            PAN Card
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded By
                                                        </p>
                                                        <p class="detailData">
                                                            Admin
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded On
                                                        </p>
                                                        <p class="detailData">
                                                            27-Apr-2021 23:29 pm
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="secSecond xs:mt-3">
                                                    <div class="pl-4">
                                                        <p class="verifyText">
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statusSecForDoc">
                                            <p class="userStatusTick ">
                                                <img
                                                    src="../src/img/checked.png"
                                                    alt=""
                                                    class="pr-1"
                                                /> Verify
                                            </p>
                                        </div>
                                    </div>
                                    <div class="cardDocWrapper ">
                                        <div class="infoDivCard ">
                                            <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img
                                                            src="../src/img/pancard.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Document Type
                                                        </p>
                                                        <p class="detailData">
                                                            PAN Card
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded By
                                                        </p>
                                                        <p class="detailData">
                                                            Admin
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded On
                                                        </p>
                                                        <p class="detailData">
                                                            27-Apr-2021 23:29 pm
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="secSecond xs:mt-3">
                                                    <div class="pl-4">
                                                        <p class="verifyText">
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statusSecForDoc">
                                            <p class="userStatusTick ">
                                                <img
                                                    src="../src/img/checked.png"
                                                    alt=""
                                                    class="pr-1"
                                                /> Verify
                                            </p>
                                        </div>
                                    </div>
                                    <div class="cardDocWrapper ">
                                        <div class="infoDivCard ">
                                            <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img
                                                            src="../src/img/pancard.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Document Type
                                                        </p>
                                                        <p class="detailData">
                                                            PAN Card
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded By
                                                        </p>
                                                        <p class="detailData">
                                                            Admin
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">
                                                            Uploaded On
                                                        </p>
                                                        <p class="detailData">
                                                            27-Apr-2021 23:29 pm
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="secSecond xs:mt-3">
                                                    <div class="pl-4">
                                                        <p class="verifyText">
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statusSecForDoc">
                                            <p class="userStatusTick ">
                                                <img
                                                    src="../src/img/checked.png"
                                                    alt=""
                                                    class="pr-1"
                                                /> Verify
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="addDocumentSection ">
                                    <div class="addSecform ">
                                        <div
                                            class="addButtonSection my-3 py-16 text-center hidden"
                                        >
                                            <div class="updateAction">
                                                <button class="ErBlueButton"
                                                    >Add New Document</button
                                                >
                                            </div>
                                        </div>

                                        <div class="my-3 py-4 px-4 ">
                                            <p class="text-lg font-medium">
                                                Add New Document
                                            </p>

                                            <div
                                                class="flex  py-3 items-center flex-wrap"
                                            >
                                                <div class="light14grey mb-1">
                                                    Document Type
                                                </div>
                                                <div class="formInnerGroup ">
                                                    <select
                                                        class="inputboxpopover"
                                                    >
                                                        <option class="pt-6"
                                                            >Select</option
                                                        >
                                                        <option>ICICI</option>
                                                        <option>Axis</option>
                                                        <option>SIB</option>
                                                    </select>
                                                    <div
                                                        class="formSelectArrow "
                                                    >
                                                        <img
                                                            src="../src/img/selectarrow.png"
                                                            class="w-5 h-auto"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="flex  py-1 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    Document Detail
                                                </div>
                                                <div class="formInnerGroup">
                                                    <input
                                                        class="inputboxpopover"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                class="flex  py-3 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    Upload Document
                                                </div>
                                                <div class="formInnerGroup">
                                                    <label
                                                        class="cursor-pointer flex"
                                                    >
                                                        <div
                                                            class="ErBlueButton"
                                                        >
                                                            Select File
                                                        </div>
                                                        <input
                                                            type="file"
                                                            class="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div
                                                class="flex items-center justify-end mt-5"
                                            >
                                                <div
                                                    class="updateAction text-erBlue"
                                                >
                                                    Cancel
                                                </div>
                                                <div class="updateAction ml-5">
                                                    <button class="ErBlueButton"
                                                        >Upload</button
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
        </div>
    </div>
</div>

<!-- GST Details modal -->
<div class="hidden" id="modalidgst">
    <div class=" viewDocmodal  ">
        <div class="bglightcolormodal" />
        <div class="allDocmodalsuccessbody rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> GST Details</span>
                            </p>
                            <p class="text-sm ">
                                <span class="font-medium text-lg">
                                    Dhiraj Shah</span
                                >
                                <span class="userDesignation">
                                    - Associate- {$facility_data_store.facility_type}, MHPD - Mulsi
                                    SP</span
                                >
                            </p>
                        </div>
                        <div class="rightmodalclose" on:click={closeGST}>
                            <img src="../src/img/blackclose.svg" alt="" />
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div class="scrollbar ">
                            <div class="mainContainerWrapper ">
                                <div class="DocCardlist ">
                                    <div class="cardDocWrapper ">
                                        <div class="infoDivCard ">
                                            <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div
                                                        class="locationInformation"
                                                    >
                                                        <div class="flex">
                                                            <p
                                                                class="detailLbalesm pr-3"
                                                            >
                                                                Address
                                                            </p>
                                                            <p
                                                                class="detailDatasm"
                                                            >
                                                                B615, Marvad,
                                                                near aarvi
                                                                school
                                                            </p>
                                                        </div>
                                                        <div class="flex">
                                                            <p
                                                                class="detailLbalesm pr-3"
                                                            >
                                                                City
                                                            </p>
                                                            <p
                                                                class="detailDatasm"
                                                            >
                                                                Amravati
                                                            </p>
                                                        </div>
                                                        <div class="flex">
                                                            <p
                                                                class="detailLbalesm pr-3"
                                                            >
                                                                GST State
                                                            </p>
                                                            <p
                                                                class="detailDatasm"
                                                            >
                                                                Maharastra
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div class="pl-2">
                                                        <p
                                                            class="detailLbale whitespace-nowrap mb-2"
                                                        >
                                                            GST Number
                                                        </p>
                                                        <p class="detailData">
                                                            22 GHDGS0000A 1Z5
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p
                                                            class="detailLbale whitespace-nowrap mb-2"
                                                        >
                                                            GST Certificate
                                                        </p>
                                                        <p class="verifyText">
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p
                                                            class="detailLbale mb-2"
                                                        >
                                                            Edit
                                                        </p>
                                                        <p class="verifyText">
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statusSecForDoc">
                                            <p class="userStatusTick ">
                                                <img
                                                    src="../src/img/checked.png"
                                                    alt=""
                                                    class="pr-1"
                                                /> Verified
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="addDocumentSection ">
                                    <div class="addSecform hidden">
                                        <div
                                            class="addButtonSection my-3 py-16 text-center hidden"
                                        >
                                            <div class="updateAction">
                                                <button class="ErBlueButton"
                                                    >Add New GST Details</button
                                                >
                                            </div>
                                        </div>
                                        <div class="my-3 py-4 px-4 ">
                                            <p class="text-lg font-medium">
                                                Add new GST details
                                            </p>

                                            <div
                                                class="flex  py-1 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    Address
                                                </div>
                                                <div class="formInnerGroup">
                                                    <input
                                                        class="inputboxpopover"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                class="flex  py-3 items-center flex-wrap"
                                            >
                                                <div class="light14grey mb-1">
                                                    City
                                                </div>
                                                <div class="formInnerGroup ">
                                                    <select
                                                        class="inputboxpopover"
                                                    >
                                                        <option class="pt-6"
                                                            >Select</option
                                                        >
                                                        <option>ICICI</option>
                                                        <option>Axis</option>
                                                        <option>SIB</option>
                                                    </select>
                                                    <div
                                                        class="formSelectArrow "
                                                    >
                                                        <img
                                                            src="../src/img/selectarrow.png"
                                                            class="w-5 h-auto"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="flex  py-1 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    GST State
                                                </div>
                                                <div class="formInnerGroup">
                                                    <input
                                                        class="inputboxpopover"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                class="flex  py-3 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    Upload Document
                                                </div>
                                                <div class="formInnerGroup">
                                                    <label
                                                        class="cursor-pointer flex"
                                                    >
                                                        <div
                                                            class="ErBlueButton"
                                                        >
                                                            Select File
                                                        </div>
                                                        <input
                                                            type="file"
                                                            class="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div
                                                class="flex items-center justify-end mt-5"
                                            >
                                                <div
                                                    class="updateAction text-erBlue"
                                                >
                                                    Cancel
                                                </div>
                                                <div class="updateAction ml-5">
                                                    <button class="ErBlueButton"
                                                        >Upload</button
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class=" bg-lighterGrey rounded-lg h-full"
                                    >
                                        {#if temp2 == "gst1"}
                                            <div
                                                class="addButtonSection my-3 py-3  text-center "
                                            >
                                                <div class="updateAction mt-5">
                                                    <button
                                                        class="ErBlueButton"
                                                        on:click={() => {
                                                            temp2 = "gst2";
                                                        }}
                                                        >Add New GST Details</button
                                                    >
                                                </div>
                                            </div>
                                        {/if}

                                        {#if temp2 == "gst2"}
                                            <div class="my-0 py-4 px-4 ">
                                                <div
                                                    class="h-80 max-h-80 overflow-y-scroll pr-4 border-b-2"
                                                >
                                                    <p
                                                        class="text-lg font-medium"
                                                    >
                                                        Add new GST details
                                                    </p>

                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey  mb-1"
                                                        >
                                                            Address
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            City
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <select
                                                                class="inputboxpopover"
                                                            >
                                                                <option
                                                                    class="pt-6"
                                                                    >Select</option
                                                                >
                                                                <option
                                                                    >ICICI</option
                                                                >
                                                                <option
                                                                    >Axis</option
                                                                >
                                                                <option
                                                                    >SIB</option
                                                                >
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey  mb-1"
                                                        >
                                                            GST State
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey  mb-1"
                                                        >
                                                            GST Number
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Upload GST
                                                            Certificate
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <label
                                                                class="cursor-pointer flex"
                                                            >
                                                                <div
                                                                    class="ErBlueButton"
                                                                >
                                                                    Select File
                                                                </div>
                                                                <input
                                                                    type="file"
                                                                    class="hidden"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="flex items-center justify-end mt-5"
                                                >
                                                    <div
                                                        class="updateAction text-erBlue cursor-pointer "
                                                        on:click={() => {
                                                            temp2 = "gst1";
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                    <div
                                                        class="updateAction ml-5"
                                                    >
                                                        <button
                                                            class="ErBlueButton"
                                                            >Add</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
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

<!-- ERP Details modal -->
<div class="hidden" id="erpIdModel">
    <div class=" viewDocmodal  ">
        <div class="bglightcolormodal" />
        <div class="allDocmodalsuccessbodyErp rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> ERP Details</span>
                            </p>
                            <p class="detailsUpdate">
                                <span
                                    ><span class="font-medium"
                                        >Created On
                                    </span> - 27-Apr-2021 03:28 pm.</span
                                >
                            </p>
                        </div>
                        <div class="rightmodalclose" on:click={closeERP}>
                            <img src="../src/img/blackclose.svg" alt="" />
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div class="ERPDetails mt-4">
                            <div class="flex mb-3 xs:flex-col sm:flex-col">
                                <p class="detailLbalesm pr-3">ERP ID</p>
                                <p class="detailDatasm">SUPP-06943</p>
                            </div>
                            <div class="flex mb-3 xs:flex-col sm:flex-col">
                                <p class="detailLbalesm pr-3">ERP Name</p>
                                <p class="detailDatasm">SUPP-06943-MEX00094</p>
                            </div>
                            <div class="flex mb-3 xs:flex-col sm:flex-col">
                                <p class="detailLbalesm pr-3">Address ID</p>
                                <p class="detailDatasm">SUPP-06943-Delhi</p>
                            </div>
                            <div class="flex mb-3 xs:flex-col sm:flex-col">
                                <p class="detailLbalesm pr-3">Address Title</p>
                                <p class="detailDatasm">SUPP-06943-Delhi</p>
                            </div>
                            <div class="flex mb-3 xs:flex-col sm:flex-col">
                                <p class="detailLbalesm pr-3">Contact ID</p>
                                <p class="detailDatasm">SUPP-06943-Delhi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--  Work Contract Details modal -->
<div class="hidden" id="workContractModel">
    <div class="viewDocmodal ">
        <div class="absolute bg-black opacity-80 inset-0 z-0" />
        <div class="allDocmodalsuccessbody rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> Work Contract Details</span>
                            </p>
                            <p class="text-sm ">
                                <span class="font-medium text-lg">
                                    Dhiraj Shah</span
                                >
                                <span class="userDesignation">
                                    - Associate- {$facility_data_store.facility_type}, MHPD - Mulsi
                                    SP</span
                                >
                            </p>
                        </div>
                        <div
                            class="rightmodalclose"
                            on:click={closeWorkContract}
                        >
                            <img src="../src/img/blackclose.svg" alt="" />
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div
                            class="tabwrapper flex justify-between text-center py-2"
                        >
                            <div
                                class="changetype py-3 w-2/4	"
                                on:click={() => {
                                    temp3 = "e-contracts";
                                }}
                            >
                                <p>E-Contracts</p>
                            </div>
                            <div
                                class="Historytab py-3 w-2/4	 bg-bglightgreye"
                                on:click={() => {
                                    temp3 = "p-contracts";
                                }}
                            >
                                <p>Physical Contracts</p>
                            </div>
                        </div>

                        {#if temp3 == "e-contracts"}
                            <div class="scrollbar ">
                                <div
                                    class="OtherAppliedTagsTable px-3 overflow-y-scroll"
                                >
                                    <table
                                        class="table  w-full text-center mt-2 "
                                    >
                                        <thead class="theadpopover h-10">
                                            <tr>
                                                <th>Contract Name</th>
                                                <th>Contract Type</th>
                                                <th>
                                                    <div class="flex">
                                                        Accepted ? <img
                                                            src="../src/img/arrowupdown.svg"
                                                            class="ml-2"
                                                            alt=""
                                                        />
                                                    </div></th
                                                >
                                                <th>Accepted On</th>
                                                <th>Is Mandatory ?</th>
                                                <th>View</th>
                                                <th>Print/Save</th>
                                            </tr>
                                        </thead>
                                        <tbody class="tbodypopover">
                                            <tr class="border-b">
                                                <td
                                                    >Background Verification
                                                    Concent</td
                                                >
                                                <td>Concent</td>
                                                <td
                                                    ><span class="text-green"
                                                        >Yes</span
                                                    >
                                                </td>
                                                <td>10-06-2020</td>
                                                <td>Yes</td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/printer.svg"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    >Background Verification
                                                    Concent</td
                                                >
                                                <td>Concent</td>
                                                <td
                                                    ><span class="text-red-700"
                                                        >No</span
                                                    >
                                                </td>
                                                <td>10-06-2020</td>
                                                <td>Yes</td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/printer.svg"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    >Background Verification
                                                    Concent</td
                                                >
                                                <td>Concent</td>
                                                <td
                                                    ><span class="text-green"
                                                        >Yes</span
                                                    >
                                                </td>
                                                <td>10-06-2020</td>
                                                <td>Yes</td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/printer.svg"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    >Background Verification
                                                    Concent</td
                                                >
                                                <td>Concent</td>
                                                <td
                                                    ><span class="text-green"
                                                        >Yes</span
                                                    >
                                                </td>
                                                <td>10-06-2020</td>
                                                <td>Yes</td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/printer.svg"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    >Background Verification
                                                    Concent</td
                                                >
                                                <td>Concent</td>
                                                <td
                                                    ><span class="text-green"
                                                        >Yes</span
                                                    >
                                                </td>
                                                <td>10-06-2020</td>
                                                <td>Yes</td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/printer.svg"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    >Background Verification
                                                    Concent</td
                                                >
                                                <td>Concent</td>
                                                <td
                                                    ><span class="text-green"
                                                        >Yes</span
                                                    >
                                                </td>
                                                <td>10-06-2020</td>
                                                <td>Yes</td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="../src/img/printer.svg"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div
                                        class="associateCard  border p-p7px  rounded-md hidden xs:block sm:block"
                                    >
                                        <div
                                            class="flex px-4 py-1 items-center"
                                        >
                                            <div class="light14grey">Tag</div>
                                            <div class="dataValue">
                                                Addhoc Facility
                                            </div>
                                        </div>
                                        <div
                                            class="flex px-4 py-1 items-center"
                                        >
                                            <div class="light14grey">
                                                Remarks
                                            </div>
                                            <div class="dataValue">
                                                No Remarks
                                            </div>
                                        </div>
                                        <div
                                            class="flex px-4 py-1 items-center"
                                        >
                                            <div class="light14grey">
                                                Added by
                                            </div>
                                            <div class="dataValue">
                                                User name
                                            </div>
                                        </div>
                                        <div
                                            class="flex px-4 py-1 items-center"
                                        >
                                            <div class="light14grey">
                                                Added On
                                            </div>
                                            <div class="dataValue">
                                                13-Apr-2021
                                            </div>
                                        </div>
                                        <div
                                            class="flex px-4 py-1 items-center"
                                        >
                                            <div class="light14grey">
                                                Auto Removal On
                                            </div>
                                            <div class="dataValue">No date</div>
                                        </div>
                                        <div
                                            class="flex px-4 py-1 items-center"
                                        >
                                            <div class="light14grey">
                                                Remove
                                            </div>
                                            <div class="dataValue">
                                                <img
                                                    src="../src/img/reject.png"
                                                    alt=""
                                                    
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}

                        {#if temp3 == "p-contracts"}
                            <div class="scrollbar ">
                                <div class="mainContainerWrapper flex gap-6">
                                    <div
                                        class="DocCardlist w-7/12 pr-4 h-h442 overflow-y-scroll"
                                    >
                                        <table
                                            class="table  w-full text-center mt-2 "
                                        >
                                            <thead class="theadpopover h-10">
                                                <tr>
                                                    <th>Contract Type</th>
                                                    <th>Starts From</th>
                                                    <th> Ends On</th>
                                                    <th>Cost Center</th>
                                                    <th> View</th>
                                                </tr>
                                            </thead>
                                            <tbody class="tbodypopover">
                                                <tr class="border-b">
                                                    <td
                                                        >Procurement agreement</td
                                                    >
                                                    <td>16-01-2020</td>
                                                    <td>11-06-2020</td>
                                                    <td>Mulshi - MHPD - NTEX</td
                                                    >
                                                    <td>
                                                        <p
                                                            class="flex justify-center"
                                                        >
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr class="border-b">
                                                    <td
                                                        >Procurement agreement</td
                                                    >
                                                    <td>16-01-2020</td>
                                                    <td>11-06-2020</td>
                                                    <td>Mulshi - MHPD - NTEX</td
                                                    >
                                                    <td>
                                                        <p
                                                            class="flex justify-center"
                                                        >
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr class="border-b">
                                                    <td
                                                        >Procurement agreement</td
                                                    >
                                                    <td>16-01-2020</td>
                                                    <td>11-06-2020</td>
                                                    <td>Mulshi - MHPD - NTEX</td
                                                    >
                                                    <td>
                                                        <p
                                                            class="flex justify-center"
                                                        >
                                                            <a
                                                                href=""
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="../src/img/view.png"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        ​
                                    </div>
                                    <div class="addDocumentSection w-5/12  ">
                                        <div
                                            class=" bg-lighterGrey rounded-lg h-full"
                                        >
                                            {#if temp4 == "p-contracts-1"}
                                                <div
                                                    class="addButtonSection my-3 py-3 text-center "
                                                >
                                                    <p
                                                        class="text-lg font-medium text-blackshade mb-3"
                                                    >
                                                        Upload New Physical
                                                        contract here
                                                    </p>
                                                    <div class="updateAction">
                                                        <button
                                                            class="ErBlueButton"
                                                            on:click={() => {
                                                                temp4 =
                                                                    "p-contracts-2";
                                                            }}>Upload</button
                                                        >
                                                    </div>
                                                </div>
                                            {/if}
                                            {#if temp4 == "p-contracts-2"}
                                                <div
                                                    class="addButtonSection mt-3 pt-3 text-center "
                                                >
                                                    <p
                                                        class="text-lg font-medium text-blackshade"
                                                    >
                                                        Upload New Physical
                                                        Contract
                                                    </p>
                                                </div>
                                                <div class="my-0 py-4 px-4 ">
                                                    <div
                                                        class="h-80 max-h-80 overflow-y-scroll pr-4 border-b-2"
                                                    >
                                                        <div
                                                            class="flex  py-3 items-center flex-wrap"
                                                        >
                                                            <div
                                                                class="light14grey mb-1"
                                                            >
                                                                Select Contract
                                                                Type
                                                            </div>
                                                            <div
                                                                class="formInnerGroup "
                                                            >
                                                                <select
                                                                    class="inputboxpopover"
                                                                >
                                                                    <option
                                                                        class="pt-6"
                                                                        >Select</option
                                                                    >
                                                                    <option
                                                                        >ICICI</option
                                                                    >
                                                                    <option
                                                                        >Axis</option
                                                                    >
                                                                    <option
                                                                        >SIB</option
                                                                    >
                                                                </select>
                                                                <div
                                                                    class="formSelectArrow "
                                                                >
                                                                    <img
                                                                        src="../src/img/selectarrow.png"
                                                                        class="w-5 h-auto"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex  py-3 items-center flex-wrap"
                                                        >
                                                            <div
                                                                class="light14grey mb-1"
                                                            >
                                                                Select
                                                                Organization
                                                            </div>
                                                            <div
                                                                class="formInnerGroup "
                                                            >
                                                                <select
                                                                    class="inputboxpopover"
                                                                >
                                                                    <option
                                                                        class="pt-6"
                                                                        >Select</option
                                                                    >
                                                                    <option
                                                                        >ICICI</option
                                                                    >
                                                                    <option
                                                                        >Axis</option
                                                                    >
                                                                    <option
                                                                        >SIB</option
                                                                    >
                                                                </select>
                                                                <div
                                                                    class="formSelectArrow "
                                                                >
                                                                    <img
                                                                        src="../src/img/selectarrow.png"
                                                                        class="w-5 h-auto"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex  py-3 items-center flex-wrap"
                                                        >
                                                            <div
                                                                class="light14grey mb-1"
                                                            >
                                                                Select Station
                                                            </div>
                                                            <div
                                                                class="formInnerGroup "
                                                            >
                                                                <select
                                                                    class="inputboxpopover"
                                                                >
                                                                    <option
                                                                        class="pt-6"
                                                                        >Select</option
                                                                    >
                                                                    <option
                                                                        >ICICI</option
                                                                    >
                                                                    <option
                                                                        >Axis</option
                                                                    >
                                                                    <option
                                                                        >SIB</option
                                                                    >
                                                                </select>
                                                                <div
                                                                    class="formSelectArrow "
                                                                >
                                                                    <img
                                                                        src="../src/img/selectarrow.png"
                                                                        class="w-5 h-auto"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex py-3 items-center flex-wrap "
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                From Date
                                                            </div>
                                                            <div
                                                                class="formInnerGroup "
                                                            >
                                                                <input
                                                                    type="date"
                                                                    class="inputboxpopoverdate"
                                                                    placeholder=" "
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex py-3 items-center flex-wrap "
                                                        >
                                                            <div
                                                                class="light14grey"
                                                            >
                                                                End Date
                                                            </div>
                                                            <div
                                                                class="formInnerGroup "
                                                            >
                                                                <input
                                                                    type="date"
                                                                    class="inputboxpopoverdate"
                                                                    placeholder=" "
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex  py-3 items-center flex-wrap"
                                                        >
                                                            <div
                                                                class="light14grey  mb-1"
                                                            >
                                                                Upload Document
                                                            </div>
                                                            <div
                                                                class="formInnerGroup"
                                                            >
                                                                <label
                                                                    class="cursor-pointer flex"
                                                                >
                                                                    <div
                                                                        class="ErBlueButton"
                                                                    >
                                                                        Select
                                                                        File
                                                                    </div>
                                                                    <input
                                                                        type="file"
                                                                        class="hidden"
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="flex items-center justify-end mt-5"
                                                    >
                                                        <div
                                                            class="updateAction text-erBlue cursor-pointer"
                                                            on:click={() => {
                                                                temp4 =
                                                                    "p-contracts-1";
                                                            }}
                                                        >
                                                            Cancel
                                                        </div>
                                                        <div
                                                            class="updateAction ml-5"
                                                        >
                                                            <button
                                                                class="ErBlueButton"
                                                                >Upload</button
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--View/edit client name modal -->

<div class="hidden" id="workorganizationModel">
    <div class=" viewDocmodal  " id="modal-id">
        <div class="bglightcolormodal" />
        <div class="allDocmodalsuccessbody rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> View/Edit Client Name</span>
                            </p>
                            <p class="text-sm ">
                                <span class="font-medium text-lg">
                                    Dhiraj Shah</span
                                >
                                <span class="userDesignation">
                                    - Associate- {$facility_data_store.facility_type}, MHPD - Mulsi
                                    SP</span
                                >
                            </p>
                        </div>
                        <div
                            class="rightmodalclose"
                            on:click={closeWorkorganization}
                        >
                            <img src="../src/img/blackclose.svg" alt="" />
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div class="scrollbar ">
                            <div class="mainContainerWrapper ">
                                <div class="DocCardlist ">
                                    <div class="cardDocWrapper ">
                                        <div
                                            class="grid grid-cols-2 xs:grid-cols-1 gap-4"
                                        >
                                            <div>
                                                <div
                                                    class="grid grid-cols-2 gap-4 mb-1"
                                                >
                                                    <div class="detailLbale">
                                                        Organisation
                                                    </div>
                                                    <div class="detailData">
                                                        Amazon
                                                    </div>
                                                </div>
                                                <div
                                                    class="grid grid-cols-2 gap-4 mb-1"
                                                >
                                                    <div class="detailLbale">
                                                        Station Name & code
                                                    </div>
                                                    <div class="detailData">
                                                        Akola, SP
                                                    </div>
                                                </div>
                                                <div
                                                    class="grid grid-cols-2 gap-4 mb-1"
                                                >
                                                    <div class="detailLbale">
                                                        Org specified name
                                                    </div>
                                                    <div class="detailData">
                                                        Dhiraj Shah
                                                    </div>
                                                </div>
                                                <div
                                                    class="grid grid-cols-2 gap-4 mb-1"
                                                >
                                                    <div class="detailLbale">
                                                        Client Employee ID
                                                    </div>
                                                    <div class="detailData">
                                                        AMA00300
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="grid grid-cols-2 gap-4 mb-1"
                                                >
                                                    <div class="detailLbale">
                                                        Added On
                                                    </div>
                                                    <div class="detailData">
                                                        23-01-2021
                                                    </div>
                                                </div>
                                                <div
                                                    class="grid grid-cols-2 gap-4 mb-1"
                                                >
                                                    <div class="detailLbale">
                                                        Added by
                                                    </div>
                                                    <div class="detailData">
                                                        Admin
                                                    </div>
                                                </div>
                                                <div
                                                    class="grid grid-cols-2 gap-4 mb-1"
                                                >
                                                    <div class="detailLbale">
                                                        Client ID status/info
                                                    </div>
                                                    <div class="detailData">
                                                        ----
                                                    </div>
                                                </div>
                                                <div
                                                    class="grid grid-cols-2 gap-4 mb-1"
                                                >
                                                    <div class="detailLbale">
                                                        Status
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="userStatusTickVerified "
                                                        >
                                                            <img
                                                                src="../src/img/checked.png"
                                                                alt=""
                                                                class="pr-1"
                                                            /> Verified
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="addDocumentSection ">
                                    <div class="addSecform hidden">
                                        {#if temp5 == "newMap"}
                                            <div
                                                class="addButtonSection my-3 py-16 text-center"
                                            >
                                                <div class="updateAction">
                                                    <button
                                                        class="ErBlueButton"
                                                        on:click={() => {
                                                            temp5 = "newMap-2";
                                                        }}
                                                        >Add New Mapping</button
                                                    >
                                                </div>
                                            </div>
                                        {/if}
                                        {#if temp5 == "newMap-2"}
                                            <div class="my-3 py-4 px-4 ">
                                                <p class="text-lg font-medium">
                                                    Add new Mapping
                                                </p>

                                                <div
                                                    class="flex  py-1 items-center flex-wrap"
                                                >
                                                    <div
                                                        class="light14grey  mb-1"
                                                    >
                                                        Address
                                                    </div>
                                                    <div class="formInnerGroup">
                                                        <input
                                                            class="inputboxpopover"
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="flex  py-3 items-center flex-wrap"
                                                >
                                                    <div
                                                        class="light14grey mb-1"
                                                    >
                                                        City
                                                    </div>
                                                    <div
                                                        class="formInnerGroup "
                                                    >
                                                        <select
                                                            class="inputboxpopover"
                                                        >
                                                            <option class="pt-6"
                                                                >Select</option
                                                            >
                                                            <option
                                                                >ICICI</option
                                                            >
                                                            <option>Axis</option
                                                            >
                                                            <option>SIB</option>
                                                        </select>
                                                        <div
                                                            class="formSelectArrow "
                                                        >
                                                            <img
                                                                src="../src/img/selectarrow.png"
                                                                class="w-5 h-auto"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="flex  py-1 items-center flex-wrap"
                                                >
                                                    <div
                                                        class="light14grey  mb-1"
                                                    >
                                                        GST State
                                                    </div>
                                                    <div class="formInnerGroup">
                                                        <input
                                                            class="inputboxpopover"
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    class="flex  py-3 items-center flex-wrap"
                                                >
                                                    <div
                                                        class="light14grey  mb-1"
                                                    >
                                                        Upload Document
                                                    </div>
                                                    <div class="formInnerGroup">
                                                        <label
                                                            class="cursor-pointer flex"
                                                        >
                                                            <div
                                                                class="ErBlueButton"
                                                            >
                                                                Select File
                                                            </div>
                                                            <input
                                                                type="file"
                                                                class="hidden"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>

                                                <div
                                                    class="flex items-center justify-end mt-5"
                                                >
                                                    <div
                                                        class="updateAction text-erBlue"
                                                        on:click={() => {
                                                            temp3 = "newMap";
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                    <div
                                                        class="updateAction ml-5"
                                                    >
                                                        <button
                                                            class="ErBlueButton"
                                                            >Upload</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
                                    </div>

                                    <div
                                        class=" bg-lighterGrey rounded-lg h-full"
                                    >
                                        {#if temp5 == "newMap"}
                                            <div
                                                class="addButtonSection my-3 py-3  text-center "
                                            >
                                                <div class="updateAction mt-5">
                                                    <button
                                                        class="ErBlueButton"
                                                        on:click={() => {
                                                            temp5 = "newMap-2";
                                                        }}
                                                        >Add New Mapping</button
                                                    >
                                                </div>
                                            </div>
                                        {/if}
                                        {#if temp5 == "newMap-2"}
                                            <div class="my-0 py-4 px-4 ">
                                                <div
                                                    class="h-80 max-h-80 overflow-y-scroll pr-4 border-b-2"
                                                >
                                                    <p
                                                        class="text-lg font-medium"
                                                    >
                                                        Add New Mapping
                                                    </p>

                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Organization
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <select
                                                                class="inputboxpopover"
                                                            >
                                                                <option
                                                                    class="pt-6"
                                                                    >Select</option
                                                                >
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Station
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <select
                                                                class="inputboxpopover"
                                                            >
                                                                <option
                                                                    class="pt-6"
                                                                    >Select</option
                                                                >
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Name in COMP
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <select
                                                                class="inputboxpopover"
                                                            >
                                                                <option
                                                                    class="pt-6"
                                                                    >Select</option
                                                                >
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Client Empployee ID
                                                            ( If available)
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap mb-4"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Create new Rabbit
                                                            ID/Comp ID
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <div
                                                                class="text-center flex mb-2 ml-1"
                                                            >
                                                                <div
                                                                    class="flex items-center mr-4"
                                                                >
                                                                    <input
                                                                        id="radio1"
                                                                        type="radio"
                                                                        name="radio"
                                                                        class="hidden"
                                                                        checked=""
                                                                    />
                                                                    <label
                                                                        for="radio1"
                                                                        class="radioLable"
                                                                    >
                                                                        <span
                                                                            class="radioCirle"
                                                                        />
                                                                        Rabbit ID</label
                                                                    >
                                                                </div>

                                                                <div
                                                                    class="flex items-center "
                                                                >
                                                                    <input
                                                                        id="radio2"
                                                                        type="radio"
                                                                        name="radio"
                                                                        class="hidden"
                                                                    />
                                                                    <label
                                                                        for="radio2"
                                                                        class="radioLable"
                                                                    >
                                                                        <span
                                                                            class="radioCirle"
                                                                        />
                                                                        COMP ID</label
                                                                    >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="flex items-center justify-end mt-5"
                                                >
                                                    <div
                                                        class="updateAction text-erBlue cursor-pointer"
                                                        on:click={() => {
                                                            temp5 = "newMap";
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                    <div
                                                        class="updateAction ml-5"
                                                    >
                                                        <button
                                                            class="ErBlueButton"
                                                            >Map</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
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

<!-- Cheque Details modal -->

<div class="hidden" id="chequeModel">
    <div class=" viewDocmodal  " id="modal-id">
        <div class="bglightcolormodal" />
        <div class="allDocmodalsuccessbody rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> Cheque Details </span>
                            </p>
                            <p class="text-sm ">
                                <span class="font-medium text-lg">
                                    Dhiraj Shah</span
                                >
                                <span class="userDesignation">
                                    - Associate- {$facility_data_store.facility_type}, MHPD - Mulsi
                                    SP</span
                                >
                            </p>
                        </div>
                        <div
                            class="rightmodalclose"
                            on:click={closechequeDetails}
                        >
                            <img src="../src/img/blackclose.svg" alt="" />
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div class="scrollbar ">
                            <div class="mainContainerWrapper ">
                                <div class="DocCardlist ">
                                    {#if !cheque_values_from_store}
                                    <p></p>
                                    {:else}
                                    {#each cheque_values_from_store as new_cheque}
                                        <div class="cardDocWrapper ">
                                            <div
                                                class="grid grid-cols-2 xs:grid-cols-1 gap-4"
                                            >
                                                <div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Bank Name
                                                        </div>
                                                        <div class="detailData">
                                                            {new_cheque.bank_name}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Cheque Type
                                                        </div>
                                                        <div class="detailData">
                                                            {new_cheque.type}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Cheque Date
                                                        </div>
                                                        <div class="detailData">
                                                            {new_cheque.cheque_date}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Cheque Number
                                                        </div>
                                                        <div class="detailData">
                                                            {new_cheque.cheque_number}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Amount
                                                        </div>
                                                        <div class="detailData">
                                                            Rs {new_cheque.amount}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Recrun Number
                                                        </div>
                                                        <div class="detailData">
                                                            {#if new_cheque.recrun_number == "" || new_cheque.recrun_number == null}
                                                                <p>-</p>
                                                            {:else}
                                                                {new_cheque.recrun_number}
                                                            {/if}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            View Cheque
                                                        </div>
                                                        <div
                                                            class="userStatus "
                                                        >
                                                            <p
                                                                class="verifyText"
                                                            >
                                                                <a
                                                                    href=""
                                                                    class="smButton"
                                                                >
                                                                    <img
                                                                        src="../src/img/view.png"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                    {/if}
                                </div>
                                <div class="addDocumentSection ">
                                    <div class="addSecform hidden">
                                        <div
                                            class="addButtonSection my-3 py-16 text-center hidden"
                                        >
                                            <div class="updateAction">
                                                <button class="ErBlueButton"
                                                    >Add New GST Details</button
                                                >
                                            </div>
                                        </div>
                                        <div class="my-3 py-4 px-4 ">
                                            <p class="text-lg font-medium">
                                                Add new GST details
                                            </p>

                                            <div
                                                class="flex  py-1 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    Address
                                                </div>
                                                <div class="formInnerGroup">
                                                    <input
                                                        class="inputboxpopover"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                class="flex  py-3 items-center flex-wrap"
                                            >
                                                <div class="light14grey mb-1">
                                                    City
                                                </div>
                                                <div class="formInnerGroup ">
                                                    <select
                                                        class="inputboxpopover"
                                                    >
                                                        <option class="pt-6"
                                                            >Select</option
                                                        >
                                                        <option>ICICI</option>
                                                        <option>Axis</option>
                                                        <option>SIB</option>
                                                    </select>
                                                    <div
                                                        class="formSelectArrow "
                                                    >
                                                        <img
                                                            src="../src/img/selectarrow.png"
                                                            class="w-5 h-auto"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="flex  py-1 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    GST State
                                                </div>
                                                <div class="formInnerGroup">
                                                    <input
                                                        class="inputboxpopover"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                class="flex  py-3 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    Upload Document
                                                </div>
                                                <div class="formInnerGroup">
                                                    <label
                                                        class="cursor-pointer flex"
                                                    >
                                                        <div
                                                            class="ErBlueButton"
                                                        >
                                                            Select File
                                                        </div>
                                                        <input
                                                            type="file"
                                                            class="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div
                                                class="flex items-center justify-end mt-5"
                                            >
                                                <div
                                                    class="updateAction text-erBlue"
                                                >
                                                    Cancel
                                                </div>
                                                <div class="updateAction ml-5">
                                                    <button class="ErBlueButton"
                                                        >Upload</button
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class=" bg-lighterGrey rounded-lg h-full"
                                    >
                                        {#if temp6 == "cheque"}
                                            <div
                                                class="addButtonSection my-3 py-3  text-center"
                                            >
                                                <div
                                                    class="updateAction mt-5"
                                                    on:click={() => {
                                                        temp6 = "cheque-2";
                                                    }}
                                                >
                                                    <button class="ErBlueButton"
                                                        >Add New Cheque Details</button
                                                    >
                                                </div>
                                            </div>
                                        {/if}

                                        {#if temp6 == "cheque-2"}
                                            <div class="my-0 py-4 px-4 ">
                                                <div
                                                    class="h-80 max-h-80 overflow-y-scroll pr-4 border-b-2"
                                                >
                                                    <p
                                                        class="text-lg font-medium"
                                                    >
                                                        Add New Cheque Details
                                                    </p>

                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Bank Name
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <!-- <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                        </select> -->
                                                            <input
                                                                type="text"
                                                                class="inputboxpopover"
                                                                bind:value={bank_name}
                                                            />
                                                            <div class="text-red-500">{bank_name_message}</div>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Cheque Type
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <!-- <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                        </select> -->
                                                            <select
                                                                class="inputboxpopover"
                                                                bind:value={type}
                                                            >
                                                                <option
                                                                    value="-1"
                                                                    >Select</option
                                                                >
                                                                <option
                                                                    value="Crossed Cheque"
                                                                    >Crossed
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Bearer Cheque"
                                                                    >Bearer
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Order Cheque"
                                                                    >Order
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Open cheque"
                                                                    >Open cheque</option
                                                                >
                                                                <option
                                                                    value="Post-Dated Cheque"
                                                                    >Post-Dated
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Stale Cheque"
                                                                    >Stale
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Self Cheque"
                                                                    >Self Cheque</option
                                                                >
                                                                <option
                                                                    value="Banker’s Cheque"
                                                                    >Banker’s
                                                                    Cheque</option
                                                                >
                                                            </select>
                                                            <div class="text-red-500">{type_message}</div>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Cheque Date
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <!-- <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                        </select> -->
                                                            <DateInput
                                                                class="inputboxpopover"
                                                                placeholder="Cheque Date"
                                                                format="dd/MM/yyyy"
                                                                bind:value={cheque_date}
                                                            />
                                                            <div class="text-red-500">{cheque_date_message}</div>

                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Cheque Number
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                                bind:value={cheque_number}
                                                            />
                                                            <div class="text-red-500">{cheque_number_message}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Amount
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                                bind:value={amount}
                                                            />
                                                            <div class="text-red-500">{amount_message}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Recrun Number
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                                bind:value={recrun_number}
                                                            />
                                                            <div class="text-red-500">{recrun_number_message}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            File Number
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                                bind:value={file_number}
                                                            />
                                                            <div class="text-red-500">{file_number_message}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Upload Cheque
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <label
                                                                class="cursor-pointer flex"
                                                            >
                                                                <div
                                                                    class="ErBlueButton"
                                                                >
                                                                    Select File
                                                                </div>
                                                                <!-- <input type="file" class="hidden"  bind:value={upload_cheque}> -->
                                                                <input
                                                                    type="file"
                                                                    class="hidden"
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e
                                                                        )}
                                                                        bind:value = "{checkupload}"
                                                                />
                                                                <div class="text-red-500">{cheque_upload_message}</div>
                                                            </label>
                                                            <p>{img_name}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="flex items-center justify-end mt-5"
                                                >
                                                    <div
                                                        class="updateAction text-erBlue"
                                                        on:click={() => {
                                                            temp6 = "cheque";
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                    <div
                                                        class="updateAction ml-5"
                                                    >
                                                        <button
                                                            class="ErBlueButton"
                                                            on:click={cheque_button_click}
                                                            >Submit</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
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

<!-- Link Child Associates modal -->

<div class="hidden" id="linkChildModel">
    <div class=" viewDocmodal  " id="modal-id">
        <div class="bglightcolormodal" />
        <div class="allDocmodalsuccessbody rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> View/Edit Client Name</span>
                            </p>
                            <p class="text-sm ">
                                <span class="font-medium text-lg">
                                    Dhiraj Shah</span
                                >
                                <span class="userDesignation">
                                    - Associate- {$facility_data_store.facility_type}, MHPD - Mulsi
                                    SP</span
                                >
                            </p>
                        </div>
                        <div
                            class="rightmodalclose"
                            on:click={linkChildModelclose}
                        >
                            <img src="../src/img/blackclose.svg" alt="" />
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div class="scrollbar ">
                            <div class="mainContainerWrapper ">
                                <div class="DocCardlist ">
                                    <div
                                        class="bg-bglightyellow py-2 px-3 mt-2 "
                                    >
                                        <div class="flex items-center">
                                            <div class="detailLbale">
                                                Tags added for this Associate
                                                <span class="detailData ">
                                                    3P Associate Not to be Paid
                                                    , P 30</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex  py-3 items-center ">
                                        <div class="light14grey mb-1">
                                            Select Location
                                        </div>
                                        <div class="formInnerGroup ">
                                            <select
                                                class="inputboxpopover"
                                                on:click={() => {
                                                    child = "linkchild2";
                                                }}
                                            >
                                                <option class="pt-6"
                                                    >Select</option
                                                >
                                            </select>
                                            <div class="formSelectArrow ">
                                                <img
                                                    src="../src/img/selectarrow.png"
                                                    class="w-5 h-auto"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="OtherAppliedTagsTable ">
                                        <table
                                            class="table  w-full text-center mt-2 xs:hidden sm:hidden"
                                        >
                                            <thead class="theadpopover">
                                                <tr>
                                                    <th>Facility Name</th>
                                                    <th>Unique ID</th>
                                                    <th>Station</th>
                                                    <th>Mobile No</th>
                                                    <th>Select</th>
                                                </tr>
                                            </thead>
                                            <tbody class="tbodypopover">
                                                {#if child == "linkchild"}
                                                    <tr class="hidde">
                                                        <td
                                                            colspan="5"
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="light14greylong w-full mb-1"
                                                            >
                                                                Select a
                                                                location to view
                                                                Associates
                                                            </div>
                                                        </td>
                                                    </tr>
                                                {/if}

                                                {#if child == "linkchild2"}
                                                    <tr class="border-b">
                                                        <td>
                                                            Avinash Gopal Katari</td
                                                        >
                                                        <td>EFAU00088</td>
                                                        <td>BOMG</td>
                                                        <td>7620350909</td>
                                                        <td
                                                            ><input
                                                                type="checkbox"
                                                                class=" checked:bg-blue-500 ..."
                                                            /></td
                                                        >
                                                    </tr>
                                                    <tr class="border-b">
                                                        <td>
                                                            Avinash Gopal Katari</td
                                                        >
                                                        <td>EFAU00088</td>
                                                        <td>BOMG</td>
                                                        <td>7620350909</td>
                                                        <td
                                                            ><input
                                                                type="checkbox"
                                                                class=" checked:bg-blue-500 ..."
                                                            /></td
                                                        >
                                                    </tr>
                                                {/if}
                                            </tbody>
                                        </table>
                                        <div class="text-right mt-3">
                                            <button
                                                class="ErBlueButton"
                                                on:click={() => {
                                                    childlink = "childlink2";
                                                }}>Link Child Associate</button
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="addDocumentSection ">
                                    <div class="addSecform ">
                                        <div class="my-3 py-4 px-4 ">
                                            <p class="text-lg font-medium">
                                                Linked Child Associates
                                            </p>
                                        </div>
                                        {#if childlink == "childlink"}
                                            <div
                                                class="light14greylong w-full mb-1 text-center"
                                            >
                                                No child assosiates are linked
                                            </div>
                                        {/if}
                                        {#if childlink == "childlink2"}
                                            <div
                                                class="cardforlinkedChild px-5 border-b pb-3"
                                            >
                                                <div class="flex justify-end">
                                                    <div
                                                        class="detailData"
                                                        on:click={() => {
                                                            childlink =
                                                                "childlink";
                                                        }}
                                                    >
                                                        <img
                                                            src="../src/img/reject.png"
                                                            width="25px"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div class="flex ">
                                                    <div class="w-1/3 ">
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Location
                                                        </div>
                                                    </div>
                                                    <div class="w-2/3 ">
                                                        <div class="detailData">
                                                            {city}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex ">
                                                    <div class="w-1/3 ">
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Facility Name
                                                        </div>
                                                    </div>
                                                    <div class="w-2/3 ">
                                                        <div class="detailData">
                                                            Avinash Gopal Katari
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex ">
                                                    <div class="w-1/3 ">
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Unique ID
                                                        </div>
                                                    </div>
                                                    <div class="w-2/3 ">
                                                        <div class="detailData">
                                                            EFAU00088
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
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
<Toast type={toast_type}  text={toast_text}/>

