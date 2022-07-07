<script context="module">
    import { onMount } from "svelte";
</script>

<script>
    import { goto } from "$app/navigation";
    import { get_current_user_function,download_beejak_docs} from "../services/dashboard_services";
    import {
        dashboard_data,
        get_fac_count,find_parent_function,copy_parent_func,
        find_by_one_ser,bulk_search_ser
    } from "../services/dashboard_services";
    import { allowed_pdf_size } from "../services/pravesh_config";
    import { current_user } from "../stores/current_user_store";
    import { img_url_name } from "../stores/flags_store";
    import Spinner from "./components/spinner.svelte";
    import {get_loc_scope} from '../services/onboardsummary_services';
    import { facility_data_store } from "../stores/facility_store";
    import { facility_id } from "../stores/facility_id_store";
    // import {dashboard_details} from '../stores/dashboard_store';
    import Supplier from "./supplier.svelte";
    import { goto_wrapper } from "../services/goto_wrapper";
    import Toast from './components/toast.svelte';
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import {success_toast ,error_toast,warning_toast} from '../services/toast_theme';
    import { page } from "$app/stores";
    
    let toast_text = "";
    let toast_type = null;
    let active =0;
    let show_spinner = false;
    // let background_verification_pending;
    // let bank_beneficiary_pending;
    let id_proof_rejected = 0;
    let  id_proof_rejected_display_name;
    let bank_details_rejected = 0;
    let bank_details_rejected_display_name;
    let bgv_pending=0;
    let bgv_pending_display_name;
    let id_verification_pending = 0;
    let id_verification_pending_display_name;
    let bank_verification_pending = 0;
    let bank_verification_pending_display_name;
    let pending_offer_letter=0;
    let pending_offer_letter_display_name;
    let bgv_rejected = 0;
    let bgv_rejected_display_name;
    let fac_count_array = [];
    let ven_type_arr = [];
    let workf_type_arr = [];
    let child_id_value;
    let parent_arr_for_child=[];
    let scope_data=[];
    let station_select_data=[];
    let city_selected='-1';
    let unique_fac_id = '';
    let station_selected='-1';
    $:if(city_selected != ""){
        station_select_func();
    }
    let find_by="clientname";
    let plchldr = "Enter Client Name";
    let find_by_data = "";
    let find_by_arr = [];
    let bulk_search_var = false;
    $:if(find_by){
        find_by_option_changed()
    }
    let excel_data="";
    let excel_upload_message = "";
    let excel_img = "";
    


    // console.log(dashboard)
    onMount(async () => {

        // page_name = $page.url["pathname"].split("/").pop();
        // console.log("bank pahge name", page_name);

        console.log("facility data store",$facility_data_store);
        console.log("facility id store",$facility_id);

        show_spinner = true;
        console.log("href", window.location);
        if (window.location.pathname == "/pravesh-ui") {
            window.location.href = window.location.href + "/dashboard";
        }
        // window.location.href = window.location.href+"/dashboard";

        // let temp_res = await fetch("https://elasticrun.in/ifscapi/KARB0000001")
        // console.log("temp_res",temp_res)
        // let result = await temp_res.json();
        // console.log("TEMP RESULT",result)

        let current_user_response = await get_current_user_function();
        if (current_user_response.body.status == "green") {
            $current_user.email = current_user_response.body.data.user.email;
            $current_user.name = current_user_response.body.data.user.name;
            $current_user.username =
                current_user_response.body.data.user.username;
            // console.log("email",current_user_response.body.data);
        } else {
            // alert("Session User not found");
            // toast_text = "Session User not found";
            // toast_type = "error";
            error_toast("Session User not found")

        }

        let fac_count_res = await get_fac_count();

        fac_count_array = fac_count_res.body.data;

        for (let i = 0; i < fac_count_array.length; i++) {
            if (fac_count_array[i].category == "Workforce") {
                if (fac_count_array[i].count != "0") {
                    workf_type_arr.push({
                        new_type: fac_count_array[i].facility_type_name,
                        new_count: fac_count_array[i].count,
                    });
                }
            } else if (fac_count_array[i].category == "Vendor") {
                if (fac_count_array[i].count != "0")
                    ven_type_arr.push({
                        new_type: fac_count_array[i].facility_type_name,
                        new_count: fac_count_array[i].count,
                    });
            } else {
                console.log("ERROR");
            }
        }
        workf_type_arr = workf_type_arr;
        ven_type_arr = ven_type_arr;

        let dashboard_res = await dashboard_data();
        if (dashboard_res != null) {
            let dashboard = dashboard_res.body.data;
            for (let new_dash_data of dashboard) {
                if (new_dash_data.name == "active") {
                    active = new_dash_data.count;
                }

                if (new_dash_data.name == "id proof rejected") {
                    id_proof_rejected = new_dash_data.count;
                    id_proof_rejected_display_name = new_dash_data.display_name;
                }
                if (new_dash_data.name == "background verification pending") {
                    bgv_pending = new_dash_data.count;
                    bgv_pending_display_name = new_dash_data.display_name;
                }
                if (new_dash_data.name == "bank details rejected") {
                    bank_details_rejected = new_dash_data.count;
                    bank_details_rejected_display_name =
                        new_dash_data.display_name;
                }
                if (new_dash_data.name == "id verification pending") {
                    id_verification_pending = new_dash_data.count;
                    id_verification_pending_display_name =
                        new_dash_data.display_name;
                }
                // if(new_dash_data.name == "bank details pending"){
                //     bank_details_pending = new_dash_data.count
                //     console.log("bank_details_pending++",bank_details_pending)
                // }
                // if(new_dash_data.name == "bank beneficiary pending"){
                //     bank_beneficiary_pending = new_dash_data.count
                //     console.log("bank_beneficiary_pending++",bank_beneficiary_pending)
                // }
                // if(new_dash_data.name == "onboarding in progress"){
                //     onboarding_in_progress = new_dash_data.count
                //     console.log("onboarding_in_progress++",onboarding_in_progress)
                // }
                if (new_dash_data.name == "bank verification pending") {
                    bank_verification_pending = new_dash_data.count;
                    bank_verification_pending_display_name =
                        new_dash_data.display_name;
                }
                if (new_dash_data.name == "pending offer letter") {
                    pending_offer_letter = new_dash_data.count;
                    pending_offer_letter_display_name =
                        new_dash_data.display_name;
                }
                if (new_dash_data.name == "background verification rejected") {
                    bgv_rejected = new_dash_data.count;
                    bgv_rejected_display_name = new_dash_data.display_name;
                }
            }
        }
        show_spinner = false;
    });

    let routeNew = "";

    // export let url = "/bussines";

    function routeToBussiness() {
        let replaceState = false;
        // console.log(routeNew)
        goto("bussines", { replaceState });
        // goto_wrapper("bussiness",{ replaceState });
    }
    
    function convert_to_excel(element_id, type, fn, sheet_name = "client_details") {
	var elt = document.getElementById(element_id);
	var wb = XLSX.utils.table_to_book(elt, { sheet: sheet_name });
	XLSX.writeFile(wb, fn + "." + type);

    }

    var X;
    const onFileSelected = (e,doctext) => {
        console.log("INside onfile selected")
        X = XLSX;
        var files = e.target.files;
        var f = files[0];
        let img = e.target.files[0];
        if (f != undefined) {
            if (img.size <= allowed_pdf_size) {
                console.log("img", img);
                
                if(doctext == "excel_upload"){
                    console.log("Photo log uploaded")  
                    excel_img = img.name;
                    console.log("excel_img",excel_img)  
                }
                var reader = new FileReader()
                // reader.readAsBinaryString(img);
                reader.onload = function () {
                console.log("reader",reader.result);
                
                if(doctext == "excel_upload"){
                    excel_data = reader.result;
                    var wb;
                    wb = X.read(excel_data, { type: 'binary' });
                    process_wb(wb);
                    // console.log("photo_data",reader.result);
                    // toast_text = "Doc Selected";
                    // toast_type = "success";
                    success_toast("Doc Selected")
                    }
                }
                    // var reader = new FileReader();
                    reader.readAsBinaryString(f);
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
}


    var finJson;
    function process_wb(wb) {
	var output = "";
	output = JSON.stringify(to_json(wb), 2, 2);
	finJson = output;
    }

    function to_json(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }
    var X;

    // routeNew = "/bussines";

    // function demoClick(){
    //     console.log("clicked")
    // }
    function id_proof_clicked() {
        goto("./supplier?status=" + id_proof_rejected_display_name);
    }
    function bank_details_rejected_clicked() {
        goto("./supplier?status=" + bank_details_rejected_display_name);
    }
    function bgv_pending_clicked() {
        goto("./supplier?status=" + bgv_pending_display_name);
    }
    function id_verification_pending_clicked() {
        goto("./supplier?status=" + id_verification_pending_display_name);
    }
    function bank_verification_pending_clicked() {
        goto("./supplier?status=" + bank_verification_pending_display_name);
    }
    function pending_offer_clicked() {
        goto("./supplier?status=" + pending_offer_letter_display_name);
    }
    function bgv_rejected_clicked() {
        goto("./supplier?status=" + bgv_rejected_display_name);
    }

    function find_parent(){
        find_parent_model.style.display = "block";
    }
    function close_find_parent(){
        find_parent_model.style.display = "none";
        parent_arr_for_child = [];
        child_id_value ="";
    }

    async function find_parent_btn(){
        parent_arr_for_child = [];
        show_spinner=true
        console.log("child_id_value",child_id_value)

        if(!child_id_value){
            show_spinner=false;
            // toast_type = "error"
            // toast_text = "Please Enter Child Id"
            error_toast("Please Enter Child Id")

            return
        }
        let find_parent_function_res = await find_parent_function(child_id_value);
        
        try{
            if(find_parent_function_res.body.status == "green"){
                show_spinner=false;
                // toast_type = "success";
                // toast_text = find_parent_function_res.body.message;
                success_toast(find_parent_function_res.body.message)
                console.log("find_parent_function_res",find_parent_function_res)
               
                parent_arr_for_child = find_parent_function_res.body.data;
                console.log("parent_arr_for_child",parent_arr_for_child)
                // child_id_value = "";
            }
            else{
                console.log("inside else")
                show_spinner=false;
                // toast_type = "error";
                // toast_text = find_parent_function_res.body.message;
                error_toast(find_parent_function_res.body.message)
            }

        }
        catch(err){
            show_spinner=false;
            // toast_type = "error";
            // toast_text = find_parent_function_res.body.message
            error_toast(find_parent_function_res.body.message)

        }
    }

    function download_bulk_docs(){
        download_bulk_doc_model.style.display = "block"
    }
    function close_download_bulk_docs(){
        download_bulk_doc_model.style.display = "none"
    }
    
    var bulkDocType = { "beejakinv": "beejakinv", "dl": "dl-photo,dl_info_supp_file", "aadhar": "basic_info_supp_file,aadhar-id-proof", "voter": "voter-id-proof", "pancard": "pan-photo,pan_info_supp_file" }
    var docType,facIds;
   
    async function download_docs_func(){
        show_spinner = true;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	

	if (docType == "beejakinv") {
		downloadBeejakInvoices();
        show_spinner = false;
		return;
	}
	
	if (facIds == undefined || facIds.trim().length == 0) {
        // toast_type = "error"
        // toast_text = "Enter some facility IDs separated by new line"
        error_toast("Enter some facility IDs separated by new line")
        show_spinner = false;
		return;
	}
	if (format.test(facIds)) {
        // toast_type = "error"
        // toast_text = "Enter Valid Facility ID"
        error_toast("Enter Valid Facility ID")

        show_spinner = false;
		return;
	}
	var downDoctype = bulkDocType[docType];
	if (downDoctype == undefined) {
        // toast_type = "error"
        // toast_text = "Invalid Doc Type Selected"
        error_toast("Invalid Doc Type Selected")

        show_spinner = false;
		return;
	}
	var facArr = facIds.split("\n");

	if (facArr.length == 0) {
        // toast_type = "error"
        // toast_text = "Invalid Facility Ids !!"
        error_toast("Invalid Facility Ids !!")

        show_spinner = false;
		return;
	}

	if (facArr.length > 100) {
        // toast_type = "error"
        // toast_text = "Maximum 100 Ids allowed at one time !!"
        error_toast("Maximum 100 Ids allowed at one time !!")
        
        show_spinner = false;
		return;
	}
    var downUrl = "/api/method/pravesh.facility.routes.document.get_documents?facility_ids=" + facArr.join(",") + "&doc_type=" + downDoctype;
        window.open(downUrl);
        show_spinner = false;

    }

    async function downloadBeejakInvoices(){
        show_spinner = true;

        if (facIds == undefined || facIds.trim().length == 0) {
            // toast_type = "error"
            // toast_text = "Enter some facility IDs separated by new line"
            error_toast("Enter some facility IDs separated by new line")

            show_spinner = false;
            return;
        }

        var invArr = facIds.split("\n");

        if (invArr.length == 0) {
            // toast_type = "error"
            // toast_text = "Invalid Invoice Numbers !!"
            error_toast("Invalid Invoice Numbers !!")

            show_spinner = false;
            return;
        }
        if (invArr.length > 500) {
            // toast_type = "error"
            // toast_text = "Maximum 500 Invoice numbers <br> allowed at one time !!"
            error_toast("Maximum 500 Invoice numbers <br> allowed at one time !!")

            show_spinner = false;
            return;
        }
        // var download_beejak_docs_res =await  download_beejak_docs(invArr)
        // console.log("download_beejak_docs_res",download_beejak_docs_res)
        // // window.URL.createObjectURL(download_beejak_docs_res.body);
        // // window.open(download_beejak_docs_res.body);
        // try{
            show_spinner =false;
            var a = document.createElement('a');
			// var url = window.URL.createObjectURL(download_beejak_docs_res.body);
            var page_name = "https://doha-crun.elasticrun.in/api/method/pravesh.facility.routes.document.get_beejak_invoices?invoice_ids="+invArr
			a.href = page_name
			var filename = "BeejakInvoices";
			// var disposition = download_beejak_docs_res.xhr.getResponseHeader('Content-Disposition');
			// disposition = disposition.replace("filename=\"", "", 1)
			// disposition = disposition.slice(0, -1)

			// if (disposition && disposition.indexOf('attachment') !== -1) {
			// 	var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			// 	var matches = filenameRegex.exec(disposition);
			// 	if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
			// }

			a.download = filename;
			a.target = "_blank";
			document.body.append(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(page_name);
    }
    // catch(err){
    //     show_spinner =false;
    //     // toast_text=err
    //     // toast_type = "error"
    //     error_toast(err)

    // }

    // }

    function find_by_client_id(){
        find_by_client_id_model.style.display = "block";

    }
    function close_find_by_client_id(){
        find_by_client_id_model.style.display = "none";
        
    }

    function find_by_option_changed(){
        if(find_by == "clientname"){
            plchldr = "Enter Client Name"
        }
        else if(find_by == "employeeid"){
            plchldr = "Enter Employee Id"
        }
        else if(find_by == "pancard"){
            plchldr = "Enter Pan Number"
        }
    }
    
    async function find_by_one(){
        if(!find_by_data){
            
            if(find_by == "clientname"){
                // toast_text = "Enter Valid Client Name."
            error_toast("Enter Valid Client Name.")

            }
            else if(find_by == "employeeid"){
                // toast_text = "Enter Valid Employee ID"
                error_toast("Enter Valid Employee ID.")
            }
            else if(find_by == "pancard"){
                toast_text = "Enter Valid PanCard Number"
                error_toast("Enter Valid PanCard Number.")

            }
            show_spinner = false
            return
        }
        show_spinner = true
        let find_by_one_res = await find_by_one_ser(find_by_data,find_by)
        try{
            if(find_by_one_res.body.status == "green"){
                show_spinner = false
                console.log("find_by_one_res",find_by_one_res)
                find_by_arr = find_by_one_res.body.data
                console.log("find_by_arr",find_by_arr)
            }
            else{
                show_spinner = false
                // toast_type = "error"
                // toast_text = find_by_one_res.body.message
            error_toast(find_by_one_res.body.message)

            }
        }
        catch(err){
            show_spinner = false
            // toast_text = err
            // toast_type = "error"
            error_toast(err)

        }


    }
    function bulk_search_clicked(){
        if(bulk_search_var == false){
            bulk_search_var =true;
        }
        else{
            bulk_search_var =false;
        }
    }

    function download_template(){
        var data = document.getElementById('demotemplatemodel');
        var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
        XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' });
        XLSX.writeFile(file, 'Bulk Search Template.' + 'xlsx');
    }
    
    async function upload_template_doc(){
    show_spinner = true;
    console.log("finJson",finJson);
	if (finJson === undefined || finJson === "") {
        show_spinner = false;
        toast_type="error"
        toast_text = "Please upload parseable <br>excel ( .xlsx ) file "
		return;
	}
	try {
		finJson = JSON.parse(finJson);
        // console.log("finJson finJson",finJson)
	} catch (err) {
        show_spinner = false;
        toast_type="error";
        toast_text = err
		return;
	}
	if (finJson.client_name_search === undefined || finJson.client_name_search == null) {
        toast_type="error";
        toast_text = "Client Name Details Missing";
        show_spinner = false;
		return;
	}
    show_spinner = false;
    let new_obj = finJson.client_name_search[0]
    console.log("find_by_data",new_obj['Client Name'])
    var storeName = new_obj['Client Name'];
    var stationCode = new_obj['Station Code'];
    
    if(!storeName){
        toast_type="error";
        toast_text = "Client Name Data Missing In Uploaded File";
        show_spinner = false;
		return;
    }
    else if(!stationCode){
        toast_type="error";
        toast_text = "Station Code Data Missing In Uploaded File";
        show_spinner = false;
		return;
    }
    
    let bulk_search_payload = {"json":
    [{"storeName":storeName,"stationCode":stationCode}]
    ,"search_type":find_by}

    let bulk_search_res = await bulk_search_ser(bulk_search_payload);
    // console.log("bulk_search_res",bulk_search_res)
    try{
        if(bulk_search_res.body.status == "green"){
            show_spinner = false;
            // toast_type = "success";
            // toast_text = bulk_search_res.body.message;
            success_toast(bulk_search_res.body.message)

        }
        else{
            show_spinner = false;
            // toast_type = "error";
            // toast_text = bulk_search_res.body.message;
            error_toast(bulk_search_res.body.message)

        }
        
    }
    catch(err){
        show_spinner = false;
        // toast_type = "error";
        // toast_text = err;
        error_toast(err)

    }
	

    }

    
    async function copy_model_vendor(){
        show_spinner = true;
        copy_from_vendor_model.style.display = "block";
        let loc_data_res =  await get_loc_scope();
        try {
        if(loc_data_res.body.status == "green"){
            show_spinner = false;
            // toast_type="success";
            // toast_text=loc_data_res.body.message
             // city_data = loc_data_res.body.data;
             console.log("loc_data_res",loc_data_res)
             for(let i=0;i<loc_data_res.body.data.length;i++){
                scope_data.push(loc_data_res.body.data[i]);
            }
            scope_data=scope_data;
            console.log("scope_data",scope_data)
            // city_data = city_data;
        }
        else{
            show_spinner = false;
            toast_type="error"
            toast_text=loc_data_res.body.message
        }
        
        } catch(err) {
            show_spinner = false
            toast_type="error"
            toast_text=err;
        
        }
    }

    function station_select_func(){
        console.log("inside station_select_func")
        for(let i=0;i<scope_data.length;i++){
            console.log("inside for e",city_selected,scope_data[i].location_name)
            if(city_selected == scope_data[i].location_name){
                console.log("inside if",city_selected)
                station_select_data = scope_data[i].stations;
                console.log("station_select_id",station_select_data)
            }
        }
    }

    function copy_vendor_close(){
        copy_from_vendor_model.style.display = "none";
        unique_fac_id=""
        city_selected="-1"
        station_selected="-1"

    }
    async function copy_parent_data(){
        let city_id;
        let station_id;
        show_spinner = true;
        console.log("copy_parent_data",unique_fac_id,city_selected,station_selected); 
        if(!unique_fac_id){
            show_spinner = false;
            toast_type="error";
            toast_text="Please Enter Unique Vendor ID"
            return;
        }
        else if(!city_selected || city_selected =="-1"){
            show_spinner = false;
            toast_type="error";
            toast_text="Please Select a Location"
            return;
        }
        else if(!station_selected || station_selected == "-1"){
            show_spinner = false;
            toast_type="error";
            toast_text="Please select a station"
            return;
        }  
        console.log("station_selected",station_selected)
        const result = station_selected.split('-');
        console.log("result",result[0])
        for(let i=0;i<scope_data.length;i++){
            if(city_selected == scope_data[i].location_name){
                city_id = scope_data[i].location_id;
                // for(let j=0;j<scope_data[i].stations.length;j++){
                //     if(result[0] == scope_data[i].stations[j].station_code){
                //         station_id = scope_data[i].stations[j].station_id;
                //     }
                // }
                station_id = result[0].trim();
            }
        }
        let parent_obj = {
            "facility_id":unique_fac_id,
            "vendor_location":[{"location_id":city_id,"station_code":station_id,"doctype":"Vendor Location"}]
        }
        
        let copy_parent_func_res = await copy_parent_func(JSON.stringify(parent_obj));
        try{
            if(copy_parent_func_res.body.status == "green"){
                // toast_type = "success";
                // toast_text = "Facility Copied Unique Facility ID : "+unique_fac_id+""
                success_toast( "Facility Copied Unique Facility ID : "+unique_fac_id+"")

                copy_from_vendor_model.style.display = "none";  
                show_spinner = false;
                unique_fac_id="";
                city_selected= "-1";
                station_selected= "-1";
            }
            else{
                show_spinner = false;
                // toast_type = "error";
                // toast_text = copy_parent_func_res.body.message;
                error_toast(copy_parent_func_res.body.message)

            }
        }
        catch(err){
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

            show_spinner = false;
        }
        
        show_spinner = false;
    }
</script>

{#if show_spinner}
    <Spinner />
{/if}

<!-- Dashboard  -->
<div class="mainContent ">
    <div class="breadcrumb ">
        <div
            class="breadcrumb-section flex justify-between items-center xs:px-3"
        >
            <p class="pt-5 pb-5">
                <span class=" pr-1 text-font32 font-medium xs:text-2xl"
                    >Dashboard</span
                >
                <button class ="ErBlueButton" on:click={find_parent}>Find Parent</button>
                <button class ="ErBlueButton" on:click={copy_model_vendor}>Copy Vendor</button>
                <button class ="ErBlueButton" on:click={download_bulk_docs}>Download Bulk Docs</button>
                <button class ="ErBlueButton" on:click={find_by_client_id}>Find By Client Name / Employee Id</button>
            </p>

            <p >
                <button class="newonboard " on:click={() => routeToBussiness()}>
                
                    Onboard<span class="xs:hidden"> New</span>
                    <img
                        src="{$img_url_name.img_name}/useradd.svg"
                        class="pl-2"
                        alt=""
                    />
            </button>
            </p>
        </div>
    </div>

    <div class="dashboardWrapper m-m15 xs:mx-3 xs:mt-0">
        <div class="dashboardSection w-full">
            <div class="myactionitems">
                <div class="headingMyactions">
                    <h1 class="cardhead">My Action Items</h1>
                    <p class="cardDes">
                        Take appropriate action to complete onboarding
                    </p>
                </div>
                <div class="cards">
                    <div class="cardAction " on:click={id_proof_clicked}>
                        <div class="cardContentText flex">
                            <div class="cardimg mr-3">
                                <img
                                    src="{$img_url_name.img_name}/idproofRejected.png"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h1 class="dashHeading ">ID Proof Rejected</h1>
                                <p class="dashDes ">Re-submit ID Proof</p>
                            </div>
                        </div>
                        <div class="cardCount">
                            <div class="bgcircle ">
                                <span class="countcircle  "
                                    >{id_proof_rejected}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div
                        class="cardAction"
                        on:click={bank_details_rejected_clicked}
                    >
                        <div class="cardContentText flex">
                            <div class="cardimg mr-3">
                                <img
                                    src="{$img_url_name.img_name}/bankdetails.png"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h1 class="dashHeading ">
                                    Bank Details Rejected
                                </h1>
                                <p class="dashDes ">Re-submit Bank Details</p>
                            </div>
                        </div>
                        <div class="cardCount">
                            <div class="bgcircle ">
                                <span class="countcircle  "
                                    >{bank_details_rejected}</span
                                >
                            </div>
                        </div>
                    </div>
                    <!-- <div class="cardAction " on:click={bgv_pending_clicked}>
                        <div class="cardContentText flex">
                            <div class="cardimg mr-3">
                                <img
                                    src="{$img_url_name.img_name}/bgv.png"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h1 class="dashHeading ">BGV Pending</h1>
                                <p class="dashDes ">Take required action</p>
                            </div>
                        </div>
                        <div class="cardCount">
                            <div class="bgcircle ">
                                <span class="countcircle  ">{bgv_pending}</span>
                            </div>
                        </div>
                    </div> -->

                    <div class="cardAction " on:click={bgv_rejected_clicked}>
                        <div class="cardContentText flex">
                            <div class="cardimg mr-3">
                                <img
                                    src="{$img_url_name.img_name}/bvgreject.png"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h1 class="dashHeading ">BGV Rejected</h1>
                                <p class="dashDes ">Resubmit BGV Details</p>
                            </div>
                        </div>
                        <div class="cardCount">
                            <div class="bgcircle ">
                                <span class="countcircle  ">{bgv_rejected}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="myactionitems ">
                <div class="headingMyactions">
                    <h1 class="cardhead">Verification in Progress</h1>
                    <p class="cardDes">
                        Teams are activily working on document verifications
                    </p>
                </div>
                <div class="cards">
                    <div
                        class="cardActionother"
                        on:click={id_verification_pending_clicked}
                    >
                        <div class="cardContentText flex">
                            <div class="cardimg mr-3">
                                <img
                                    src="{$img_url_name.img_name}/pendingid.png"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h1 class="dashHeading ">
                                    Pending ID Proof Verification
                                </h1>
                                <p class="dashDes ">Pending from VMT Team</p>
                            </div>
                        </div>
                        <div class="cardCount">
                            <div class="bgcircleother ">
                                <span class="countcircleother  "
                                    >{id_verification_pending}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div
                        class="cardActionother "
                        on:click={bank_verification_pending_clicked}
                    >
                        <div class="cardContentText flex">
                            <div class="cardimg mr-3">
                                <img
                                    src="{$img_url_name.img_name}/pendingbank.png"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h1 class="dashHeading ">
                                    Pending Bank Verification
                                </h1>
                                <p class="dashDes ">
                                    Pending from Accounts Team
                                </p>
                            </div>
                        </div>
                        <div class="cardCount">
                            <div class="bgcircleother ">
                                <span class="countcircleother  "
                                    >{bank_verification_pending}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div
                        class="cardActionother "
                        on:click={pending_offer_clicked}
                    >
                        <div class="cardContentText flex">
                            <div class="cardimg mr-3">
                                <img
                                    src="{$img_url_name.img_name}/pendingletter.png"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h1 class="dashHeading ">
                                    Pending Offer Letter
                                </h1>
                                <p class="dashDes ">Pending from HR Team</p>
                            </div>
                        </div>
                        <div class="cardCount">
                            <div class="bgcircleother ">
                                <span class="countcircleother  "
                                    >{pending_offer_letter}</span
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cardActionother " on:click={bgv_pending_clicked}>
                        <div class="cardContentText flex">
                            <div class="cardimg mr-3">
                                <img
                                    src="{$img_url_name.img_name}/pendingletter.png"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h1 class="dashHeading ">BGV Pending</h1>
                                <p class="dashDes ">Take required action</p>
                            </div>
                        </div>
                        <div class="cardCount">
                            <div class="bgcircleother ">
                                <span class="countcircleother">{bgv_pending}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="activeProfile xs:w-full">
            <div class="activeProfileWrapper w-w325 xs:w-full">
                <div class="headingCount ">
                    <p class="cxardhead">Active Associates</p>
                    <p class="cardhead">{active}</p>
                </div>
                <div class="venderHead plr ">
                    <p class="venderheadText ">
                        <img
                            src="{$img_url_name.img_name}/manager.svg"
                            class="pr-p15"
                            alt=""
                        /> Vendors
                    </p>
                </div>
                <div class="venderHead plr ">
                    <ul>
                        {#each ven_type_arr as ven_det}
                            <li class="listli">
                                <p>{ven_det.new_type}</p>
                                <span class="text-lg text-blackshade font-bold"
                                    >{ven_det.new_count}</span
                                >
                            </li>
                        {/each}
                    </ul>
                </div>

                <div class="venderHead plr mt-4">
                    <p class="venderheadText ">
                        <img
                            src="{$img_url_name.img_name}/workforce.svg"
                            class="pr-p15"
                            alt=""
                        /> Workforce
                    </p>
                </div>
                <div class="venderHead plr ">
                    <ul>
                        <!-- <li class="listli"><a href=""> NDA </a><span class="text-lg text-blackshade font-bold"></span></li>
                                <li class="listli"><a href="">Delivery Associates (DA)</a> <span class="text-lg text-blackshade font-bold"></span></li>
                                <li class="listli"><a href="">Hybrid Delivery Associates (HDA)</a><span class="text-lg text-blackshade font-bold"></span></li>
                                <li class="listli"><a href="">House Keeping </a><span class="text-lg text-blackshade font-bold"></span></li>
                                <li class="listli"><a href="">Van Driver</a> <span class="text-lg text-blackshade font-bold"></span></li>
                                <li class="listli"><a href="">Process Associate</a> <span class="text-lg text-blackshade font-bold">02</span></li>
                                <li class="listli"><a href="">Station Staff</a><span class="text-lg text-blackshade font-bold">05</span></li>
                                <li class="listli"><a href="">Landlords</a> <span class="text-lg text-blackshade font-bold">09</span></li>
                                <li class="listli"><a href="">Station Managers </a><span class="text-lg text-blackshade font-bold"></span></li>
                                <li class="listhb"><a href="">Team Leads </a><span class="text-lg text-blackshade font-bold"></span></li> -->
                        {#each workf_type_arr as workf_det}
                            <li class="listli">
                                <p>{workf_det.new_type}</p>
                                <span
                                    class="text-lg text-blackshade font-bold"
                                    >{workf_det.new_count}</span
                                >
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIND PARENT MODEL -->

    <div class="hidden"  id="find_parent_model">
        <div class="modalMain"> 
            <div class="modalOverlay"></div>
            <div class="modalContainercopyvendor rounded-lg">
                <div class="modalHeadConmb-0 sticky top-0 bg-white z-99">
                    <div class="leftmodalInfo">
                        <p class="text-lg text-erBlue font-medium  ">
                            <span class="">Find Parent For Child Associate</span>
                        </p>
                    </div>
                    <button class="rightmodalclose" on:click={close_find_parent}>
                        <img src="{$img_url_name.img_name}/blackclose.svg" alt="">
                    </button>
                </div>
                <div class="modaldata">
                    <div class="viewDocPanmainbodyModal">
                        <div class="innermodal">

                            <div class="formInnerGroup mb-4">
                                <input type="input" class="inputboxcursortext " placeholder="Enter Child ID" bind:value={child_id_value}>
                             </div>
                             <div class="flex mb-3">
                                <button class="ErBlueButton" on:click={find_parent_btn}>Find Parent </button>
                              </div> 
                            <div class="tableforParentInfo ">
                                <table class="table  w-full text-center mt-2 ">
                                    <thead class="theadpopover h-10">
                                        <tr>
                                            <th width="33%">Parent Unique ID</th>
                                            <th width="33%">Parent Name  </th>
                                            <th width="33%"> Parent ID</th>

                                        </tr>
                                    </thead>
                                    <tbody class="tbodycopyvendor ">
                                        {#if parent_arr_for_child.length != 0}
                                        {#each parent_arr_for_child as parent_data}
                                        <tr class="border-b">
                                            <td>{parent_data.parent_facility_id}</td>
                                            <td>{parent_data.parent_name}</td>
                                            <td>{parent_data.parent_id}</td>
                                        </tr>
                                        {/each}
                                        {:else}
                                        <!-- <tr class="border-b">
                                            <td>Addhoc Facility</td>
                                            <td>10-09-2020</td>
                                            <td>Active</td>
                                        </tr> -->
                                        <tr>
                                            <td colspan="3" class="text-center"> No Parent found</td>
                                        </tr>   
                                        {/if}
                                    </tbody>
                                </table>
                            </div>

                            <div class="pt-8 flex justify-center">
                                <button type="button" class="dialogueSingleButton" on:click={close_find_parent}>Close</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- FIND PARENT MODEL -->

 <!-- Copy vendor Modal-->
 <div class="hidden"  id="copy_from_vendor_model">
    <div class="modalMain ">
        <div class="modalOverlay"></div>
        <div class="modalContainercopyvendor rounded-lg">
            <div class="modalHeadConmb-0 sticky top-0 bg-white z-99">
                <div class="leftmodalInfo">
                    <p class="text-lg text-erBlue font-medium  ">
                        <span class="">Copy vendors</span>
                    </p>
                </div>
                <button class="rightmodalclose" on:click={copy_vendor_close}>
                    <img src="{$img_url_name.img_name}/blackclose.svg" alt="">
                </button>
            </div>
            <div class="modaldata">
                <div class="viewDocPanmainbodyModal">
                    <div class="innermodal">
                        <div class=" ">
                            <table class="table  w-full text-center mt-2 ">
                                <thead class="theadpopover h-10">
                                    <tr>
                                        <th width="33%">Copy from</th>
                                        <th width="33%">Copy to Location   </th>
                                        <th width="33%"> Copy to Station</th>

                                    </tr>
                                </thead>
                                <tbody class="tbodycopyvendor ">
                                    <tr class="">
                                        <td>
                                            <div class="formInnerGroupNote  mx-4">
                                                <input type="input" class="inputboxpopover " placeholder="Enter Unique Facility ID" bind:value={unique_fac_id}>
                                             </div>
                                        </td>
                                        <td> 
                                                <div class="formInnerGroupNote  mx-4">
                                                    <select class="inputboxpopover" bind:value={city_selected}>
                                                        <option class="pt-6" value="-1">Select</option>
                                                        {#each scope_data as new_city}
                                                            <option class="pt-6">{new_city.location_name}</option>
                                                        {/each}
                                                        
                                                    </select>
                                                    <div class="formSelectArrow ">
                                                        <img src="{$img_url_name.img_name}/selectarrow.png"
                                                            class="w-5 h-auto" alt="">
                                                    </div>
                                                </div>
                                        </td>
                                        <td>
                                            <div class="formInnerGroupNote mx-4">
                                                <select class="inputboxpopover" bind:value={station_selected}>
                                                    <option class="pt-6" value="-1">Select Station</option>
                                                    {#each station_select_data as new_station}
                                                        <option class="pt-6">{new_station.station_code} - {new_station.station_name}</option>
                                                    {/each}
                                                </select>
                                                <div class="formSelectArrow ">
                                                    <img src="{$img_url_name.img_name}/selectarrow.png"
                                                        class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                        </td>
                                     
                                       
                                    </tr>
                                   

                                </tbody>
                            </table>
                        </div>
                        <div class="flex mt-3 justify-center">
                            <button class="ErBlueButton" on:click={copy_parent_data}>Copy Facility </button>
                          </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
 <!-- Copy vendor Modal-->



<!-- <div><svg width="58" height="58" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
        <g transform="translate(2 1)" stroke="#FFF" stroke-width="1.5">
            <circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="#fff">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="1;0;0;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="#fff">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;1;0;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="#fff">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;1;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="#fff">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;1;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="#fff">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;1;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="#fff">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;1;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="#fff">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;0;1;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="27" cy="5" r="5" fill-opacity="0" fill="#fff">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;0;0;1" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
        </g>
    </g>
</svg></div> -->
<!-- <div>
    <h1>this is for testing</h1>
    <button on:click={() =>demo_clickhandle()}>click me bbbbbbbbbbbbbbbbbbbbbbbbb</button>
</div> -->

<!--  Download Bulk Docs -->

<div class="hidden" id="download_bulk_doc_model">
    <div class=" modalMain  ">
        <div class="modalOverlay"></div>
        <div class="modalContainercopyvendor rounded-lg">
            <div class="modalHeadConmb-0 sticky top-0 bg-white z-99">
                <div class="leftmodalInfo">
                    <p class="text-lg text-erBlue font-medium  ">
                        <span class="">  Download Bulk Docs </span>
                    </p>
                </div>
                <button class="rightmodalclose">
                    <img src="{$img_url_name.img_name}/blackclose.svg" alt="" on:click = {close_download_bulk_docs}>
                </button>
            </div>
            <div class="modaldata">
                <div class="viewDocPanmainbodyModal">
                    <div class="innermodal">
                        <div class="form-lable">
                            <p class="namelable">Select Document Type </p>
                            <div class="formInnerGroup">
                                <select class="inputboxpopover" bind:value = {docType}>
                                    <option value="dl" class="pt-6">Driving License</option>
                                    <option value="aadhar" class="pt-6">Aadhaar</option>
                                    <option value="voter" class="pt-6">Voter ID</option>
                                    <option value="pancard" class="pt-6">Pancard</option>
                                    <option value="beejakinv" class="pt-6">Beejak Invoices</option>
                                    
                                </select>
                                <div class="formSelectArrow ">
                                    <img src="{$img_url_name.img_name}/selectarrow.png"
                                        class="w-5 h-auto" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="form-lable mt-5">
                            <div class="formInnerGroup" >
                                <textarea class="inputboxcursortext resize-none"  rows="6" placeholder="Enter Unique Facility IDs here separated by new line" bind:value={facIds}></textarea>
                            </div>
                        </div>

                      
                         <div class="flex mb-3 mt-4">
                            <button class="ErBlueButton" on:click={download_docs_func}>Download Docs </button>
                          </div> 
                    

                        <div class="pt-8 flex justify-center">
                            <button type="button" class="dialogueSingleButton" on:click = {close_download_bulk_docs}>Close</button>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--  Download Bulk Docs -->

<!-- Find Associate By Client Name Modal-->

<div id="find_by_client_id_model" hidden>
    <div class="modalMain">
        <div class="modalOverlay"></div>
        <div class="modalContainerFindAssociate rounded-lg     ">
            <div class="modalHeadConmb-0 sticky top-0 bg-white z-zindex99">
                <div class="leftmodalInfo">
                    <p class="text-lg text-erBlue font-medium  ">
                        <span class=""> Find Associate By Client Name</span>
                    </p>
                </div>
                <button class="rightmodalclose">
                    <img
                    src="{$img_url_name.img_name}/blackclose.svg"
                    alt="closebtn"
                    on:click = {close_find_by_client_id}
                />
                </button>
            </div>
            <div class="modaldata">
                <div class="viewDocPanmainbodyModal">
                    <div class="innermodal">
                        <div class="flex gap-4 items-center xsl:flex-wrap xsl:gap-3" >
                   
                            <div class="formInnerGroup ">
                              <input type="input" class="inputboxcursortext " id = "plchldr" placeholder={plchldr} bind:value={find_by_data}>
                           </div>
                           <div class="flex">
                              <button class="ErBlueButton" on:click={find_by_one}>Find One </button>
                            </div> 
                        </div>
                        <div class="w-full py-3">
                            <div class="text-center  flex gap-5 mb-2 xsl:flex-wrap xsl:gap-3">
                                <div class="flex items-center mt-3">
                                    <input id="radio11" type="radio" name="radio" class="hidden" bind:group={find_by} value="clientname" checked/>
                                    <label for="radio11" class="radioLable"> <span class="radioCirle"></span> By Client Name 
                                    </label>
                                </div>
                            
                                <div class="flex items-center  mt-2">
                                    <input id="radio22" type="radio" name="radio" class="hidden" bind:group={find_by} value="employeeid"/>
                                    <label for="radio22" class="radioLable"> <span class="radioCirle"></span> By Employee ID
                                    </label>
                                </div>
                                <div class="flex items-center  mt-2">
                                    <input id="radio33" type="radio" name="radio" class="hidden" bind:group={find_by} value="pancard"/>
                                    <label for="radio33" class="radioLable"> <span class="radioCirle"></span> By PAN Number
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-4 items-center " >
                            <button class="ErBlueButton" on:click={bulk_search_clicked}>Bulk Search </button>

                        </div>
                        {#if bulk_search_var == true}
                        <div class="text-sm mb-4 mt-4">
                            <p> Bulk Search By Client Name  </p>
                            <p>Sheet Name should be "client_name_search"</p>
                            <p> Column Names should be as below ( check sample data as well) </p>
                        </div>

                        <div class="pb-4 xsl:overflow-scroll">
                            <table class="table  w-full text-center mt-2 ">
                                <thead class="theadpopover h-10">
                                    <tr>
                                        <th width="25%">Station Code</th>
                                        <th width="25%">Client Name</th>
                                    </tr>
                                </thead>
                               
                                <tbody class="tbodycopyvendor outline">
                                    <tr class="border-b">
                                        <td>AXHN</td>
                                        <td>EFBH</td>
                                    </tr>
                                    <tr>
                                        <td>NDA Ram Kumar/ NTEX/12313</td>
                                        <td>Vendor_ER_Shyam Kumar</td>
                                    </tr>
                                

                                </tbody>
                                
                            </table>
                        </div>

                        <div class="flex mt-4">
                            <button class="ErBlueButton" on:click={download_template}>Download Bulk Search Template </button>
                         </div> 
                         <div class="flex mt-4">
                            <div class="formInnerGroup flex items-center ">
                                
                                 <label class="cursor-pointer">
                                    
                                    <div class="uploadbutton">Upload</div>
                                    <input type="file" class="hidden" on:change={(e) =>
                                    onFileSelected(e,"excel_upload")}

                                bind:value="{excel_data}" />
                            <div class="text-red-500">{excel_upload_message}</div>

                                </label>
                                <p class="text-grey ml-4">{excel_img}</p>
                            </div>
                         </div> 
                         <div class="flex mt-4">
                            <button class="ErBlueButton" on:click={upload_template_doc}>Search</button>
                         </div> 
                        {/if}
                         <!-- <div class="xsl:overflow-scroll mt-5 ">
                            <table class="table  w-full text-center mt-2 ">
                                <thead class="theadpopover h-10">
                                    <tr>
                                        <th width="25%">Client Name         </th>
                                        <th width="25%">Station Code    </th>
                                        <th width="25%">Associate Name      </th>
                                        <th width="25%">Associate ID</th>
                                    </tr>
                                </thead>
                                <tbody class="tbodycopyvendor outline">
                                    <tr class="border-b">
                                        <td>SURAJ_KHARATE_NTEX_107117481    </td>
                                        <td>IXUD</td>
                                        <td>SURAJ PRAKASH KHARATE   </td>
                                        <td>IXUD00886   </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>SURAJ_KHARATE_NTEX_107117481    </td>
                                        <td>IXUD</td>
                                        <td>SURAJ PRAKASH KHARATE   </td>
                                        <td>IXUD00886   </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>SURAJ_KHARATE_NTEX_107117481    </td>
                                        <td>IXUD</td>
                                        <td>SURAJ PRAKASH KHARATE   </td>
                                        <td>IXUD00886   </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>SURAJ_KHARATE_NTEX_107117481    </td>
                                        <td>IXUD</td>
                                        <td>SURAJ PRAKASH KHARATE   </td>
                                        <td>IXUD00886   </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td>SURAJ_KHARATE_NTEX_107117481    </td>
                                        <td>IXUD</td>
                                        <td>SURAJ PRAKASH KHARATE   </td>
                                        <td>IXUD00886   </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div> -->
                        <div class="xsl:overflow-scroll mt-5 ">
                        <table class="table  w-full text-center mt-2 ">
                            <thead class="h-10 tabletrheader">
                                <tr>
                                    <th width="25%">Client Name</th>
                                    <th width="25%">Station Code</th>
                                    <th width="25%">Associate Name</th>
                                    <th width="25%">Associate ID</th>
                                </tr>
                            </thead>
                            
                            <tbody class="outline tabletrBody">
                                {#each find_by_arr as client}
                                <tr class="border-b">
                                    
                                    <td><div class="w-64 xsl:w-48 break-words text-center m-auto">{#if client.org_specific_name}{client.org_specific_name}{:else}<p>-</p>{/if}</div></td>
                                    <td>{#if client.conf_station_code}{client.conf_station_code}{:else}<p>-</p>{/if}</td>
                                    <td><div class="w-64 xsl:w-48 break-words text-center m-auto">{#if client.facility_name}{client.facility_name}{:else}<p>-</p>{/if}</div></td>
                                    <td>{#if client.facility_id}{client.facility_id}{:else}<p>-</p>{/if}</td>
                                </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>
   <!-- Find Associate By Client Name Modal-->

   <!-- TEMPLATE for download -->

   <table id="demotemplatemodel" cellspacing="0" cellpadding="0" class = "hidden">
    <tr>
        <th>Station Code</th>
        <th>Client Name</th>
        
    </tr>
    <tr>
        <td>AXHN</td>
        <td>NDA Ram Kumar/ NTEX/12313</td>
        
    </tr>
    <tr>
        <td>EFBH</td>
        <td>Vendor_ER_Shyam Kumar</td>
        
    </tr>
</table>

      <!-- TEMPLATE for download -->

<Toast type={toast_type}  text={toast_text}/>
<SvelteToast />