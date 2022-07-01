<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { facility_data_store } from "../stores/facility_store";
    import {
        verify_associate_name,
        verify_associate_email,
        set_facility_id,
    } from "../services/associate_details_services";
    import { DateInput, DatePicker } from "date-picker-svelte";
    import { get_user_scope_function } from "../services/workdetails_services";
    import { each } from "svelte/internal";
    import { get_date_format } from "../services/date_format_servives";
    import { documents_store } from "../stores/document_store";
    import { allowed_pdf_size } from "../services/pravesh_config";
    import Side_content_component from "./side_content_scetion.svelte";
    import { img_url_name } from "../stores/flags_store";
    import { page } from "$app/stores";
    import Toast from "./components/toast.svelte";
    import { facility_id } from "../stores/facility_id_store";
    import { duplicate_documents_store } from "../stores/duplicate_document_store";
    import { duplicate_facility_data_store } from "../stores/duplicate_facility_data_store";
    import { sorting_facility_details_for_edit } from "../services/pravesh_config";
    import { edit_facility_function } from "../services/identity_proof_services";
    import { category_store_name } from "../stores/category_store";
    import Spinner from "./components/spinner.svelte";
import { current_user } from "../stores/current_user_store";
import {
       
        save_or_update_documents_function_1
    } from "../services/identity_proof_services";
    import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
                show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor,
                get_loc_scope,client_details,erp_details,child_data,add_gst_dets,
                facility_document,addnew_cheque_details,bank_details_info,cheque_details,gst_details,blacklist_vendor,
                initiateBGV} from "../services/onboardsummary_services";
    let show_spinner = false;
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import {success_toast ,error_toast,warning_toast} from '../services/toast_theme';

    let toast_text = "";
    let toast_type = null;
    let test_date;

    var email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    var pincode_pattern = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;

    // import { facility_data } from "src/services/onboardsummary_services";

    let date;
    let valid = true;
    let page_name = null;
    const d = new Date("2015-03-25");
    let max_date;
    let avatar, fileinput;
    let img_name = "";
    let city_data = [];
    let address_proof_copy;
    let address_proof_copy_name;
    let present_address_proof_copy;
    let present_address_proof_copy_name;
    let profile_pic;
    let profile_pic_name;
    let address_check;
    let final_address = [];
    let selected_present_address;
    let temp_max_date;

    let email_check = false;

    let work_address = {
        city: null,
        address: null,
        postal: null,
        address_type: "Work Address",
        parentfield: "address",
        parenttype: "Facility",
        tier: "3",
        state: "Maharashtra",
    };
    let Permanent_address= {
        address: null,
address_type: "Permanent Address",
location_id: null,
parentfield: "address",
parenttype: "Facility",
postal: null,
tier: null
    }
    let present_address = {
        location_id: null,
        address: null,
        postal: null,
        address_type: "Present Address",
        parentfield: "address",
        parenttype: "Facility",
        tier: "3",
    };
    let profile_pic_data = {
        doc_category: "Profile Pic",
        doc_number: "",
        doc_type: "fac-photo",
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let edit_profile_pic_data = {
        doc_category: "Profile Pic",
        doc_number: "",
        doc_type: "fac-photo",
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let address_proof_data = {
        doc_category: "Address Proof",
        doc_number: "",
        doc_type: "addproof-photo",
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let edit_address_proof_data = {
        doc_category: "Address Proof",
        doc_number: "",
        doc_type: "addproof-photo",
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let present_address_proof_data = {
        doc_category: "Present Address Proof",
        doc_number: "",
        doc_type: "pre-addproof-photo",
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let edit_present_address_proof_data = {
        doc_category: "Present Address Proof",
        doc_number: "",
        doc_type: "pre-addproof-photo",
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };

    let routeTo = "identityproof";
    let facility_name_message = "";
    let facility_email_message = "";
    let facility_dob_message = "";
    let present_address_proof_data_message = "";
    let present_address_city_message = "";
    let present_address_address_message = "";
    let present_address_postal_message = "";
    let present_address_address_proof_message = "";
    let address_check_message = "";
    let work_address_proof_message = "";
    let work_address_city_message = "";
    let work_address_address_message = "";
    let work_address_postal_message = "";
    onMount(async () => {
        show_spinner = true;
        page_name = $page.url["pathname"].split("/").pop();
        if(!$facility_data_store.org_id){
            goto("facility_type_select",{replaceState:false})

        }
        console.log("page_name", page_name);
        console.log("date", date);
        function get_max_date() {
            let current_date = new Date();
            console.log("current date", current_date);

            console.log("year", parseInt(current_date.getFullYear()));
            let current_year = parseInt(current_date.getFullYear());
            let max_year = current_year - 18;
            console.log("max year", max_year);
            max_date = new Date(
                String(
                    max_year +
                        "-" +
                        parseInt(current_date.getMonth() + 1) +
                        "-" +
                        parseInt(current_date.getDate())
                )
            );
            console.log("max date", max_date);

            // date = get_date_format(max_date,'yyyy-mm-dd');
            if (!$facility_data_store.dob) {
                date = get_date_format(max_date, "yyyy-mm-dd");
            } else {
                let temp_date = $facility_data_store.dob;
                console.log("dob", $facility_data_store.dob);
                console.log("temp date date of birth", temp_date);
                let temp = new Date(temp_date);
                console.log("temp", temp);
                date = get_date_format(temp, "yyyy-mm-dd");
            }

            console.log("date format", date);
            // if($facility_data_store.dob){
            //     date = $facility_data_store.dob;
            //     console.log("inside if date ");

            // }
            // else{
            //     date = get_date_format(max_date,'yyyy-mm-dd');
            // }

            temp_max_date = get_date_format(max_date, "yyyy-mm-dd");
            console.log("temp_max_date", temp_max_date);
        }
        get_max_date();
        let user_scope_response = await get_user_scope_function();
        console.log("user_scope_response", user_scope_response);
        try {
            if (user_scope_response.body.status == "green") {
                city_data = [];
                let user_scope_data = user_scope_response.body.data;
                for (let i = 0; i < user_scope_data.length; i++) {
                    if (
                        !city_data.includes(user_scope_data[i]["location_name"])
                    ) {
                        city_data.push({
                            city_name: user_scope_data[i]["location_name"],
                            city_id: user_scope_data[i]["location_id"],
                            state_name: user_scope_data[i]["location_state"],
                            tier: user_scope_data[i]["tier"],
                            location_state:
                                user_scope_data[i]["location_state"],
                        });
                    }
                }

                city_data.sort((a, b) =>
                    a.city_name > b.city_name
                        ? 1
                        : a.city_name === b.city_name
                        ? a.city_id > b.city_id
                            ? 1
                            : -1
                        : -1
                );

                // console.log("city data",city_data);
            }
        } catch {
            show_spinner = false;
            error_toast("Unable to fetch user scope data");
            // toast_text = "Unable to fetch user scope data";
            // toast_type = "error";
        }
        let date_formatter = get_date_format(max_date, "dd-mm-yyyy");
        console.log("date_formatter", date_formatter);
        console.log("dob ", $facility_data_store.dob);

        if ($facility_id.facility_id_number) {
            console.log("facility store", $facility_data_store);
            console.log(
                "duplicate facility data store",
                $duplicate_facility_data_store
            );
            console.log("duplicate document store", $duplicate_documents_store);
            let temp_date = $facility_data_store.date_of_birth;
            console.log("temp date date of birth", temp_date);
            let temp = new Date(temp_date);
            console.log("temp", temp);
            date = get_date_format(temp, "yyyy-mm-dd");
            let temp_address_array = $facility_data_store.address;
            console.log("temp address", temp_address_array);
            for (let i = 0; i < temp_address_array.length; i++) {
                if (
                    temp_address_array[i].address_type == "Work Address" ||
                    temp_address_array[i].address_type == "Facility Address"
                ) {
                    work_address.city = temp_address_array[i].city;
                    work_address.address = temp_address_array[i].address;
                    work_address.postal = temp_address_array[i].postal;

                } else if (
                    temp_address_array[i].address_type == "Present Address"
                ) {
                    address_check = "No";
                    present_address.postal = temp_address_array[i].postal;
                    present_address.address = temp_address_array[i].address;
                    present_address.location_id =
                        temp_address_array[i].location_id;
                    console.log("present address", present_address);
                }
            }
            for (
                let i = 0;
                i < $duplicate_documents_store.documents.length;
                i++
            ) {
                if (
                    $duplicate_documents_store.documents[i].doc_category ==
                    "Profile Pic"
                ) {
                    console.log(
                        "profile pic",
                        $duplicate_documents_store.documents[i]
                    );
                    edit_profile_pic_data =
                        $duplicate_documents_store.documents[i];
                    console.log("edit profile pic data", edit_profile_pic_data);
                } else if (
                    $duplicate_documents_store.documents[i].doc_category ==
                    "Present Address Proof"
                ) {
                    edit_present_address_proof_data =
                        $duplicate_documents_store.documents[i];
                    console.log(
                        "present address proof",
                        $duplicate_documents_store.documents[i]
                    );
                    // console.log("edit present address proof data",edit_present_address_proof_data);
                } else if (
                    $duplicate_documents_store.documents[i].doc_category ==
                    "Address Proof"
                ) {
                    edit_address_proof_data =
                        $duplicate_documents_store.documents[i];
                    console.log(
                        "edit address proof data",
                        edit_address_proof_data
                    );
                }
            }
        } else {
            show_spinner = false;
            console.log("facility store", $facility_data_store);
            // console.log("duplicate facility data store",$duplicate_facility_data_store);
            // console.log("duplicate document store",$duplicate_documents_store);
            let temp_date = $facility_data_store.dob;
            console.log("temp date date of birth", temp_date);
            if (temp_date) {
                let temp = new Date(temp_date);
                console.log("temp", temp);
                date = get_date_format(temp, "yyyy-mm-dd");
                console.log("formated date", date);
            }

            let temp_address_array = $facility_data_store.address;
            console.log("temp address", temp_address_array);
            for (let i = 0; i < temp_address_array.length; i++) {
                if (
                    temp_address_array[i].address_type == "Work Address" ||
                    temp_address_array[i].address_type == "Facility Address"
                ) {
                    work_address.city = temp_address_array[i].city;
                    work_address.address = temp_address_array[i].address;
                    work_address.postal = temp_address_array[i].postal;
                } else if (
                    temp_address_array[i].address_type == "Present Address"
                ) {
                    address_check = "No";
                    present_address.postal = temp_address_array[i].postal;
                    present_address.address = temp_address_array[i].address;
                    present_address.location_id =
                        temp_address_array[i].location_id;
                    console.log("present address", present_address);
                }
            }
            if (address_check != "No") {
                address_check = "Yes";
            }

            for (let i = 0; i < $documents_store.documents.length; i++) {
                if (
                    $documents_store.documents[i].doc_category == "Profile Pic"
                ) {
                    console.log("profile pic", $documents_store.documents[i]);
                    // edit_profile_pic_data =
                    //     $documents_store.documents[i];
                    // console.log("edit profile pic data", edit_profile_pic_data);
                    profile_pic_data.file_name =
                        $documents_store.documents[i]["file_name"];
                    profile_pic_data.pod = $documents_store.documents[i]["pod"];
                } else if (
                    $documents_store.documents[i].doc_category ==
                    "Present Address Proof"
                ) {
                    // edit_present_address_proof_data =
                    //     $documents_store.documents[i];
                    present_address_proof_data.file_name =
                        $documents_store.documents[i]["file_name"];
                    present_address_proof_data.pod =
                        $documents_store.documents[i]["pod"];
                    console.log(
                        "present address proof",
                        $documents_store.documents[i]
                    );
                    // console.log("edit present address proof data",edit_present_address_proof_data);
                } else if (
                    $documents_store.documents[i].doc_category ==
                    "Address Proof"
                ) {
                    // edit_address_proof_data =
                    //     $duplicate_documents_store.documents[i];
                    address_proof_data.file_name =
                        $documents_store.documents[i]["file_name"];
                    address_proof_data.pod =
                        $documents_store.documents[i]["pod"];
                    console.log(" address proof data", address_proof_data);
                }
            }
        }
        show_spinner = false;
    });
    function get_state_and_tier(data) {
        present_address.tier = data.tier;
        console.log("present_address.tier", present_address.tier);
    }
    // $:{
    //     present_address.location_id = present_address.location_id;
    //     console.log("inside reactive block", present_address.location_id);
    //     if(!present_address.address){
    //         for(let i=0;i<city_data.length;i++){
    //         if(city_data[i]['city_id'] == present_address.location_id){
    //             present_address.tier = city_data[i]['tier'];
    //             break;
    //             // get_state_and_tier(city_data[i]);
    //         }

    //     }
    //     console.log("present_address.tier", present_address.tier);

    //     }

    //     // console.log("present_address.tier", present_address);

    // }
    // $:{
    //     work_address.city = work_address.city;
    //     console.log("inside work address reactive block", work_address.city);
    // }

    async function gotoidentityproof() {
        show_spinner = true;
        valid = true;

        if ($facility_data_store.facility_email) {
            verify_email();
            if (!email_check) {
                show_spinner = false;
                valid = false;
                facility_email_message = "invalid email";
            } else {
                facility_email_message = "";
            }
        }
        if (
            $facility_data_store.facility_name == null ||
            $facility_data_store.facility_name == ""
        ) {
            show_spinner = false;
            valid = false;
            facility_name_message = "Please enter a facility name";
        } else {
            // valid = true;
            facility_name_message = "";
        }

        if ($facility_data_store.dob == null) {
            show_spinner = false;
            valid = false;
            facility_dob_message = "Please enter a date of birth";
        } else {
            // valid = true;
            facility_dob_message = "";
        }

        // if(present_address_proof_data.pod == null || present_address_proof_data.pod == ""){
        //     valid = false;
        //     present_address_proof_data_message = "Please upload a document";
        // }
        // else{
        //     valid = true;
        //     present_address_proof_data_message = "";
        // }

        if (work_address.city == null) {
            show_spinner = false;
            valid = false;
            // present_address_city_message = "Please select a city";
            work_address_city_message = "Please select a city";
        } else {
            // valid = true;
            work_address_city_message = "";
        }

        if (work_address.address == null || work_address.address == "") {
            show_spinner = false;
            valid = false;
            // present_address_address_message = "Please enter an address";
            work_address_address_message = "Please enter an address";
        } else {
            // valid = true;
            work_address_address_message = "";
        }

        if (work_address.postal == null) {
            show_spinner = false;
            valid = false;
            work_address_postal_message = "Please enter a pin code.";
            // present_address_postal_message = "Please enter a pin code.";
        } else {
            if (!work_address.postal.match(pincode_pattern)) {
                valid = false;
                show_spinner = false;
                work_address_postal_message = "Please enter a valid pin code.";
            } else {
                work_address_postal_message = "";
            }

            // valid = true;
            // work_address_postal_message = "";
        }

        if (address_check == "No") {
            if (present_address.location_id == null) {
                show_spinner = false;
                valid = false;
                // console.log("present_address.location_id",present_address.location_id)
                // work_address_city_message = "Please select a city.";
                present_address_city_message = "Please select a city.";
            } else {
                // valid = true;
                present_address_city_message = "";
            }

            if (
                present_address.address == null ||
                present_address.address == ""
            ) {
                show_spinner = false;
                valid = false;
                // work_address_address_message = "Please enter an address.";
                present_address_address_message = "Please enter an address.";
            } else {
                // valid = true;
                present_address_address_message = "";
            }

            if (present_address.postal == null) {
                show_spinner = false;
                valid = false;
                // work_address_postal_message = "Please enter a pin code.";
                present_address_postal_message = "Please enter a pin code.";
            } else {
                // valid = true;
                if (!present_address.postal.match(pincode_pattern)) {
                    valid = false;
                    show_spinner = false;
                    present_address_postal_message =
                        "Please enter a valid pin code.";
                } else {
                    present_address_postal_message = "";
                }
                // present_address_postal_message = "";
            }
        }

        if (!$facility_id.facility_id_number) {
            if (
                address_proof_data.pod == null ||
                address_proof_data.file_name == null ||
                address_proof_data.pod == "" ||
                address_proof_data.file_name == ""
            ) {
                show_spinner = false;
                valid = false;
                work_address_proof_message = "Please upload a document";
            } else {
                // valid = true;
                work_address_proof_message = "";
            }
        }

        if (address_check != "Yes" && address_check != "No") {
            show_spinner = false;
            valid = false;
            address_check_message = "Please select an option";
        } else {
            // valid = true;
            address_check_message = "";
        }

        save_address_to_store();

        if (valid) {
            if (
                profile_pic_data.pod != null ||
                profile_pic_data.file_name != null
            ) {
                if($facility_id.facility_id_number){
                    profile_pic_data.status = "active";
                    profile_pic_data.resource_id = $facility_id.facility_id_number;
                    profile_pic_data.user_id = $current_user.username;
                }
                for (let i = 0; i < $documents_store.documents.length; i++) {
                    if (
                        $documents_store.documents[i]["doc_category"] ==
                        "Profile Pic"
                    ) {
                        $documents_store.documents.splice(i, 1);
                        console.log("profile pic removed");
                    }
                }
                $documents_store.documents.push(profile_pic_data);
            }

            if (
                present_address_proof_data.pod != null ||
                present_address_proof_data.file_name != null
            ) {
                if($facility_id.facility_id_number){
                    present_address_proof_data.status = "active";
                    present_address_proof_data.resource_id = $facility_id.facility_id_number;
                    present_address_proof_data.user_id = $current_user.username;
                }
                for (let i = 0; i < $documents_store.documents.length; i++) {
                    if (
                        $documents_store.documents[i]["doc_category"] ==
                        "Present Address Proof"
                    ) {
                        $documents_store.documents.splice(i, 1);
                        console.log("present address proof removed");
                    }
                }
                $documents_store.documents.push(present_address_proof_data);
            }

            if (
                address_proof_data.pod != null ||
                address_proof_data.file_name != null
            ) {
                if($facility_id.facility_id_number){
                    address_proof_data.status = "active";
                    address_proof_data.resource_id = $facility_id.facility_id_number;
                    address_proof_data.user_id = $current_user.username;
                }
                for (let i = 0; i < $documents_store.documents.length; i++) {
                    if (
                        $documents_store.documents[i]["doc_category"] ==
                        "Address Proof"
                    ) {
                        $documents_store.documents.splice(i, 1);
                        console.log("address proof removed");
                    }
                }
                $documents_store.documents.push(address_proof_data);
            }
            console.log("document store", $documents_store);

            if ($facility_id.facility_id_number) {
                let sorting_data_result =
                    sorting_facility_details_for_edit($facility_data_store);
                console.log("sorting_data_result", sorting_data_result);
                let edit_facility_response = await edit_facility_function(
                    sorting_data_result
                );
                console.log("edit_facility_response", edit_facility_response);
                if (edit_facility_response.body.status == "green") {
                    show_spinner = false;
                    for(let i=0;i<$documents_store.documents.length;i++){
                         let document_upload_response = await save_or_update_documents_function_1($documents_store.documents[i]);
                        if (
                                document_upload_response.body.status != "green"
                            ) {
                               
                                // toast_text =
                                //     $documents_store.documents[i][
                                //         "doc_category"
                                //     ] + " Document upload failed";
                                // toast_type = "error";
                                error_toast($documents_store.documents[i][
                                        "doc_category"
                                    ] + " Document upload failed")
                                show_spinner = false;
                            }
                            console.log(
                                "document_upload_response",
                                document_upload_response
                            );

                    }
                    let get_updated_documents = await facility_document();
                    console.log("get_updated_documents",get_updated_documents);
                    if(get_updated_documents.body.status == "green"){
                        $duplicate_documents_store.documents = JSON.parse(JSON.stringify(get_updated_documents.body.data));
                        $documents_store.documents = [];

                    }

                    let get_updated_facility_data = await facility_data();
                    console.log("get_updated_facility_data",get_updated_facility_data);
                    if(get_updated_facility_data.body.status == "green"){
                        facility_data_store.set(
                JSON.parse(JSON.stringify(get_updated_facility_data.body.data[0]))
            
            )
    
            duplicate_facility_data_store.set(
                JSON.parse(JSON.stringify(get_updated_facility_data.body.data[0]))
            )
            let temp_date = $facility_data_store.date_of_birth;
            console.log("temp date date of birth", temp_date);
            let temp = new Date(temp_date);
            console.log("temp", temp);
            $facility_data_store['dob'] = get_date_format(temp, "dd-mm-yyyy");

                    }

                    
                    let replaceState = false;
                    setTimeout(
                        goto(
                            routeTo,

                            { replaceState }
                        ),
                        2000
                    );
                }
            } else {
                show_spinner = false;
                let replaceState = false;
                goto(routeTo, { replaceState });
            }
            show_spinner = false;
        }

        // $documents_store.documents.push(address_proof_data);
        // if(work_address != null){

        //     $documents_store.documents.push(present_address_proof_data);
        // }
    }
    function gotoverifycontactnumber() {
        let replaceState = false;
        goto("verifycontactnumber", { replaceState });
    }
    async function verify_facility_name() {
        /////////////
        // $facility_data_store.org_id = "AN"; //delete this
        // $facility_data_store.station_code = "MHAE";

        if ($facility_data_store.facility_name != null) {
            let res = set_facility_id();
            console.log("set_facility_id", res);
            $facility_data_store.facility_id = res;
            console.log(
                "$facility_data_store.facility_id",
                $facility_data_store
            );
        }
        ///////////////////////
        facility_name_message = "";

        if ($facility_data_store.facility_name != null) {
            $facility_data_store.facility_name =
                $facility_data_store.facility_name.trim();
            let verify_name_response = await verify_associate_name();
            console.log("verify_name_response", verify_name_response);
            try {
                if (verify_name_response.body.data == true) {
                    facility_name_message = "";
                } else {
                    facility_name_message = verify_name_response.body.message;
                }
            } catch {
                // toast_text = "Unable to verify facility name";
                // toast_type = "error";
                error_toast("Unable to verify facility name");
            }
        }
    }
    const onFileSelected = (e) => {
        let image = e.target.files[0];
        //   profile_pic_name = image.name;

        //   img_name = image.name;
        let extention_name = image.name.slice((image.name.lastIndexOf(".") - 1 >>> 0) + 2);
        // console.log("pdf size",   pdf.name.slice((pdf.name.lastIndexOf(".") - 1 >>> 0) + 2));
       
        if(extention_name == "pdf" || extention_name == "jpg" || extention_name == "png" || extention_name == "jpeg"){
            if (image.size <= allowed_pdf_size) {
            profile_pic_data.file_name = image.name;

            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
                // profile_pic = e.target.result;
                profile_pic_data.pod = e.target.result;
                console.log("profile_pic", profile_pic);
            };
        } else {
            alert(
                "File size is greater than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB. Please upload a file less than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB ."
            );
        }

        }
        else{
            error_toast("Incorrect File Type!");

        }
        
    };

    const onadders_prrof = (e) => {
        let image = e.target.files[0];
        let extention_name = image.name.slice((image.name.lastIndexOf(".") - 1 >>> 0) + 2);
        // console.log("pdf size",   pdf.name.slice((pdf.name.lastIndexOf(".") - 1 >>> 0) + 2));
       
        if(extention_name == "pdf" || extention_name == "jpg" || extention_name == "png" || extention_name == "jpeg"){
            if (image.size <= allowed_pdf_size) {
            address_proof_copy_name = image.name;
            address_proof_data.file_name = image.name;
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
                work_address_proof_message = "";
                address_proof_copy = e.target.result;
                address_proof_data.pod = e.target.result;
                console.log("address_proof_copy", address_proof_copy);
            };
        } else {
            alert(
                "File size is greater than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB. Please upload a file less than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB ."
            );
        }

        }
        else{
            error_toast("Incorrect File Type!");

        }
       
    };
    function temp_show_value() {
        console.log("present data", present_address);
        console.log("permenant data", work_address);
        let temp;
        facility_data_store.subscribe((value) => {
            temp = value;
        });
        console.log("facility data store", temp);
    }
    const onpresent_address_proof = (e) => {
        let image = e.target.files[0];
        let extention_name = image.name.slice((image.name.lastIndexOf(".") - 1 >>> 0) + 2);
        // console.log("pdf size",   pdf.name.slice((pdf.name.lastIndexOf(".") - 1 >>> 0) + 2));
       
        if(extention_name == "pdf" || extention_name == "jpg" || extention_name == "png" || extention_name == "jpeg"){
            if (image.size <= allowed_pdf_size) {
            present_address_proof_copy_name = image.name;
            present_address_proof_data.file_name = image.name;
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
                present_address_proof_copy = e.target.result;
                present_address_proof_data.pod = e.target.result;
                console.log(
                    "present_address_proof_copy",
                    present_address_proof_copy
                );
            };
        } else {
            alert(
                "File size is greater than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB. Please upload a file less than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB ."
            );
        }

        }
        else{
            error_toast("Incorrect File Type!");

        }
        
    };
    async function verify_email() {
        if (!$facility_data_store.facility_email.match(email_pattern)) {
            facility_email_message = "Invalid Email format";
            email_check = false;
            // $facility_data_store.facility_email = "";
        } else {
            if ($facility_id.facility_id_number) {
                if (
                    $facility_data_store.facility_email !=
                    $duplicate_facility_data_store.facility_email
                ) {
                    let verify_email_response = await verify_associate_email();
                    console.log("verify_email_response", verify_email_response);
                    try {
                        if (verify_email_response.body.data == true) {
                            facility_email_message = "";
                            email_check = true;
                        } else {
                            facility_email_message =
                                verify_email_response.body.message;
                            email_check = false;
                        }
                    } catch {
                        email_check = false;
                        // toast_text = "Unable to verify email";
                        // toast_type = "error";
                        error_toast("Unable to verify email");
                    }
                }else{
                    facility_email_message = "";
                    email_check = true;

                }
            } else {
                let verify_email_response = await verify_associate_email();
                console.log("verify_email_response", verify_email_response);
                try {
                    if (verify_email_response.body.data == true) {
                        facility_email_message = "";
                        email_check = true;
                    } else {
                        facility_email_message =
                            verify_email_response.body.message;
                        email_check = false;
                    }
                } catch {
                    email_check = false;
                    // toast_text = "Unable to verify email";
                    // toast_type = "error";
                    error_toast("Unable to verify email");
                }
            }
        }
    }
    $: {
        console.log("inside reactive block");
        $facility_data_store.owner_name = $facility_data_store.facility_name;

        // let response =set_facility_id();
        // console.log("response",response);
        // $facility_data_store.facility_id = response;
        // let associate_name =$facility_data_store.facility_name
        // associate_name = associate_name.replace(/ /g, "_");
        // $facility_data_store.facility_id = associate_name + "_" + $facility_data_store.station_code.toLowerCase()
    }
    // $:{
    //     let demo = $facility_data_store.facility_name;
    //     let res = set_facility_id();
    //     console.log("res",res);
    //     $facility_data_store.facility_id = res;
    // }

    $: {
        console.log("date in reactive block", date);

        if (date) {
            let dob_date = new Date(date);

            console.log("dob_date", dob_date);
            dob_date = get_date_format(dob_date, "dd-mm-yyyy");
            console.log("dob_date", dob_date);

            // console.log(typeof dob_date);
            // if (dob_date < 10) {
            //     dob_date = "0" + String(dob_date);
            // }
            // console.log("dob_date", dob_date);
            // let dob_month = date.getMonth() + 1;
            // console.log(typeof dob_month);
            // if (dob_month < 10) {
            //     dob_month = "0" + String(dob_month);
            // }

            // $facility_data_store.dob = String(
            //     date.getDate() +
            //         "-" +
            //         (date.getMonth() + 1) +
            //         "-" +
            //         date.getFullYear()
            // );
            $facility_data_store.dob = dob_date;
            console.log("facility store", $facility_data_store);
        }
    }
    function save_address_to_store() {
        $facility_data_store.address = [];
        final_address = [];

        if (
            work_address.city != null &&
            work_address.address != null &&
            work_address.postal != null
        ) {
            final_address.push(work_address);
        }
        if (address_check == "No") {
            if (
                present_address.location_id != null &&
                present_address.address != null &&
                present_address.postal != null
            ) {
                final_address.push(present_address);
            }
        }
        // facility_data_store.set({address: final_address});
        $facility_data_store.address = final_address;
        console.log(
            "$facility_data_store.address",
            $facility_data_store.address
        );
    }
    // function testing_function(){
    //     console.log("month",String(date.getMonth()+1));
    //     console.log("day",String(date.getDate()));
    //     console.log("year",String(date.getFullYear()));
    // }
    async function save_facility() {}
    function dob_clicked() {
        console.log("dob clicked");
    }
    function delete_files(file_name) {
        for (let i = 0; i < $documents_store.documents.length; i++) {
            if (
                $documents_store.documents[i]["doc_category"] ==
                file_name["doc_category"]
            ) {
                $documents_store.documents.splice(i, 1);
                console.log("document deleted from document store");
            }
        }
        file_name["file_name"] = null;
        file_name["pod"] = null;
        if (file_name["doc_category"] == "Profile Pic") {
            profile_pic_data = profile_pic_data;
        } else if (file_name["doc_category"] == "Address Proof") {
            address_proof_data = address_proof_data;
        } else if (file_name["doc_category"] == "Present Address Proof") {
            present_address_proof_data = present_address_proof_data;
        }
    }
    $: {
        console.log("test_date", test_date);
        console.log("type of test date", typeof test_date);
        const d = new Date(test_date);
        console.log("date", d);
    }

    function on_city_change_event() {
        work_address.address = null;
        work_address.postal = null;
    }
    function on_present_city_change() {
        present_address.address = null;
        present_address.postal = null;
    }
    function verify_pincode(pin_code, address_type) {
        console.log("inside verify pincode");
        if (!pin_code.match(pincode_pattern)) {
            if (address_type == "work_address") {
                work_address_postal_message = "Invalid Pincode format";
            } else if (address_type == "present_address") {
                present_address_postal_message = "Invalid Pincode format";
            }

            // $facility_data_store.facility_email = "";
        } else {
            if (address_type == "work_address") {
                work_address_postal_message = "";
            } else if (address_type == "present_address") {
                present_address_postal_message = "";
            }
        }
    }
</script>

{#if show_spinner}
    <Spinner />
{/if}

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <p class="breadcrumbtext">
                <span class="text-textgrey pr-1 text-base"
                    >Home / {#if !$facility_id.facility_id_number}
                        Onboard New
                    {:else}Edit{/if} / {#if $category_store_name.category_name}
                        {$category_store_name.category_name}
                    {:else}{/if}
                </span>
                <span class="flex xs:text-base xs:items-center">
                    {#if $facility_id.facility_id_number}
                        <div class="mx-3">
                            Facility-ID: {$facility_id.facility_id_number}
                        </div>
                    {/if}
                </span>
            </p>
        </div>
    </div>
    <div class="contentsection flexwrapSm">
        <div class="tablinksForm w100xs">
            <ul class="bgtablinks ">
                <Side_content_component
                    facility_type={$facility_data_store.facility_type}
                    {page_name}
                />
            </ul>
        </div>
        <div class="w-widthforFormSection w100xs ">
            <div class="onboardForm ">
                <div class="formTextSection">
                    <p class="smxslabel">Associate Details</p>
                    <p class="formHeadingLabel ">
                        Submit basic details of associate
                    </p>
                    <p class="formRequiredtext ">
                        <span class="text-mandatorysign">* </span>marked fields
                        are required.
                    </p>
                </div>
                <form action="#">
                    <div class="formElements">
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Associate Name <span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/Subtract.png"
                                            class="w-6 h-auto text-white"
                                            alt=""
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        class="inputbox"
                                        bind:value={$facility_data_store.facility_name}
                                        on:blur={() => verify_facility_name()}
                                    />
                                    <!-- <div class="text-red-500">
                                {facility_name_message}
                            </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {facility_name_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <!-- <button on:click|preventDefault={()=>{temp_show_value()}} class="saveandproceed">temp</button> -->
                            <div class="formGroup ">
                                <label class="formLable ">Email ID </label>
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/email.png"
                                            class="w-6 h-auto text-white"
                                            alt=""
                                        />
                                    </span>
                                    <input
                                        type="Email"
                                        class="inputbox"
                                        bind:value={$facility_data_store.facility_email}
                                        on:blur={() => verify_email()}
                                    />
                                    <!-- <div class="text-red-500">
                                        {facility_email_message}
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {facility_email_message}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Date of Birth <span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <!-- <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/date.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span> -->
                                    <!-- <input type="Email" class="inputbox"> -->
                                    <!-- <DateInput
                                        placeholder="testing"
                                        bind:value={date}
                                        format="dd/MM/yyyy"
                                        max={max_date}
                                    /> -->
                                    <input
                                        type="date"
                                        onkeydown="return false"
                                        max={temp_max_date}
                                        bind:value={date}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {facility_dob_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup py-1">
                                <label class="formLable "
                                    >Associate Photo
                                </label>
                                <div class="formInnerGroup ">
                                    <span class="profileimage hidden">
                                        <!-- <img src="{$img_url_name.img_name}/Maskprofile.jpg"
                                    class="associateProfile" alt="">
                                <span>dhiraj-shah.jpeg </span>
                                <span><img src="{$img_url_name.img_name}/closeblue.png" alt=""></span> -->
                                        <label class="cursor-pointer ">
                                            <div
                                                class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px"
                                            >
                                                Upload
                                            </div>
                                            <input
                                                type="file"
                                                class="hidden"
                                                accept=".jpg, .jpeg, .png, .pdf"
                                                on:change={(e) =>
                                                    onFileSelected(e)}
                                                bind:this={fileinput}
                                            />
                                        </label>
                                        <div class="flex">
                                            {#if profile_pic_data.file_name}
                                                <p>
                                                    {profile_pic_data.file_name}
                                                </p>
                                                <img
                                                    on:click={() =>
                                                        delete_files(
                                                            profile_pic_data
                                                        )}
                                                    class="pl-2 cursor-pointer"
                                                    src="{$img_url_name.img_name}/blackclose.svg"
                                                    alt=""
                                                />
                                            {/if}
                                            {#if $facility_id.facility_id_number}
                                            {#if edit_profile_pic_data.file_name}
                                                <a
                                                    href={$page.url.origin +
                                                        edit_profile_pic_data.file_url}
                                                        target="_blank"
                                                    class="text-blue-600 text-decoration-line: underline"
                                                    >{edit_profile_pic_data.file_name}</a
                                                >
                                            {/if}
                                        {/if}
                                            
                                           
                                        </div>
                                        <div class="flex">
                                           
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {present_address_proof_data_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >City <span class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/location1.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <!-- <input type="Email" class="inputbox"> -->
                                    <select
                                        name=""
                                        id=""
                                        class="inputbox"
                                        bind:value={work_address.city}
                                        on:change={() => on_city_change_event()}
                                    >
                                        <option value="" selected disabled
                                            >Select City</option
                                        >
                                        {#each city_data as city}
                                            <option value={city.city_name}
                                                >{city.city_name} ({city.state_name})</option
                                            >
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {work_address_city_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Permanent Address <span
                                        class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/location1.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <!-- <input type="Email" class="inputbox"> -->
                                    <textarea
                                        id="w3review"
                                        name="w3review"
                                        rows="4"
                                        cols="50"
                                        class="inputbox"
                                        on:blur={()=>{
                                            work_address.address = (work_address.address).trim()
                                        }}
                                        bind:value={work_address.address}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {work_address_address_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable invisible xs:hidden">Permanent Address <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="{$img_url_name.img_name}/location1.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="Email" class="inputbox">
                        </div>
                    </div>
                </div> -->
                        <div class="flex">
                            <div class="formGroup">
                                <label class="formLable "
                                    >Address Proof Copy<span
                                        class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <label class="cursor-pointer inline-block">
                                        <div
                                            class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px"
                                        >
                                            Upload
                                        </div>
                                        <input
                                            type="file"
                                            class="hidden"
                                            accept=".jpg, .jpeg, .png,.pdf"
                                            on:change={(e) => onadders_prrof(e)}
                                            bind:this={fileinput}
                                        />
                                    </label>
                                    <div class="flex">
                                        {#if address_proof_data.file_name}
                                            <p>
                                                {address_proof_data.file_name}
                                            </p>
                                            <img
                                                on:click={() =>
                                                    delete_files(
                                                        address_proof_data
                                                    )}
                                                class="pl-2 cursor-pointer"
                                                src="{$img_url_name.img_name}/blackclose.svg"
                                                alt=""
                                            />
                                        {/if}
                                        {#if $facility_id.facility_id_number}
                                            {#if edit_address_proof_data.file_name}
                                                <a
                                                    href={$page.url.origin +
                                                        edit_address_proof_data.file_url}
                                                        target="_blank"
                                                    class="text-blue-600 text-decoration-line: underline"
                                                    >{edit_address_proof_data.file_name}</a
                                                >
                                            {/if}
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {work_address_proof_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable"
                                    >Pin Code<span class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/pincode.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <input
                                        type="Email"
                                        class="inputbox"
                                        on:blur={() =>
                                            verify_pincode(
                                                work_address.postal,
                                                "work_address"
                                            )}
                                        bind:value={work_address.postal}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {work_address_postal_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Permanent Address Same As<br
                                    />Present/Shipping Address ?
                                    <span class="mandatoryIcon">*</span></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/location1.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <!-- <input type="Email" class="inputbox"> -->
                                    <select
                                        name=""
                                        id=""
                                        class="inputbox"
                                        bind:value={address_check}
                                    >
                                        <option value="" selected disabled
                                            >Select</option
                                        >
                                        <option value="Yes">yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {address_check_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {#if address_check == "No"}
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable "
                                        >Select Associate's<br
                                        />Present/Shipping City
                                        <span class="mandatoryIcon">*</span
                                        ></label
                                    >
                                    <div class="formInnerGroup ">
                                        <span class="searchicon">
                                            <img
                                                src="{$img_url_name.img_name}/location1.png"
                                                class="placeholderIcon"
                                                alt=""
                                            />
                                        </span>
                                        <!-- <input type="Email" class="inputbox"> -->
                                        <select
                                            name=""
                                            id="select_working_city"
                                            class="inputbox"
                                            bind:value={present_address.location_id}
                                            on:change={() =>
                                                on_present_city_change()}
                                        >
                                            <option value="" selected disabled
                                                >Select City</option
                                            >
                                            {#each city_data as city}
                                                <option
                                                    value={city.city_id}
                                                    on:click={() => {
                                                        alert(city);
                                                    }}
                                                    >{city.city_name}({city.state_name})</option
                                                >
                                            {/each}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable invisible" />
                                    <div class="formInnerGroup mt-1">
                                        <div class="text-red-500 text-xs">
                                            {present_address_city_message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable "
                                        >Enter Associate's<br />
                                        Present/Shipping Address
                                        <span class="mandatoryIcon">*</span
                                        ></label
                                    >
                                    <div class="formInnerGroup ">
                                        <span class="searchicon">
                                            <img
                                                src="{$img_url_name.img_name}/location1.png"
                                                class="placeholderIcon"
                                                alt=""
                                            />
                                        </span>
                                        <!-- <input type="Email" class="inputbox"> -->
                                        <textarea
                                            id="w3review"
                                            name="w3review"
                                            rows="4"
                                            cols="50"
                                            class="inputbox"
                                            on:blur={()=>{present_address.address = (present_address.address).trim()}}
                                            bind:value={present_address.address}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable invisible" />
                                    <div class="formInnerGroup mt-1">
                                        <div class="text-red-500 text-xs">
                                            {present_address_address_message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable"
                                        >Pin Code<span class="mandatoryIcon"
                                            >*</span
                                        ></label
                                    >
                                    <div class="formInnerGroup ">
                                        <span class="searchicon">
                                            <img
                                                src="{$img_url_name.img_name}/pincode.png"
                                                class="placeholderIcon"
                                                alt=""
                                            />
                                        </span>
                                        <input
                                            type="Email"
                                            class="inputbox"
                                            on:blur={() =>
                                                verify_pincode(
                                                    present_address.postal,
                                                    "present_address"
                                                )}
                                            bind:value={present_address.postal}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable invisible" />
                                    <div class="formInnerGroup mt-1">
                                        <div class="text-red-500 text-xs">
                                            {present_address_postal_message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup">
                                    <label class="formLable "
                                        >Upload Associate's Present/<br
                                        />Shipping Address Proof</label
                                    >
                                    <div class="formInnerGroup ">
                                        <label
                                            class="cursor-pointer inline-block"
                                        >
                                            <div
                                                class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px"
                                            >
                                                Upload
                                            </div>
                                            <input
                                                type="file"
                                                class="hidden"
                                                accept=".jpg, .jpeg, .png,.pdf"
                                                on:change={(e) =>
                                                    onpresent_address_proof(e)}
                                                bind:this={fileinput}
                                            />
                                        </label>
                                        <div class="flex">
                                            {#if present_address_proof_data.file_name}
                                                <p>
                                                    {present_address_proof_data.file_name}
                                                </p>
                                                <img
                                                    on:click={() =>
                                                        delete_files(
                                                            present_address_proof_data
                                                        )}
                                                    class="pl-2 cursor-pointer"
                                                    src="{$img_url_name.img_name}/blackclose.svg"
                                                    alt=""
                                                />
                                            {/if}
                                            {#if $facility_id.facility_id_number}
                                                {#if edit_present_address_proof_data.file_name}
                                                    <a
                                                        href={$page.url +
                                                            edit_present_address_proof_data.file_url}
                                                            target="_blank"
                                                        class="text-blue-600 text-decoration-line: underline"
                                                        >{edit_present_address_proof_data.file_name}</a
                                                    >
                                                {/if}
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                    <div class="formElements">
                        <div class="flex">
                            <div class="formGroupNote">
                                <label class="formLable xs:hidden sm:hidden" />
                                <div class="formInnerGroupNote">
                                    <p class="noteDescription">
                                        <span class="font-medium">Note:</span>
                                        Address on the documents has to be same as
                                        given.
                                    </p>
                                    <p class="noteDescription mt-2">
                                        <span class="font-medium">Note:</span>
                                        Photo must be clear and in JPG, PNG, or PDF
                                        format to process faster verification
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div>
                <DateInput placeholder="testing" bind:value={date}  format="dd/MM/yyyy" max={max_date}/>
            </div>
            <div>
                {date}
            </div>
            <div>
                {d}
            </div>
            <div>
                {$facility_data_store.date_of_birth}
            </div>
            <div>
                {avatar}
            </div> -->
                    <!-- <div>{fileinput}</div> -->
                </form>
            </div>
            <div class="onboardFormNot ">
                <div class="formFooterAction">
                    <div
                        on:click|preventDefault={() => {
                            gotoverifycontactnumber();
                        }}
                        class="backButton"
                    >
                        <img
                            src="{$img_url_name.img_name}/arrowleft.png"
                            alt=""
                        />
                    </div>
                    <button
                        on:click|preventDefault={() => {
                            gotoidentityproof();
                        }}
                        class="saveandproceed">Save & Proceed</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<Toast type={toast_type} text={toast_text} />
<SvelteToast />
