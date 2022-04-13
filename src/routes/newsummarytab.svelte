<script>
    let change_to = "Associate_details";
</script>


<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section xsl:px-p10">
            <div class="breadcrumbtextDetails breadcrumbmedia">
                <p class="flex items-center">
                    <span class="text-textgrey pr-1 text-base xs:text-xs">Home / Workforce</span>
                    <span class="Username ">
                        <img src="../src/img/delivery.png" class="userIconMedia" alt="">
                        <span class="xs:hidden sm:hidden"> Dhiraj Shah</span>
                        <span class="userDesignation">(Associate - NDA) </span> 
                    </span>
                </p>
               
                <p class="breadcrumbRight">
                    <a href=""> 
                        <span class="breadRightIcons"> 
                             ERP Details
                        </span> 
                    </a>
                    <a href=""> 
                        <span class="breadRightIcons"> <img src="../src/img/document.png" class="pr-2"
                                alt=""> Documents
                        </span> 
                    </a>
                    <a class="cursor-pointer">
                        <span class="breadRightIcons" id="SupplerModalbuttonClick">
                            <img src="../src/img/audittrail.png" class="pr-2" alt=""> Audit Trial (12)
                        </span>
                    </a>
                    <span class="backlistText">
                        <img src="../src/img/backlist.png" class="pr-2" alt=""> Backlist Vendor
                    </span>
                </p>
            
            </div>

            <!-- for VMT -->
            <div class="onboardedBy mb-4 hidden">
                <p class="text-sm"><span class="font-light text-grey text-sm">Onboarded By - </span>Hemant Kumar, Mulsi SP, eCommerce</p>
                <p class="xsl:flex justify-end hidden"><a class="cursor-pointer">
                    <span class="breadRightIconsvmt" >
                        <img src="../src/img/audittrail.png" class="pr-2" alt=""> Audit Trial (12)
                    </span>
                </a></p>
            </div>

            <div class="statusbar ">
                <div class="leftStatus">
                    <div class="text-sm">
                        <div class="statusBarSec ">
                            
                            <div class="statusbarLeft">
                                <p class="statusText">Status - </p>
                                <div class="hidden">
                                    <p class="statusContent font-medium italic"><img
                                            src="../src/img/circleicon.png" class="pr-2 w-3 h-3" alt="">
                                        Verification Pending</p>
                                </div>
                                <p class="statusContentTag font-normal text-sm  "><img
                                        src="../src/img/redcircle.png" class="pr-2 w-3 h-3" alt="">
                                    Documents Rejected</p>
                            </div>

                            <div class="statusbarMiddle">

                                <div class="statusNotes flex gap-6 xsl:gap-4">
                                    <span class="cardDescription flex items-center">
                                     <img src="../src/img/timesvg.svg" class="pr-2" alt=""> 
                                       Address Proof
                                    </span> 

                                    <span class="cardDescription flex items-center">
                                        <img src="../src/img/timesvg.svg" class="pr-2" alt=""> 
                                        Offer Letter
                                    </span>   

                                    <span class="cardDescription flex items-center">
                                        <img src="../src/img/timesvg.svg" class="pr-2" alt=""> 
                                        ID Proof
                                        <span>
                                        <img src="../src/img/info.svg" class="pl-2" alt="">
                                        </span>
                                    </span>   

                                    <span class="cardDescription flex items-center">
                                        <img src="../src/img/timesvg.svg" class="pr-2" alt=""> 
                                        Bank Details
                                    </span>   

                                    <span class="cardDescription flex items-center">
                                        <img src="../src/img/timesvg.svg" class="pr-2" alt=""> 
                                       BGV
                                        <span>
                                        <img src="../src/img/info.svg" class="pl-2" alt="">
                                        </span>
                                    </span>   
                                      
                                </div>    

                               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="statusrightlink py-3">
                    <div >
                        <p class="initiateText">
                            <a href="" class="flex text-erBlue"> BGV Details <img
                                    src="../src/img/rightarowblue.svg" class=" pl-2" alt=""></a>
                        </p>
                    </div>
                </div>
                <div class="hidden ">
                    <div class="flex gap-2">
                <div class="statusrightlink xsl:hidden ">
                    <div class="vmtRejected ">
                        Reject 
                    </div>
                </div>
                <div class="statusrightlink xsl:hidden ">
                    <div class="vmtVerify ">
                        Verify 
                    </div>
                </div>
                </div>
                </div>
            </div>

            <div class="hidden">
            <div class="mt-4 mb-3  xsl:flex">
                <div class="vmtVerify ">
                    Verify <img src="../src/img/downarrowwhite.svg" class="pl-2" alt="arrow">
                </div>
            </div>
            </div>
        </div>
    </div>

    <div class="contentsectionDetailview_summary ">

        <div class="tabsforsummary">
            <div class="active" on:click={() => {change_to = "Associate_details"}}>Associate Details</div>
            <div class="" on:click={() => {change_to = "Work_details"}}>Work Details</div>
            <div class="" on:click={() => {change_to = "Identity_details"}}>Identity Proof</div>
            <div class="" on:click={() => {change_to = "Bank_details"}}>Bank Details</div>
        </div> 

        <!-- Associate Details -->
        {#if change_to == "Associate_details"}
        <div class="bg-white w-full associate_Details_Section ">
            <div class="detailsHeader_summary ">
               
                <div class="right flex justify-end">
                    <p class="detailsUpdate mr-4">
                        <span><span class="font-medium">Last updated -</span> 27-Apr-2021 03:28 pm. <span
                                class="font-medium">By-</span> Admin</span>
                    </p>
                    <p class="flex items-center smButtonText">
                        <a href="" class="smButton bg-erBlue text-white">
                            Edit
                        </a>
                    </p>
                </div>

            </div>

            <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1" >
                <div class=" grid grid-cols-3 w-full px-5 mt-5  gap-4">
                    <div class="">
                        <img src="../src/img/profilepic.png" class="w-28 h-28 xsl:h-auto" alt="">
                    </div>
                    <div class="w-auto col-span-2 mt-6 xsl:mt-3">
                    <div class="text-2xl xsl:text-xl">Dhiraj Shah</div>
                    <p class="imgName">Associate - NDA</p>
                    </div>
                </div>

                <div class="contact_details">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Contact Details</label>
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
                </div>

                <div class="Documents">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Documents</label>
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
                                <a href="" class="smButton modal-open">
                                    Add
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

            </div> 

            <div class="border-gray-200 px-5 py-5">
                <hr>
            </div>

            <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1" >
                <div class="appcredentials">
                    <div class="headingWithIcon">
                        <img src="../src/img/mobileblue.png" alt="">
                        <p class="detailsTitle">Libear App Credentials</p>
                    </div>
                </div>
            </div>  

            <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1 pb-5" >
                <div class="liberApp">
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
                </div>

                <div class="contact_details">
                    <div class="userInfoSec3">
                        <div class="flex items-start">
                            <img src="../src/img/gst.png" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">Link Child Associate</p>
                                <p class="detailData">2</p>
                            </div>
                        </div>
                        <div class="userStatus ">
                            <p class="flex items-center smButtonText">
                                <a href="" class="smButton modal-open">
                                    Link/View
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

            </div> 
        </div>
        {/if}

        <!-- Work Details -->
        {#if change_to == "Work_details"}
        <div class="bg-white w-full Work_Details_Section ">
            <div class="detailsHeader_summary ">
               
                <div class="right flex justify-end">
                    <p class="detailsUpdate mr-4">
                        <span><span class="font-medium">Last updated -</span> 27-Apr-2021 03:28 pm. <span
                                class="font-medium">By-</span> Admin</span>
                    </p>
                    <p class="flex items-center smButtonText">
                        <a href="" class="smButton bg-erBlue text-white">
                            Edit
                        </a>
                    </p>
                </div>

            </div>

            <div class="grid grid-cols-3 gap-4 pb-5 xsl:grid-cols-1" >
                <div class="workdetailsColFirst">
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
                                <a class="smButton" id="changeAssociate">
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
                   
                </div>

                <div class="workdetailsColSec">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Documents</label>
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

                <div class="workdetailsColThird">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Vendor Details</label>
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
        {/if}

        <!-- Identity Proof -->
        {#if change_to == "Identity_details"}
        <div class="bg-white w-full Identity_proof_Section ">
            <div class="detailsHeader_summary ">
                <div class="right flex justify-between w-full items-center py-2 xsl:flex-wrap">
                    <div>
                        <p class="verifyText"><img src="../src/img/timer.png" alt="" class="pr-1">
                            Verification Pending</p>
                    </div>
                    <div class="flex">
                        <p class="detailsUpdate mr-4">
                            <span><span class="font-medium">Last updated -</span> 27-Apr-2021 03:28 pm. <span
                                    class="font-medium">By-</span> Admin</span>
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

                <div class="IdentityProofColFirst">
                   
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="../src/img/pan.png" alt="" class="w-5 h-5">
                            <div class="pl-4">
                                <p class="detailLbale">PAN Number</p>
                                <p class="detailData">BOMG00538</p>
                            </div>
                        </div>

                    </div>
                   
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="../src/img/pan.png" class="w-6 h-6" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">Aadhar Number</p>
                                <p class="detailData">9714 1358 8022</p>
                            </div>
                        </div>
                    </div>
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="../src/img/warehouse.png" class="w-5 h-5" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">Driving License</p>
                                <p class="detailData">Not Submitted</p>
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
                                <img src="../src/img/offerlatter.png" alt="" class="w-5 h-5">
                                <div class="pl-4">
                                    <p class="detailLbale">PAN Card Attachment</p>
                                </div>
                            </div>
                           

                        </div>
                        <div class="wrapperInfo ">
                            <div class="flex items-start">
                                <img src="../src/img/addressproof.png" class="invisible" alt="">
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
                    <div class="userInfoSecPadding">
                        <div class="wrapperInfoFirst">
                            <div class="flex items-start">
                                <img src="../src/img/offerlatter.png" alt="" class="w-5 h-5">
                                <div class="pl-4">
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
        {/if}

        <!-- Bank Details -->
        {#if change_to == "Bank_details"}
        <div class="bg-white w-full Bank_Details_Section ">
            <div class="detailsHeader_summary ">
                <div class="right flex justify-between w-full items-center py-2 xsl:flex-wrap">
                    <div>
                        <p class="verifyText"><img src="../src/img/timer.png" alt="" class="pr-1">
                            Verification Pending</p>
                    </div>
                    <div class="flex">
                        <p class="detailsUpdate mr-4">
                            <span><span class="font-medium">Last updated -</span> 27-Apr-2021 03:28 pm. <span
                                    class="font-medium">By-</span> Admin</span>
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
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="../src/img/pincode.png" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">Branch</p>
                                <p class="detailData">Pune - East, 400190</p>
                            </div>
                        </div>
                    </div>
                   
                </div>

                <div class="Bank_DetailsColSec">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Documents</label>
                    </div>

                    <div class="userInfoSecPadding">
                        <div class="wrapperInfoFirst">
                            <div class="flex items-start justify-between w-full">
                                <div class="flex">
                                    <img src="../src/img/bankdoc.png" alt="">
                                    <div class="pl-4">
                                        <p class="detailLbale">Bank Document</p>
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
        {/if}





        <div class="fullsection w-widthforWorkDetailSection hidden">
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
                        <div class="AddRemoveTagsSection">
                            <p class="flex items-center smButtonText pr-3">
                                <a class="smButton" id="addRemoveTages">
                                    Add/Remove Tags
                                </a>
                            </p>

                            <!-- Add Remove Tag Modal -->


                            <div class="hidden" id="addRemoveModal">
                                <div class="ChangeAssociateTypeWrapper">
                                    <div class="changeAssoMain ">
                                        <div class=" w-full bg-white rounded shadow-2xl">
                                            <div class="relative  rounded-t ">
                                                <svg class="absolute top-36 transform rotate-90 -right-6 -mt-5 block md:hidden xs:hidden"
                                                    xmlns="http://www.w3.org/2000/svg" width="26" height="23"
                                                    viewBox="0 0 26 23" fill="none">
                                                    <path id="Polygon 2" d="M13 0L25.9904 22.5H0.00961876L13 0Z"
                                                        fill="#ffffff" stroke='#E7E7E7' />
                                                </svg>
                                            </div>
                                            <div class="w-full h-full  pb-5 ">
                                                <div
                                                    class="bg-black px-4 flex py-4 justify-between rounded-t-md rounded-tr-md">
                                                    <div class="leftHeadingpopover text-white">
                                                        <p>Add / Remove Tags</p>
                                                    </div>
                                                    <div class="rightcloseIconBlack">
                                                        <img src="../src/img/closewhite.svg"
                                                            class="cursor-pointer" id="closeAddRemove" alt="">
                                                    </div>
                                                </div>
                                                <div class="tabwrapper flex justify-between text-center">
                                                    <div class="changetype py-3 w-2/4	">
                                                        <p>Add Tags</p>
                                                    </div>
                                                    <div class="Historytab py-3 w-2/4	 bg-bglightgreye">
                                                        <p>Tag Audit Trail</p>
                                                    </div>
                                                </div>

                                                <div class="changetypeSection ">



                                                    <div class="flex px-2 pt-3 items-center xs:flex-wrap">
                                                        <div class="light14grey">Select Tag</div>
                                                        <div class="formInnerGroup ">
                                                            <select class="inputboxpopover">
                                                                <option class="pt-6">Select</option>
                                                                <option>ICICI</option>
                                                                <option>Axis</option>
                                                                <option>SIB</option>
                                                            </select>
                                                            <div class="formSelectArrow ">
                                                                <img src="../src/img/selectarrow.png"
                                                                    class="w-5 h-auto" alt="">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="flex px-2 py-3 items-center xs:flex-wrap">
                                                        <div class="light14grey">Remove On</div>
                                                        <div class="formInnerGroup ">
                                                            <input type="date" class="inputboxpopoverdate"
                                                                placeholder=" ">
                                                            <p
                                                                class="text-grey whitespace-nowrap text-xs px-1 mt-1">
                                                                Note: Use only if required</p>
                                                        </div>
                                                    </div>

                                                    <div class="flex px-2 py-0 items-center xs:flex-wrap">
                                                        <div class="light14grey w-36">Remarks</div>
                                                        <div class="formInnerGroup">
                                                            <input class="inputboxpopover" type="text">
                                                        </div>
                                                    </div>

                                                    <div class="flex px-3 justify-between mt-4">
                                                        <div class="light14grey w-36"></div>
                                                        <button class="saveandproceed">Add</button>
                                                    </div>

                                                    <div class="OtherAppliedTagsTable px-3">
                                                        <p class="text-lg text-blackshade font-medium">Other
                                                            Applied Tags</p>
                                                        <table
                                                            class="table  w-full text-center mt-2 xs:hidden sm:hidden">
                                                            <thead class="theadpopover">
                                                                <tr>
                                                                    <th>Tag</th>
                                                                    <th>Remarks</th>
                                                                    <th>Added by</th>
                                                                    <th>Added On</th>
                                                                    <th>Auto Removal On</th>
                                                                    <th>Remove</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="tbodypopover">
                                                                <tr class="border-b">
                                                                    <td>Addhoc Facility</td>
                                                                    <td>No Remarks</td>
                                                                    <td>User name</td>
                                                                    <td>10-09-2020</td>
                                                                    <td>No date</td>
                                                                    <td>
                                                                        <div class="flex justify-center">
                                                                            <img src="../src/img/reject.png"
                                                                                alt="">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr class="border-b">
                                                                    <td>Addhoc Facility</td>
                                                                    <td>No Remarks</td>
                                                                    <td>User name</td>
                                                                    <td>10-09-2020</td>
                                                                    <td>No date</td>
                                                                    <td>
                                                                        <div class="flex justify-center">
                                                                            <img src="../src/img/reject.png"
                                                                                alt="">
                                                                        </div>
                                                                    </td>
                                                                </tr>


                                                            </tbody>
                                                        </table>
                                                        ​
                                                        <div
                                                            class="associateCard  border p-p7px  rounded-md hidden xs:block sm:block">

                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Tag</div>
                                                                <div class="dataValue">Addhoc Facility </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Remarks </div>
                                                                <div class="dataValue">No Remarks </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Added by </div>
                                                                <div class="dataValue">User name </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Added On </div>
                                                                <div class="dataValue">13-Apr-2021 </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Auto Removal On </div>
                                                                <div class="dataValue">No date </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Remove</div>
                                                                <div class="dataValue"> <img
                                                                        src="../src/img/reject.png" alt="">
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>


                                                </div>

                                                <div class="changeAssociateSection mx-3 hidden">
                                                    <table class="table  mt-2 w-full xs:hidden sm:hidden">
                                                        <thead class="theadpopover">
                                                            <tr>
                                                                <th>Tag</th>
                                                                <th>Date</th>
                                                                <th>Given by</th>
                                                                <th>Status</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody class="tbodypopover">
                                                            <tr class="border-b">
                                                                <td>Addhoc Facility</td>
                                                                <td>10-09-2020</td>
                                                                <td>User name</td>
                                                                <td>Active</td>

                                                            </tr>
                                                            <tr class="border-b">
                                                                <td>Addhoc Facility</td>
                                                                <td>10-09-2020</td>
                                                                <td>User name</td>
                                                                <td>Active</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                    ​
                                                    <div
                                                        class="associateCard  border p-p7px rounded-md hidden xs:block sm:block">

                                                        <div class="flex px-4 py-1 items-center">
                                                            <div class="light14grey">Tag</div>
                                                            <div class="dataValue">Addhoc Facility </div>
                                                        </div>
                                                        <div class="flex px-4 py-1 items-center">
                                                            <div class="light14grey">Date</div>
                                                            <div class="dataValue">10-09-2020 </div>
                                                        </div>
                                                        <div class="flex px-4 py-1 items-center">
                                                            <div class="light14grey"> Given by</div>
                                                            <div class="dataValue">User name</div>
                                                        </div>
                                                        <div class="flex px-4 py-1 items-center">
                                                            <div class="light14grey">Status</div>
                                                            <div class="dataValue">Active</div>
                                                        </div>

                                                    </div>

                                                    <div
                                                        class="associateCard  border p-p7px  rounded-md hidden xs:block sm:block">

                                                        <div class="flex px-4 py-1 items-center">
                                                            <div class="light14grey">Tag</div>
                                                            <div class="dataValue">Addhoc Facility </div>
                                                        </div>
                                                        <div class="flex px-4 py-1 items-center">
                                                            <div class="light14grey">Date</div>
                                                            <div class="dataValue">10-09-2020 </div>
                                                        </div>
                                                        <div class="flex px-4 py-1 items-center">
                                                            <div class="light14grey"> Given by</div>
                                                            <div class="dataValue">User name</div>
                                                        </div>
                                                        <div class="flex px-4 py-1 items-center">
                                                            <div class="light14grey">Status</div>
                                                            <div class="dataValue">Active</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                    <a class="smButton" id="changeAssociate">
                                        Change
                                    </a>
                                </p>

                                <!-- associate Modal -->

                                <div class="hidden" id="associateModal">
                                    <div class="ChangeAssociateTypeWrapper">
                                        <div class="changeAssoMain ">
                                            <div class=" w-full bg-white rounded shadow-2xl">
                                                <div class="relative  rounded-t ">
                                                    <svg class="absolute top-36 transform rotate-90 -right-6 -mt-5 block md:hidden xs:hidden"
                                                        xmlns="http://www.w3.org/2000/svg" width="26"
                                                        height="23" viewBox="0 0 26 23" fill="none">
                                                        <path id="Polygon 2"
                                                            d="M13 0L25.9904 22.5H0.00961876L13 0Z"
                                                            fill="#ffffff" stroke='#E7E7E7' />
                                                    </svg>
                                                </div>
                                                <div class="w-full h-full  pb-5 ">
                                                    <div
                                                        class="bg-black px-4 flex py-4 justify-between rounded-t-md rounded-tr-md">
                                                        <div class="leftHeadingpopover text-white">
                                                            <p>Change Associate Type</p>
                                                        </div>
                                                        <div class="rightcloseIconBlack">
                                                            <img src="../src/img/closewhite.svg"
                                                                class="cursor-pointer" id="closeAssociate"
                                                                alt="">
                                                        </div>
                                                    </div>
                                                    <div class="tabwrapper flex justify-between text-center">
                                                        <div class="changetype py-4 w-2/4	">
                                                            <p>Change Type</p>
                                                        </div>
                                                        <div class="Historytab py-4 w-2/4	 bg-bglightgreye">
                                                            <p>History</p>
                                                        </div>
                                                    </div>

                                                    <div class="changetypeSection ">

                                                        <div
                                                            class="flex px-4 pt-4 items-center gap-10 xs:gap-4 xs:flex-wrap">
                                                            <div class="flex items-center">
                                                                <div class="light14greylable">Current Type</div>
                                                                <div class="dataValue">NDA </div>
                                                            </div>
                                                            <div class="flex items-center">
                                                                <div class="light14greylable">Pravesh ID</div>
                                                                <div class="dataValue">EFVS00072</div>
                                                            </div>

                                                        </div>

                                                        <div class="flex px-4 py-3 items-center xs:flex-wrap">
                                                            <div class="light14grey">New Type</div>
                                                            <div class="formInnerGroup ">
                                                                <select class="inputboxpopover">
                                                                    <option class="pt-6">Select</option>
                                                                    <option>ICICI</option>
                                                                    <option>Axis</option>
                                                                    <option>SIB</option>
                                                                </select>
                                                                <div class="formSelectArrow ">
                                                                    <img src="../src/img/selectarrow.png"
                                                                        class="w-5 h-auto" alt="">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="flex px-4 py-0 items-center xs:flex-wrap">
                                                            <div class="light14grey">Type of Attendance</div>
                                                            <div class="formInnerGroup">
                                                                <select class="inputboxpopover">
                                                                    <option class="pt-6">Select</option>
                                                                    <option>ICICI</option>
                                                                    <option>Axis</option>
                                                                    <option>SIB</option>
                                                                </select>
                                                                <div class="formSelectArrow ">
                                                                    <img src="../src/img/selectarrow.png"
                                                                        class="w-5 h-auto" alt="">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="flex px-4 py-3 items-center xs:flex-wrap">
                                                            <div class="light14grey">From Date</div>
                                                            <div class="formInnerGroup ">
                                                                <input type="date" class="inputboxpopoverdate"
                                                                    placeholder=" ">
                                                            </div>
                                                        </div>
                                                        <div class="flex px-4 py-0 items-center xs:flex-wrap">
                                                            <div class="light14grey w-36">To Date</div>
                                                            <div class="formInnerGroup">
                                                                <input type="date" class="inputboxpopoverdate">
                                                                <p
                                                                    class="light14grey whitespace-nowrap text-xs px-1">
                                                                    Leave empty if no end date</p>
                                                            </div>

                                                        </div>
                                                        <div class="flex px-4 py-3 items-center xs:flex-wrap">
                                                            <div class="light14grey w-36">Remarks</div>
                                                            <div class="formInnerGroup">
                                                                <input class="inputboxpopover" type="text">
                                                            </div>
                                                        </div>
                                                        <div class="flex px-9 justify-between">
                                                            <div class="light14grey w-36"></div>
                                                            <button class="saveandproceed">Submit</button>
                                                        </div>
                                                    </div>

                                                    <div class="changeAssociateSection hidden">
                                                        <table class="table mx-3 mt-2 xs:hidden sm:hidden">
                                                            <thead class="theadpopover">
                                                                <tr>
                                                                    <th>Associate Type</th>
                                                                    <th>Type of Attendance</th>
                                                                    <th>Effective From</th>
                                                                    <th>Effective Till</th>
                                                                    <th>Requested On</th>
                                                                    <th>Requested By</th>
                                                                    <th>Remarks</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="tbodypopover">
                                                                <tr class="border-b">
                                                                    <td>NDA</td>
                                                                    <td>HDA</td>
                                                                    <td>11-06-2020</td>
                                                                    <td>10-09-2020</td>
                                                                    <td>10-06-2020</td>
                                                                    <td>suraj.takale@el...</td>
                                                                    <td>OK</td>
                                                                </tr>
                                                                <tr class="border-b">
                                                                    <td>NDA</td>
                                                                    <td>HDA</td>
                                                                    <td>11-06-2020</td>
                                                                    <td>10-09-2020</td>
                                                                    <td>10-06-2020</td>
                                                                    <td>suraj.takale@el...</td>
                                                                    <td>OK</td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                        ​
                                                        <div
                                                            class="associateCard  border p-p7px m-2.5 rounded-md hidden xs:block sm:block">

                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Associate Type</div>
                                                                <div class="dataValue">NDA </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Type for Attendance
                                                                </div>
                                                                <div class="dataValue">NDA </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Efffective From</div>
                                                                <div class="dataValue">11-Jun-2020 </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Effective Till</div>
                                                                <div class="dataValue">13-Apr-2021 </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Requested on </div>
                                                                <div class="dataValue">14-Apr-2021</div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Requested by </div>
                                                                <div class="dataValue">suraj.takale@elasti...
                                                                </div>
                                                            </div>
                                                            <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Remarks</div>
                                                                <div class="dataValue">Ok </div>
                                                            </div>
                                                            <!-- <div class="flex px-4 py-1 items-center">
                                                                <div class="light14grey">Status</div>
                                                                <div class="dataValue">Completed </div>
                                                            </div> -->
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>


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