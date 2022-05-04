
       <script>
        // import { Router, Link, Route } from "svelte-routing";
        //     import Catagory from "../catagory.svelte";
        //     import { goto } from "$app/navigation";
        //     import Breadcrumb from "./breadcrumb.svelte";
            // import { onMount } from "svelte";
        //     import { DateInput, DatePicker } from "date-picker-svelte";
            import { bank_data_to_store,cheque_data_to_store } from "../../stores/onboardsummary_store";
        //     import { allowed_pdf_size } from "../services/pravesh_config";
        //     // import { addnew_cheque_details } from "../services/onboardsummary_services";
        //     // import { facility_document } from "../services/onboardsummary_services";
        //     import { audit_trail_data } from "../services/supplier_services";
            import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
                    show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor,
                    get_loc_scope,client_details,erp_details,child_data,add_gst_dets,
                    facility_document,addnew_cheque_details,bank_details,cheque_details,gst_details} from "../../services/onboardsummary_services";
        //     import {uploadDocs} from "../services/bgv_services";
        //     import {get_date_format} from "../services/date_format_servives";
            // import {bank_details,cheque_details,facility_document,show_fac_tags,get_loc_scope,
            //     facility_data,facility_bgv_init,all_facility_tags} from "../../services/onboardsummary_services";
            import {img_url_name} from '../../stores/flags_store';
            import {facility_id} from "../../stores/facility_id_store"
            import {facility_data_store} from "../../stores/facility_store"
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
            import  {  page } from '$app/stores';
            import {documents_store} from '../../stores/document_store';
            import { goto } from "$app/navigation";
            import {onFileSelected} from '../onboardsummaryComponent.svelte'
        
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
            function myBtn() {
            associateModal.style.display = "block";
            }
            function workorganization() {
                workorganizationModel.style.display = "block";
            }

            function closeWorkorganization() {
                workorganizationModel.style.display = "none";
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
    
        </script>
        {#if show_spinner}
            <Spinner />
        {/if}
       <!-- Work Details -->
        <div class="bg-white w-full Work_Details_Section ">
            <div class="detailsHeader_summary ">
               
                <div class="right flex justify-end">
                    <p class="detailsUpdate mr-4">
                        <span><span class="font-medium">Last updated -> </span> {facility_modified_date} <span
                                class="font-medium"> By -> </span> {$facility_data_store.modified_by}</span>
                    </p>
                    <p class="flex items-center smButtonText">
                        <a href="" class="smButton bg-erBlue text-white" on:click={()=>goto("workdetails")}>
                            Edit
                        </a>
                    </p>
                </div>

            </div>

            <div class="grid grid-cols-3 gap-4 pb-5 xsl:grid-cols-1" >
                <div class="workdetailsColFirst">
                    <div class="userInfoSec3">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/Subtract.png" alt="" class="w-5 h-auto">
                            <div class="pl-4">
                                <p class="detailLbale">Associate Type</p>
                                <p class="detailData">{$facility_data_store.facility_type}</p>
                            </div>
                        </div>
                        <div class="userStatus ">
                            <p class="flex items-center smButtonText" on:click={myBtn}>
                                <a class="smButton" id="changeAssociate">
                                    Change
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/pan.png" alt="" class="w-5 h-5">
                            <div class="pl-4">
                                <p class="detailLbale">Associate ID</p>
                                <p class="detailData">{$facility_data_store.name}</p>
                            </div>
                        </div>

                    </div>
                    <div class="userInfoSec3">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/organization.png" alt="" class="w-5 h-5">
                            <div class="pl-4">
                                <p class="detailLbale">Organization</p>
                                <p class="detailData">{$facility_data_store.org_id}</p>
                            </div>
                        </div>
                        <div class="userStatus ">
                            <p class="flex items-center smButtonText" on:click={workorganization}>
                                <a href="" class="smButton">
                                    Add/Edit
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/location.png" class="w-6 h-6" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">City</p>
                                <p class="detailData">{city}</p>
                            </div>
                        </div>
                    </div>
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/warehouse.png" class="w-5 h-5" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">Station</p>
                                <p class="detailData">{$facility_data_store.station_code}</p>
                            </div>
                        </div>

                    </div>
                   
                </div>

                <div class="workdetailsColSec">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Documents</label>
                    </div>

                    <div class="userInfoSecPadding">
                        <div class="wrapperInfoFirst">
                            <div class="flex items-start">
                                <img src="{$img_url_name.img_name}/offerlatter.png" alt="" class="w-5 h-5">
                                <div class="pl-4">
                                    <p class="detailLbale">Offer Letter</p>
                                </div>
                            </div>
                            {#if new_off_file_obj.offer_verified == "1"}
                            <p
                            class="statusContentTag text-green font-normal xs:w-5/12"
                        >
                            <img
                                src="{$img_url_name.img_name}/checked.png"
                                class="pr-2"
                                alt=""
                            />  Verified
                        </p>
                            {:else if new_off_file_obj.offer_rejected == "1"} 
                            <p
                            class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                        >
                            <img
                                src="{$img_url_name.img_name}/reject.png"
                                class="pr-2"
                                alt=""
                            /> Rejected
                        </p>
                        <!-- {:else} -->
                        {:else if new_off_file_obj.offer_verified == "0" && new_off_file_obj.offer_rejected == "0"}
                        <p class="statusContent font-normal xs:w-5/12">
                            <img
                                src="{$img_url_name.img_name}/timer.png"
                                class="pr-2"
                                alt=""
                            />Verification Pending
                        </p>
                            {/if}

                        </div>
                        <div class="wrapperInfo ">
                            <div class="flex items-start">
                                <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                                <div class="pl-4 flex items-center">
                                    <img src="{$img_url_name.img_name}/jpeg.png" class="" alt="">

                                    <p class="detailLbale">{new_off_file_obj.offer_name}</p>
                                </div>
                            </div>
                            <div class="userStatus ">
                                <p class="verifyText">
                                    <a href="" class="smButton">
                                        <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("offer")}}">
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="workdetailsColThird">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Vendor Details</label>
                    </div>
                    
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/managerVendor.png" class="w-5 h-5" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">Vendor</p>
                                <p class="detailData">{$facility_data_store.vendor_name} - {$facility_data_store.vendor_code}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div> 
         
        </div>
        