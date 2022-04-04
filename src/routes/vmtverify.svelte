<script>
    import { onMount } from "svelte";
    import {facility_data_store} from "../stores/facility_store";
    import { bank_details } from "../stores/bank_details_store";
    import {get_facility_details, get_bank_facility_details, approve_reject_status} from "../services/vmt_verify_services";
    import {facility_document} from "../services/vmt_verify_services"
    import { goto } from "$app/navigation";


    let facility_document_data = "";
    let vmt_pan = "";
    // let vmt_pan_receipt = "";
    // let new_pan_no = "";
    // let new_pan_receipt = "";
    let pan_success_msg = "";
    let pan_reject_msg = "";
    let pan_receipt_success_msg = "";
    let pan_receipt_reject_msg = "";
    let temp = "";
    let pan_success_flag = 0;
    let pan_reject_flag = 0;
    let temp_display = "display_id_proof";
    let routePrev = "";
    let temp_switchto = "pan_tab";
    let change_to = "basic_details";

    onMount(async () => {
        let facility_data_res = await get_facility_details()
        console.log("facility_data_res",facility_data_res)
        try{
            if(facility_data_res.body.status=="green"){
                if(facility_data_res!="null"){
                    facility_data_store.set(
                        facility_data_res.body.data[0]
                    )
                }
            }
        }
        catch (err) {
            console.log("error in facility data")
        }
        console.log("facility_data_store",$facility_data_store)
        // console.log("facility_data_store",$facility_data_store)

        
        let facility_bank_data_res = await get_bank_facility_details()
        console.log("bank_details", facility_bank_data_res)
        try{
            if(facility_bank_data_res!="null"){
                bank_details.set(
                    facility_bank_data_res.body.data[0]
                )
            }
        }
        catch (err){
            console.log("Bank details error")
        }


        let facility_pan_photo_res = await facility_document()
        try{
            if (facility_pan_photo_res != "null" ){

                console.log("error log", facility_pan_photo_res.body.status)
                facility_document_data = facility_pan_photo_res.body.data;
                console.log(facility_document_data.length)
                for (var i = 0; i < facility_document_data.length; i++){
                    console.log(facility_document_data[i].doc_type)
                if(facility_document_data[i].doc_type == "pan-photo"){
                    // new_pan_no = facility_document_data[i].doc_number 
                    // new_pan_receipt = facility_document_data[i].name
                    console.log("pan___",facility_document_data[i].file_url)
                    // pan_attach = facility_document_data[i].file_url
                    document.getElementById("pan_photo").src=facility_document_data[i].file_url;
                    console.log("nbcvsjgX")
                }
                
            }
            }
        }
        catch (err){
        }

    })

    async function doc_approve(doc_cat){
        if (doc_cat == "pan"){
        //     if (vmt_pan == new_pan_no){
        //         pan_success_msg = "PAN Card No has Matched"
        //         pan_reject_msg = "";
        //         // if(vmt_pan_receipt == new_pan_receipt){
        //         //     pan_receipt_success_msg = "PAN Receipt has matched"
        //         //     pan_receipt_reject_msg = "";
        //         //     pan_success_flag = 1
        //         //     // temp=b;
        //         // }
        //         // else{
        //         //     pan_receipt_reject_msg = "PAN Receipt doesn't Matched"
        //         //     pan_receipt_success_msg = "";
        //         // }
        //     }
        //     else {
        //         pan_reject_msg = "PAN Card No has doesn't Matched"
        //         pan_success_msg = "";
        //     }
        //     console.log("pan Operations")
        //     console.log("pan details",vmt_pan,new_pan_no)
        //     // vmt_pan_receipt
        console.log("payload", $facility_data_store)
        //   let doc_load = {
        //     doc_number: vmt_pan,
        //     doc_type: "pan-photo",
        //     resource_id: $facility_data_store.name,
        //     status: "true",
        //     status_type: "DV"
        //   }
        let document_load = {
            "resource_id":"CRUN00978",
            "doc_number":"DAFSB2394T",
            "status_type":"DV",
            "status":"true","doc_type":"pan-photo"
        }
          approve_reject_status(document_load)
        //   console.log("Approve res", doc_approve_res)
            // try{
                
            // }
            // catch{

            // }
        }

        
    }

    function routeToOnboardsummary() {
        let replaceState = false;
        goto(routePrev, { replaceState });
        }

        routePrev = "onboardsummary";
</script>

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section xsl:px-p10">
            <div class="breadcrumbtextDetails breadcrumbmedia">
                <p class="flex items-center">
                    <span class="text-textgrey pr-1 text-base xsl:hidden">Home / Workforce</span>

                    <span class="Username">
                        <img src="../src/img/delivery.png" class="userIconMedia" alt=""><span
                            > Dhiraj Shah</span>
                        <span class="userDesignation">(Associate
                            - NDA)</span> </span>

                </p>
                <!-- <p class="breadcrumbRight">
                    <a class="cursor-pointer">
                        <span class="breadRightIcons" id="SupplerModalbuttonClick">
                            <img src="../src/img/audittrail.png" class="pr-2" alt=""> Audit Trial (12)
                        </span>
                    </a>
                  
                </p> -->
                <button on:click={routeToOnboardsummary} type="button"
                        class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3">Back</button>
            </div>
            <div class="onboardedBy mb-4">
                <p class="text-sm"><span class="font-light text-grey text-sm">Onboarded By - </span>Hemant Kumar, Mulsi SP, eCommerce</p>
            </div>
           
            <div class="statusbarVMT ">
                <div class="leftStatus">
                    <div class="text-sm">
                        <div class="statusBarSec ">
                            <div class="statusbarLeft">
                                <p class="statusText">Status - </p>
                            </div>
                            <div class="statusbarMiddle">
                              <!-- {#if $facility_data_store.is_id_prof_verified=="1"} -->
                                <!-- <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                        class="pr-2" alt="">
                                        ID Proof
                                        <img src="../src/img/info.svg"
                                        class="pl-2" alt="">
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
                                />ID Rejected
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


                                <p class="xsl:hidden"> <img src="../src/img/Line.png" alt=""></p>

                                <!-- <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                        class="pr-2" alt="">Bank Details
                                        <img src="../src/img/info.svg"
                                        class="pl-2" alt="">
                                </p> -->

                                {#if $bank_details.approved == "1"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> Bank Verified
                                </p>
                                {:else if $bank_details.rejected == "0"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/reject.png"
                                    class="pr-2"
                                    alt=""
                                />Bank Rejected
                                </p>
                                {/if}

                                <p class="xsl:hidden"> <img src="../src/img/Line.png" alt=""></p>

                                    <!-- <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                            class="pr-2" alt="">BGV
                                            <img src="../src/img/info.svg"
                                            class="pl-2" alt="">
                                    </p> -->

                                {#if $facility_data_store.is_bgv_verified == "1"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> BGV Verified
                                </p>
                                {:else if $facility_data_store.is_bgv_rejected == "1"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/reject.png"
                                    class="pr-2"
                                    alt=""
                                />BGV Rejected
                                </p>
                                <!-- {:else} -->
                                {:else if $facility_data_store.is_bgv_intiated == "0" && $facility_data_store.is_id_prof_verified == "0"}
                                <p class="statusContent font-normal xs:w-5/12">
                                <img
                                    src="../src/img/timer.png"
                                    class="pr-2"
                                    alt=""
                                />BGV Pending
                                </p>
                                {/if}
                                    
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="statusrightlink xsl:hidden">
                    
                </div> -->
                <div class="statusrightlink xsl:hidden">
                    <div class="vmtRejected ">
                        Reject 
                    </div>
                    <div class="vmtVerify ">
                        Verify 
                        <!-- <img src="../src/img/downarrowwhite.svg" class="pl-2" alt="arrow"> -->
                    </div>
                </div>
            </div>
            <div class="mt-4 mb-3 hidden xsl:flex">
                <div class="vmtVerify ">
                    Verify 
                    <!-- <img src="../src/img/downarrowwhite.svg" class="pl-2" alt="arrow"> -->
                </div>
            </div>
        </div>
    </div>
    <div class="hidden" id="userDetailsSection">
    <div class="contentsectionDetailview ">
        <div class="associateDetails ">
            <div class="detailsHeader ">
                <div class="left">
                    <p class="detailsTitle">Associate Details</p>
                    <p class="detailsUpdate">
                        <span><span class="font-medium">Last updated -</span>> 27-Apr-2021 03:28 pm. <span
                                class="font-medium">By-</span> Admin</span>
                    </p>
                </div>
                <div class="right flex">
                    <a href="" class="smButton">
                        <img src="../src/img/edit.png" alt="">
                    </a>
                </div>

            </div>

            <div class="profilepic">
                <img src="../src/img/profilepic.png" alt="">
                <p class="imgName">dhiraj-shah.jpeg</p>
            </div>

            <div class="userInfoSec px-5  flex items-start ">
                <img src="../src/img/location1.png" alt="">
                <div class="pl-4">
                    <p class="detailLbale">Address & Pincode</p>
                    <p class="detailData ">r/no-9, jiwheshwar kripa chawl, penkarpada,
                        chimaji Nagar, Thane - 401104</p>
                </div>
            </div>

            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/mobilephone.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Mobile Number</p>
                        <p class="detailData">88560 22890</p>
                    </div>
                </div>
                <div class="userStatus ">
                    <p class="userStatusTick"><img src="../src/img/checked.png" alt="" class="pr-1"> Verified
                    </p>
                </div>
            </div>

            <div class="userInfoSec3">
                <div class="flex items-start">
                    <img src="../src/img/email.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Email</p>
                        <p class="detailData">dhiraj.shah@gmail.com</p>
                    </div>
                </div>

            </div>

            <div class="userInfoSecPadding">

                <div class="wrapperInfoFirst">
                    <div class="flex items-start">
                        <img src="../src/img/addressproof.png" alt="">
                        <div class="pl-4">
                            <p class="detailLbale">Address proof</p>
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText"><img src="../src/img/timer.png" alt="" class="pr-1"> Verification
                            Pending</p>
                    </div>

                </div>
                <div class="wrapperInfo ">
                    <div class="flex items-start">
                        <img src="../src/img/addressproof.png" class="invisible" alt="">
                        <div class="pl-4 flex items-center">
                            <img src="../src/img/jpeg.png" class="" alt="">

                            <p class="detailLbale">ration-card-copy.jpeg</p>
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText">
                            <a href="" class="smButton">
                                <img src="../src/img/view.png" alt="">
                            </a>
                        </p>
                    </div>

                </div>


            </div>

            <div class="userInfoSec3">
                <div class="flex items-start">
                    <img src="../src/img/gst.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">GST Details</p>
                        <p class="detailData">Not added</p>
                    </div>
                </div>
                <div class="userStatus ">
                    
                </div>
            </div>

            <div class="border-gray-200 px-5">
                <hr>
            </div>

            <div class="appcredentials">
                <div class="headingWithIcon">
                    <img src="../src/img/mobileblue.png" alt="">
                    <p class="detailsTitle">Libear App Credentials</p>
                </div>
            </div>

            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/pan.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">User ID</p>
                        <p class="detailData">dhiraj.shah@elastic.run</p>
                    </div>
                </div>

            </div>
            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/password.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Password</p>
                        <p class="detailData">test123</p>
                    </div>
                </div>

            </div>
            <div class="border-gray-200 px-5">
                <hr>
            </div>

            <div class="userInfoSec px-5 py-5 flex justify-end">

                <div class="addOwner ">
                    <p class="flex items-center smButtonText">
                        <a href="" class="smButton">
                            Add Owner
                        </a>
                    </p>
                </div>
            </div>

        </div>
        <div class="fullsection w-widthforWorkDetailSection">
            <div class="WorkDetailSection bg-white rounded-lg mb-5">
                <div class="detailsHeader xsl:flex-wrap ">
                    <div class="left">
                        <p class="detailsTitle">Work Details</p>
                        <p class="detailsUpdate">
                            <span><span class="font-medium">Last updated -</span>> 27-Apr-2021 03:28 pm. <span
                                    class="font-medium">By-</span> Admin</span>
                        </p>
                    </div>
                    <div class="right flex">
                        <p class="flex items-center smButtonText pr-3 ">
                            <a href="" class="smButton">
                                Work Contract
                            </a>
                        </p>
                    </div>

                </div>
                <div class="detailsrow ">
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3">
                            <div class="flex items-start">
                                <img src="../src/img/Subtract.png" alt="" class="w-5 h-auto">
                                <div class="pl-4">
                                    <p class="detailLbale">Associate Type</p>
                                    <p class="detailData">NDA</p>
                                </div>
                            </div>
                            <div class="userStatus ">

                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/pan.png" alt="" class="w-5 h-5">
                                <div class="pl-4">
                                    <p class="detailLbale">Associate ID</p>
                                    <p class="detailData">BOMG00538</p>
                                </div>
                            </div>

                        </div>
                        <div class="userInfoSec3">
                            <div class="flex items-start">
                                <img src="../src/img/organization.png" alt="" class="w-5 h-5">
                                <div class="pl-4">
                                    <p class="detailLbale">Organization</p>
                                    <p class="detailData">Amazon Transportation</p>
                                </div>
                            </div>
                           
                        </div>
                        <div class="userInfoSecPadding">
                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img src="../src/img/offerlatter.png" alt="" class="w-5 h-5">
                                    <div class="pl-4">
                                        <p class="detailLbale">Offer Letter</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText"><img src="../src/img/timer.png" alt="" class="pr-1">
                                        Verification Pending</p>
                                </div>

                            </div>
                            <div class="wrapperInfo ">
                                <div class="flex items-start">
                                    <img src="../src/img/addressproof.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <img src="../src/img/jpeg.png" class="" alt="">

                                        <p class="detailLbale">dhiraj-shah-offer-letter.pdf</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="../src/img/view.png" alt="">
                                        </a>
                                    </p>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/location.png" class="w-6 h-6" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">City</p>
                                    <p class="detailData">Pune</p>
                                </div>
                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/warehouse.png" class="w-5 h-5" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Station</p>
                                    <p class="detailData">MHPD - Mulsi SP</p>
                                </div>
                            </div>

                        </div>

                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/managerVendor.png" class="w-5 h-5" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Vendor</p>
                                    <p class="detailData">Vitthal Sutar - MHPD00012</p>
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
                            <span><span class="font-medium">Last updated -</span>> 27-Apr-2021 03:28 pm. <span
                                    class="font-medium">By-</span> Admin</span>
                        </p>
                    </div>
                    <div class="right flex">
                        <p class="rejectText pr-3"><img src="../src/img/reject.png" alt="" class="pr-2"> Reject
                        </p>
                        <div class="hidden">
                            <p class="verifiedTextGreen pr-3"><img src="../src/img/checked.png" alt=""
                                    class="pr-1">
                                Verified</p>
                        </div>
                        <div class="hidden">
                            <p class="verifyText pr-3"><img src="../src/img/timer.png" alt="" class="pr-2">
                                Verification Pending</p>
                        </div>
                        <a href="" class="smButton">
                            <img src="../src/img/edit.png" alt="">
                        </a>
                    </div>

                </div>
                <div class="userInfoSecPadding ">
                    <div class="innercardSection">
                        <div class="remark">
                            <p class="text-base text-greycolor font-medium mb-2">Remarks</p>
                            <ul class="text-sm text-greycolor list-disc	ml-m15">
                                <li>Pancard number mismatch</li>
                                <li>Voter ID not clear</li>
                            </ul>
                        </div>
                        <div class="requiredaction">
                            <p class="text-base text-redRequired font-medium mb-2">Required Action</p>
                            <ul class="text-sm text-greycolor list-disc ml-m15	">
                                <li>Update correct pan number
                                </li>
                                <li>Re-submit voter ID</li>
                            </ul>
                        </div>
                        <div class="updateAction xs:w-full">
                            <button class="ErBlueButton">Update</button>
                        </div>
                    </div>
                </div>
                <div class="detailsrow">
                    <div class="workDetailSection w-full">
                        <div class="userInfoSecPadding">

                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" alt="">
                                    <div class="pl-4">
                                        <p class="detailLbale">PAN Number</p>
                                        <p class="detailData">CZHPS3225C</p>

                                    </div>
                                </div>
                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">PAN Card Attachment</p>
                                    </div>
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <img src="../src/img/jpeg.png" class="" alt="">

                                        <p class="detailLbale">Pan-card-copy.jpeg</p>
                                        <!-- <p class="detailLbale">{pan_attach}</p> -->

                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="../src/img/view.png" alt="">
                                        </a>
                                    </p>
                                </div>

                            </div>


                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/pan.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Driving License</p>
                                    <p class="detailData">Not Submitted</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSecPadding">

                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" alt="">
                                    <div class="pl-4">
                                        <p class="detailLbale">Aadhar Number</p>
                                        <p class="detailData">9714 1358 8022</p>

                                    </div>
                                </div>

                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">Aadhar Card Attachment</p>

                                    </div>
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                <div class="flex items-start">
                                    <img src="../src/img/addressproof.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <img src="../src/img/jpeg.png" class="" alt="">

                                        <p class="detailLbale">aadhar-card-copy.jpeg</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="../src/img/view.png" alt="">
                                        </a>
                                    </p>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div class="WorkDetailSection bg-white rounded-lg">
                <div class="detailsHeader  xsl:flex-wrap">
                    <div class="left">
                        <p class="detailsTitle">Bank Details
                        </p>
                        <p class="detailsUpdate">
                            <span><span class="font-medium text-greycolor">Last updated -</span>> 27-Apr-2021
                                03:28 pm. <span class="font-medium text-greycolor">By-</span> Admin</span>
                        </p>
                    </div>
                    <div class="right flex">
                        <p class="verifyText pr-3"><img src="../src/img/timer.png" alt="" class="pr-1">
                            Verification Pending</p>
                        <a href="" class="smButton">
                            <img src="../src/img/edit.png" alt="">
                        </a>
                    </div>

                </div>

                <div class="userInfoSecPadding ">
                    <div class="innercardSection">
                        <div class="remark">
                            <p class="text-base text-greycolor font-medium mb-2">Remarks</p>
                            <ul class="text-sm text-greycolor list-disc	ml-m15">
                                <li>IFSC Code missing/not clear on document</li>
                            </ul>
                        </div>
                        <div class="requiredaction">
                            <p class="text-base text-redRequired font-medium mb-2">Required Action</p>
                            <ul class="text-sm text-greycolor list-disc ml-m15	">
                                <li>Resubmit bank documents
                                </li>
                            </ul>
                        </div>
                        <div class="updateAction xs:w-full">
                            <button class="ErBlueButton">Update</button>
                        </div>
                    </div>
                </div>

                <div class="detailsrow">
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/bank.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Bank Name</p>
                                    <p class="detailData">HDFC</p>
                                </div>
                            </div>

                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/account.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Account Number</p>
                                    <p class="detailData">483792018849327</p>
                                </div>
                            </div>

                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/account.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">IFSC Code</p>
                                    <p class="detailData">HDFC0000148</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/pincode.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Branch</p>
                                    <p class="detailData">Pune - East, 400190</p>
                                </div>
                            </div>

                        </div>
                        <div class="userInfoSecPadding">

                            <div class="wrapperInfoFirst">
                                <div class="flex items-start justify-between">
                                    <div class="flex">
                                        <img src="../src/img/bankdoc.png" alt="">
                                        <div class="pl-4">
                                            <p class="detailLbale">Aadhar Number</p>
                                        </div>
                                    </div>
                                    <div class="pl-4">
                                        <p class="flex items-center smButtonText">
                                            <a href="" class="smButton">
                                                Cheque Details
                                            </a>
                                        </p>

                                    </div>

                                </div>

                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img src="../src/img/addressproof.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">Cancel Cheque Attachment</p>

                                    </div>
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                <div class="flex items-start">
                                    <img src="../src/img/addressproof.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <img src="../src/img/jpeg.png" class="" alt="">

                                        <p class="detailLbale">cancel-cheque-copy.jpeg</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="../src/img/view.png" alt="">
                                        </a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>
</div>

<div class="verifyIdSection ">
    <div class="mobileMenuForVerifyID hidden xsl:block">
        <ul class="flex w-full  text-center menuActiveID">
            <li class="activetab">ID Proof</li>
            <li>Bank Details</li>
            <li>BGV</li>
        </ul>
    </div>
    <div class="grid grid-cols-5 gap-4 bg-lighterGrey xsl:grid-cols-1">
        <div class="col-span-1 xsl:col-span-5">
            <div class="verifyMenu bg-white m-4 rounded-lg xsl:hidden">

                <div class="flex  justify-between items-center py-3 px-4 Menu MenuActive" on:click={() => {temp_display = "display_id_proof";}}>
                    <p>ID Proof<p>
                        <img src="../src/img/downarrowwhite.svg">
                </div>
                <div class="flex  justify-between items-center py-3 px-4 Menu " on:click={() => {temp_display = "display_bank_details";}}>
                    <p>Bank Details<p>
                        <img src="../src/img/downarrowwhite.svg">
                </div>
                <div class="flex  justify-between items-center py-3 px-4 Menu " on:click={() => {temp_display = "display_bgv_details";}}>
                    <p>BGV<p>
                        <img src="../src/img/downarrowwhite.svg">
                </div>
            </div>
        </div>

        <!-- Verify ID Proof -->
        {#if temp_display == "display_id_proof"}
        <div class="m-4 col-span-4 xsl:col-span-5 ">
            <div class="flex w-full justify-between xsl:flex-wrap">
                <h4 class="text-xl font-medium ">Verify ID Proof</h4>
                <p class="detailsUpdate">
                    <span><span class="font-medium">Verified by - </span> Username <span class="font-medium">On-</span> 24-03-2021  12:30 AM</span>
                </p>
            </div> 
            <div class="mobileVerifyIDMenus hidden xsl:block">
                <div class="w-full mt-2">
                    <select name="" id="" class="w-full px-3 py-2 text-sm">
                        <option value="">PAN Number</option>
                        <option value="">Voter ID</option>
                        <option value="">Aadhar Number</option>
                        <option value="">Driving License</option>
                        <option value="">Address Proof</option>
                        <option value="">Offer Letter</option>
                    </select>
                </div>
            </div>
            <div class="w-full bg-white rounded-sm mt-4 ">
              <div class="tabsVerifyID flex  bg-lightGrey xsl:hidden">
                  <div class="tablinkItem  bg-white" on:click={() => {temp_switchto = "pan_tab";}}>
                        <p class="text-base font-medium">PAN Number</p>
                        {#if pan_success_flag=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else}
                        <p class="text-xs text-orange">Pending</p>
                        {/if}
                  </div> 
                  <div class="tablinkItem " on:click={() => {temp_switchto = "voter_tab";}}>
                    <p class="text-base font-normal">Voter ID</p>
                    <p class="text-xs text-orange">Pending</p>
                  </div> 
                  <div class="tablinkItem " on:click={() => {temp_switchto = "aadhar_tab";}}>
                    <p class="text-base font-normal">Aadhar Number</p>
                    <p class="text-xs text-orange">Pending</p>
                  </div>   
                  <div class="tablinkItem " on:click={() => {temp_switchto = "DL_tab";}}>
                    <p class="text-base font-normal">Driving License</p>
                    <p class="text-xs text-orange">Pending</p>
                  </div>   
                  <div class="tablinkItem " on:click={() => {temp_switchto = "address_tab";}}>
                    <p class="text-base font-normal">Address Proof</p>
                    <p class="text-xs text-orange">Pending</p>
                  </div>   
                  <div class="tablinkItem " on:click={() => {temp_switchto = "offerletter_tab";}}>
                    <p class="text-base font-normal">Offer Letter</p>
                    <p class="text-xs text-orange">Pending</p>
                  </div>   
                  
              </div>
            
                <!--  Pan Number  -->
                {#if temp_switchto == "pan_tab"}
                <!-- <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    Attachment section
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment </p>
                        </div>   

                        <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                            <img src=""  id="pan_photo">
                            <p >{pan_attach}</p>commwnt 
                            
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                        
                            </div>
                        </div>

                    </div>  


                    PAN Number
                    <div class="m-4 col-span-3 " >
                            <div class="formField mb-2">
                                <label class="text-greycolor font-light text-sm text-left ">Enter PAN Number </label>
                                <div class="w-full ">
                                    <input type="text" class="inputboxVMT" bind:value={vmt_pan}> 
                                    <div style="color: green;">{pan_success_msg}</div>
                                    <div class="text-red-500">{pan_reject_msg}</div>
                                </div>
                            </div>


                            <div class="ActionButtonsReject text-right mt-3">
                                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium">Reject</button>
                                <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click={() => doc_approve("pan")}>Approve</button>
                                
                            </div>    
                    </div>  
                </div>  -->
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <!-- Attachment section -->
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment </p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="../src/img/pancard.svg"  id="pan_photo">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
                        </div>
                         </div>

                     </div>  
                     <div class="m-4 col-span-3 " >
                            <div class="formField mb-2">
                                <label class="text-greycolor font-light text-sm text-left ">Enter PAN Number </label>
                                <div class="w-full ">
                                    <input type="text" class="inputboxVMT">
                                </div>
                            </div>
                            <!-- <div class="formField">
                                <label class="text-greycolor font-light text-sm  text-left ">Enter PAN Card Application Receipt </label>
                                <div class="w-full ">
                                    <input type="text" class="inputboxVMT" bind:value={vmt_pan}>
                                    <div style="color: green;">{pan_success_msg}</div>
                                    <div class="text-red-500">{pan_reject_msg}</div>
                                </div>
                            </div> -->


                            <div class="ActionButtonsReject text-right mt-3">
                                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium">Reject</button>
                                <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click={() => doc_approve("pan")}>Approve</button>
                                
                            </div>    
                    </div>  
                  </div> 
                {/if}
                <!--  Voter ID  -->

                {#if temp_switchto == "voter_tab"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="../src/img/pancard.svg"  id="hubblepic">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
                        </div>
                         </div>
                     </div>  
                    <div class="m-4 col-span-3 xsl:m-1 " >
                        <div class="formField mb-2 ">
                            <label class="text-greycolor font-light text-sm text-left ">Enter Voter ID Number</label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                        </div>
                        <div class="ActionButtonsReject text-right mt-3 ">
                            <button type="button" class="btnreject ">Reject</button>
                            <button type="button" class="btnApprove ">Approve</button>
                        </div>   
                        <!-- Select issue to reject -->
                        <div class="hidden">   
                            <div class="formField mb-2">
                                <div class="flex justify-end">
                                    <img src="../src/img/close.png" class="closesup" alt="">
                                    </div>  
                                <label class="text-greycolor font-light text-sm text-left ">Select issue to reject</label>
                                <div class="w-full ">
                                    <div class="text-center  mb-2">
                                                
                                        <div class="flex items-center mt-3">
                                        <input id="radio1" type="radio" name="radio" class="hidden" checked />
                                        <label for="radio1" class="radioLable">
                                        <span class="radioCirle"></span>
                                        Voter ID is not clear</label>
                                        </div>
                                    
                                        <div class="flex items-center  mt-2">
                                        <input id="radio2" type="radio" name="radio" class="hidden" />
                                        <label for="radio2" class="radioLable">
                                        <span class="radioCirle"></span>
                                        Fake Document</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="ActionButtonsReject text-right mt-3">
                                <button type="button" class="btnsubmit ">Submit</button>
                            </div> 

                        </div> 

                        <!-- Rejected -->
                        <div class="bg-greylightbg py-3.5 px-6 hidden">
                            <p class="text-xs text-mandatorysign font-light mb-2">Rejected</p>
                            <div class="voterIdNotClear flex justify-between">
                                <p >Voter ID is not clear</p>
                            <p><a class="smButton text-sm text-erBlue" >Edit</a></p> 
                            </div>
                        </div>

                    </div>  
                  </div>  

                  <!-- Aadhar Number -->
                <div class="m-4 col-span-3 hidden" >
                    <div class="formField mb-2">
                        <label class="text-greycolor font-light text-sm text-left ">Enter Aadhar Number</label>
                        <div class="w-full ">
                            <input type="text" class="inputboxVMT">
                        </div>
                    </div>

                    <div class="ActionButtonsReject text-right mt-3">
                        <button type="button" class="btnreject ">Reject</button>
                        <button type="button" class="btnApprove ">Approve</button>
                    </div>    
                </div>  
                {/if}

                <!-- Aadhar Number -->
                {#if temp_switchto == "aadhar_tab"}
                     <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                        <div class="m-4 col-span-4">
                            <div class="attachment-text">
                                <p class="text-sm font-light">Attachment</p>
                             </div>   

                             <div class="imageZoom border rounded mt-2">
                                <div id="hubble-container">
                                  <img src="../src/img/pancard.svg"  id="hubblepic">
                                </div>

                                <div class="flex items-center justify-center gap-4 py-4">
                                    <img src="../src/img/puls.svg" >
                                
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="../src/img/minus.svg" >
                               
                            </div>
                             </div>
                         </div>  
                         <div class="m-4 col-span-3 xsl:m-1" >
                                <div class="formField mb-2">
                                    <label class="text-greycolor font-light text-sm text-left ">Enter Aadhar Number</label>
                                    <div class="w-full ">
                                        <input type="text" class="inputboxVMT">
                                    </div>
                                </div>
    
                                <div class="ActionButtonsReject text-right mt-3">
                                    <button type="button" class="btnreject ">Reject</button>
                                    <button type="button" class="btnApprove ">Approve</button>
                                </div>    
                        </div>  
                      </div> 
                {/if}
                      
                <!-- Driving License -->
                {#if temp_switchto == "DL_tab"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="../src/img/pancard.svg"  id="hubblepic">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
                        </div>
                         </div>
                     </div>  
                     <div class="m-4 col-span-3 xsl:m-1" >
                    <div class="formField mb-2">
                        <label class="text-greycolor font-light text-sm text-left ">Enter Driving License Number</label>
                        <div class="w-full ">
                            <input type="text" class="inputboxVMT">
                        </div>
                    </div>

                    <div class="ActionButtonsReject text-right mt-3">
                        <button type="button" class="btnreject ">Reject</button>
                        <button type="button" class="btnApprove ">Approve</button>
                    </div>    
                    </div>  
                  </div> 

                    <!-- Address Proof -->
                <div class="m-4 col-span-3 hidden" >
                    <div class="formField mb-2">
                        <label class="text-greycolor font-light text-sm text-left ">Address</label>
                        <div class="w-full mt-2">
                           <p>H. No 17, Gulmohar Road, savedi, asara Housing Society, Ahmednagar 414003</p>
                        </div>
                    </div>

                    <div class="ActionButtonsReject text-right mt-3">
                        <button type="button" class="btnreject ">Reject</button>
                        <button type="button" class="btnApprove ">Approve</button>
                    </div>    
                </div>  
                {/if}

                 <!-- Address Proof -->
                 {#if temp_switchto == "address_tab"}
                 <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">

                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="../src/img/pancard.svg"  id="hubblepic">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
                        </div>
                         </div>
                     </div>  
                     <div class="m-4 col-span-3 xsl:m-1" >
                    <div class="formField mb-2">
                        <label class="text-greycolor font-light text-sm text-left ">Address</label>
                        <div class="w-full mt-2">
                           <p>H. No 17, Gulmohar Road, savedi, asara Housing Society, Ahmednagar 414003</p>
                        </div>
                    </div>

                    <div class="ActionButtonsReject text-right mt-3">
                        <button type="button" class="btnreject ">Reject</button>
                        <button type="button" class="btnApprove ">Approve</button>
                    </div>    
                    </div>  
                  </div> 


                {/if}

                  <!-- Offer Letter -->
                {#if temp_switchto == "offerletter_tab"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="../src/img/pancard.svg"  id="hubblepic">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="../src/img/minus.svg" >
                           
                            </div>
                         </div>
                    </div>  
                    <div class="m-4 col-span-3 xsl:m-1" >
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Name On Offer letter</label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Associate Type on Offer Letter </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Vendor Name on Offer letter </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                        </div>

                        <div class="ActionButtonsReject text-right mt-3">
                            <button type="button" class="btnreject ">Reject</button>
                            <button type="button" class="btnApprove ">Approve</button>
                        </div>    
                    </div>  
                </div> 
                {/if}
              </div>    

            
            
        </div>
        {/if}

         <!-- Verify Bank Details -->
         {#if temp_display == "display_bank_details"}
         <div class="m-4 col-span-4 xsl:col-span-5  ">
            <div class="flex w-full justify-between xsl:flex-wrap">
                <h4 class="text-xl font-medium ">Verify Bank Details</h4>
                <p class="detailsUpdate">
                    <span><span class="font-medium">Verified by - </span> Username <span class="font-medium">On-</span> 24-03-2021  12:30 AM</span>
                </p>
            </div> 
            <div class="w-full bg-white rounded-sm mt-4 ">
              <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                <!-- Attachment section -->
                <div class="m-4 col-span-4">

                    <div class="tabforDoc">
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">screenshot 1</p>
                             <div class="tabforDocItem active">
                                  <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1">
                            </div>  
                        </div>
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">screenshot 2</p>
                            <div class="tabforDocItem">
                                <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1">
                            </div>  
                       </div>  
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">screenshot 3</p>
                            <div class="tabforDocItem">
                                <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1">
                            </div>    
                    </div>    
                </div>   

                    <!-- <div class="attachment-text">
                        <p class="text-sm font-light">Attachment </p>
                     </div>    -->

                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="../src/img/pancard.svg"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>

                 </div>  


                 <!-- Verify Bank Details -->
                 <div class="m-4 col-span-3 " >
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Enter Bank Account Number</label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm  text-left ">Enter IFSC Code </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                            <div class="w-full">
                            <label class="text-greycolor font-light text-xs  text-left ">Note: Only capital letters allowed.  Extra space is not allowed </label>
                            </div>
                        </div>

                        <div class="formField">
                            <label class="text-greycolor font-light text-sm  text-left ">Enter Account Holder Name </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                            <div class="w-full">
                                <label class="text-greycolor font-light text-xs  text-left ">Note: Extra space is not allowed </label>
                                </div>
                        </div>


                        <div class="ActionButtonsReject text-right mt-3">
                            <button type="button" class="btnreject mr-2">Reject</button>
                            <button type="button" class="btnApprove ">Approve</button>
                            
                        </div>    
                </div>  
                
            

              </div>    
            </div> 
        </div>
        {/if}

          <!-- Verify Background -->
          {#if temp_display == "display_bgv_details"}
          <div class="m-4 col-span-4 xsl:col-span-5 ">
            <div class="flex w-full justify-between xsl:flex-wrap">
                <h4 class="text-xl font-medium ">Verify Background</h4>
                <p class="detailsUpdate">
                    <span><span class="font-medium">Verified by - </span> Username <span class="font-medium">On-</span> 24-03-2021  12:30 AM</span>
                </p>
            </div> 
            <div class="mobileVerifyMenus hidden xsl:block">
                <div class="w-full mt-2">
                    <select name="" id="" class="w-full px-3 py-2 text-sm">
                        <option value="">Basic Details</option>
                        <option value="">Address Details</option>
                        <option value="">Driving License</option>
                        <option value="">Police Verification</option>
                    </select>
                </div>
            </div>
            <div class="w-full bg-white rounded-sm mt-4 ">
              <div class="tabsVerifyID flex  bg-lightGrey xsl:hidden">
                  <div class="tablinkItem  bg-white" on:click={() => {change_to = "basic_details";}}>
                        <p class="text-base font-medium">Basic Details</p>
                        <p class="text-xs text-orange">Pending</p>
                  </div> 
                  <div class="tablinkItem " on:click={() => {change_to = "address_details";}}>
                    <p class="text-base font-normal">Address Details</p>
                    <p class="text-xs text-orange">Pending</p>
                  </div> 
                  <div class="tablinkItem " on:click={() => {change_to = "DL_details";}}>
                    <p class="text-base font-normal">Driving License</p>
                    <p class="text-xs text-orange">Pending</p>
                  </div>   
                  <div class="tablinkItem " on:click={() => {change_to = "policeverification_details";}}>
                    <p class="text-base font-normal">Police Verification</p>
                    <p class="text-xs text-orange">Pending</p>
                  </div>   
                 
              </div>

            
              <!-- Verify Background  Basic Details-->
              {#if change_to == "basic_details"}
              <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                <!-- Attachment section -->
                <div class="m-4 col-span-4 xsl:m-2 ">
                    <div class="tabforDoc">
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Aadhar Card</p>
                                 <div class="tabforDocItem active">
                                      <img src="../src/img/aadharicon.png" alt="" class="w-16 xsl:w-14 p-1">
                                </div>  
                            </div>
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Voter ID</p>
                                <div class="tabforDocItem">
                                    <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1">
                                </div>  
                           </div>  
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Passport Photo</p>
                                <div class="tabforDocItem">
                                    <img src="../src/img/passportpic.png" alt="" class="w-16 xsl:w-14 p-1">
                                </div>    
                        </div>    
                    </div>    
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="../src/img/pancard.svg"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                 </div>  
                 <!-- Basic Details -->
                 <div class="m-4 col-span-3 xsl:m-1" >
                       

                        <div class="grid grid-cols-1 gap-2">
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Aadhar number</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">3900 5130 7206 </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">First name </p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Dhiraj </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Last name </p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Shah </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Phone number</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">94949499494 </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Fathers name</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Nitesh </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Date of birth</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">23-03-1994 </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Spouse name</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Malti </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Gender</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Male </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Delivery model</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Normal Delivery </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Station model</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">ODH </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Hub name for casper ID</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Meesho Mumbai </p>
                                </div>
                            </div>


                          </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium">Reject</button>
                            <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium">Approve</button>
                            
                        </div>    
                </div>  
              </div> 
              {/if}   


              <!-- Verify Background  Address Details-->
              {#if change_to == "address_details"}
              <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                <div class="m-4 col-span-4">

                 
                    <div class="attachment-text">
                        <p class="text-sm font-light">Attachment</p>
                     </div>   

                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="../src/img/pancard.svg"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                 </div>  

                 <!-- Address Details -->
                 <div class="m-4 col-span-3 xsl:m-1" >
                       

                        <div class="grid grid-cols-1 gap-2">
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Address Type</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Parmanent </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Current Address same as this address? </p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Yes </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Full Address </p>
                                </div>
                                <div>
                                    <p class="namevalue  ">address detail </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">City / Taluka / Town</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">North Delhi </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">District</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Delhi </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">State</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Delhi </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Pincode</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">110006 </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">landmark</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Near Mohalla </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Residential Type</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Own </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Period of Stay ( Years )</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">5 </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Stay From</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">02-03-1998 </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Stay Till</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">02-03-1998 </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Area</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">-- </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Family Contact Number</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">0938437271</p>
                                </div>
                            </div>


                          </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium">Reject</button>
                            <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium">Approve</button>
                            
                        </div>    
                </div>  
                
            

              </div>  
              {/if}
              
                <!-- Verify Background  Driving License-->
                {#if change_to == "DL_details"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="../src/img/pancard.svg"  id="hubblepic">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
                        </div>
                         </div>
                     </div>  

                     <!-- Driving licence -->
                     <div class="m-4 col-span-3 xsl:m-1" >
                           

                            <div class="grid grid-cols-1 gap-2">
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">License Number</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">839282827 </p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">Name as on Driving License</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">Dhiraj Shah </p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">DOB as on Driving License</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">23-02-1991 </p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">Date of Issue</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">23-03-2019 </p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">Date of Expiry</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">20-05-2022 </p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">Issuing State</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">New Delhi </p>
                                    </div>
                                </div>
                              </div>


                            <div class="ActionButtonsReject text-right mt-5">
                                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium">Reject</button>
                                <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium">Approve</button>
                                
                            </div>    
                    </div>  
                    
                

                </div>  
                {/if}

                <!-- Verify Background  Police Verification-->
                {#if change_to == "policeverification_details"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                        </div>   

                        <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                                <img src="../src/img/pancard.svg"  id="hubblepic">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="../src/img/minus.svg" >
                            
                            </div>
                        </div>
                    </div>  

                    <!-- Police veri -->
                    <div class="m-4 col-span-3 xsl:m-1" >
                        

                        <div class="grid grid-cols-1 gap-2">
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Address Type</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Parmanent </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Candidate's Name</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Dhiraj Shah</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Guardian's Name</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">Mahendra Shah </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Address Verified</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">H. No 17, Gulmohar Road, savedi, asara Housing Society, Ahmednagar 414003 </p>
                                </div>
                            </div>
                        
                        </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium">Reject</button>
                            <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium">Approve</button>
                            
                        </div>    
                    </div>  
                
            

                </div> 
                {/if} 


            </div> 
            
        </div>
        {/if}

      </div>
</div>    





</div>