
     <script>
        // import { Router, Link, Route } from "svelte-routing";
        //     import Catagory from "../catagory.svelte";
        //     import { goto } from "$app/navigation";
        //     import Breadcrumb from "./breadcrumb.svelte";
            import { onMount } from "svelte";
        //     import { DateInput, DatePicker } from "date-picker-svelte";
            import { bank_data_to_store,cheque_data_to_store } from "../../stores/onboardsummary_store";
        //     import { allowed_pdf_size } from "../services/pravesh_config";
        //     // import { addnew_cheque_details } from "../services/onboardsummary_services";
        //     // import { facility_document } from "../services/onboardsummary_services";
        //     import { audit_trail_data } from "../services/supplier_services";
            // import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
            //         show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor,
            //         get_loc_scope,client_details,erp_details,child_data,add_gst_dets,
            //         facility_document,addnew_cheque_details,bank_details,cheque_details,gst_details} from "../../services/onboardsummary_services";
        //     import {uploadDocs} from "../services/bgv_services";
        //     import {get_date_format} from "../services/date_format_servives";
            import {bank_details,cheque_details,facility_document,show_fac_tags,get_loc_scope,
                facility_data,facility_bgv_init,all_facility_tags,gst_details} from "../../services/onboardsummary_services";
            import {img_url_name} from '../../stores/flags_store';
            import {facility_id} from "../../stores/facility_id_store"
            import {facility_data_store} from "../../stores/facility_store";
        //     import {bgv_config_store} from '../stores/bgv_config_store'
        //     import Toast from './components/toast.svelte';
        //     import AssociateDetails from './components/associateDetailsComponent.svelte';
        //     import BankDetails from './components/bankDetailsComponent.svelte';
        //     import IdentityProof from './components/identityProofComponent.svelte';
        //     import WorkDetails from './components/workDetailsComponent.svelte';
        //     import { object_without_properties } from "svelte/internal";
        //     import { paginate, LightPaginationNav } from "svelte-paginate";
            import Spinner from "./spinner.svelte";
            import {logged_user} from '../../services/supplier_services';
            // import  {  page } from '$app/stores';
            import { page } from '$app/stores';
            import {documents_store} from '../../stores/document_store';
            import { goto } from "$app/navigation";
            // import {onFileSelected} from '../onboardsummaryComponent.svelte'
        
            let show_spinner = false;
            let toast_text;
            let toast_type;
            let routeNext = "";
            let routeBgv = "";
        //     let temp = "Add";
        //     let temp1 = "change";
            let temp2 = "gst1";
        //     let temp3 = "e-contracts";
        //     let temp4 = "p-contracts-1";
        //     let temp5 = "newMap";
        //     let temp6 = "cheque";
        //     let child = "linkchild";
        //     let childlink = "childlink"; 
        //     let asso_active = "active";
        //     let work_active = "";
        //     let id_active ="";
        //     let bank_active = "";
        //     let bank_values_from_store = [];
        //     let cheque_values_from_store = [];
        //     let audit_details_array = [];
        //     let facility_document_data = [];
        //     let all_tags_data= [];
            let all_tags_obj= {};
        //     let show_fac_array = [];
        //     let tag_data_arr = [];
        //     let show_creation_date;
        //     let child_select;
        //     let child_list=[];
        //     let check_val,query;
        let query;
        //     let tags_for_ass_arr=[];
        //     let check_selected;
        //     let id_new_date='';
        //     let username;
            let all_tags_res;
        //     let pancard_obj = {
        //         pan_num:null,
        //         pan_attach:null,
        //         pan_name:null,
        //         pan_verified:null,
        //         pan_rejected:null
        //     }
        //     let aadhar_obj = {
        //         aadhar_num:null,
        //         aadhar_attach:null,
        //         aadhar_name:null,
        //         aadhar_verified:null,
        //         aadhar_rejected:null
        //     }
            let fac_photo_obj = {
                profile_url:null,
                profile_verified:null,
                profile_rejected:null
            }
            let addproof_obj = {
                address_name:null,
                address_url:null,
                address_verified:null,
                address_rejected:null
            };
        //     let can_cheque_obj = {
        //         can_cheque_name:null,
        //         can_cheque_url:null,
        //         can_cheque_verified:null,
        //         can_cheque_rejected:null
        //     };
        //     let dl_photo_obj = {
        //         dl_lic_name:null,
        //         dl_lic_url:null,
        //         dl_verified:null,
        //         dl_rejected:null
        //     };
        //     let new_off_file_obj = {
        //         offer_name:null,
        //         offer_url:null,
        //         offer_verified:null,
        //         offer_rejected:null
        //     };
            let gst_doc_obj = {
                gst_name:null,
                gst_url:null,
                gst_doc_num:null,
                gst_verified:null,
                gst_rejected:null
            };
        
        //     let text_pattern = /^[a-zA-Z_ ]+$/;
        //     let recrun_pattern =  /^[^-\s](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9 _-]+)$/;
            let city_select;
            let city_select_flag=0;
        //     let img_name="",bank_name="-",type ="",cheque_date,cheque_number="-",amount="",
        //     recrun_number="",file_number = "";
        //     let bank_name_message ="",type_message="",cheque_date_message="",cheque_number_message=""
        //     ,amount_message="",recrun_number_message="",file_number_message="",cheque_upload_message="";
        //     let child_box;
        let facility_created_date,bank_details_res;
        //     let bank_details_res,bank_new_date,
        //     facility_modified_date,facility_created_date,facility_doc_date;
        //     // let client_det_res;
        //     let client_det_arr=[];
            let gst_doc_arr=[];
        //     // $: cheque_date = new Date();
        //     let file_data;
            let showbtn = 0;
        //     let selectTag,addRemark,selectsearch;
        let facility_address,facility_postal,facility_password;
        let city;
        //     let facility_address,facility_postal,facility_password,city,location_id,status_name;
        //     let new_fac_remarks = [];
        //     let select_tag_data,serv_ch_data;
        //     let total_pages;
        //     let pages=[];
        //     let tag_date,tag_remark;
        //     let tag_data_obj=[];
            let city_data=[];
            let scope_data=[];
        //     let gst_doc_type=[];
        //     let erp_details_arr = [];
        //     let cheque_img="";
        //     let checkupload,dl_lic_attach = "-";
        //     let result;
        //     let mapped_pages = [];
        //     let hidden_field ="hidden";
            let gst_city_link_state="";
        //     let gst_state_code = "";
        //     let gst_city_loc_id="";
        //     export let url = "";
        //     /////////////////////svelte plugin pagiantion//////////
        //     let items;
        //     let currentPage = 1;
        //     let pageSize = 10;
        //     let paginatedItems=[];
        //     let change_to = "Associate_details";
        //     //////GST vars////////////
            let gst_address=""
            let gst_city_select=""
            let gst_number=""
            let gst_file=""
            let gst_upload_message ="";
            let gst_number_message ="";
            let gst_city_message ="";
            let gst_add_message = "";
            let gst_img = "";
        //     let gst_data="";
            let gst_checkbox = false;
            let gst_details_data=[];
        // ///////Document view Model/////////
            let alt_image="";
        // /////////Document view Model//////
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
            $:{
                if(city_select != null && $facility_id.facility_id_number != null){
                console.log("citySelect",city_select);
                link_child(city_select)
                }
            }
            let searchTerm;
            $:if(searchTerm == ''){
                clearedSearchFunc();
            }
            $:new_pages = [];
            $:for(let i=0;i<scope_data.length;i++){
                if(scope_data[i].location_name == gst_city_select){
                    gst_city_link_state = scope_data[i].location_state;
                    gst_city_loc_id = scope_data[i].location_id;
                    gst_state_code = scope_data[i].state_code;
                }
            }
            $:if(gst_checkbox === true){
                gst_checkbox = true;
            }

    onMount(async () => {
        let facility_data_res = await facility_data();
        try{
            if(facility_data_res != "null"){
              
        facility_data_store.set(
            JSON.parse(JSON.stringify(facility_data_res.body.data[0]))
        
        )

        duplicate_facility_data_store.set(
            JSON.parse(JSON.stringify(facility_data_res.body.data[0]))
        )
        
        let id_date_format = new Date($facility_data_store.details_updated_on);
        id_new_date = get_date_format(id_date_format,"dd-mm-yyyy-hh-mm");
        
        new_fac_remarks = $facility_data_store.remarks.split("\n");
        // console.log("new_fac_remarks",new_fac_remarks)
        
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
            for (var j = 0;j < $facility_data_store.addresess.length;j++){
                for(let k=0;k<scope_data.length;k++){
                    if($facility_data_store.addresess[j].state == scope_data[k].location_state){
                        gst_doc_type[j] = "gst-certificate-" + scope_data[k].state_code;
                    }
                }
                gst_doc_type=gst_doc_type
                
                if ($facility_data_store.addresess[j].default_address == "1") {
                    facility_address =$facility_data_store.addresess[j].address;
                    facility_postal =$facility_data_store.addresess[j].postal;
                    city = $facility_data_store.addresess[j].city;
                    location_id = $facility_data_store.addresess[j].location_id;

                }
            }
            
            for (var i = 0; i < facility_document_data.length; i++) {
                for(let j=0; j<gst_doc_type.length;j++){
                    if(facility_document_data[i].doc_type == gst_doc_type[j]){
                        gst_doc_obj = {gst_name : facility_document_data[i].file_name,
                            gst_url : facility_document_data[i].file_url,
                            gst_doc_num : facility_document_data[i].doc_number,
                            gst_verified : facility_document_data[i].verified,
                            gst_rejected : facility_document_data[i].rejected};
                        
                        
                        // var gst_name = facility_document_data[i].file_name;
                        // var gst_url = facility_document_data[i].file_url;
                        // var gst_doc_num = facility_document_data[i].doc_number;
                        // gst_verified = facility_document_data[i].verified;
                        // gst_rejected = facility_document_data[i].rejected;
                        gst_doc_arr.push({"gst_name":gst_doc_obj.gst_name,"gst_url":gst_doc_obj.gst_url,"gst_doc_num":gst_doc_obj.gst_doc_num});
                    }
                }
            }
            gst_doc_arr=gst_doc_arr;
            console.log("gst_doc_arr",gst_doc_arr)
        }
    }
    catch(err) {
        toast_type = "error";
        toast_text = facility_data_res.body.message;
        
        }
    });
            
        function editWorkDetail() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }  
    async function gstModel() {
        modalidgst.style.display = "block";
        let gst_details_res = await gst_details();
        try{
            if(gst_details_res != "null"){
                for(let i=0;i < gst_details_res.body.data.length;i++){
                    gst_details_data.push(gst_details_res.body.data[i]);
                }
                gst_details_data=gst_details_data;
                console.log("gst_details_data",gst_details_data)
            }
            
        }
        catch(err) {
            toast_type = "error";
            toast_text = gst_details_res.body.message;
            
        }
    }
    function closeGST() {
        modalidgst.style.display = "none";
    }
    async function gst_edit_click(address,city,state,gstn,gst_url,gst_name){
        // console.log("gst_edit_click",address,city,state,gstn,gst_url,gst_name);
        if(temp2 != "gst2"){
            temp2 = "gst2";
        }
        else{
            temp2 = temp2;
        }
        gst_address = address;
        gst_city_select = city;
        gst_city_link_state = state;
        gst_number = gstn;
        gst_file = gst_url;
        gst_img = gst_name;
    }

    async function gst_submit_click(){
        let def_add = 0;
        // show_spinner = true;
        if(!gst_address.match(text_pattern)){
            gst_add_message = "Enter Valid Address";
            return  
        }
        if(!gst_city_select){
            gst_city_message = "Select Valid City";
            return;
        }
        // console.log("gst details for gst number",gst_number,gst_state_code,pan_num,gst_number.trim().length,gst_number.substring(0, 2),gst_number.substring(2, 12),gst_number.substring(13,14))
        if (gst_number == undefined || gst_number.trim().length < 15 || gst_number.substring(0, 2) != gst_state_code || gst_number.substring(2, 12) != pancard_obj.pan_num || gst_number.substring(13,14) != "Z") {
            gst_number_message = "Invalid GST Number";
        return;
        }
        if(!gst_file){
            gst_upload_message = "Invalid File Upload"
            return;
        }
        if(gst_checkbox == true){
            def_add = 1;
        }
        else{
            def_add = 0;
        }
            const gst_details_form = {
                "address":gst_address,
                "city":gst_city_select,
                "state":gst_city_link_state,
                "tier":"2",
                "location_id":gst_city_loc_id,
                "default_address":def_add,
                "gstn":gst_number,
                "name":"",
                "address_type":"Facility Address",
                "doctype":"Facility Address"
            }
            
            let new_gst_payload = {
                "facility_id":$facility_id.facility_id_number,
                "address":[gst_details_form]
            }
            console.log("new_gst_payload",new_gst_payload)
            
            let gst_add_res = await add_gst_dets(new_gst_payload);
            try {
                if(gst_add_res.body.status == "green"){
                    console.log("gst_add_res",gst_add_res)
                    toast_type = "success";
                    toast_text = "GST Details Added Successfully";
                    
                    let new_doc_type = "gst-certificate-"+gst_state_code;
                    console.log("new_doc_type",new_doc_type)
                    const gst_file_data = {"documents":[{"file_name":gst_img,"doc_category":"GST Certificate","status":"created","resource_id":$facility_id.facility_id_number,"user_id":username,"doc_number":"","pod":gst_data,"doc_type":new_doc_type,"facility_id":$facility_data_store.facility_id}]}
                    let gst_doc_submit_res = await uploadDocs(gst_file_data);
                    try {
                        if(gst_doc_submit_res.body.status == "green"){
                            
                            toast_type = "success";
                            toast_text = "GST Document Added Successfully";
                        }
                    } catch (err) {
                        toast_type = "error";
                        toast_text = "Error in Uploading GST Certificate";
                    }

                }
                else{
                    toast_type = "error";
                    toast_text = gst_add_res.body.message;
                }
                
            } catch (err) {
                toast_type = "error";
                toast_text = "Error in Adding GST Details";
            }
        }  
    async function linkChild() {
        let no_com = document.getElementById("comma");
        console.log("no_com",no_com)
        linkChildModel.style.display = "block";
    }

    function linkChildModelclose() {
        linkChildModel.style.display = "none";
    }
    function closeViewModel(){
        document.getElementById("img_model").style.display = "none";
    }
    function openViewModel(data,doc_number){
        document.getElementById("img_model").style.display = "block";
        if(data == "aadhar"){
            document.getElementById("img_model_url").getAttribute('src',aadhar_obj.aadhar_attach);
            alt_image = "aadhar proof";
        }
        else if(data == "pan"){
            document.getElementById("img_model_url").getAttribute('src',pancard_obj.pan_attach);
            alt_image = "pan-card proof";
        }
        else if(data == "address"){
            document.getElementById("img_model_url").getAttribute('src',addproof_obj.address_url);
            alt_image = "address proof";
        }
        else if(data == "licence"){
            document.getElementById("img_model_url").getAttribute('src',dl_lic_attach);
            alt_image = "driving licence proof";
        }
        else if(data == "offer"){
            document.getElementById("img_model_url").getAttribute('src',new_off_file_obj.offer_url);
            alt_image = "offer letter proof";
        }
        else if(data == "can_cheque"){
            document.getElementById("img_model_url").getAttribute('src',can_cheque_obj.can_cheque_url);
            alt_image = "cancel cheque proof";
        }
        else if(data == "cheque_disp"){
            document.getElementById("img_model_url").getAttribute('src',new_cheque.file_url);
            alt_image = "cheque proof";
        }
        for(let i = 0;i<gst_doc_arr.length;i++){
            if(data == "mult_gsts"){
                if(doc_number == gst_doc_arr[i].gst_doc_num)
                document.getElementById("img_model_url").getAttribute('src',gst_url[i]);
                alt_image = "gst proof";
            }
        }
        
    }

    function SearchClick() {
        searchBox.style.display = "block";
        supplierCount.style.display = "none";
        SearchClick.style.display = "none";
        searchBox.style.width = "100%";
        inputboxsearch.style.width = "100%";
    };

    function closeSearch() {
        supplierCount.style.display = "block";
        searchBox.style.display = "none";
        SearchClick.style.display = "block";
    };

    const enterKeyPress = e => {
        if (e.charCode === 13) {
            filterResults();
        }
    };

    async function clearedSearchFunc(){
        let client_det_res=await client_details(city_select);
        try{
            show_spinner = true;
            if(client_det_res.body.status == "green"){
                show_spinner = false;
                for(let i=0;i<client_det_res.body.data.length;i++){
                    for(let j=0;j<client_det_res.body.data.length;j++){
                        client_det_arr.push(client_det_res.body.data[j]);
                    }
                }
                paginatedItems=client_det_arr;
                result = true;
                
            }
            else{
                show_spinner = false;
            }
        }
        catch(err) {
            show_spinner = false;
            toast_type = "error";
            toast_text = err;
        }
    }
    async function filterResults(){
        let searchArray= [];
        for(let searchK  of paginatedItems){
            // console.log("inside filter Results",searchK.facility_name)
            const search_client = searchK.facility_name
             result=search_client.toLowerCase().includes(searchTerm.toLowerCase());
            if(result === true){
            searchArray = [...searchArray,searchK]
            }
        }
        paginatedItems = searchArray;
    }

    
    </script>
        {#if show_spinner}
            <Spinner />
        {/if}
     
     <!-- Associate Details -->
     <div class="bg-white w-full associate_Details_Section ">
         <div class="detailsHeader_summary ">
            
             <div class="right flex justify-end">
                 <p class="detailsUpdate mr-4">
                     <span><span class="font-medium">Last updated -> </span>{facility_created_date} <span
                             class="font-medium"> By -> </span> {$facility_data_store.owner}</span>
                 </p>
                 <p class="flex items-center smButtonText">
                     <!-- TODO -->
                     <!-- <a href="" class="smButton bg-erBlue text-white" on:click={()=>{goto("associatedetails")}}>
                         Edit
                     </a> -->
                     <button class="smButton bg-erBlue text-white" on:click={()=>{goto("associatedetails")}}>
                        Edit

                     </button>
                 </p>
             </div>

         </div>

         <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1" >
             <div class=" grid grid-cols-3 w-full px-5 mt-5  gap-4">
                 {#if !fac_photo_obj.profile_url}
                 <div class="">
                     <img src="{fac_photo_obj.profile_url}" class="w-28 h-28 xsl:h-auto" alt="">
                 </div>
                 <div class="w-auto col-span-2 mt-6 xsl:mt-3">
                 <div class="text-2xl xsl:text-xl">{$facility_data_store.facility_name}</div>
                 <p class="imgName">{$facility_data_store.facility_name}</p>
                 </div>
                 {/if}
             </div>

             <div class="contact_details">
                 <div class="px-5 py-4 text-erBlue font-medium">
                     <label for="">Contact Details</label>
                 </div>
                 <div class="userInfoSec px-5  flex items-start ">
                     <img src="{$img_url_name.img_name}/location1.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Address & Pincode</p>
                         <p class="detailData "> {facility_address}
                             {facility_postal}</p>
                     </div>
                 </div>

                 <div class="userInfoSec3 ">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/mobilephone.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">Mobile Number</p>
                             <p class="detailData">{$facility_data_store.phone_number}</p>
                         </div>
                     </div>
                     <!-- <div class="userStatus ">
                         <p class="userStatusTick"><img src="{$img_url_name.img_name}/checked.png" alt="" class="pr-1"> Verified
                         </p>
                     </div> -->
                     {#if $facility_data_store.phone_verified == "1"}
                     
                         <p class="verifiedTextGreen pr-3">
                             <img
                                 src="{$img_url_name.img_name}/checked.png"
                                 alt=""
                                 class="pr-1"
                             />
                             User activation pending
                         </p>
                    
                     {:else if $facility_data_store.phone_verified == "0"}
                         <p class="verifyText pr-3">
                             <img
                                 src="{$img_url_name.img_name}/timer.png"
                                 alt=""
                                 class="pr-2"
                             />
                             User activation pending
                         </p>
                    {/if}
                 </div>

                 <div class="userInfoSec3">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/email.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">Email</p>
                             <p class="detailData">{$facility_data_store.facility_email}</p>
                         </div>
                     </div>
                     <!-- {#if $facility_data_store.email_verified == "1"}
                     
                         <p class="verifiedTextGreen pr-3">
                             <img
                                 src="{$img_url_name.img_name}/checked.png"
                                 alt=""
                                 class="pr-1"
                             />
                             Verified
                         </p>
                    
                     {:else if $facility_data_store.email_verified == "0"}
                         <p class="verifyText pr-3">
                             <img
                                 src="{$img_url_name.img_name}/timer.png"
                                 alt=""
                                 class="pr-2"
                             />
                             Verification Pending
                         </p>
                    {/if} -->
                 </div>
             </div>

             <div class="Documents">
                 <div class="px-5 py-4 text-erBlue font-medium">
                     <label for="">Documents</label>
                 </div>
                 
                 <div class="userInfoSecPadding">
                     <div class="wrapperInfoFirst">
                         <div class="flex items-start">
                             <img src="{$img_url_name.img_name}/addressproof.png" alt="">
                             <div class="pl-4">
                                 <p class="detailLbale">Address proof</p>
                             </div>
                         </div>
                         <!-- <div class="userStatus ">
                             
                         </div> -->
                     {#if addproof_obj.address_rejected == "1"}
                     <p class="rejectText pr-3">
                         <img
                             src="{$img_url_name.img_name}/reject.png"
                             alt=""
                             class="pr-2"
                         /> Reject
                     </p>
                     {:else if addproof_obj.address_verified == "1"}
                     
                         <p class="verifiedTextGreen pr-3">
                             <img
                                 src="{$img_url_name.img_name}/checked.png"
                                 alt=""
                                 class="pr-1"
                             />
                             Verified
                         </p>
                    
                     {:else if addproof_obj.address_verified == "0" && addproof_obj.address_rejected == "0"}
                         <p class="verifyText pr-3">
                             <img
                                 src="{$img_url_name.img_name}/timer.png"
                                 alt=""
                                 class="pr-2"
                             />
                             Verification Pending
                         </p>
                    {/if}

                     </div>
                     <div class="wrapperInfo ">
                         <div class="flex items-start">
                             <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                             <div class="pl-4 flex items-center">
                                 <img src="{$img_url_name.img_name}/jpeg.png" class="" alt="">

                                 <p class="detailLbale">{addproof_obj.address_name}</p>
                             </div>
                         </div>
                         <div class="userStatus ">
                             <p class="verifyText">
                                 <a href="" class="smButton">
                                     <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("address")}}">
                                 </a>
                             </p>
                         </div>
                     </div>


                 </div>

                 <div class="userInfoSec3">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/gst.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">GST Details</p>
                             <!-- <p class="detailData">{gst_name}</p> -->
                         </div>
                     </div>
                     <div class="userStatus ">
                         <p class="flex items-center smButtonText" on:click={gstModel}>
                             <a href="" class="smButton modal-open">
                                 Add
                             </a>
                         </p>
                     </div>
                 </div>
             </div>

         </div> 

         <div class="border-gray-200 px-5 py-5">
             <hr>
         </div>

         <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1" >
             <div class="appcredentials">
                 <div class="headingWithIcon">
                     <img src="{$img_url_name.img_name}/mobileblue.png" alt="">
                     <p class="detailsTitle">Libera App Credentials</p>
                 </div>
             </div>
         </div>  

         <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1 pb-5" >
             <div class="liberApp">
                 <div class="userInfoSec3 ">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/pan.png" alt="">
                         <div class="pl-4">
                             <!-- <p class="detailLbale">User ID</p>
                             <p class="detailData">dhiraj.shah@elastic.run</p> -->
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
                         <img src="{$img_url_name.img_name}/password.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">Password</p>
                             <p class="detailData">{facility_password}</p>
                         </div>
                     </div>

                 </div>
             </div>

             <div class="contact_details">
                 <div class="userInfoSec3">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/gst.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">Link Child Associate</p>
                             <!-- <p class="detailData">2</p> -->
                         </div>
                     </div>
                     <div class="userStatus ">
                         <p class="flex items-center smButtonText" on:click={linkChild}>
                             <a href="" class="smButton modal-open">
                                 Link/View
                             </a>
                         </p>
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
                                    {$facility_data_store.facility_name}</span
                                >
                                <span class="userDesignation">
                                    - Associate- {$facility_data_store.facility_type}, {city}</span
                                >
                            </p>
                        </div>
                        <div class="rightmodalclose" on:click={closeGST}>
                            <img src="{$img_url_name.img_name}/blackclose.svg" alt="" />
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div class="scrollbar ">
                            <div class="mainContainerWrapper ">
                                <div class="DocCardlist ">
                                    {#if !gst_details_data}
                                    <p>No GST Details found</p>
                                    {:else}
                                    {#each gst_details_data as new_gst}
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
                                                                {new_gst.address}
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
                                                                {new_gst.city}
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
                                                            {new_gst.state}
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
                                                            {new_gst.gstn}
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
                                                                    src="{$img_url_name.img_name}/view.png"
                                                                    alt=""
                                                                    on:click="{openViewModel("mult_gsts",new_gst.gstn)}"
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
                                                            <!-- for(let i = 0;i<gst_doc_arr.length;i++){ -->
                                                                {#each gst_doc_arr as gst_doc}
                                                                {#if gst_doc.gst_doc_num == new_gst.gstn}
                                                                <img
                                                                    src="{$img_url_name.img_name}/edit.png"
                                                                    on:click="{()=>{gst_edit_click(new_gst.address,new_gst.city,
                                                                    new_gst.state,new_gst.gstn,gst_doc.gst_url,gst_doc.gst_name)}}"
                                                                    alt="gst edit"
                                                                />
                                                                {/if}
                                                                {/each}
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statusSecForDoc">
                                            <p class="userStatusTick ">
                                                <!-- <img
                                                    src="{$img_url_name.img_name}/checked.png"
                                                    alt=""
                                                    class="pr-1"
                                                /> Verified
                                            </p> -->
                                            {#if gst_doc_obj.gst_verified == "1"}
                                                <p
                                                class="statusContentTag text-green font-normal xs:w-5/12"
                                            >
                                                <img
                                                    src="{$img_url_name.img_name}/checked.png"
                                                    class="pr-2"
                                                    alt=""
                                                />GST Verified
                                            </p>
                                                {:else if gst_doc_obj.gst_rejected == "1"} 
                                                <p
                                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                            >
                                                <img
                                                    src="{$img_url_name.img_name}/reject.png"
                                                    class="pr-2"
                                                    alt=""
                                                />GST Rejected
                                            </p>
                                            <!-- {:else} -->
                                            {:else if gst_doc_obj.gst_verified == "0" && gst_doc_obj.gst_rejected == "0"}
                                            <p class="statusContent font-normal xs:w-5/12">
                                                <img
                                                    src="{$img_url_name.img_name}/timer.png"
                                                    class="pr-2"
                                                    alt=""
                                                />GST Verification Pending
                                            </p>
                                                {/if}
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
                                                        bind:value="{gst_address}"
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
                                                        bind:value={gst_city_select}
                                                    >
                                                        <option class="pt-6"
                                                            >Select</option
                                                        >
                                                        {#each city_data as new_city}
                                                        <option class="pt-6"
                                                            >{new_city}</option
                                                        >
                                                        {/each}
                                                    </select>
                                                    <div
                                                        class="formSelectArrow "
                                                    >
                                                        <img
                                                            src="{$img_url_name.img_name}/selectarrow.png"
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
                                                        bind:value="{gst_city_link_state}"
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
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"gst_upload"
                                                                        )}
                                                            bind:value="{gst_file}"

                                                        />
                                                        <div class="text-red-500">{gst_upload_message}</div>
                                                    </label>
                                                    <p>{gst_img}</p>
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
                                                                bind:value="{gst_address}"
                                                            />
                                                            <div class="text-red-500">{gst_add_message}</div>
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
                                                        bind:value={gst_city_select}
                                                    >
                                                        <option class="pt-6"
                                                            >Select</option
                                                        >
                                                        {#each city_data as new_city}
                                                        <option class="pt-6"
                                                            >{new_city}</option
                                                        >
                                                        {/each}
                                                    </select>
                                                    <div class="text-red-500">{gst_city_message}</div>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/selectarrow.png"
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
                                                                bind:value="{gst_city_link_state}"
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
                                                                bind:value="{gst_number}"
                                                            />
                                                            <div class="text-red-500">{gst_number_message}</div>
                                                        </div>
                                                    </div>

                                                    <div class="checkFormgroup">
                                                        <input
                                                            id="remember-me"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            placeholder="Your password"
                                                            class="inputChecked"
                                                            bind:checked = "{gst_checkbox}"
                                                        />
                                                        <label for="remember-me" class="onboardedText ">
                                                            Default Address
                                                        </label>
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
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"gst_upload"
                                                                        )}
                                                                    bind:value="{gst_file}"
                                                                />
                                                                <div class="text-red-500">{gst_upload_message}</div>
                                                            </label>
                                                            <p>{gst_img}</p>
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
                                                            on:click="{gst_submit_click}">Add</button
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
