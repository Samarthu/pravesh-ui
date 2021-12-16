<script>
    import { Router, Link, Route } from "svelte-routing";
    import Catagory from "./catagory.svelte";
    import { goto } from "$app/navigation";
    import Breadcrumb from "./breadcrumb.svelte";

    let routeNext = "";

    export let url = "";

    function routeToPage() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }

    routeNext = "catagory";
</script>


  <div  class="mainContent ">
            <div class="breadcrumb ">
                <div class="breadcrumb-section xsl:px-p10">
                    <div class="breadcrumbtextDetails breadcrumbmedia">
                        <p class="flex items-center">
                            <span class="text-textgrey pr-1 text-base">Home / Workforce</span>

                            <span class="Username ">
                                <img src="../src/img/delivery.png" class="userIconMedia" alt=""><span
                                    class="xs:hidden sm:hidden"> Dhiraj Shah</span>
                                <span
                                    class="userDesignation">(Associate
                                    - NDA)</span> </span>

                        </p>
                        <p class="breadcrumbRight">
                            <a href=""> <span class="breadRightIcons"> <img
                                        src="../src/img/document.png" class="pr-2" alt=""> Documents</span> </a>
                            <a href=""> <span class="breadRightIcons"> <img
                                        src="../src/img/audittrail.png" class="pr-2" alt=""> Audit Trial (12)</span>
                            </a>
                            <span class="backlistText"> <img
                                    src="../src/img/backlist.png" class="pr-2" alt=""> Backlist Vendor</span>
                        </p>
                    </div>
                    <div
                        class="statusbar ">
                        <div class="leftStatus">
                            <div class="text-sm">
                                <div class="statusBarSec ">
                                    <div class="statusbarLeft">
                                        <p class="statusText">Status - </p>
                                        <div class="hidden">
                                            <p class="statusContent font-medium italic"><img
                                                    src="../src/img/circleicon.png" alt="" class="w-3 h-3 pr-2">
                                                Verification Pending</p>
                                        </div>
                                        <p class="statusContentTag font-normal text-sm  "><img
                                                src="../src/img/redcircle.png" alt="" class="w-3 h-3 mr-2">
                                            Documents Rejected</p>

                                    </div>
                                    <div class="statusbarMiddle">
                                        <div class="hidden">
                                            <p class="statusContent font-normal xs:w-5/12"> <img
                                                    src="../src/img/timer.png" class="pr-2" alt=""> Address Proof</p>
                                        </div>

                                        <p class="statusContentTag text-green font-normal xs:w-5/12"> <img
                                                src="../src/img/checked.png" class="pr-2" alt=""> Address Proof</p>


                                        <p class="xsl:hidden"><img src="../src/img/Line.png" alt=""></p>
                                        <div class="hidden">
                                            <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                                    class="pr-2" alt="">Offer Letter</p>
                                        </div>

                                        <p class="statusContentTag text-rejectcolor font-normal xs:w-5/12"> <img
                                                src="../src/img/reject.png" class="pr-2" alt="">ID Reject</p>

                                        <p class="xsl:hidden"><img src="../src/img/Line.png" alt=""></p>

                                        <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                                class="pr-2" alt="">ID Proof</p>
                                        <p class="xsl:hidden"> <img src="../src/img/Line.png" alt=""></p>

                                        <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                                class="pr-2" alt="">Bank Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="statusrightlink">
                            <div>
                                <p class="initiateText">
                                    <a href="" class="flex"> <img src="../src/img/InitiateBGVerification.png"
                                            class=" pr-2" alt=""> Initiate BG
                                        Verification</a>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
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
                                        <img src="../src/img/edit.png" alt="">
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
                            <p class="flex items-center smButtonText">
                                <a href="" class="smButton">
                                    Add
                                </a>
                            </p>
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
                <div class=" w-widthforWorkDetailSection fullsection ">
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
                                <p class="flex items-center smButtonText pr-3">
                                    <a href="" class="smButton">
                                        Add/Remove Tags
                                    </a>
                                </p>
                                <p class="flex items-center smButtonText pr-3">
                                    <a href="" class="smButton">
                                        Work Contract
                                    </a>
                                </p>
                                <a href="" class="smButton">
                                    <img src="../src/img/edit.png" alt="">
                                </a>
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
                                        <p class="flex items-center smButtonText">
                                            <a href="" class="smButton">
                                                Change
                                            </a>
                                        </p>
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
                                    <div class="userStatus ">
                                        <p class="flex items-center smButtonText">
                                            <a href="" class="smButton">
                                                Add/Edit
                                            </a>
                                        </p>
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
                            <div
                                class="innercardSection">
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
                            <div
                                class="innercardSection">
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
