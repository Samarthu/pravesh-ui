<script>
    // import { Router, Link, Route } from "svelte-routing";
    //     import Catagory from "../catagory.svelte";
    //     import { goto } from "$app/navigation";
    //     import Breadcrumb from "./breadcrumb.svelte";
    //     import { onMount } from "svelte";
    //     import { DateInput, DatePicker } from "date-picker-svelte";
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
        // import {facility_data_store} from "../../stores/facility_store"
    //     import {bgv_config_store} from '../stores/bgv_config_store'
    //     import Toast from './components/toast.svelte';
    //     import AssociateDetails from './components/associateDetailsComponent.svelte';
    //     import BankDetails from './components/bankDetailsComponent.svelte';
    //     import IdentityProof from './components/identityProofComponent.svelte';
    //     import WorkDetails from './components/workDetailsComponent.svelte';
    //     import { object_without_properties } from "svelte/internal";
    //     import { paginate, LightPaginationNav } from "svelte-paginate";
    //     import Spinner from "./components/spinner.svelte";
        // import {logged_user} from '../../services/supplier_services';
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
            import { goto } from "$app/navigation";
            import Toast from './toast.svelte';
            // import {onFileSelected} from '../onboardsummaryComponent.svelte'
    
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
        export let id_new_date;
        let username;
        let all_tags_res;
        export let changed_pan_num;
        export let changed_aadhar_num;
        export let changed_dl_num;
        export let changed_voter_num;
        export let pancard_obj = {
            pan_num:null,
            pan_attach:null,
            pan_name:null,
            pan_verified:null,
            pan_rejected:null
        }
        export let aadhar_obj = {
            aadhar_num:null,
            aadhar_attach:null,
            aadhar_name:null,
            aadhar_verified:null,
            aadhar_rejected:null
        }
        
        export let dl_photo_obj = {
            dl_lic_num:null,
            dl_lic_name:null,
            dl_lic_url:null,
            dl_verified:null,
            dl_rejected:null
        };
        export let voter_id_object = {
            voter_id_number:null
        }
    
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
        let image_path;
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
        function closeViewModel(){
        document.getElementById("img_model").style.display = "none";
    }
    function openViewModel(data,doc_number){
        document.getElementById("img_model").style.display = "block";
        if(data == "aadhar"){
            image_path = $page.url.origin+aadhar_obj.aadhar_attach;
            // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+aadhar_obj.aadhar_attach);
            alt_image = "aadhar proof";
        }
        else if(data == "pan"){
            image_path = $page.url.origin+pancard_obj.pan_attach;
            document.getElementById("img_model_url").getAttribute('src',$page.url.origin+pancard_obj.pan_attach);
            alt_image = "pan-card proof";
        }
        else if(data == "address"){
            image_path = $page.url.origin+addproof_obj.address_url;
            // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+addproof_obj.address_url);
            alt_image = "address proof";
        }
        else if(data == "licence"){
            image_path = $page.url.origin+dl_lic_attach;
            // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+dl_lic_attach);
            alt_image = "driving licence proof";
        }
        else if(data == "offer"){
            image_path = $page.url.origin+new_off_file_obj.offer_url;
            // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+new_off_file_obj.offer_url);
            alt_image = "offer letter proof";
        }
        else if(data == "can_cheque"){
            image_path = $page.url.origin+can_cheque_obj.can_cheque_url;
            // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+can_cheque_obj.can_cheque_url);
            alt_image = "cancel cheque proof";
        }
        else if(data == "cheque_disp"){
            image_path = $page.url.origin+cheque_disp_obj.cheque_disp_url;
            // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+new_cheque.file_url);
            alt_image = "cheque proof";
        }
        for(let i = 0;i<gst_doc_arr.length;i++){
            if(data == "mult_gsts"){
                if(doc_number == gst_doc_arr[i].gst_doc_num)
                image_path = $page.url.origin+gst_url[i];
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+gst_url[i]);
                alt_image = "gst proof";
            }
        }
        
    }
    const onFileSelected = (e,doctext) => {
        let img = e.target.files[0];
        if (img.size <= allowed_pdf_size) {
            console.log("img", img);
            
            if(doctext == "gst_upload"){
                console.log("Photo log uploaded")  
                gst_img = img.name;
            }
            else if(doctext == "cheque_upload"){
            cheque_img = img.name;
            }
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function () {
            file_data = reader.result;
            console.log("reader",reader.result);
            
            if(doctext == "gst_upload"){
                gst_data = reader.result;
                // console.log("photo_data",reader.result);
                toast_text = "Photo Uploaded Successfully";
                toast_type = "success";
            }
            else if(doctext == "cheque_upload"){
                cheque_data = reader.result;
                toast_text = "Document Uploaded Successfully";
                toast_type = "success";
            }
            }
                reader.onerror = function (error) {
                console.log("Error: ", error);
                }
        }
        else {
        alert(
            "File size is greater than " +
                Number(allowed_pdf_size / 1048576) +
                "MB. Please upload a file less than " +
                Number(allowed_pdf_size / 1048576) +
                "MB ."
        );
    };
        
    }
    
       
    </script>
    {#if show_spinner}
        <Spinner />
    {/if}

<!-- Identity Proof -->
<div class="bg-white w-full Identity_proof_Section ">
    <div class="detailsHeader_summary ">
        <div class="right flex justify-between w-full items-center py-2 xsl:flex-wrap">
            <div>
                {#if $facility_data_store.is_id_prof_rejected == "1"}
                <p class="rejectText pr-3">
                    <img
                        src="{$img_url_name.img_name}/reject.png"
                        alt=""
                        class="pr-2"
                    /> Id Proof Rejected
                </p>
                {:else if $facility_data_store.is_id_prof_verified == "1"}
                
                    <p class="verifiedTextGreen pr-3">
                        <img
                            src="{$img_url_name.img_name}/checked.png"
                            alt=""
                            class="pr-1"
                        />
                        Id Proof Verified
                    </p>
               
                {:else if $facility_data_store.is_id_prof_verified == "0" && $facility_data_store.is_id_prof_rejected == "0"}
                    <p class="verifyText pr-3">
                        <img
                            src="{$img_url_name.img_name}/timer.png"
                            alt=""
                            class="pr-2"
                        />
                        Id Verification Pending
                    </p>
               {/if}
            </div>
            <div class="flex">
                <p class="detailsUpdate mr-4">
                    <span><span class="font-medium">Last updated -> </span> {#if !id_new_date}<p>-</p>{:else}>{id_new_date} {/if}<span
                            class="font-medium"> By -> </span> {#if !$facility_data_store.details_updated_by}<p>-</p>{:else}{$facility_data_store.details_updated_by} {/if}</span>
                </p>
                <p class="flex items-center smButtonText">
                    <!-- <a href="" class="smButton bg-erBlue text-white" on:click={()=>{goto("identityproof")}}>
                        Edit
                    </a> -->
                    <button class="smButton bg-erBlue text-white" on:click={()=>{goto("identityproof")}}>
                        Edit
                    </button>
                </p>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-3 gap-4 pb-5 xsl:grid-cols-1" >

        <div class="IdentityProofColFirst">
           
            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="{$img_url_name.img_name}/pan.png" alt="" class="w-5 h-5">
                    <div class="pl-4">
                        <p class="detailLbale">PAN Number</p>
                        {#if !changed_pan_num}
                        <p>-</p>
                        {:else}
                        <p class="detailData">{changed_pan_num}</p>
                        {/if}
                        
                    </div>
                </div>

            </div>
           
            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="{$img_url_name.img_name}/pan.png" class="w-6 h-6" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Aadhaar Number</p>
                        {#if !aadhar_obj.aadhar_num}
                        <p>-</p>
                        {:else}
                        <p class="detailData">{changed_aadhar_num}</p>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="{$img_url_name.img_name}/warehouse.png" class="w-5 h-5" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Driving License Number</p>
                        {#if !dl_photo_obj.dl_lic_num}
                        <p>-</p>
                        {:else}
                        <p class="detailData">{changed_dl_num}</p>
                        {/if}
                    </div>
                </div>

            </div>

            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="{$img_url_name.img_name}/pan.png" class="w-5 h-5" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Voter Id</p>
                        {#if !voter_id_object.voter_id_number}
                        <p>-</p>
                        {:else}
                        <p class="detailData">{changed_voter_num}</p>
                        {/if}
                    </div>
                </div>

            </div>
           
        </div>

        <div class="IdentityProofColSec">
            <div class="px-5 py-4 text-erBlue font-medium">
                <label for="">Documents</label>
            </div>

            <div class="userInfoSecPadding">
                <div class="wrapperInfoFirst">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/offerlatter.png" alt="" class="w-5 h-5">
                        <div class="pl-4">
                            <p class="detailLbale">PAN Card Attachment</p>
                        </div>
                    </div>
                {#if pancard_obj.pan_rejected == "1"}
                <p class="rejectText pr-3">
                    <img
                        src="{$img_url_name.img_name}/reject.png"
                        alt=""
                        class="pr-2"
                    /> Reject
                </p>
                {:else if pancard_obj.pan_verified == "1"}
                
                    <p class="verifiedTextGreen pr-3">
                        <img
                            src="{$img_url_name.img_name}/checked.png"
                            alt=""
                            class="pr-1"
                        />
                        Verified
                    </p>
               
                {:else if pancard_obj.pan_verified == "0" && pancard_obj.pan_rejected == "0"}
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
                            {#if !pancard_obj.pan_name}
                            <p>-</p>
                            {:else}
                            <p class="detailLbale">{pancard_obj.pan_name}</p>
                            {/if}
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText">
                            {#if pancard_obj.pan_attach}
                            <a href="" class="smButton">
                                <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("pan")}}">
                            </a>
                            {/if}
                        </p>
                    </div>
                </div>
            </div>
            <div class="userInfoSecPadding">
                <div class="wrapperInfoFirst">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/offerlatter.png" alt="" class="w-5 h-5">
                        <div class="pl-4">
                            <p class="detailLbale">Aadhaar Card Attachment</p>
                        </div>
                    </div>
                    {#if aadhar_obj.aadhar_rejected == "1"}
                    <p class="rejectText pr-3">
                        <img
                            src="{$img_url_name.img_name}/reject.png"
                            alt=""
                            class="pr-2"
                        /> Reject
                    </p>
                    {:else if aadhar_obj.aadhar_verified == "1"}
                    
                        <p class="verifiedTextGreen pr-3">
                            <img
                                src="{$img_url_name.img_name}/checked.png"
                                alt=""
                                class="pr-1"
                            />
                            Verified
                        </p>
                   
                    {:else if aadhar_obj.aadhar_verified == "0" && aadhar_obj.aadhar_rejected == "0"}
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
                            {#if !aadhar_obj.aadhar_name}
                            <p>-</p>
                            {:else}
                            <p class="detailLbale">{aadhar_obj.aadhar_name}</p>
                            {/if}
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText">
                            {#if aadhar_obj.aadhar_attach}
                            <a href="" class="smButton">
                                <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("aadhar")}}">
                            </a>
                            {/if}
                        </p>
                    </div>
                    
                </div>
            </div>
            <div class="userInfoSecPadding">
                <div class="wrapperInfoFirst">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/offerlatter.png" alt="" class="w-5 h-5">
                        <div class="pl-4">
                            <p class="detailLbale">Driving License Attachment</p>
                        </div>
                    </div>
                    {#if dl_photo_obj.dl_rejected == "1"}
                    <p class="rejectText pr-3">
                        <img
                            src="{$img_url_name.img_name}/reject.png"
                            alt=""
                            class="pr-2"
                        /> Reject
                    </p>
                    {:else if dl_photo_obj.dl_verified == "1"}
                    
                        <p class="verifiedTextGreen pr-3">
                            <img
                                src="{$img_url_name.img_name}/checked.png"
                                alt=""
                                class="pr-1"
                            />
                            Verified
                        </p>
                   
                    {:else if dl_photo_obj.dl_verified == "0" && dl_photo_obj.dl_rejected == "0"}
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
                            {#if !dl_photo_obj.dl_lic_name}
                            <p>-</p>
                            {:else}
                            <p class="detailLbale">{dl_photo_obj.dl_lic_name}</p>
                            {/if}
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText">
                            {#if dl_photo_obj.dl_lic_url}
                            <a href="" class="smButton">
                                <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("licence")}}">
                            </a>
                            {/if}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
 
</div>

<!-- Document view Model -->
<div id="img_model" tabindex="-1" aria-hidden="true" role ="dialog" class=" actionDialogueOnboard" hidden>
    <div class="pancardDialogueOnboardWrapper ">
        <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
            <div class="flex justify-end p-2">
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" on:click="{()=>{closeViewModel()}}">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
                
                <img src={image_path} id="img_model_url" class="mx-auto" alt="{alt_image}">
                
                <div class="pt-3 flex justify-center">
                    <button data-modal-toggle="popup-modal" type="button" class="dialogueNobutton"  on:click="{()=>{closeViewModel()}}">Close</button>
            </form>
        </div>
    </div>
</div> 
<!-- Document view Model -->
<Toast type={toast_type}  text={toast_text}/>
