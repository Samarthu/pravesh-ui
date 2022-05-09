
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
                    facility_document,addnew_cheque_details,bank_details,cheque_details,gst_details,
                    work_details_data,print_data} from "../../services/onboardsummary_services";
        //     import {uploadDocs} from "../services/bgv_services";
        //     import {get_date_format} from "../services/date_format_servives";
            // import {bank_details,cheque_details,facility_document,show_fac_tags,get_loc_scope,
            //     facility_data,facility_bgv_init,all_facility_tags} from "../../services/onboardsummary_services";
            import {img_url_name} from '../../stores/flags_store';
            // import {facility_id} from "../../stores/facility_id_store"
            import {facility_data_store} from "../../stores/facility_store"
        //     import {bgv_config_store} from '../stores/bgv_config_store'
            import Toast from './toast.svelte';
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
            let id_new_date='';
            let username;
            let all_tags_res;
            let work_contract_arr = [];
            let print_data_arr = [];
            let contract_data_val = "";
            export let facility_name;
            export let facility_id;
            // let pancard_obj = {
            //     pan_num:null,
            //     pan_attach:null,
            //     pan_name:null,
            //     pan_verified:null,
            //     pan_rejected:null
            // }
            // let aadhar_obj = {
            //     aadhar_num:null,
            //     aadhar_attach:null,
            //     aadhar_name:null,
            //     aadhar_verified:null,
            //     aadhar_rejected:null
            // }
            // let fac_photo_obj = {
            //     profile_url:null,
            //     profile_verified:null,
            //     profile_rejected:null
            // }
            // let addproof_obj = {
            //     address_name:null,
            //     address_url:null,
            //     address_verified:null,
            //     address_rejected:null
            // };
            // export let can_cheque_obj = {
            //     can_cheque_name:null,
            //     can_cheque_url:null,
            //     can_cheque_verified:null,
            //     can_cheque_rejected:null
            // };
            // let dl_photo_obj = {
            //     dl_lic_name:null,
            //     dl_lic_url:null,
            //     dl_verified:null,
            //     dl_rejected:null
            // };
            export let new_off_file_obj = {
                offer_name:null,
                offer_url:null,
                offer_verified:null,
                offer_rejected:null
            };
            // let gst_doc_obj = {
            //     gst_name:null,
            //     gst_url:null,
            //     gst_doc_num:null,
            //     gst_verified:null,
            //     gst_rejected:null
            // };
        
            let text_pattern = /^[a-zA-Z_ ]+$/;
            let recrun_pattern =  /^[^-\s](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9 _-]+)$/;
            let city_select;
            let city_select_flag=0;
            let img_name="",bank_name="-",type ="",cheque_date,cheque_number="-",amount="",
            recrun_number="",file_number = "";
            let bank_name_message ="",type_message="",cheque_date_message="",cheque_number_message=""
            ,amount_message="",recrun_number_message="",file_number_message="",cheque_upload_message="";
            let child_box;
            let bank_details_res,bank_new_date,facility_created_date,facility_doc_date;
            export let facility_modified_date;
            // let client_det_res;
            let client_det_arr=[];
            let gst_doc_arr=[];
            let view_contract = 0;
            // $: cheque_date = new Date();
            let file_data;
            let showbtn = 0;
            let selectTag,addRemark,selectsearch;
            export let city;
            console.log("city data new",city);
            let facility_address,facility_postal,facility_password,location_id,status_name;
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
            let new_contract_data = "";
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
           async function workorganization() {
               show_spinner = true;
               workContractModel.style.display = "block";
                let work_details_res = await work_details_data();
                try {
                    if(work_details_res.body.status == "green"){
                        show_spinner = false;
                        toast_type = "success";
                        toast_text = work_details_res.body.message;
                        work_contract_arr = work_details_res.body.data;
                    }
                    else if(work_details_res.body.status == "red"){
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = work_details_res.body.message;
                    }
                    else{
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = "Something went wrong";
                    }
                    work_contract_arr = work_contract_arr;
                    // console.log("work_contract_arr",work_contract_arr);
                }
                catch (error) {
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = error;   
                }
                
            
                
            

            }

            // function closeWorkorganization() {
            //     workorganizationModel.style.display = "none";
            // }
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
        
    }const onFileSelected = (e,doctext) => {
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
    function workContract() {
        workContractModel.style.display = "block";
    }

    function closeWorkContract() {
        workContractModel.style.display = "none";
    }
    async function view_print_doc(assigned_id,type){
        view_contract = 1;
        let pass_contract_id
        // window.print();
        for(let i = 0;i<work_contract_arr.length;i++){
            if(assigned_id == work_contract_arr[i].assigned_id){
               pass_contract_id = work_contract_arr[i].assigned_id;
            }
        }
        let print_data_res = await print_data(pass_contract_id);
        try {
            if(print_data_res.body.status == "green" && print_data_res.body.data != false){
                console.log("not false")
                show_spinner = false;
                toast_type = "success";
                toast_text = print_data_res.body.message;
                print_data_arr = print_data_res.body.data;
                print_data_arr = print_data_arr;
                console.log("print_data_arr",print_data_arr);
                for(let i = 0;i<work_contract_arr.length;i++){
                if(assigned_id == work_contract_arr[i].assigned_id){
                    contract_data_val = work_contract_arr[i].accepted_contract;
                    console.log("print_data_arr.accepted_contract",print_data_arr);
                    if(type == "view"){
                        console.log("view print clicked ") 
                        
                        // document.getElementById("workContractDetails").style.display = "none";
                        // document.getElementById("viewContractDetails").style.display = "block";
                        new_contract_data = print_data_arr.accepted_contract+document.getElementById("user_details").innerHTML;
                        window.frames["view_frame"].window.focus();
                    }   
                    else if(type == "print"){
                        new_contract_data = document.getElementById("user_details").innerHTML+print_data_arr.accepted_contract;
                        window.frames["print_frame"].window.print();
                    }
                }
        }
            }
            else if(print_data_res.body.status == "red"){
                show_spinner = false;
                toast_type = "error";
                toast_text = print_data_res.body.message;
            }
            else if(print_data_res.body.data == false){
                show_spinner = false;
                toast_type = "error";
                toast_text = "No Contract Details Found";
            }
            
        }
        catch (error) {
            show_spinner = false;
            toast_type = "error";
            toast_text = error;
        }
    }
    
    // function viewSaveContract() {
    //     console.log("new_contract_data",new_contract_data);
    //     // window.frames["print_frame"].document.body.innerHTML=printDivCSS + document.getElementById("div1").innerHTML;	
    //     // window.frames["view_frame"].window.open("", "", "width=100%,height=100%").window.focus();
    //     window.frames["print_frame"].window.print();
        
    // }
    // document.getElementById("cont_view_table")
    // console.log("cont_view_table",cont_view_table);
    // var cont = contract;
    // var facName = facility_name;
    // var contract = cont.accepted_contract;
    // if (cont.esign != undefined) {
    //     for (var k = 0; k < cont.esign.length; k++) {
    //         var timeS = moment(cont.esign[k].modified).format("DD-MMM-YYYY HH:mm a");
    //         var tr = "<center><span style='font-size:22px;font-weight: bold;'>" + facSaved[0].name + " - " + facName + "</span></center><br><br><span style='font-size:20px;font-weight: bold;'>ESIGNATURE</span><br><br><table border='2' style='width:90%;'><thead><tr><th> Accepted On</th><th> Accepted By</th><th>IMEI</th><th>IP</th><th>Geocodes</th><th>UFID</th></tr></thead><tbody><tr><td style=text-align:center>" + timeS + "</td><td style=text-align:center>" + cont.esign[k].user_id + "</td><td style=text-align:center>" + cont.esign[k].imei + "</td><td style=text-align:center>" + cont.esign[k].ip_address + "</td><td style=text-align:center>" + cont.esign[k].lat_long + "</td><td style=text-align:center>" + cont.esign[k].facility_id + "</td></tr></tbody></table>";
    //         tr = tr + "<br><table border='2'><tr><th style='padding:10px;'>Device Used : </th><td style=padding:10px>" + cont.esign[k].model_no + "</td></tr></table>";
    //         tr = tr.replace(/null/g, "NA");
    //         tr = tr.replace(/undefined/g, "NA");
    //         document.getElementById("cont_view_table").append(tr);
    //         document.getElementById("cont_view_table").append("<br><br>");
    //     }
    // }
    // if (contract != null) {
    //     contract = contract.replace(/\\\"/g, "\"");
    //     contract = contract.replace(/null/g, "NA");
    //     contract = contract.replace(/undefined/g, "NA");
    //     document.getElementById("cont_view_table").append(unescape(unescapeHtml(contract)));
    // }
    // // console.log("contract",document.getElementById("cont_view_table").append(unescape(unescapeHtml(contract))));
    // console.log(document.getElementById("cont_view_table"));
    // document.getElementById("cont_view_table").each(function () {
    //     if (!(document.getElementById("cont_view_table")(this).hasClass("table table-bordered"))) {
    //         document.getElementById("cont_view_table")(this).addClass("table table-bordered");
    //     }
    // });
    // document.getElementById("cont_view_table").printThis({
    //     importStyle: true,
    //     copyTagClasses: true,
    //     header: "",
    //     importCSS: false,
    //     pageTitle: "E- Contract - " + facSaved[0].name + " - " + facName,
    //     footer: "<br><br>E- Contract - " + facSaved[0].name + " - " + facName
    // });
// }
    
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
                        <!-- <a href="" class="smButton bg-erBlue text-white" on:click={()=>goto("workdetails")}>
                            Edit
                        </a> -->
                        <button class="smButton bg-erBlue text-white" on:click={()=>goto("workdetails")}>
                            Edit

                        </button>
                    </p>
                    <div class="userStatus ml-4">
                        <p class="flex items-center smButtonText" on:click={workorganization}>
                            <a href="" class="smButton modal-open">
                                Work Contract
                            </a>
                        </p>
                    </div>
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
                
                <img src="" id="img_model_url" class="mx-auto" alt="{alt_image}">
                
                <div class="pt-3 flex justify-center">
                    <button data-modal-toggle="popup-modal" type="button" class="dialogueNobutton"  on:click="{()=>{closeViewModel()}}">Close</button>
            </form>
        </div>
    </div>
</div> 
<!-- Document view Model -->
<!--  Work Contract Details modal -->
<div class="hidden" id="workContractModel"> 
    <div class="modalMain">
        <div class="modalOverlay"></div>

        <div class="modalContainer">
            <div class="modalHeadConmb-0">
                <div class="leftmodalInfo">
                    <p class="modalTitleText"> Work Contract Details </p>
                    <p class="text-sm ">
                        <span class="font-medium text-lg"> Dhiraj Shah</span>
                        <span class="userDesignation"> - Associate- NDA, MHPD - Mulsi SP</span>
                    </p>
                </div>
                <div class="rightmodalclose">
                    <img src="../src/img/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">
                </div>
            </div>
            <div class="modalContent">
                <div class="tabwrapper flex justify-between text-center py-2 pb-3">
                    <div class="changetype py-3 w-2/4	">
                        <p>E-Contracts</p>
                    </div>
                    <div class="Historytab py-3 w-2/4	 bg-bglightgreye">
                        <p>Physical Contracts</p>
                    </div>
                </div>
                <div class="ConModalContent">
                    <div class="gridMain hidden">
                        <div class="heightCardContainer">
                            <table class="table  w-full text-center mt-2">
                                <thead class="theadpopover h-10">
                                    <tr>
                                        <th>Contract Name</th>
                                        <th>Contract Type</th>
                                        <th>
                                            <div class="flex"> Accepted ? <img src="../src/img/arrowupdown.svg"
                                                    class="ml-2" alt=""></div>
                                        </th>
                                        <th>Accepted On</th>
                                        <th>Is Mandatory ?</th>
                                        <th>View</th>
                                        <th>Print/Save</th>
                                    </tr>
                                </thead>
                                <tbody class="tbodypopover">
                                    <tr class="border-b">
                                        <td>Background Verification Concent</td>
                                        <td>Concent</td>
                                        <td><span class="text-green">Yes</span> </td>
                                        <td>10-06-2020</td>
                                        <td>Yes</td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/view.png" alt="">
                                                </a>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/printer.svg" alt="">
                                                </a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>Background Verification Concent</td>
                                        <td>Concent</td>
                                        <td><span class="text-red-700">No</span> </td>
                                        <td>10-06-2020</td>
                                        <td>Yes</td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/view.png" alt="">
                                                </a>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/printer.svg" alt="">
                                                </a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>Background Verification Concent</td>
                                        <td>Concent</td>
                                        <td><span class="text-green">Yes</span> </td>
                                        <td>10-06-2020</td>
                                        <td>Yes</td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/view.png" alt="">
                                                </a>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/printer.svg" alt="">
                                                </a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>Background Verification Concent</td>
                                        <td>Concent</td>
                                        <td><span class="text-green">Yes</span> </td>
                                        <td>10-06-2020</td>
                                        <td>Yes</td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/view.png" alt="">
                                                </a>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/printer.svg" alt="">
                                                </a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>Background Verification Concent</td>
                                        <td>Concent</td>
                                        <td><span class="text-green">Yes</span> </td>
                                        <td>10-06-2020</td>
                                        <td>Yes</td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/view.png" alt="">
                                                </a>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/printer.svg" alt="">
                                                </a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>Background Verification Concent</td>
                                        <td>Concent</td>
                                        <td><span class="text-green">Yes</span> </td>
                                        <td>10-06-2020</td>
                                        <td>Yes</td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/view.png" alt="">
                                                </a>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="flex justify-center">
                                                <a href="" class="smButton">
                                                    <img src="../src/img/printer.svg" alt="">
                                                </a>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                    </div>

                    <div class="gridCon">

                        <div class="PhysicalCardContainer">
                            <div class="heightCardContainer">
                                <table class="table  w-full text-center mt-2 ">
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
                                            <td>Procurement agreement</td>
                                            <td>16-01-2020</td>
                                            <td>11-06-2020</td>
                                            <td>Mulshi - MHPD - NTEX</td>
                                            <td>
                                                <p class="flex justify-center">
                                                    <a href="" class="smButton">
                                                        <img src="../src/img/view.png" alt="">
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr class="border-b">
                                            <td>Procurement agreement</td>
                                            <td>16-01-2020</td>
                                            <td>11-06-2020</td>
                                            <td>Mulshi - MHPD - NTEX</td>
                                            <td>
                                                <p class="flex justify-center">
                                                    <a href="" class="smButton">
                                                        <img src="../src/img/view.png" alt="">
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr class="border-b">
                                            <td>Procurement agreement</td>
                                            <td>16-01-2020</td>
                                            <td>11-06-2020</td>
                                            <td>Mulshi - MHPD - NTEX</td>
                                            <td>
                                                <p class="flex justify-center">
                                                    <a href="" class="smButton">
                                                        <img src="../src/img/view.png" alt="">
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div class="bgAddSection">
                                <div class="addbuttongst  hidden">
                                    <div class="updateAction">
                                        <p class="mb-3">Upload New Physical contract here</p>
                                        <button class="ErBlueButton">Upload</button>
                                    </div>
                                </div>
                                <div class="addGstForm ">
                                    <div class="gstaddtitle px-4 py-4">
                                        <p class="text-lg font-medium">Upload New Physical Contract</p>
                                    </div>



                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Select Contract Type</div>
                                            <div class="formInnerwidthfull ">
                                                <select class="inputboxpopover">
                                                    <option class="pt-6">Select</option>
                                                </select>
                                                <div class="formSelectArrow ">
                                                    <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Select Organization</div>
                                            <div class="formInnerwidthfull ">
                                                <select class="inputboxpopover">
                                                    <option class="pt-6">Select</option>
                                                </select>
                                                <div class="formSelectArrow ">
                                                    <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Select Station</div>
                                            <div class="formInnerwidthfull ">
                                                <select class="inputboxpopover">
                                                    <option class="pt-6">Select</option>
                                                </select>
                                                <div class="formSelectArrow ">
                                                    <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Start Date</div>
                                            <div class="formInnerwidthfull ">
                                                <input type="date" class="inputboxpopoverdate">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                        <div class="w-full">
                                            <div class="light14grey mb-1">End Date</div>
                                            <div class="formInnerwidthfull ">
                                                <input type="date" class="inputboxpopoverdate">
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="  py-3 ">
                                                <div class="light14greylong  mb-1">Upload GST Certificate</div>
                                                <div class="w-full">
                                                    <label class="cursor-pointer flex">
                                                        <div class="ErBlueButton">Select File</div>
                                                        <input type="file" class="hidden">
                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="actionButtons">
                                        <div class="actionCancelbutton ">
                                            Cancel
                                        </div>
                                        <div class="updateAction ml-5">
                                            <button class="ErBlueButton">Add</button>
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
<!-- <div class="modal-body" style="overflow: auto;" id="cont_view_table"></div>  -->
                
                <!-- View Contract Model -->
<div id="div1">{new_contract_data}</div>
<iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank" srcdoc={new_contract_data}></iframe>
<iframe name="view_frame" width="0" height="0" frameborder="0" src="about:blank" srcdoc={new_contract_data}></iframe>
    {#if view_contract == 1}
    <div id="user_details">
    <center><span style="font-size:22px;font-weight: bold;">{facility_id}</span></center>
    <br>
    <br>
    <span style="font-size:20px;font-weight: bold;">ESIGNATURE</span>
    <br>
    <br>
    <table border="1" style="width:90% ;" class="table table-bordered">
        <thead><tr><th> Accepted On</th>
            <th> Accepted By</th>
            <th>IMEI</th>
            <th>IP</th>
            <th>Geo-codes</th>
            <th>UFID</th>
        </tr></thead>
        <tbody>
            <tr>
                <td>27-Apr-2022 04:26 pm</td>
                <td>msmm00010@nomail.com</td>
                <td>baba6506853fd3e9</td>
                <td>58.216.109.89</td>
                <td>17.6535439,75.8990996</td>
                <td>MSMM00010</td>
            </tr>
        </tbody>
    </table>
    <br>
    <table border="1" style="width:90%;" class="table table-bordered">
        <tbody>
            <tr>
                <th>Device Used : </th>
                <td>samsung SM-G610F 1 samsung/on7xeltedd/on7xelte:8.1.0/M1AJQ/G610FDDS1CTE6:user/release-keys<br> Version - 8.1.0</td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
   </div>
    {/if}




<Toast type={toast_type}  text={toast_text}/>
