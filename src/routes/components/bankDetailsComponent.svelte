<script>
    // import { Router, Link, Route } from "svelte-routing";
    //     import Catagory from "../catagory.svelte";
    //     import { goto } from "$app/navigation";
    //     import Breadcrumb from "./breadcrumb.svelte";
    //     import { onMount } from "svelte";
        import { DateInput, DatePicker } from "date-picker-svelte";
    //     import { bank_data_to_store,cheque_data_to_store } from "../stores/onboardsummary_store";
    //     import { allowed_pdf_size } from "../services/pravesh_config";
    //     // import { addnew_cheque_details } from "../services/onboardsummary_services";
    //     // import { facility_document } from "../services/onboardsummary_services";
    //     import { audit_trail_data } from "../services/supplier_services";
    //     import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
    //             show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor,
    //             get_loc_scope,client_details,erp_details,child_data,add_gst_dets,
    //             facility_document,addnew_cheque_details,bank_details,cheque_details,gst_details} from "../services/onboardsummary_services";
    //     import {uploadDocs} from "../services/bgv_services";
    //     import {get_date_format} from "../services/date_format_servives";
    //     import {img_url_name} from '../stores/flags_store';
    //     import {facility_id} from "../stores/facility_id_store"
    //     import {facility_data_store} from "../stores/facility_store"
    //     import {bgv_config_store} from '../stores/bgv_config_store'
    //     import Toast from './components/toast.svelte';
    //     import AssociateDetails from './components/associateDetailsComponent.svelte';
    //     import BankDetails from './components/bankDetailsComponent.svelte';
    //     import IdentityProof from './components/identityProofComponent.svelte';
    //     import WorkDetails from './components/workDetailsComponent.svelte';
    //     import { object_without_properties } from "svelte/internal";
    //     import { paginate, LightPaginationNav } from "svelte-paginate";
    //     import Spinner from "./components/spinner.svelte";
    //     import {logged_user} from '../services/supplier_services';
    //     import  {  page } from '$app/stores';
    //     import {documents_store} from '../stores/document_store';
            import { onMount } from "svelte";
            import { bank_data_to_store,cheque_data_to_store } from "../../stores/onboardsummary_store";
            import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
                    show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor,
                    get_loc_scope,client_details,erp_details,child_data,add_gst_dets,
                    facility_document,addnew_cheque_details,bank_details,cheque_details,gst_details} from "../../services/onboardsummary_services";
            import {img_url_name} from '../../stores/flags_store';
            import {facility_id} from "../../stores/facility_id_store"
            import {facility_data_store} from "../../stores/facility_store"
            import Spinner from "./spinner.svelte";
            import {logged_user} from '../../services/supplier_services';
            import  {  page } from '$app/stores';
            import {documents_store} from '../../stores/document_store';
    
        let show_spinner = false;
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
        let asso_active = "active";
        let work_active = "";
        let id_active ="";
        let bank_active = "";
        let bank_values_from_store = [];
        let cheque_values_from_store = [];
        let audit_details_array = [];
        let facility_document_data = [];
        let all_tags_data= [];
        let all_tags_obj= {};
        let show_fac_array = [];
        let tag_data_arr = [];
        let show_creation_date;
        let child_select;
        let child_list=[];
        let check_val,query;
        let tags_for_ass_arr=[];
        let check_selected;
        let id_new_date='';
        let username;
        let all_tags_res;
        let pancard_obj = {
            pan_num:null,
            pan_attach:null,
            pan_name:null,
            pan_verified:null,
            pan_rejected:null
        }
        let aadhar_obj = {
            aadhar_num:null,
            aadhar_attach:null,
            aadhar_name:null,
            aadhar_verified:null,
            aadhar_rejected:null
        }
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
        let can_cheque_obj = {
            can_cheque_name:null,
            can_cheque_url:null,
            can_cheque_verified:null,
            can_cheque_rejected:null
        };
        let dl_photo_obj = {
            dl_lic_name:null,
            dl_lic_url:null,
            dl_verified:null,
            dl_rejected:null
        };
        let new_off_file_obj = {
            offer_name:null,
            offer_url:null,
            offer_verified:null,
            offer_rejected:null
        };
        let gst_doc_obj = {
            gst_name:null,
            gst_url:null,
            gst_doc_num:null,
            gst_verified:null,
            gst_rejected:null
        };
    
        let text_pattern = /^[a-zA-Z_ ]+$/;
        let recrun_pattern =  /^[^-\s](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9 _-]+)$/;
        let city_select;
        let city_select_flag=0;
        let img_name="",bank_name="-",type ="",cheque_date,cheque_number="-",amount="",
        recrun_number="",file_number = "";
        let bank_name_message ="",type_message="",cheque_date_message="",cheque_number_message=""
        ,amount_message="",recrun_number_message="",file_number_message="",cheque_upload_message="";
        let child_box;
        let bank_details_res,bank_new_date,
        facility_modified_date,facility_created_date,facility_doc_date;
        // let client_det_res;
        let client_det_arr=[];
        let gst_doc_arr=[];
        // $: cheque_date = new Date();
        let file_data;
        let showbtn = 0;
        let selectTag,addRemark,selectsearch;
        let facility_address,facility_postal,facility_password,city,location_id,status_name;
        let new_fac_remarks = [];
        let select_tag_data,serv_ch_data;
        let total_pages;
        let pages=[];
        let tag_date,tag_remark;
        let tag_data_obj=[];
        let city_data=[];
        let scope_data=[];
        let gst_doc_type=[];
        let erp_details_arr = [];
        let cheque_img="";
        let checkupload,dl_lic_attach = "-";
        let result;
        let mapped_pages = [];
        let hidden_field ="hidden";
        let gst_city_link_state="";
        let gst_state_code = "";
        let gst_city_loc_id="";
        export let url = "";
        /////////////////////svelte plugin pagiantion//////////
        let items;
        let currentPage = 1;
        let pageSize = 10;
        let paginatedItems=[];
        let change_to = "Associate_details";
        //////GST vars////////////
        let gst_address=""
        let gst_city_select=""
        let gst_number=""
        let gst_file=""
        let gst_upload_message ="";
        let gst_number_message ="";
        let gst_city_message ="";
        let gst_add_message = "";
        let gst_img = "";
        let gst_data="";
        let gst_checkbox = false;
        let gst_details_data=[];
    ///////Document view Model/////////
        let alt_image="";
    /////////Document view Model//////
        // $:{
        //     for(let key in all_tags_obj){
        //         if(select_tag_data == key){
        //             if(all_tags_obj[key] == "vendor_required"){
        //             hidden_field = "";
        //             }
        //             else{
        //             hidden_field = "hidden"; 
        //             }
        //         }
                
        //     }
        // }
        // $:{
        //     if(city_select != null && $facility_id.facility_id_number != null){
        //     console.log("citySelect",city_select);
        //     link_child(city_select)
        //     }
        // }
        // let searchTerm;
        // $:if(searchTerm == ''){
        //     clearedSearchFunc();
        // }
        // $:new_pages = [];
        // $:for(let i=0;i<scope_data.length;i++){
        //     if(scope_data[i].location_name == gst_city_select){
        //         gst_city_link_state = scope_data[i].location_state;
        //         gst_city_loc_id = scope_data[i].location_id;
        //         gst_state_code = scope_data[i].state_code;
        //     }
        // }
        // $:if(gst_checkbox === true){
        //     gst_checkbox = true;
        // }
        function chequeDetails() {
        chequeModel.style.display = "block";
        }

        function closechequeDetails() {
            chequeModel.style.display = "none";
        }
        
        
    </script>
    {#if show_spinner}
        <Spinner />
    {/if}
 
 <!-- Bank Details -->

 <div class="bg-white w-full Bank_Details_Section ">
     <div class="detailsHeader_summary ">
         <div class="right flex justify-between w-full items-center py-2 xsl:flex-wrap">
             <div>
                 <!-- <p class="verifyText"><img src="{$img_url_name.img_name}/timer.png" alt="" class="pr-1">
                     Verification Pending</p> -->
                     {#if !bank_values_from_store}
                            <p></p>
                             {:else}
                             {#if bank_values_from_store.approved == "1"}
                             
                             <p
                                 class="statusContentTag text-green font-normal xs:w-5/12"
                             >
                                 <img
                                     src="{$img_url_name.img_name}/checked.png"
                                     class="pr-2"
                                     alt=""
                                 />Bank Details Approved
                             </p>
                             {:else if bank_values_from_store.rejected == "1"}
                             <p
                                 class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                             >
                                 <img
                                     src="{$img_url_name.img_name}/reject.png"
                                     class="pr-2"
                                     alt=""
                                 />Bank Details Rejected
                             </p>
                             {:else if bank_values_from_store.rejected == "0" && bank_values_from_store.approved == "0"}
                             
                             <p class="statusContent font-normal xs:w-5/12">
                                 <img
                                     src="{$img_url_name.img_name}/timer.png"
                                     class="pr-2"
                                     alt=""
                                 />Bank Verification Pending
                             </p>
                             {/if} 
                         {/if}  
             </div>
             <div class="flex">
                 <p class="detailsUpdate mr-4">
                     <span><span class="font-medium">Last updated -> </span>  {bank_new_date} <span
                             class="font-medium"> By -> </span> {bank_values_from_store.modified_by}</span>
                 </p>
                 <p class="flex items-center smButtonText">
                     <a href="" class="smButton bg-erBlue text-white">
                         Edit
                     </a>
                 </p>
             </div>
         </div>
     </div>

     <div class="grid grid-cols-3 gap-4 pb-5 xsl:grid-cols-1" >

         <div class="Bank_DetailsColFirst">
            
             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/bank.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Bank Name</p>
                         <p class="detailData">{bank_values_from_store.bank_name}</p>
                     </div>
                 </div>

             </div>
             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/account.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Account Number</p>
                         <p class="detailData">{bank_values_from_store.account_number}</p>
                     </div>
                 </div>

             </div>
             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/account.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">IFSC Code</p>
                         <p class="detailData">{bank_values_from_store.ifsc_code}</p>
                     </div>
                 </div>

             </div>
             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/pincode.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Branch</p>
                         <p class="detailData">{bank_values_from_store.branch_name} - {bank_values_from_store.branch_pin_code}</p>
                     </div>
                 </div>
             </div>

             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/account.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Bank Type</p>
                         <p class="detailData">{bank_values_from_store.bank_type}</p>
                     </div>
                 </div>

             </div>
             <!-- <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/pincode.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Branch</p>
                         <p class="detailData">{bank_values_from_store.branch_name} - {bank_values_from_store.branch_pin_code}</p>
                     </div>
                 </div>
             </div> -->
            
         </div>

         <div class="Bank_DetailsColSec">
             <div class="px-5 py-4 text-erBlue font-medium">
                 <label for="">Documents</label>
             </div>

             <div class="userInfoSecPadding">
                 <div class="wrapperInfoFirst">
                     <div class="flex items-start justify-between w-full">
                         <div class="flex">
                             <img src="{$img_url_name.img_name}/bankdoc.png" alt="">
                             <div class="pl-4">
                                 <p class="detailLbale">Bank Document</p>
                             </div>
                         </div>
                         <div class="pl-4">
                             <p class="flex items-center smButtonText" on:click={chequeDetails}>
                                 <a href="" class="smButton">
                                     Cheque Details
                                 </a>
                             </p>

                         </div>

                     </div>

                 </div>
                 <div class="attachment mt-5">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                         <div class="pl-4 flex items-center">
                             <p class="detailLbale">Cancel Cheque Attachment</p>

                         </div>
                     </div>
                     {#if can_cheque_obj.can_cheque_rejected == "1"}
                 <p class="rejectText pr-3">
                     <img
                         src="{$img_url_name.img_name}/reject.png"
                         alt=""
                         class="pr-2"
                     /> Reject
                 </p>
                 {:else if can_cheque_obj.can_cheque_verified == "1"}
                 
                     <p class="verifiedTextGreen pr-3">
                         <img
                             src="{$img_url_name.img_name}/checked.png"
                             alt=""
                             class="pr-1"
                         />
                         Verified
                     </p>
                
                 {:else if can_cheque_obj.can_cheque_verified == "0" && can_cheque_obj.can_cheque_rejected == "0"}
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

                             <p class="detailLbale">{can_cheque_obj.can_cheque_name}</p>
                         </div>
                     </div>
                     <div class="userStatus ">
                         <p class="verifyText">
                             <a href="" class="smButton">
                                 <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("can_cheque")}}">
                             </a>
                         </p>
                     </div>
                 </div>
             </div>
            
         </div>

     </div> 
  
 </div>

