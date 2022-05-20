<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { org_name } from "../stores/organisation_store";
    import {
        get_user_scope_function,
        get_facility_types_function,
        get_vendor_by_config_method,
        get_pravesh_properties_method,
        get_domian_from_org_api_method,
        get_category_from_facility_type_api_method,
        get_city_id_from_org_station_api_method
    } from "../services/workdetails_services";
    import { station_type_name } from "../stores/station_store";
    import { facility_data_store } from "../stores/facility_store";
    import { get_facility_type_link } from "../stores/facility_store";
    import { msme_store, documents_store } from "../stores/document_store";
    import { current_user } from "../stores/current_user_store";
    import { get_current_user_function } from "../services/dashboard_services";
    import { get_organistaion_method } from "../services/organisation_services";
    import {
        allowed_pdf_size,
        sorting_pravesh_properties,
    } from "../services/pravesh_config";
    import { img_url_name } from "../stores/flags_store";
    import Side_content_component from "./side_content_scetion.svelte";
    import { page } from "$app/stores";
    import { get_categories_list } from "../services/category_services";
    let category_list = [];
    import Toast from "./components/toast.svelte";
    let toast_text = "";
    let toast_type = null;
    // let page_name;
    // import {get_verticles_ui_fun} from '../services/business_vertical_services';
    import { get_verticles_fun } from "../services/business_vertical_services";
    import {category_store_name} from '../stores/category_store';
    import {duplicate_documents_store} from "../stores/duplicate_document_store";

    let org_list = [];
    let verticle_list = [];

    // import PdfViewer from 'svelte-pdf';
    import { each } from "svelte/internal";
    import { vercticle_name } from "../stores/verticle_store";
import { facility_id } from "../stores/facility_id_store";
    // import { vercticle_name } from "src/stores/verticle_store";
    let temp_name;
    let org_array = [];
    let valid = true;
    let page_name = null;
    let show_edit_options = true;
    let show_onboard_option = false;
    let category_disabled = true;
    let facility_type_disabled = false;

    let org_id = null;
    let msme_value = null;
    let city_value = null;
    let station_value = null;
    let fileinput;
    let pdf_name;
    let city_list = [];
    let station_list = [];
    let user_scope_response = null;
    let vendor_list_response = null;
    let scope_list = {};
    let associate_type_list = [];
    let vendor_list = [];
    let msme_agreement = false;
    let edit_msme_certificate ;
    let edit_document_link = null;

    let routeTo = "";
    let msme_data = {
        doc_category: "MSME Certificate",
        doc_number: "",
        doc_type: "msme-certi",
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let edit_msme_data = {
        doc_category: "MSME Certificate",
        doc_number: "",
        doc_type: "msme-certi",
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let org_message = "";
    let city_message = "";
    let station_message = "";
    let associate_type_message = "";
    let vendor_message = "";
    let msme_message = "";

    function route() {
        // let valid = true;
        valid = true;
        if ($facility_data_store.org_id == null) {
            valid = false;
            org_message = "Please select an organisation";
        } else {
            org_message = "";
        }

        if (city_value == null) {
            valid = false;
            city_message = "Please select a city";
        } else {
            city_message = "";
        }

        if ($facility_data_store.station_code == null) {
            // console.log("$facility_data_store.station_code",$facility_data_store.station_code);
            valid = false;
            station_message = "Please select a station";
        } else {
            station_message = "";
        }

        if ($facility_data_store.facility_type == null) {
            valid = false;
            associate_type_message = "Please select a facility type";
        } else {
            associate_type_message = "";
        }

        if ($facility_data_store.vendor_code == null) {
            valid = false;
            vendor_message = "Please select a vendor";
        } else {
            vendor_message = "";
        }

        if ($facility_data_store.msme_registered == null) {
            valid = false;

            msme_message = "Please select a msme status";
        } else if ($facility_data_store.msme_registered == "0") {
            console.log("msme agreement value", msme_agreement);
            console.log(
                "non_msme_confirmed_by",
                $facility_data_store.non_msme_confirmed_by == null
            );
            console.log(
                "non_msme_confirmed_on",
                $facility_data_store.non_msme_confirmed_by == null
            );
            
            console.log("msme aggrement test", msme_agreement == 1);

            if (
                $facility_data_store.non_msme_confirmed_by == null ||
                $facility_data_store.non_msme_confirmed_by == null ||
                msme_agreement != 1
            ) {
                console.log(
                    "$facility_data_store.non_msme_confirmed_by",
                    $facility_data_store.non_msme_confirmed_by
                );
                console.log(
                    "$facility_data_store.non_msme_confirmed_by",
                    $facility_data_store.non_msme_confirmed_by
                );
                valid = false;
                msme_message = "Please accept NON-MSME Declaration";
            } else {
                msme_message = "";
            }
        } else if ($facility_data_store.msme_registered == "1") {
            if($facility_id.facility_id_number){
                msme_message = "";

            }else{
                if (msme_data.file_name == null) {
                valid = false;
                msme_message = "Please upload a msme certificate";
            } else {
                msme_message = "";
            }

            }
            
        } else {
            msme_message = "";
        }

        // if($facility_data_store.msme_registered == "0"){
        //     if($facility_data_store.non_msme_confirmed_by == null || $facility_data_store.non_msme_confirmed_by == null){
        //         valid = false;
        //         msme_message = "Please accept NON-MSME Declaration";
        //     }
        //     else{
        //         msme_message = "";
        //     }
        // }

        // if($facility_data_store.msme_registered == "1"){
        //     if(msme_data.file_name == null){
        //         valid = false;
        //         msme_message = "Please upload a msme certificate";
        //     }
        //     else{
        //         msme_message = "";
        //     }
        // }

        if (
            $facility_data_store.msme_registered == 1 ||
            $facility_data_store.msme_registered == "1"
        ) {
            if (msme_data.file_name && msme_data.pod) {
                for (let i = 0; i < $documents_store.documents.length; i++) {
                    if (
                        $documents_store.documents[i]["doc_category"] ==
                        "MSME Certificate"
                    ) {
                        console.log("msme deleted");
                        $documents_store.documents.splice(i, 1);
                    }
                }
                $documents_store.documents.push(msme_data);
                console.log("msme_data", $documents_store);
            }
        }
        if (valid) {
            let replaceState = false;

            goto(routeTo, { replaceState });
        }
    }

    function routeToWorkforce() {
        let replaceState = false;
        goto("workforce", { replaceState });
    }
    function select_vendor_name(sel) {
        // console.log(sel);
        var sel = document.getElementById("vendor_selection");
        // alert(sel.options[sel.selectedIndex].text);
        console.log("station data", $facility_data_store.station_code);
        console.log("associate type", $facility_data_store.facility_type);

        // facility_data_store.set({
        //     vendor_name: sel.options[sel.selectedIndex].text
        // });
        $facility_data_store.vendor_name = sel.options[sel.selectedIndex].text;

        console.log("station data", $facility_data_store.station_code);
        console.log("associate type", $facility_data_store.facility_type);
        console.log("vendor name", $facility_data_store.vendor_name);
    }
    function select_store_id() {
        // console.log("store id",document.getElementById("station_id").value);
        // facility_data_store.set({
        //     store_id: document.getElementById("station_id").value
        // });
        $facility_data_store.store_id = $facility_data_store.station_code;
        let temp;
        facility_data_store.subscribe((value) => {
            temp = value.store_id;
        });
        console.log("store_id_temp", temp);
    }

    routeTo = "verifycontactnumber";
    onMount(async () => {
        console.log("page_name", page_name);
        console.log("page info",$page.url);
        console.log("page pic",$page.url.origin+"/files/"+edit_msme_data['file_name']);
        console.log("window location", window.location.href);
        
        


        if($facility_id.facility_id_number){
            show_edit_options = false;
            show_onboard_option = true;
            facility_type_disabled = true;
            let get_domain_response = await get_domian_from_org_api_method();
            console.log("get_domain_response", get_domain_response);
            if(get_domain_response.body.data.length >0){
                $vercticle_name.verticle = get_domain_response.body.data[0]['domain'];

            }
            else{
                toast_text = "No domain found for this organization";
                toast_type = "error";
            }

            let get_category_response = await get_category_from_facility_type_api_method();
            console.log("get_category_response", get_category_response);
            if(get_category_response.body.data.length >0){
                $category_store_name.category_name = get_category_response.body.data[0]['category'];
            }
            else{
                toast_text = "No category found for this facility type";
                toast_type = "error";
            }

            let get_city_id_from_org_station_api_method_response = await get_city_id_from_org_station_api_method();
            console.log("get_city_id_from_org_station_api_method_response", get_city_id_from_org_station_api_method_response);
            if(get_city_id_from_org_station_api_method_response.body.data.length >0){
                city_value = get_city_id_from_org_station_api_method_response.body.data[0]['location_id'];
                
            }
            else{
                toast_text = "No city found for this station";
                toast_type = "error";
            }

            if($facility_data_store.msme_registered || $facility_data_store.msme_registered == "1"){
                console.log("msme_registered", $facility_data_store.msme_registered);
                $facility_data_store.msme_registered = "1";
                console.log("duplicate documents store", $duplicate_documents_store.documents);
                for(let i=0;i<$duplicate_documents_store.documents.length;i++){
                    if($duplicate_documents_store.documents[i]["doc_category"] == "MSME Certificate"){
                        console.log("msme_certificate", $duplicate_documents_store.documents[i]);
                        // edit_msme_data.file_name = $documents_store.documents[i]["file_name"];
                        // edit_msme_data['file_url'] = $documents_store.documents[i]["file_url"];
                        edit_msme_data = $duplicate_documents_store.documents[i]
                        console.log("edit_msme_data", edit_msme_data);  
                        edit_document_link=$page.url.origin+"/files/"+edit_msme_data['file_name'];
                    }
                }
                

            }
            else{
                $facility_data_store.msme_registered = "0";

            }

            

        }
        let verticles_response = await get_verticles_fun();
        if (verticles_response.body.status == "green") {
            console.log("verticles api response", verticles_response);
            org_list = verticles_response.body.data;
            console.log(org_list);
            // toast_type = "warning";
            // toast_text = "verticles fetched success"
        } else {
            toast_text = "Unable to fetch Verticles";
            toast_type = "error";
        }

        for (let i = 0; i < org_list.length; i++) {
            if (!verticle_list.includes(org_list[i].domain)) {
                verticle_list.push(org_list[i].domain);
            }
        }
        verticle_list = verticle_list;
        console.log("verticle list", verticle_list);
        // org_name.subscribe(value =>{
        let category_response = await get_categories_list();

        console.log("category_response", category_response);
        if (category_response.body.status == "green") {
            if (category_response.body.status == "green") {
                for (let i = 0; i < category_response.body.data.length; i++) {
                    category_list.push(
                        category_response.body.data[i]["category"]
                    );
                }
            } else {
                alert("Category list not found");
            }

            console.log("category_list", category_list);
        } else {
            toast_type = "error";
            toast_text = "Category list not found";
        }
        category_list = category_list;

        //   org_id = value.org_id;
        // });
        console.log("facility data store", $facility_data_store);
        // $vercticle_name.veurticle =

        page_name = $page.url["pathname"].split("/").pop();
        // url.split("/").pop()
        
        let get_pravesh_properties_response =
            await get_pravesh_properties_method();
        console.log(
            "get_pravesh_properties_response",
            get_pravesh_properties_response
        );
        if (get_pravesh_properties_response.body.status == "green") {
            sorting_pravesh_properties(
                get_pravesh_properties_response.body.data
            );
        } else {
            toast_type = "error";
            toast_text = "Error in fetching pravesh properties";
        }

        let org_response = await get_organistaion_method();
        if (org_response.body.data) {
            console.log("org_response", org_response);
            org_array = org_response.body.data;
            console.log("org_array", org_array);

            facility_data_store.subscribe((value) => {
                org_id = value.org_id;
            });
            console.log("org_id", org_id);
        } else {
            toast_type = "error";
            toast_text = "Error in fetching organisation List";
        }

        user_scope_response = await get_user_scope_function();
        if (user_scope_response.body.status == "green") {
            console.log("user_scope_response", user_scope_response);
            for (let i = 0; i < user_scope_response.body.data.length; i++) {
                if (
                    !city_list.includes(
                        user_scope_response.body.data[i]["location_name"]
                    )
                ) {
                    city_list.push({
                        city_name:
                            user_scope_response.body.data[i]["location_name"],
                        location_id:
                            user_scope_response.body.data[i]["location_id"],
                    });
                }
            }
            city_list = city_list;
            console.log("city_list", city_list);

            scope_list = scope_list;
            console.log("scope_list", scope_list);
            let temp;

            get_facility_type_link.subscribe((value) => {
                temp = value;
            });
            console.log("facility link", temp);
        } else {
            toast_type = "error";
            toast_text = "Error in fetching user scope";
        }

        vendor_list_response = await get_vendor_by_config_method();
        if (vendor_list_response.body.status == "green") {
        } else {
            toast_type = "error";
            toast_text = "Error in fetching vendor list";
        }

        console.log("vendor list", vendor_list_response);
    });
    async function get_current_user() {
        console.log("inside get_current_user");
        let current_user_response = await get_current_user_function();
        console.log("current_user_response", current_user_response);
        if (current_user_response.body.status == "green") {
            console.log("inside current_user_response if statement");
            $current_user.email = current_user_response.body.data.user.email;
            $current_user.name = current_user_response.body.data.user.name;
            $current_user.username =
                current_user_response.body.data.user.username;
            console.log("$current_user", $current_user);
        } else {
            alert("Session user not found error!");
        }
    }

    async function get_session_user() {
        console.log("inside get session user");
        // console.log(msme_agreement);
        // console.log(typeof msme_agreement);
        //TODO: Possible bug in sveltekit where the value is not being reversed.
        if (msme_agreement == 0) {
            // console.log(
            //     "inside msme agreement if statement",
            // );
            if ($current_user.email == null) {
                // console.log("inside  $current_user.email if statement");
                console.log("inside get_current_user");
                let current_user_response = await get_current_user_function();
                console.log("current_user_response", current_user_response);
                if (current_user_response.body.status == "green") {
                    console.log("inside current_user_response if statement");
                    $current_user.email =
                        current_user_response.body.data.user.email;
                    $current_user.name =
                        current_user_response.body.data.user.name;
                    $current_user.username =
                        current_user_response.body.data.user.username;
                    console.log("$current_user", $current_user);
                } else {
                    alert("Session user not found error!");
                }

                // console.log("current on",$facility_data_store.non_msme_confirmed_on);

                // console.log("email",current_user_response.body.data);
            } else {
                // alert("Session User not found");
                console.log("current user", $current_user);
            }
            $facility_data_store.non_msme_confirmed_by = $current_user.username;
            var current_date = new Date();
            console.log("current date", current_date);
            console.log("type of date", typeof current_date);
            var current_day = current_date.getDate();
            var current_month = current_date.getMonth() + 1;
            var current_year = current_date.getFullYear();
            var current_hour = current_date.getHours();
            var current_minutes = current_date.getMinutes();
            var current_seconds = current_date.getSeconds();
            $facility_data_store.non_msme_confirmed_on = String(
                current_year +
                    "-" +
                    current_month +
                    "-" +
                    current_day +
                    " " +
                    current_hour +
                    ":" +
                    current_minutes +
                    ":" +
                    current_seconds
            );
            console.log(
                "$facility_data_store.non_msme_confirmed_on",
                $facility_data_store.non_msme_confirmed_on
            );
            console.log(
                "$facility_data_store.non_msme_confirmed_by",
                $facility_data_store.non_msme_confirmed_by
            );
        }
    }
    $: {
        if (user_scope_response != null) {
            station_list = [];

            for (let i = 0; i < user_scope_response.body.data.length; i++) {
                if (
                    city_value ==
                    user_scope_response.body.data[i]["location_id"]
                ) {
                    for (
                        let j = 0;
                        j < user_scope_response.body.data[i]["stations"].length;
                        j++
                    ) {
                        station_list.push(
                            user_scope_response.body.data[i]["stations"][j]
                        );
                    }
                    break;
                }
            }
            station_list = station_list;

            console.log("station_list", station_list);
        }
    }
    $: {
        if (vendor_list_response != null) {
            vendor_list = [];
            for (let i = 0; i < vendor_list_response.body.data.length; i++) {
                if (
                    city_value ==
                    vendor_list_response.body.data[i]["location_id"]
                ) {
                    vendor_list.push(vendor_list_response.body.data[i]);
                }
            }
            vendor_list = vendor_list;
            console.log("vendor list", vendor_list);
        }
    }
    async function get_facility_types() {
        let facility_type_response = await get_facility_types_function();
        console.log("facility_type_response", facility_type_response);
        if (facility_type_response.body.status == "green") {
            associate_type_list = facility_type_response.body.data;
            console.log("associate_type_list", associate_type_list);
        } else {
            toast_type = "error";
            toast_text = "Error in fetching facility type";
        }
    }
    $: {
        // let demo ;
        // station_type_name.subscribe(value =>{
        //     demo = value.station_name;
        // });

        // let temp;
        // get_facility_type_link.subscribe((value =>{
        //     temp = value;
        // }));
        let demo = $get_facility_type_link;
        console.log("facility type link", demo);

        get_facility_types();
    }
    $: {
        $facility_data_store.store_name = $facility_data_store.vendor_code;
    }
    // $:{
    //    facility_data_store.set({
    //        owner_name: $facility_data_store.vendor_code
    //    });
    //    console.log("owner name",$facility_data_store.owner_name);
    // }

    let avatar;

    const onFileSelected = (e) => {
        // var cookie_data = document.cookie;
        // console.log("cookie data", cookie_data);
        let pdf = e.target.files[0];
        console.log("pdf size", pdf.size);
        if (pdf.size < allowed_pdf_size) {
            pdf_name = pdf.name;
            // msme_store.set({
            //     file_name: pdf.name
            // });
            // $:msme_store.set({
            //     file_name: pdf.name
            // });
            // $msme_store.file_name = pdf.name;
            msme_data.file_name = pdf.name;

            // temp_name = $msme_store.file_name;
            // msme_store.subscribe((value) => {
            //     temp_name = value.file_name;
            // });
            // console.log("store",);

            console.log("pdf name", msme_data.file_name);
            let reader = new FileReader();
            reader.readAsDataURL(pdf);
            reader.onload = (e) => {
                fileinput = e.target.result;
                // msme_store.set({
                //     pod: e.target.result
                // });
                // $msme_store.pod = fileinput;
                msme_data.pod = fileinput;
                // console.log("msme data pod",msme_data.pod);
                if (!$current_user.email) {
                    console.log("inside if statement file upload");
                    get_current_user();
                }
                // $msme_store.user_id = $current_user.email;
                msme_data.user_id = $current_user.email;
                msme_data = msme_data;

                console.log("msme store user id", msme_data);
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
    };
    //     function open_pdf_window(base_64_string){
    //         let new_url = base_64_string.substring(base_64_string.indexOf(",")+1);
    //         console.log("new_url", new_url);
    //         let pdfWindow = window.open("")
    // pdfWindow.document.write(
    //     "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
    //     encodeURI(new_url) + "'></iframe>"
    // )
    //     }
    function delete_files(file_name) {
        // console.log("file delete function");

        // file_name = file_name;
        //     $documents_store.documents.push(msme_data)
        // console.log("before delete", $documents_store.documents);
        for (let i = 0; i < $documents_store.documents.length; i++) {
            if (
                $documents_store.documents[i]["doc_category"] ==
                file_name["doc_category"]
            ) {
                $documents_store.documents.splice(i, 1);
                console.log("msme deleted from document store");
            }
        }
        file_name["file_name"] = null;
        file_name["pod"] = null;
        msme_data = msme_data;
        document.getElementById("msme_certificate_file_upload").value = "";
        console.log("after delete", $documents_store.documents);
        console.log("msme data", msme_data);

        // console.log(file_name);
        // console.log("document store", $documents_store.documents);
    }
</script>

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <p class="breadcrumbtext">
                <span class="text-textgrey pr-1 text-base"
                    >Home / Onboard New / Workforce</span
                >
                <span class="flex xs:text-base xs:items-center"
                    ><img
                        src="{$img_url_name.img_name}/delivery.png"
                        class="pr-2.5 pl-5 xs:pl-0"
                        alt=""
                    /> NDA/DA/HDA
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
                    <p class="smxslabel">Work Details</p>
                    <p class="formHeadingLabel ">
                        Submit associate work details
                    </p>
                    <p class="formRequiredtext ">
                        <span class="text-mandatorysign">* </span>marked fields
                        are required
                    </p>
                </div>
                <form action="#">
                    <div class="formElements">
                        
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Verticle <span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/organization.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        bind:value={$vercticle_name.verticle}
                                        disabled = {show_edit_options}
                                    >
                                        <!-- <option class="pt-6">Amazon</option>
                                        <option>Flipkart</option>
                                        <option>Velocity</option>
                                        <option>Corporate</option> -->
                                        {#each verticle_list as verticle}
                                            <option value={verticle}
                                                >{verticle}</option
                                            >
                                        {/each}
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img
                                            src="{$img_url_name.img_name}/selectarrow.png"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Work Organization <span
                                        class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/organization.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        bind:value={$facility_data_store.org_id}
                                        disabled={show_edit_options}
                                    >
                                        <!-- <option class="pt-6">Amazon</option>
                                        <option>Flipkart</option>
                                        <option>Velocity</option>
                                        <option>Corporate</option> -->
                                        {#each org_array as org}
                                            <option value={org.org_id}
                                                >{org.org_name}</option
                                            >
                                        {/each}
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img
                                            src="{$img_url_name.img_name}/selectarrow.png"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {org_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Workforce Category<span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/organization.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        bind:value={$category_store_name.category_name}
                                        disabled = {true}
                                    >
                                        <!-- <option class="pt-6">Amazon</option>
                                        <option>Flipkart</option>
                                        <option>Velocity</option>
                                        <option>Corporate</option> -->
                                        {#each category_list as category}
                                            <option value={category}
                                                >{category}</option
                                            >
                                        {/each}
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img
                                            src="{$img_url_name.img_name}/selectarrow.png"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup">
                                <label class="formLable "
                                    >Work City <span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/location.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        bind:value={city_value}
                                    >
                                        <option value="" disabled selected
                                            >Select City</option
                                        >
                                        {#each city_list as city}
                                            <option value={city.location_id}
                                                >{city.city_name}</option
                                            >
                                        {/each}
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img
                                            src="{$img_url_name.img_name}/selectarrow.png"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {city_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup">
                                <label class="formLable "
                                    >Work Station <span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/warehouse.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        id="station_id"
                                        bind:value={$facility_data_store.station_code}
                                        on:change={() => select_store_id()}
                                    >
                                        {#each station_list as station}
                                            <option value={station.station_code}
                                                >{station.station_name} / {station.station_code}</option
                                            >
                                        {/each}
                                        <!-- <option class="pt-6"
                                            >MHPD - Mulshi SP</option
                                        >
                                        <option>MHPD - Haveli SP</option>
                                        <option>HBPD - Bangloru SP</option>
                                        <option>MHPD - Mulshi SP</option> -->
                                    </select>

                                    <div class="formSelectArrow ">
                                        <img
                                            src="{$img_url_name.img_name}/selectarrow.png"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {station_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup">
                                <label class="formLable "
                                    >Associate Type <span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/Subtract.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        bind:value={$facility_data_store.facility_type}
                                        disabled ={facility_type_disabled}
                                    >
                                        {#each associate_type_list as associate_type}
                                            <option value={associate_type.name}
                                                >{associate_type.facility_type_name}</option
                                            >
                                        {/each}
                                        <!-- <option class="pt-6">NDA</option>
                                        <option>Leader</option>
                                        <option>Velocity</option>
                                        <option>Corporate</option> -->
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img
                                            src="{$img_url_name.img_name}/selectarrow.png"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {associate_type_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup">
                                <label class="formLable "
                                    >Vendor Name<span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/managericon.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        id="vendor_selection"
                                        bind:value={$facility_data_store.vendor_code}
                                        on:change|preventDefault={(e) =>
                                            select_vendor_name(e)}
                                    >
                                        {#each vendor_list as vendor}
                                            <option value={vendor.vendor_id}
                                                >{vendor.vendor_name} - {vendor.vendor_id}</option
                                            >
                                        {/each}
                                        <!-- <option class="pt-6"
                                            >Vitthal Sutar - MHPD00012</option
                                        >
                                        <option>Rakesh Raj - MHPD00012</option>
                                        <option>Vishwas Patil</option>
                                        <option>Somnath Narule</option> -->
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img
                                            src="{$img_url_name.img_name}/selectarrow.png"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {vendor_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Is MSME Registered <span
                                        class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/organization.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        bind:value={$facility_data_store.msme_registered}
                                    >
                                        <option
                                            class="pt-6"
                                            value=""
                                            disabled
                                            selected>Select Yes or No</option
                                        >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img
                                            src="{$img_url_name.img_name}/selectarrow.png"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {#if $facility_data_store.msme_registered == "1"}
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable " />
                                    <div class="formInnerGroup ">
                                        <!-- <label class="formLable "
                                            >Attach MSME Certificate<span
                                                class="mandatoryIcon">*</span
                                            ></label> -->
                                        <div class="formInnerGroup ">
                                            <label
                                                class="cursor-pointer inline-block"
                                            >
                                                <h1
                                                    class="contentDescriptionText pb-3"
                                                >
                                                    Attach MSME Certificate<span
                                                        class="mandatoryIcon"
                                                        >*</span
                                                    >
                                                </h1>
                                                
                                                <div
                                                    class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px inline-block "
                                                >
                                                    Upload
                                                </div>
                                                
                                                <input
                                                    type="file"
                                                    class="hidden"
                                                    accept=".pdf,.jpg,.png,.jpeg"
                                                    id="msme_certificate_file_upload"
                                                    on:change={(e) =>
                                                        onFileSelected(e)}
                                                />
                                            </label>
                                            <div class="flex">
                                                
                                                <!-- {#if $facility_id.facility_id_number}
                                                {#if edit_msme_data.file_name }
                                                    <p>{edit_msme_data.file_name}</p>


                                                    <img
                                                        on:click={() =>
                                                            delete_files(
                                                                msme_data
                                                            )}
                                                        class="pl-2 cursor-pointer"
                                                        src="{$img_url_name.img_name}/blackclose.svg"
                                                        alt=""
                                                    />
                                                {/if}

                                                {:else} -->
                                                
                                                {#if msme_data.file_name && msme_data.pod}
                                                
                                                    <p>{msme_data.file_name}</p>

                                                    <img
                                                        on:click={() =>
                                                            delete_files(
                                                                msme_data
                                                            )}
                                                        class="pl-2 cursor-pointer"
                                                        src="{$img_url_name.img_name}/blackclose.svg"
                                                        alt=""
                                                    />
                                                {/if}

                                                <!-- {/if} -->
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}

                        {#if $facility_data_store.msme_registered == "0"}
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable "
                                        ><span class="mandatoryIcon" /></label
                                    >
                                    <div class="formInnerGroup ">
                                        <div class="pt-1">
                                            <h1 class="contentDescriptionText">
                                                Accept NON-MSME Declaration<br
                                                />
                                                <br />
                                                - I hereby declare that I have confirmed
                                                with the vendor and they are not
                                                registered under The Micro, Small
                                                and Medium Enterprises Development
                                                Act, 2006 (MSMED Act).
                                            </h1>
                                            <!-- <br /> -->
                                            <div class="pt-2">
                                                <input
                                                    class="pt-3"
                                                    type="checkbox"
                                                    name="msme_agreement"
                                                    bind:checked={msme_agreement}
                                                    on:click={() =>
                                                        get_session_user()}
                                                />
                                                <label
                                                    class="contentDescriptionText"
                                                    for=""
                                                >
                                                    I Accept</label
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}

                        <!-- <div class="flex">
                            <div class="formGroup">
                                <label class="formLable "
                                    >Offer Letter Copy<span
                                        class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <label class="cursor-pointer ">
                                        <div
                                            class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px"
                                        >
                                            Upload
                                        </div>
                                        <input type="file" class="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="formElements">
                        <div class="flex">
                            <div class="formGroupNote">
                                <label class="formLable xs:hidden sm:hidden" />
                                <div class="formInnerGroupNote">
                                    <p class="noteDescription">
                                        <span class="font-medium">Note:</span>
                                        Photo must be clear and in JPG, PNG, or PDF
                                        format to process faster verification
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> -->
                        <!-- <div>
                        {$get_facility_type_link}
                    </div> -->
                        <!-- <div>
                            {$msme_store}
                        </div>
                        <div>{msme_agreement}</div> -->
                    </div>
                    <div class="flex">
                        <div class="formGroup ">
                            <label class="formLable invisible" />
                            <div class="formInnerGroup mt-1">
                                <div class="text-red-500 text-xs">
                                    {msme_message}
                                </div>
                            </div>
                            {#if $facility_id.facility_id_number}
                                                {#if edit_msme_data.file_name}
                                                <a href={edit_document_link} target="_blank" class="text-blue-600 text-decoration-line: underline">click me{edit_msme_data.file_name}</a>
                                                <br>
                                                    
                                                {/if}
                                                    
                                                {/if}<br>
                        </div>
                    </div>
                </form>
            </div>
            <div class="onboardFormNot ">
                <div class="formFooterAction">
                    {#if show_edit_options}
                        
                    
                    <div on:click={routeToWorkforce} class="backButton">
                        <img
                            src="{$img_url_name.img_name}/arrowleft.png"
                            alt=""
                        />
                    </div>
                    {/if}
                
                    <button on:click={route} class="saveandproceed"
                        >Proceed</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>
<Toast type={toast_type} text={toast_text} />
