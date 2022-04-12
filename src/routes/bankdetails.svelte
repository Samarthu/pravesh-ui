<script>
    import { goto } from "$app/navigation";
    import { facility_id } from "../stores/facility_id_store";
    import { onMount } from "svelte";
    import {
        verify_ifsc_code_function,
        save_bank_details_function,
    } from "../services/bank_details_services";
    import { bank_details } from "../stores/bank_details_store";
    import { verify_ifsc_code_api_url } from "../stores/bank_details_store";
    import { current_user } from "../stores/current_user_store";
    import { facility_data_store } from "../stores/facility_store";
    import { allowed_pdf_size } from "../services/pravesh_config";
    import { page } from "$app/stores";
    import Side_content_component from "./side_content_scetion.svelte";
    import { documents_store } from "../stores/document_store";
    import { save_button_clicked } from "./identityproof.svelte";
    import {
        verify_document_function,
        save_facility_function,
        check_bgv_config_function,
        BGV_function,
        save_or_update_documents_function,
        save_or_update_documents_function_1,
    } from "../services/identity_proof_services";
    import { get_current_user_function } from "../services/dashboard_services";
    import { save_flag } from "../stores/flags_store";
    import Toast from "./components/toast.svelte";
    let toast_text = "";
    let toast_type = null;
    import Success_popup from "./components/success_popup.svelte";
    let success_text = "";
    // import {facility_id} from '../stores/facility_id_store';

    let ifsc_code;
    let valid;
    let ifsc_code_message = "";
    let account_number_message = "";
    let re_account_number_message = "";
    let pincode_message = "";
    let account_holder_message = "";
    let blank_cheque_message = "";
    let bank_type_message = "";
    let form_message = "";
    var acc_number_check = /^[0-9]*$/;
    var ifsc_code_check = /^[A-Za-z]{4}\d{7}$/;
    var account_holder_check = /^\w+$/gm;
    let account_number_match_check = false;

    let blank_cheque_data = {
        doc_category: "Blank Cheque",
        doc_number: null,
        doc_type: "blcheque",
        facility_id: null,
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let passbook_data = {
        doc_category: "Passbook",
        doc_type: "passbook",
        facility_id: null,
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let Cancel_cheque_data = {
        doc_category: "Cancel Cheque",
        doc_type: "can-cheque",
        facility_id: null,
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let account_statement_data = {
        doc_category: "Account Statement",
        doc_type: "acc-stat",
        facility_id: null,
        file_name: null,
        pod: null,
        resource_id: null,
        status: "created",
        user_id: null,
    };
    let page_name = null;
    onMount(async () => {
        // let temp_res = await fetch("https://elasticrun.in/ifscapi/KARB0000001")
        // console.log("temp_res",temp_res)
        // let result = await temp_res.json();
        // console.log("TEMP RESULT",result)
        page_name = $page.url["pathname"].split("/").pop();
        console.log("bank pahge name", page_name);
    });

    function routeToSuccess() {
        save_bank_details();
        // let replaceState = false;
        // goto("successpopup", { replaceState });
    }

    function routeToBack() {
        let replaceState = false;
        goto("identityproof", { replaceState });
    }

    function verify_account_number() {
        if (!$bank_details.account_number.match(acc_number_check)) {
            account_number_message = "Please enter a valid account number";
        } else {
            account_number_message = "";
        }
    }

    function verify_re_account_number() {
        if (!$bank_details.re_enter_account_number.match(acc_number_check)) {
            re_account_number_message = "Please enter a valid account number";
            account_number_match_check = false;
        } else if (
            $bank_details.account_number !=
            $bank_details.re_enter_account_number
        ) {
            re_account_number_message = "Account number does not match";
            account_number_match_check = false;
        } else {
            re_account_number_message = "";
            account_number_match_check = true;
        }
    }
    function verify_pincode() {
        if (!$bank_details.branch_pin_code.match(acc_number_check)) {
            pincode_message = "Please enter a valid pincode";
        } else {
            pincode_message = "";
        }
    }
    function verify_account_holder() {
        if (!$bank_details.account_holder.match(account_holder_check)) {
            account_holder_message = "Please enter a valid account holder name";
        } else {
            account_holder_message = "";
        }
    }

    async function verify_ifsc_code() {
        // let verify_ifsc_code_response = await verify_ifsc_code_function();
        // console.log("verify_ifsc_code_response", verify_ifsc_code_response);
        // let temp = await verify_ifsc_code_response.json();
        // console.log("temp", temp);
        if (!$bank_details.ifsc_code.match(ifsc_code_check)) {
            ifsc_code_message = "Please enter a valid IFSC code";
            $bank_details.bank_name = null;
            $bank_details.branch_city = null;
            $bank_details.branch_name = null;
            console.log("bank details", $bank_details);
        } else {
            ifsc_code_message = "";
            console.log("ifsc code", $bank_details.ifsc_code);
            if (
                $bank_details.ifsc_code != null ||
                $bank_details.ifsc_code != ""
            ) {
                console.log("ifsc_api", $verify_ifsc_code_api_url);
                let temp_res = await fetch($verify_ifsc_code_api_url);
                console.log("temp_res", temp_res.status);
                if (temp_res.status == 404) {
                    ifsc_code_message = "Invalid IFSC Code";
                    $bank_details.bank_name = null;
                    $bank_details.branch_city = null;
                    $bank_details.branch_name = null;
                    console.log("bank details", $bank_details);
                } else if (temp_res.status == 200) {
                    let result = await temp_res.json();
                    console.log("TEMP RESULT", result);

                    ifsc_code_message = "";
                    $bank_details.bank_name = result.BANK;
                    $bank_details.branch_city = result.CITY;
                    $bank_details.branch_name = result.BRANCH;
                } else {
                    alert("Something went wrong!");
                }

                // console.log("TEMP RESULT",result);
                console.log("bank_details", $bank_details);
            }
        }

        // console.log("status code",result);
    }
    const on_blank_cheque_upload = (e) => {
        let image = e.target.files[0];
        if (image.size <= allowed_pdf_size) {
            if (
                $bank_details.account_number &&
                $bank_details.re_enter_account_number
            ) {
                console.log("inside upload blank cheque");
                blank_cheque_message = "";
                // console.log("inside if");
                blank_cheque_data.file_name = image.name;
                blank_cheque_data.doc_number = $bank_details.account_number;
                let reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = (e) => {
                    blank_cheque_data.pod = e.target.result;
                    console.log("blank cheque data", blank_cheque_data);
                };
            } else {
                blank_cheque_message =
                    "Please enter account number and confirm account number.";
                // alert("Please enter account number and re-enter account number");
            }
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
    const on_passbook_upload = (e) => {
        let image = e.target.files[0];
        if (image.size <= allowed_pdf_size) {
            passbook_data.file_name = image.name;
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
                passbook_data.pod = e.target.result;
                console.log("passbook data", passbook_data);
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
    const on_cancle_cheque_upload = (e) => {
        let image = e.target.files[0];
        if (image.size <= allowed_pdf_size) {
            Cancel_cheque_data.file_name = image.name;
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
                Cancel_cheque_data.pod = e.target.result;
                console.log("Cancel_cheque_data", Cancel_cheque_data);
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
    const on_account_statement_upload = (e) => {
        let image = e.target.files[0];
        if (image.size <= allowed_pdf_size) {
            account_statement_data.file_name = image.name;
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
                account_statement_data.pod = e.target.result;
                console.log("account_statement_data", account_statement_data);
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
    async function save_facility() {
        // check_validity();

        if (valid) {
            console.log("documents_store", $documents_store);
            console.log("inside valid");

            // set_user_id_to_document_store();
            let save_facility_response = await save_facility_function();
            console.log(save_facility_response);
            if (save_facility_response.body.status == "green") {
                try {
                    // alert("Facility saved successfully");
                    $facility_id.facility_id_number =
                        save_facility_response.body.data.name;
                    let temp;
                    facility_id.subscribe((value) => {
                        temp = value.facility_id_number;
                    });
                    console.log("facility id", temp);
                    toast_type = "success";
                    toast_message = "Facility saved successfully";
                    try {
                        let current_user_response =
                            await get_current_user_function();
                        console.log(
                            "current_user_response",
                            current_user_response
                        );
                        if (current_user_response.body.status == "green") {
                            console.log(
                                "inside current_user_response if statement"
                            );
                            $current_user.email =
                                current_user_response.body.data.user.email;
                            $current_user.name =
                                current_user_response.body.data.user.name;
                            $current_user.username =
                                current_user_response.body.data.user.username;
                        } else {
                            // alert("Session user not found error!");
                            toast_type = "error";
                            toast_message = "Session user not found error!";
                        }
                    } catch {
                        // alert("Session user not found error!");
                        toast_type = "error";
                        toast_message = "Session user not found error!";
                        console.log("current user data", $current_user);
                    }
                    for (
                        let i = 0;
                        i < $documents_store.documents.length;
                        i++
                    ) {
                        console.log("inside for loop");
                        // console.log("documents store",$documents_store.documents[i]);
                        $documents_store.documents[i].resource_id =
                            $facility_id.facility_id_number;
                        $documents_store.documents[i].user_id =
                            $current_user.username;
                        console.log(
                            "documents store",
                            $documents_store.documents[i]
                        );
                        let document_upload_response =
                            await save_or_update_documents_function_1(
                                $documents_store.documents[i]
                            );
                        console.log(
                            "document_upload_response",
                            document_upload_response
                        );
                    }
                } catch {
                    // alert("Error in saving facility!");
                    toast_type = "error";
                    toast_message = "Error in saving facility!";
                }
            } else {
                // alert("Facility not created");
                toast_type = "error";
                toast_message = "Facility not created";
            }
            // gotobankdetails();
            // route_to_next_page();
        }
    }
    function check_validity() {
        valid = true;
        // $facility_id.facility_id_number = "MHPD01271";
        // $bank_details.facility_id = $facility_id.facility_id_number
        // $facility_data_store.facility_id = "tejas_testing_mhpd";
        // $current_user.username = "tejas";
        // console.log("$bank_details",$bank_details);
        if (!account_number_match_check) {
            valid = false;
        }

        if (!$bank_details.account_number) {
            valid = false;
            account_number_message = "Please enter account number";
        } else {
            account_number_message = "";
        }

        if (!$bank_details.re_enter_account_number) {
            valid = false;
            re_account_number_message = "Please confirm account number";
        } else {
            re_account_number_message = "";
        }

        if (!$bank_details.account_holder) {
            valid = false;
            account_holder_message = "Please enter account holder name";
        } else {
            account_holder_message = "";
        }

        if (!$bank_details.bank_type) {
            valid = false;
            bank_type_message = "Please select bank type";
        } else {
            bank_type_message = "";
        }

        if (!$bank_details.ifsc_code) {
            valid = false;
            ifsc_code_message = "Please enter IFSC code";
        } else {
            ifsc_code_message = "";
        }

        if (!$bank_details.branch_pin_code) {
            valid = false;
            pincode_message = "Please enter branch pin code";
        } else {
            pincode_message = "";
        }
    }
    function pushing_documents() {
        if (blank_cheque_data.file_name && blank_cheque_data.pod) {
            blank_cheque_data.facility_id = $facility_data_store.facility_id;
            blank_cheque_data.user_id = $current_user.email;
            blank_cheque_data.resource_id = $facility_id.facility_id_number;
            blank_cheque_data.doc_number = $bank_details.account_number;
            console.log("blank cheque data", blank_cheque_data);
            for (let i = 0; i < $bank_details.document_details.length; i++) {
                if (
                    $bank_details.document_details[i]["doc_category"] ==
                    "Blank Cheque"
                ) {
                    $bank_details.document_details.splice(i, 1);
                }
            }
            $bank_details.document_details.push(blank_cheque_data);
        }

        if (passbook_data.file_name && passbook_data.pod) {
            passbook_data.facility_id = $facility_data_store.facility_id;
            passbook_data.user_id = $current_user.email;
            passbook_data.resource_id = $facility_id.facility_id_number;
            console.log("passbook_data", passbook_data);
            for (let i = 0; i < $bank_details.document_details.length; i++) {
                if (
                    $bank_details.document_details[i]["doc_category"] ==
                    "Passbook"
                ) {
                    $bank_details.document_details.splice(i, 1);
                }
            }
            $bank_details.document_details.push(passbook_data);
        }

        if (Cancel_cheque_data.file_name && Cancel_cheque_data.pod) {
            Cancel_cheque_data.facility_id = $facility_data_store.facility_id;
            Cancel_cheque_data.user_id = $current_user.email;
            Cancel_cheque_data.resource_id = $facility_id.facility_id_number;
            console.log("Cancel_cheque_data", Cancel_cheque_data);
            for (let i = 0; i < $bank_details.document_details.length; i++) {
                if (
                    $bank_details.document_details[i]["doc_category"] ==
                    "Cancel Cheque"
                ) {
                    $bank_details.document_details.splice(i, 1);
                }
            }
            $bank_details.document_details.push(Cancel_cheque_data);
        }
        if (account_statement_data.file_name && account_statement_data.pod) {
            account_statement_data.facility_id =
                $facility_data_store.facility_id;
            account_statement_data.user_id = $current_user.email;
            account_statement_data.resource_id =
                $facility_id.facility_id_number;
            console.log("account_statement_data", account_statement_data);
            for (let i = 0; i < $bank_details.document_details.length; i++) {
                if (
                    $bank_details.document_details[i]["doc_category"] ==
                    "Account Statement"
                ) {
                    $bank_details.document_details.splice(i, 1);
                }
            }
            $bank_details.document_details.push(account_statement_data);
        }
        console.log("bank details", $bank_details);
    }
    async function save_bank_details() {
        check_validity();
        if (
            !blank_cheque_data.file_name &&
            !blank_cheque_data.pod &&
            !passbook_data.file_name &&
            !passbook_data.pod &&
            !Cancel_cheque_data.file_name &&
            !Cancel_cheque_data.pod &&
            !account_statement_data.file_name &&
            !account_statement_data.pod
        ) {
            valid = false;
            //console.log("Please upload atleast one document");
            // alert("Please upload atleast one document");
            form_message = "Please upload atleast one document";
            toast_type = "warning";
            toast_text = "Please upload atleast one document";
        } else {
            form_message = "";
            console.log("inside else");
        }

        if (valid) {
            console.log("inside valid");
            console.log("save flag", $save_flag.is_save);
            if (!$save_flag.is_save) {
                save_facility().then(async () => {
                    console.log("save button clicked", save_button_clicked);
                    console.log("inside .then");
                    $bank_details.facility_id = $facility_id.facility_id_number;
                    pushing_documents();
                    console.log("$bank_details", $bank_details);
                    let save_bank_details = await save_bank_details_function();
                    console.log("save_bank_details", save_bank_details);
                    if ((save_bank_details.body.status = "green")) {
                        // alert("Bank Details Saved Successfully");
                        toast_text = "Bank Details Saved Successfully";
                        toast_type = "success";
                        success_text = "Facility created and Bank Details Saved Successfully";
                        // let replaceState = false
                        setTimeout(() => {}, 2000);
                        goto("onboardsummary", { replaceState:true });
                    } else {
                        // alert("Something went wrong!");
                        toast_type = "error";
                        toast_text = "Something went wrong!";
                    }

                    console.log("inside valid");
                });
            } else {
                console.log("outside .then");
                console.log("save button clicked", save_button_clicked);
                $bank_details.facility_id = $facility_id.facility_id_number;
                pushing_documents();
                console.log("$bank_details", $bank_details);
                let save_bank_details = await save_bank_details_function();
                console.log("save_bank_details", save_bank_details);
                if ((save_bank_details.body.status = "green")) {
                    // alert("Bank Details Saved Successfully");
                    toast_type = "success";
                    toast_text = "Bank Details Saved Successfully";
                    success_text = "Bank Details Saved Successfully";
                    // let replaceState = false;
                    setTimeout(() => {}, 2000);
                    goto("onboardsummary", { replaceState:true });
                } else {
                    // alert("Something went wrong!");
                    toast_type = "error";
                    toast_text = "Bank Details not Saved";
                }
            }
        }
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
        // file_name["doc_number"] = null;

        if (file_name["doc_category"] == "Blank Cheque") {
            blank_cheque_data = blank_cheque_data;
            document.getElementById("blank_cheque_copy").value = "";
        } else if (file_name["doc_category"] == "Passbook") {
            passbook_data = passbook_data;
            document.getElementById("passbook_copy").value = "";
        } else if (file_name["doc_category"] == "Cancel Cheque") {
            Cancel_cheque_data = Cancel_cheque_data;
            document.getElementById("cancel_cheque_copy").value = "";
        } else if (file_name["doc_category"] == "Account Statement") {
            account_statement_data = account_statement_data;
            document.getElementById("account_statement_copy").value = "";
        }
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
                <!-- <li class="tabactivelink">
                    <a href="#" class="tabAchorSection ">
                        <div class="iconSection">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35"
                                fill="none">
                                <path
                                    d="M29.9322 23.7412C29.8965 22.3958 29.4332 21.0968 28.6094 20.0325C27.7856 18.9682 26.6442 18.1939 25.3508 17.822L24.9862 17.717L24.4166 16.5662C24.3827 16.4977 24.3303 16.44 24.2654 16.3997C24.2004 16.3593 24.1255 16.3379 24.0491 16.3379H20.7131V14.9229C21.8069 14.0342 22.5744 12.6919 22.6618 11.1768C23.0185 11.0251 23.3105 10.7531 23.487 10.408C23.6635 10.063 23.7132 9.66695 23.6274 9.28902C23.5818 9.08199 23.4851 8.88964 23.3463 8.72944C23.2074 8.56923 23.0307 8.44624 22.8323 8.37163V6.71775L22.8786 6.61856C22.9748 6.49998 23.0456 6.3629 23.0867 6.21582C23.1277 6.06874 23.1382 5.91479 23.1173 5.76352C23.0452 5.23865 22.9067 4.72505 22.7052 4.23507C21.8444 2.13924 19.8018 0.784973 17.5025 0.784973C15.2032 0.784973 13.1608 2.1404 12.2988 4.23828C12.097 4.72993 11.9585 5.24523 11.8865 5.77179C11.8642 5.92614 11.8746 6.08345 11.9171 6.23352C11.9595 6.38358 12.0331 6.52303 12.1329 6.64283L12.1682 6.7241V8.3702C11.9694 8.44479 11.7924 8.56791 11.6532 8.72835C11.5141 8.8888 11.4173 9.08149 11.3717 9.28888C11.2837 9.66735 11.3326 10.0648 11.5098 10.4106C11.687 10.7564 11.981 11.0282 12.3396 11.1779C12.4272 12.6914 13.1936 14.0319 14.2874 14.9207V16.3379H10.9514C10.875 16.3379 10.8 16.3593 10.7351 16.3996C10.6701 16.44 10.6177 16.4977 10.5838 16.5662L10.0149 17.716L9.64992 17.821C8.35672 18.1923 7.21544 18.966 6.39164 20.0297C5.56783 21.0935 5.10435 22.3921 5.06841 23.737C5.06841 23.7397 5.06841 23.7424 5.06841 23.7451L5.00497 32.7686C5.00075 33.1562 5.15041 33.5297 5.42114 33.8072C5.55344 33.9444 5.71163 34.054 5.88655 34.1297C6.06148 34.2053 6.24967 34.2456 6.44024 34.2481H28.5602C28.7508 34.2455 28.9389 34.2053 29.1138 34.1296C29.2887 34.054 29.4469 33.9444 29.5791 33.8072C29.7129 33.6747 29.8186 33.5167 29.8902 33.3426C29.9618 33.1685 29.9977 32.9818 29.9958 32.7936L29.9324 23.7534C29.9324 23.7507 29.9323 23.7439 29.9322 23.7412ZM29.1587 30.3822C28.8474 30.1632 28.4822 30.0334 28.1026 30.0066L26.1819 29.8667V28.2324H29.1436L29.1587 30.3822ZM23.7944 17.1582L25.1137 19.8242H17.9104V17.1582H23.7944ZM19.4827 20.6445V22.4902H15.7229V20.6445H19.4827ZM15.1077 16.3379V15.4561C15.8479 15.839 16.6685 16.0405 17.5019 16.0439C18.335 16.0486 19.1564 15.8472 19.8928 15.4576V16.3379H15.1077ZM12.6991 5.88274C12.7615 5.42503 12.8819 4.97711 13.0572 4.54973C13.7922 2.76104 15.5368 1.60522 17.5017 1.60522C19.4667 1.60522 21.2111 2.75981 21.9451 4.54672C22.1197 4.97247 22.2395 5.41867 22.3017 5.8746C22.3075 5.91674 22.3041 5.95963 22.2917 6.00034C22.2794 6.04104 22.2584 6.0786 22.2302 6.11044C22.2011 6.14362 22.1652 6.17011 22.125 6.18812C22.0847 6.20612 22.041 6.21521 21.9969 6.21476L13.0044 6.22071C12.9603 6.2212 12.9166 6.21216 12.8763 6.1942C12.836 6.17624 12.8001 6.14979 12.7709 6.11666C12.7426 6.08527 12.7215 6.04807 12.7091 6.00766C12.6967 5.96725 12.6933 5.92461 12.6991 5.88274V5.88274ZM21.7249 7.02085L21.2381 7.92969H13.7624L13.2793 7.02003L21.7249 7.02085ZM13.1252 10.876V10.8687C13.1283 10.7737 13.0973 10.6806 13.0377 10.6065C12.9781 10.5324 12.8939 10.4821 12.8003 10.4647C12.6155 10.432 12.4483 10.3347 12.3285 10.1903C12.2087 10.0458 12.1439 9.86354 12.1459 9.67586C12.147 9.61122 12.1559 9.54696 12.1725 9.48446C12.1963 9.38077 12.2528 9.28749 12.3337 9.2184C12.4146 9.14932 12.5156 9.1081 12.6218 9.10082C12.7231 9.0912 12.8171 9.04379 12.885 8.96804C12.953 8.89228 12.9899 8.79372 12.9885 8.69197V8.28249L13.1443 8.54752C13.1817 8.6119 13.236 8.66482 13.3013 8.70051C13.3667 8.73621 13.4405 8.75332 13.5149 8.75H21.4856C21.5598 8.75334 21.6334 8.73622 21.6985 8.70051C21.7637 8.6648 21.8177 8.61187 21.8547 8.54752L22.012 8.2762V8.69231C22.0107 8.79374 22.0475 8.89197 22.1151 8.96758C22.1827 9.04319 22.2763 9.09066 22.3772 9.10062C22.4833 9.1082 22.5843 9.14951 22.6653 9.21851C22.7463 9.28752 22.8031 9.3806 22.8274 9.48418C22.8422 9.5469 22.8494 9.61116 22.8489 9.67559C22.852 9.86245 22.7885 10.0443 22.67 10.1888C22.5514 10.3332 22.3853 10.4308 22.2015 10.4642C22.1079 10.4816 22.0236 10.5319 21.9638 10.6059C21.904 10.6799 21.8726 10.7729 21.8752 10.868V10.8756C21.8752 13.2729 19.8975 15.2233 17.5006 15.2233C15.1037 15.2233 13.1252 13.2729 13.1252 10.876ZM5.85693 28.2324H8.8186V29.8772L7.21899 30.0222C6.71266 30.0645 6.23144 30.2609 5.84012 30.5849L5.85693 28.2324ZM9.5022 33.4277H6.44024C6.27418 33.4221 6.11715 33.3508 6.00356 33.2295C5.94626 33.173 5.90092 33.1055 5.87024 33.0311C5.83956 32.9567 5.82418 32.8769 5.82501 32.7964L5.82836 32.334H5.84675C5.84675 31.5137 6.45515 30.9277 7.29405 30.8509L8.81847 30.7061V32.0107C8.81847 32.0622 8.8286 32.1131 8.84829 32.1606C8.86798 32.2081 8.89684 32.2513 8.93322 32.2877C8.9696 32.3241 9.01279 32.3529 9.06032 32.3726C9.10785 32.3923 9.15879 32.4024 9.21023 32.4023H9.5022V33.4277ZM8.84267 20.084C8.79609 20.178 8.78747 20.2863 8.8186 20.3865V27.4121H5.86268L5.88838 23.7519C5.91873 22.6471 6.28081 21.577 6.92752 20.6808C7.57423 19.7845 8.47566 19.1036 9.51457 18.7265L8.84267 20.084ZM24.678 33.4277H10.3225V32.4023H24.678V33.4277ZM15.8596 31.582V29.2315C15.928 29.3042 16.0624 29.3262 16.1672 29.3262H16.1706C16.2245 29.328 16.2782 29.319 16.3285 29.2996C16.3788 29.2801 16.4247 29.2508 16.4634 29.2132L16.8868 28.7866L17.3038 29.2192C17.3418 29.2588 17.3875 29.2904 17.438 29.312C17.4885 29.3336 17.5428 29.3448 17.5977 29.345C17.6527 29.3452 17.7071 29.3343 17.7577 29.313C17.8083 29.2917 17.8542 29.2605 17.8925 29.2211L18.3095 28.7913L18.7329 29.213C18.7717 29.2507 18.8177 29.2802 18.8681 29.2996C18.9186 29.3191 18.9725 29.3281 19.0265 29.3262H19.0299C19.0756 29.3301 19.1217 29.3236 19.1646 29.3072C19.2075 29.2908 19.2461 29.2649 19.2776 29.2315V31.582H15.8596ZM25.3616 31.582H20.0979V28.2043C20.1017 28.1236 20.0805 28.0437 20.0372 27.9755C19.9938 27.9073 19.9305 27.8541 19.8559 27.8232C19.7812 27.7923 19.6988 27.7852 19.62 27.8029C19.5411 27.8206 19.4697 27.8621 19.4153 27.9219L19.0175 28.3454L18.5995 27.9312C18.5609 27.8942 18.5153 27.8655 18.4653 27.8468C18.4153 27.8281 18.362 27.8197 18.3087 27.8223H18.3076C18.2538 27.8198 18.2001 27.8283 18.1496 27.8473C18.0992 27.8663 18.0532 27.8954 18.0144 27.9327L17.5987 28.3541L17.183 27.9362C17.1444 27.8984 17.0985 27.8687 17.0481 27.8492C16.9976 27.8296 16.9438 27.8204 16.8897 27.8223H16.8886C16.835 27.8197 16.7814 27.8281 16.7311 27.8468C16.6808 27.8655 16.6348 27.8942 16.5959 27.9312L16.1757 28.3524L15.7738 27.9254C15.7147 27.8655 15.6395 27.8241 15.5573 27.8062C15.4751 27.7884 15.3894 27.795 15.3109 27.8251C15.2332 27.8545 15.166 27.9061 15.1177 27.9736C15.0693 28.0411 15.0421 28.1214 15.0393 28.2043V31.582H9.63892V20.6445H11.3479C11.4567 20.6445 11.561 20.6013 11.6379 20.5244C11.7148 20.4475 11.7581 20.3432 11.7581 20.2344C11.7581 20.1256 11.7148 20.0213 11.6379 19.9444C11.561 19.8674 11.4567 19.8242 11.3479 19.8242H9.88658L11.2059 17.1582H17.0901V19.8242H14.0823C13.9735 19.8242 13.8692 19.8674 13.7923 19.9444C13.7153 20.0213 13.6721 20.1256 13.6721 20.2344C13.6721 20.3432 13.7153 20.4475 13.7923 20.5244C13.8692 20.6013 13.9735 20.6445 14.0823 20.6445H14.9026V22.9128C14.9063 23.0217 14.9531 23.1247 15.0326 23.1992C15.1121 23.2738 15.2179 23.3138 15.3268 23.3106H19.8705C20.0971 23.3106 20.303 23.1392 20.303 22.9128V20.6445H25.3616V31.582ZM27.5559 20.0659C28.5201 21.055 29.0759 22.3712 29.1125 23.752L29.1378 27.4121H26.1819V20.3865C26.213 20.2864 26.2044 20.1781 26.1578 20.0841L25.4865 18.7276C26.2683 19.012 26.9758 19.4695 27.5559 20.0659V20.0659ZM28.9969 33.2295C28.8833 33.3508 28.7263 33.4221 28.5602 33.4277H25.4983V32.4023H25.7903C25.8941 32.4023 25.9937 32.3611 26.0672 32.2876C26.1406 32.2142 26.1819 32.1146 26.1819 32.0107V30.6897L28.0427 30.8265C28.6267 30.8692 29.1087 31.3163 29.1689 31.8475L29.1758 32.775C29.1775 32.944 29.1133 33.107 28.9969 33.2295V33.2295Z"
                                    fill="#19191D" />
                                <path
                                    d="M11.5527 21.517C11.444 21.517 11.3396 21.5602 11.2627 21.6371C11.1858 21.714 11.1426 21.8183 11.1426 21.9271V22.3578C11.1426 22.4666 11.1858 22.5709 11.2627 22.6478C11.3396 22.7247 11.444 22.7679 11.5527 22.7679C11.6615 22.7679 11.7658 22.7247 11.8428 22.6478C11.9197 22.5709 11.9629 22.4666 11.9629 22.3578V21.9271C11.9629 21.8183 11.9197 21.714 11.8428 21.6371C11.7658 21.5602 11.6615 21.517 11.5527 21.517Z"
                                    fill="#19191D" />
                                <path
                                    d="M11.5527 23.2462C11.444 23.2462 11.3396 23.2894 11.2627 23.3663C11.1858 23.4432 11.1426 23.5475 11.1426 23.6563V28.168C11.1426 28.2768 11.1858 28.3811 11.2627 28.4581C11.3396 28.535 11.444 28.5782 11.5527 28.5782C11.6615 28.5782 11.7658 28.535 11.8428 28.4581C11.9197 28.3811 11.9629 28.2768 11.9629 28.168V23.6563C11.9629 23.5475 11.9197 23.4432 11.8428 23.3663C11.7658 23.2894 11.6615 23.2462 11.5527 23.2462Z"
                                    fill="#19191D" />
                            </svg>
                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor ">Work Details</p>
                            <p class="contentDescriptionText ">Submit associate work details</p>
                        </div>
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                    </a>
                </li> -->
                <!-- <li class="tabactivelink">
                    <a href="#" class="tabAchorSection ">
                        <div class="iconSection">
                            <svg width="35" height="35" viewBox="0 0 31 31" fill="none">
                                <path
                                    d="M22.1592 0H8.83887C7.58688 0 6.56836 1.01852 6.56836 2.27051V28.7295C6.56836 29.9815 7.58688 31 8.83887 31H22.1592C23.4112 31 24.4297 29.9815 24.4297 28.7295V2.27051C24.4297 1.01852 23.4112 0 22.1592 0ZM23.5215 24.6426H10.6553C10.4045 24.6426 10.2012 24.8459 10.2012 25.0967C10.2012 25.3475 10.4045 25.5508 10.6553 25.5508H23.5215V28.7295C23.5215 29.4807 22.9104 30.0918 22.1592 30.0918H8.83887C8.08766 30.0918 7.47656 29.4807 7.47656 28.7295V25.5508H8.83887C9.08965 25.5508 9.29297 25.3475 9.29297 25.0967C9.29297 24.8459 9.08965 24.6426 8.83887 24.6426H7.47656V4.54102H23.5215V24.6426ZM23.5215 3.63281H7.47656V2.27051C7.47656 1.5193 8.08766 0.908203 8.83887 0.908203H22.1592C22.9104 0.908203 23.5215 1.5193 23.5215 2.27051V3.63281Z"
                                    fill="#19191D" />
                                <path
                                    d="M17.3154 1.81641H15.499C15.2482 1.81641 15.0449 2.01972 15.0449 2.27051C15.0449 2.52129 15.2482 2.72461 15.499 2.72461H17.3154C17.5662 2.72461 17.7695 2.52129 17.7695 2.27051C17.7695 2.01972 17.5662 1.81641 17.3154 1.81641Z"
                                    fill="#19191D" />
                                <path
                                    d="M15.501 26.459C14.7498 26.459 14.1387 27.0701 14.1387 27.8213C14.1387 28.5725 14.7498 29.1836 15.501 29.1836C16.2522 29.1836 16.8633 28.5725 16.8633 27.8213C16.8633 27.0701 16.2522 26.459 15.501 26.459ZM15.501 28.2754C15.2506 28.2754 15.0469 28.0717 15.0469 27.8213C15.0469 27.5709 15.2506 27.3672 15.501 27.3672C15.7514 27.3672 15.9551 27.5709 15.9551 27.8213C15.9551 28.0717 15.7514 28.2754 15.501 28.2754Z"
                                    fill="#19191D" />
                                <path
                                    d="M13.6826 2.72461C13.9334 2.72461 14.1367 2.5213 14.1367 2.27051C14.1367 2.01971 13.9334 1.81641 13.6826 1.81641C13.4318 1.81641 13.2285 2.01971 13.2285 2.27051C13.2285 2.5213 13.4318 2.72461 13.6826 2.72461Z"
                                    fill="#19191D" />
                            </svg>
                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor">Verify Contact Number</p>
                            <p class="contentDescriptionText">Verify associate by OTP</p>
                        </div>
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                    </a>
                </li> -->
                <!-- <li class="tabactivelink">
                    <a href="#" class="tabAchorSection ">
                        <div class="iconSection">
                            <svg width="35" height="35" viewBox="0 0 22 27" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.855851 20.0531C1.74653 19.6063 2.33919 19.2408 2.49971 19C3.29971 17.8 4.83304 16.5 5.49971 16V14.5V14.098H5.80752V11.7491C5.80752 11.3103 5.76807 10.8754 5.6915 10.4472C5.65596 10.3063 5.6251 10.1636 5.60176 10.0185C5.5711 9.89071 5.53707 9.76367 5.49971 9.63742V6.43378C5.51259 6.45175 5.52542 6.46976 5.53818 6.4878V5.31568C5.53818 2.4301 7.98818 0.0823975 10.9997 0.0823975C13.0291 0.0823975 14.8035 1.14847 15.7451 2.72687L16.4613 6.30807V6.4878C16.4706 6.47463 16.48 6.46147 16.4894 6.44834L16.4997 6.49997C16.5603 7.71181 16.5548 8.74742 16.501 9.63261C16.463 9.76072 16.4285 9.88965 16.3974 10.0193C16.3741 10.1639 16.3434 10.306 16.308 10.4465C16.2314 10.8749 16.1918 11.31 16.1918 11.7491V11.9564C15.5296 14.8718 14.1631 14.8505 14.1611 14.8926C14.1606 14.904 14.2598 14.92 14.4997 15C15.6997 15.4 18.6664 17.5 19.9997 18.5L20.5166 18.6397C21.2286 19.9457 21.6321 21.4024 21.6321 22.9219V25.9687C21.6321 26.3543 21.306 26.6667 20.9037 26.6667H7.48047C7.07822 26.6667 6.75205 26.3543 6.75205 25.9687C6.75205 25.5832 7.07822 25.2707 7.48047 25.2707H20.1753V22.9219C20.1753 20.7187 19.1931 18.6112 17.4097 16.9876C16.3694 16.0405 15.1154 15.3307 13.7766 14.9041L12.9062 16.5244L14.1646 21.7587C14.2235 22.0039 14.1402 22.2604 13.9466 22.4303L11.4915 24.5835C11.3523 24.7056 11.176 24.7667 10.9997 24.7667C10.8234 24.7667 10.6472 24.7056 10.508 24.5835L8.05283 22.4303C7.85918 22.2604 7.77578 22.0039 7.83477 21.7587L9.09316 16.5244L8.22285 14.9041C6.88398 15.3307 5.62998 16.0406 4.58975 16.9876C2.80635 18.6113 1.82412 20.7187 1.82412 22.9219V25.2707H5.05244C5.45469 25.2707 5.78086 25.5832 5.78086 25.9687C5.78086 26.3543 5.45469 26.6667 5.05244 26.6667H1.0956C0.693359 26.6667 0.367188 26.3543 0.367188 25.9687V22.9219C0.367188 21.9308 0.53886 20.9664 0.855851 20.0531ZM10.9997 1.47826C8.7915 1.47826 6.99492 3.19966 6.99482 5.31558H6.99492V6.53758C10.1045 6.26275 11.2575 4.28055 11.2696 4.25903C11.405 4.01854 11.6746 3.87687 11.9589 3.89399C12.2435 3.91205 12.4908 4.0876 12.5918 4.34306C12.6232 4.42072 13.3176 6.08458 15.0044 6.48331V5.31568C15.0044 3.59642 13.8184 2.13768 12.1893 1.65109C11.8133 1.53871 11.4138 1.47826 10.9997 1.47826ZM7.26455 13.0314V13.7401C7.47461 13.6628 7.6874 13.591 7.90293 13.5259C7.67715 13.3764 7.46406 13.2109 7.26455 13.0314ZM9.3498 21.6754L10.9997 23.1224L12.6497 21.6754L11.5569 17.1301H10.4427L9.3498 21.6754ZM10.103 14.5008C9.96015 14.5166 9.81758 14.5356 9.67549 14.558L10.3072 15.7342H11.6923L12.324 14.558C12.182 14.5356 12.0395 14.5167 11.8967 14.5008C11.8815 14.4991 11.8663 14.4976 11.8511 14.4961C11.846 14.4956 11.8409 14.4951 11.8357 14.4946C11.7227 14.4828 11.6094 14.4734 11.4959 14.4656C11.4837 14.4648 11.4715 14.464 11.4593 14.4631C11.44 14.4617 11.4207 14.4604 11.4014 14.4593C11.3085 14.4539 11.2154 14.4513 11.1224 14.4487C11.1069 14.449 11.0914 14.4495 11.076 14.45C11.0507 14.4509 11.0253 14.4517 10.9998 14.4517C10.9743 14.4517 10.9489 14.4509 10.9236 14.45C10.9082 14.4495 10.8927 14.449 10.8772 14.4487C10.7843 14.4512 10.6912 14.4538 10.5981 14.4593C10.576 14.4605 10.5539 14.4621 10.5318 14.4637C10.5224 14.4643 10.5131 14.465 10.5037 14.4656C10.3902 14.4733 10.277 14.4828 10.1637 14.4946C10.1435 14.4967 10.1232 14.4986 10.103 14.5008ZM14.0965 13.5259C14.3122 13.591 14.5249 13.6627 14.7349 13.7401V13.0313C14.5353 13.2108 14.3223 13.3764 14.0965 13.5259ZM14.9589 9.79802C14.9889 9.6089 15.0045 9.41539 15.0045 9.21841H15.0046V7.90874C13.3938 7.66301 12.3755 6.65305 11.8075 5.85673C10.9967 6.67476 9.47383 7.75724 6.99512 7.93821V9.21832C6.99512 9.41511 7.01074 9.60853 7.04072 9.79755C7.06641 9.90834 7.08935 10.02 7.11074 10.132C7.52754 11.7606 9.03154 12.9836 10.8405 13.0518C10.8552 13.0514 10.8698 13.051 10.8845 13.0506C10.9196 13.0496 10.9547 13.0485 10.9899 13.0481C10.9966 13.0479 11.0031 13.0479 11.0098 13.0481C11.045 13.0485 11.0801 13.0496 11.1152 13.0506C11.1299 13.051 11.1445 13.0514 11.1592 13.0518C12.9686 12.9835 14.4726 11.76 14.8892 10.1311C14.9104 10.0196 14.9333 9.90844 14.9589 9.79802Z"
                                    fill="#19191D" />
                            </svg>
                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor">Associate Details </p>
                            <p class="contentDescriptionText">Submit basic details of the associate</p>
                        </div>
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                    </a>
                </li> -->
                <!-- <li class="tabactivelink">
                    <a href="#" class="tabAchorSection ">
                        <div class="iconSection">
                            <svg width="35" height="35" viewBox="0 0 30 30" fill="none">
                                <path
                                    d="M26.875 26.25H3.125C1.4025 26.25 0 24.8475 0 23.125V6.875C0 5.1525 1.4025 3.75 3.125 3.75H26.875C28.5975 3.75 30 5.1525 30 6.875V23.125C30 24.8475 28.5975 26.25 26.875 26.25ZM3.125 5C2.09125 5 1.25 5.84125 1.25 6.875V23.125C1.25 24.1587 2.09125 25 3.125 25H26.875C27.9088 25 28.75 24.1587 28.75 23.125V6.875C28.75 5.84125 27.9088 5 26.875 5H3.125Z"
                                    fill="#19191D" />
                                <path
                                    d="M9.375 15C7.6525 15 6.25 13.5975 6.25 11.875C6.25 10.1525 7.6525 8.75 9.375 8.75C11.0975 8.75 12.5 10.1525 12.5 11.875C12.5 13.5975 11.0975 15 9.375 15ZM9.375 10C8.34125 10 7.5 10.8412 7.5 11.875C7.5 12.9088 8.34125 13.75 9.375 13.75C10.4087 13.75 11.25 12.9088 11.25 11.875C11.25 10.8412 10.4087 10 9.375 10Z"
                                    fill="#19191D" />
                                <path
                                    d="M14.375 21.25C14.03 21.25 13.75 20.97 13.75 20.625V19.375C13.75 18.3413 12.9087 17.5 11.875 17.5H6.875C5.84125 17.5 5 18.3413 5 19.375V20.625C5 20.97 4.72 21.25 4.375 21.25C4.03 21.25 3.75 20.97 3.75 20.625V19.375C3.75 17.6525 5.1525 16.25 6.875 16.25H11.875C13.5975 16.25 15 17.6525 15 19.375V20.625C15 20.97 14.72 21.25 14.375 21.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 16.25H18.125C17.78 16.25 17.5 15.97 17.5 15.625C17.5 15.28 17.78 15 18.125 15H25.625C25.97 15 26.25 15.28 26.25 15.625C26.25 15.97 25.97 16.25 25.625 16.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 11.25H18.125C17.78 11.25 17.5 10.97 17.5 10.625C17.5 10.28 17.78 10 18.125 10H25.625C25.97 10 26.25 10.28 26.25 10.625C26.25 10.97 25.97 11.25 25.625 11.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 21.25H18.125C17.78 21.25 17.5 20.97 17.5 20.625C17.5 20.28 17.78 20 18.125 20H25.625C25.97 20 26.25 20.28 26.25 20.625C26.25 20.97 25.97 21.25 25.625 21.25Z"
                                    fill="#19191D" />
                            </svg>
                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor">Identity Proof</p>
                            <p class="contentDescriptionText">Upload identity proof documents</p>
                        </div>
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                    </a>
                </li> -->
                <!-- <li class="tabactivelink">
                    <a href="#" class="tabAchorSection active ">
                        <div class="iconSection">

                            <svg width="35" height="35" viewBox="0 0 32 32" fill="none">
                                <path
                                    d="M20.375 27.25C20.375 27.5952 20.0952 27.875 19.75 27.875C19.4048 27.875 19.125 27.5952 19.125 27.25C19.125 26.9048 19.4048 26.625 19.75 26.625C20.0952 26.625 20.375 26.9048 20.375 27.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M14.75 11.625C14.75 11.9702 14.4702 12.25 14.125 12.25C13.7798 12.25 13.5 11.9702 13.5 11.625C13.5 11.2798 13.7798 11 14.125 11C14.4702 11 14.75 11.2798 14.75 11.625Z"
                                    fill="#19191D" />
                                <path
                                    d="M9.125 23.5C9.125 23.8452 8.84521 24.125 8.5 24.125C8.15479 24.125 7.875 23.8452 7.875 23.5C7.875 23.1548 8.15479 22.875 8.5 22.875C8.84521 22.875 9.125 23.1548 9.125 23.5Z"
                                    fill="#19191D" />
                                <path
                                    d="M7.875 0.625V4.125H4.75C4.40479 4.125 4.125 4.40479 4.125 4.75V31.375C4.125 31.7202 4.40479 32 4.75 32H11.3125C11.6577 32 11.9375 31.7202 11.9375 31.375C11.9375 31.0298 11.6577 30.75 11.3125 30.75H5.375V5.375H19.125V8.5C19.125 8.84521 19.4048 9.125 19.75 9.125H22.875V30.75H16.9375C16.5923 30.75 16.3125 31.0298 16.3125 31.375C16.3125 31.7202 16.5923 32 16.9375 32H23.5C23.8452 32 24.125 31.7202 24.125 31.375V27.875H27.25C27.5952 27.875 27.875 27.5952 27.875 27.25V0.625C27.875 0.279785 27.5952 0 27.25 0H8.5C8.15479 0 7.875 0.279785 7.875 0.625ZM20.375 7.875V6.25903L21.991 7.875H20.375ZM26.625 1.25V26.625H24.125V8.5C24.125 8.3418 24.063 8.17969 23.9429 8.05884C23.9424 8.05859 23.9421 8.05835 23.9419 8.05811L20.1919 4.30811C20.1917 4.30786 20.1914 4.30762 20.1912 4.30737C20.0806 4.19727 19.9219 4.125 19.75 4.125H9.125V1.25H26.625Z"
                                    fill="#19191D" />
                                <path
                                    d="M8.5 19.125C8.15479 19.125 7.875 19.4048 7.875 19.75C7.875 20.0952 8.15479 20.375 8.5 20.375H19.75C20.0952 20.375 20.375 20.0952 20.375 19.75C20.375 19.4048 20.0952 19.125 19.75 19.125H18.5V14.75H19.75C20.0952 14.75 20.375 14.4702 20.375 14.125V12.25C20.375 12.041 20.2705 11.8459 20.0967 11.73L14.4717 7.97998C14.2617 7.84009 13.9883 7.84009 13.7783 7.97998L8.15332 11.73C7.97949 11.8459 7.875 12.041 7.875 12.25V14.125C7.875 14.4702 8.15479 14.75 8.5 14.75H9.75V19.125H8.5ZM17.25 19.125H14.75V14.75H17.25V19.125ZM9.125 12.5845L14.125 9.25122L19.125 12.5845V13.5H9.125V12.5845ZM11 14.75H13.5V19.125H11V14.75Z"
                                    fill="#19191D" />
                                <path
                                    d="M19.75 22.875H11C10.6548 22.875 10.375 23.1548 10.375 23.5C10.375 23.8452 10.6548 24.125 11 24.125H19.75C20.0952 24.125 20.375 23.8452 20.375 23.5C20.375 23.1548 20.0952 22.875 19.75 22.875Z"
                                    fill="#19191D" />
                                <path
                                    d="M17.875 27.25C17.875 26.9048 17.5952 26.625 17.25 26.625H8.5C8.15479 26.625 7.875 26.9048 7.875 27.25C7.875 27.5952 8.15479 27.875 8.5 27.875H17.25C17.5952 27.875 17.875 27.5952 17.875 27.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M14.75 31.375C14.75 31.7202 14.4702 32 14.125 32C13.7798 32 13.5 31.7202 13.5 31.375C13.5 31.0298 13.7798 30.75 14.125 30.75C14.4702 30.75 14.75 31.0298 14.75 31.375Z"
                                    fill="#19191D" />
                            </svg>
                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor">Bank Details</p>
                            <p class="contentDescriptionText">Submit bank details and documents</p>
                        </div>
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                    </a>
                </li> -->
                <Side_content_component
                    facility_type={$facility_data_store.facility_type}
                    {page_name}
                />
            </ul>
        </div>
        <div class="w-widthforFormSection w100xs ">
            <div class="onboardForm ">
                <div class="formTextSection">
                    <p class="smxslabel">Bank Details</p>
                    <p class="formHeadingLabel ">
                        Submit associate bank details
                    </p>
                    <p class="formRequiredtext ">
                        <span class="text-mandatorysign">* </span>marked fields
                        are required
                    </p>
                </div>
                <form action="#">
                    <div class="formElements">
                        <div class="flex">
                            <div class="formGroupnote ">
                                <label class="formLable "
                                    >IFSC Code<span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/bank.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        class="inputbox"
                                        bind:value={$bank_details.ifsc_code}
                                        on:blur={() => verify_ifsc_code()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-2">
                                    <p class="noteDescription">
                                        <span class="font-medium">Note:</span>
                                        Do not add white space
                                    </p>
                                    <div class="text-red-500 text-xs">
                                        {ifsc_code_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {#if $bank_details.bank_name}
                            <div>
                                <div class="formGroup ">
                                    <label
                                        class="formLable invisible xs:hidden"
                                    />
                                    <div
                                        class="grid md:grid-cols-3 gap-4 formInnerGroup "
                                    >
                                        <div>
                                            <p class="branchText ">Bank Name</p>
                                            <p class="locationText">
                                                {$bank_details.bank_name}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="branchText ">Branch</p>
                                            <p class="locationText">
                                                {$bank_details.branch_name}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="branchText ">
                                                Branch City
                                            </p>
                                            <p class="locationText">
                                                {$bank_details.branch_city}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}

                        <!-- <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Bank Details<span class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="{$img_url_name.img_name}/bank.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <select class="inputbox">
                                <option class="pt-6">HDFC</option>
                                <option>ICICI</option>
                                <option>Axis</option>
                                <option>SIB</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>
                </div> -->
                        <div class="flex">
                            <div class="formGroupnote ">
                                <label class="formLable "
                                    >Account Number<span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/account.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        class="inputbox"
                                        bind:value={$bank_details.account_number}
                                        on:blur={() => verify_account_number()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {account_number_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroupnote ">
                                <label class="formLable "
                                    >Confirm Account Number <span
                                        class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/account.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        class="inputbox"
                                        bind:value={$bank_details.re_enter_account_number}
                                        on:blur={() =>
                                            verify_re_account_number()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {re_account_number_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroupnote ">
                                <label class="formLable "
                                    >Account Holder Name <span
                                        class="mandatoryIcon">*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/account.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        class="inputbox"
                                        bind:value={$bank_details.account_holder}
                                        on:blur={() => verify_account_holder()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {account_holder_message}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable invisible xs:hidden">IFSC Code<span
                                class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <p class="noteDescription"><span class="font-medium">Note:</span>
                                        Do not add white space </p>
                                        <p class="branchText">Branch</p>
                                        <p class="locationText">Pune - East Street</p>
                                </div>
                    </div>
                </div> -->
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Bank Type<span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/bank.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        class="inputbox"
                                        aria-placeholder="Select Type"
                                        bind:value={$bank_details.bank_type}
                                    >
                                        <!-- <option class="pt-6" >Select Type</option> -->
                                        <option value="Co-Operative Bank"
                                            >Co-Operative Bank</option
                                        >
                                        <option value="Nationalised Bank"
                                            >Nationalised Bank</option
                                        >
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
                                        {bank_type_message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroupnote ">
                                <label class="formLable "
                                    >Branch pincode<span class="mandatoryIcon"
                                        >*</span
                                    ></label
                                >
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img
                                            src="{$img_url_name.img_name}/bank.png"
                                            class="placeholderIcon"
                                            alt=""
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        class="inputbox"
                                        bind:value={$bank_details.branch_pin_code}
                                        on:blur={() => verify_pincode()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable invisible" />
                                <div class="formInnerGroup mt-1">
                                    <div class="text-red-500 text-xs">
                                        {pincode_message}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Upload Blank Cheque Copy</label
                                >
                                <div class="formInnerGroup ">
                                    <label class="cursor-pointer inline-block ">
                                        <div
                                            class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px"
                                        >
                                            Upload
                                        </div>
                                        <input
                                            type="file"
                                            class="hidden"
                                            accept=".jpg, .jpeg, .png ,.pdf"
                                            id="blank_cheque_copy"
                                            on:change={(e) =>
                                                on_blank_cheque_upload(e)}
                                        />
                                    </label>
                                    <div class="flex">
                                        {#if blank_cheque_data.file_name}
                                            <p>{blank_cheque_data.file_name}</p>
                                            <img
                                                class="pl-2 cursor-pointer"
                                                on:click={() =>
                                                    delete_files(
                                                        blank_cheque_data
                                                    )}
                                                src="{$img_url_name.img_name}/blackclose.svg"
                                                alt=""
                                            />
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
                                        {blank_cheque_message}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Passbook</label>
                                <div class="formInnerGroup ">
                                    <label class="cursor-pointer inline-block ">
                                        <div
                                            class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px"
                                        >
                                            Upload
                                        </div>
                                        <input
                                            type="file"
                                            class="hidden"
                                            accept=".jpg, .jpeg, .png,.pdf"
                                            id="passbook_copy"
                                            on:change={(e) =>
                                                on_passbook_upload(e)}
                                        />
                                    </label>
                                    <div class="flex">
                                        {#if passbook_data.file_name}
                                            <p>{passbook_data.file_name}</p>
                                            <img
                                                class="pl-2 cursor-pointer"
                                                on:click={() =>
                                                    delete_files(passbook_data)}
                                                src="{$img_url_name.img_name}/blackclose.svg"
                                                alt=""
                                            />
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Cancel Cheque</label>
                                <div class="formInnerGroup ">
                                    <label class="cursor-pointer inline-block ">
                                        <div
                                            class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px"
                                        >
                                            Upload
                                        </div>
                                        <input
                                            type="file"
                                            class="hidden"
                                            accept=".jpg, .jpeg, .png,.pdf"
                                            id="cancel_cheque_copy"
                                            on:change={(e) =>
                                                on_cancle_cheque_upload(e)}
                                        />
                                    </label>
                                    <div class="flex">
                                        {#if Cancel_cheque_data.file_name}
                                            <p>
                                                {Cancel_cheque_data.file_name}
                                            </p>
                                            <img
                                                class="pl-2 cursor-pointer"
                                                on:click={() =>
                                                    delete_files(
                                                        Cancel_cheque_data
                                                    )}
                                                src="{$img_url_name.img_name}/blackclose.svg"
                                                alt=""
                                            />
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable "
                                    >Account Statement</label
                                >
                                <div class="formInnerGroup ">
                                    <label class="cursor-pointer inline-block ">
                                        <div
                                            class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px"
                                        >
                                            Upload
                                        </div>
                                        <input
                                            type="file"
                                            class="hidden"
                                            accept=".jpg, .jpeg, .png,.pdf"
                                            id="account_statement_copy"
                                            on:change={(e) =>
                                                on_account_statement_upload(e)}
                                        />
                                        <!-- {#if account_statement_data.file_name}
                                            {account_statement_data.file_name}
                                        {/if} -->
                                    </label>
                                    <div class="flex">
                                        {#if account_statement_data.file_name}
                                            <p>
                                                {account_statement_data.file_name}
                                            </p>
                                            <img
                                                class="pl-2 cursor-pointer"
                                                on:click={() =>
                                                    delete_files(
                                                        account_statement_data
                                                    )}
                                                src="{$img_url_name.img_name}/blackclose.svg"
                                                alt=""
                                            />
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <p class="  text-red-500 text-xs">
                                    {#if form_message}
                                        {form_message}
                                    {/if}
                                </p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <p class="noteDescription mt-2 ">
                                    <span class="font-medium">Note:</span>
                                    Photo must be clear and in JPG, PNG, or PDF format
                                    to process faster verification
                                </p>
                            </div>
                        </div>

                        <!-- <div class="flex mt-2">
                    <div class="formGroupBaseLine ">
                        <label class="formLable">Bank Document<span
                                class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                 
                                    <div class="text-center flex mb-2">
                                    
                                      <div class="flex items-center mr-4 mt-2">
                                        <input id="radio1" type="radio" name="radio" class="hidden" checked />
                                        <label for="radio1" class="radioLable">
                                         <span class="radioCirle"></span>
                                         Cancel Cheque</label>
                                       </div>

                                       <div class="flex items-center mr-4 mt-2">
                                        <input id="radio1" type="radio"  name="radio" class="hidden" checked />
                                        <label for="radio1" class="radioLable">
                                         <span class="radioCirle"></span>
                                         Passbook</label>
                                       </div>
                                    
                                       <div class="flex items-center  mt-2">
                                        <input id="radio2" type="radio" name="radio" class="hidden" />
                                        <label for="radio2" class="radioLable">
                                         <span class="radioCirle"></span>
                                         Bank Statement</label>
                                       </div>
                                     </div>
                                     <label class="cursor-pointer">
                                        <div class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px">Upload</div>
                                        <input type='file' class="hidden" />
                                    </label>
                                     <p class="noteDescription mt-2"><span class="font-medium">Note:</span>
                                    Photo must be clear and in JPG, PNG, or PDF format to process faster verification</p>
                                </div>
                    </div>
                </div> -->
                    </div>
                </form>
            </div>
            <div class="onboardFormNot ">
                <div class="formFooterActionSubmit">
                    <div on:click={routeToBack} class="backButton">
                        <img src="{$img_url_name.img_name}/arrowleft.png" alt="" />
                    </div>
                    <div>
                        <!-- <button class="saveandproceed">Save</button> -->
                        <button
                            on:click={() => save_bank_details()}
                            class="saveandproceed">Save and Proceed</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<Toast type={toast_type} text={toast_text} />
<Success_popup text={success_text} />
