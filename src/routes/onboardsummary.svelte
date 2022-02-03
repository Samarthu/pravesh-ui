<script>
    import { Router, Link, Route } from "svelte-routing";
    import Catagory from "./catagory.svelte";
    import { goto } from "$app/navigation";
    import Breadcrumb from "./breadcrumb.svelte";

    let routeNext = "";
    let routeBgv = "";
    let temp = "Add";
    let temp1 = "change";
    let temp2 = "gst1";
    let temp3="e-contracts";
    let temp4="p-contracts-1";

    export let url = "";

    function editWorkDetail() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }

    function routeToBgv() {
        let replaceState = false;
        goto(routeBgv, { replaceState });
    }
    
    function myBtn() {
        associateModal.style.display = "block";
    };

    function tagAddRemove() {
        addRemoveModal.style.display = "block";
    };

    function clear() {
        addRemoveModal.style.display = "none";
    };

    function close() {
        associateModal.style.display = "none";
    };

    function allDoc(){
        modalid.style.display = "block";
    }

    function closeDoc(){
        modalid.style.display = "none";
    }

    routeBgv = "bgv";

    routeNext = "workdetails";

    function auditTrial(){
        supplierInfoModal.style.display = "block";
    }

    function closeAuditTrailModal(){
        supplierInfoModal.style.display = "none";
    }

    function gstModel(){
        modalidgst.style.display = "block";
    }

    function closeGST(){
        modalidgst.style.display = "none";
    }

    function erpModel(){
        erpIdModel.style.display = "block";
    }

    function closeERP(){
        erpIdModel.style.display = "none";
    }

    function workContract(){
        workContractModel.style.display = "block";
    }

    function closeWorkContract(){
        workContractModel.style.display = "none";
    }
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
                            <a href="" > <span class="breadRightIcons" on:click="{erpModel}"> ERP Details </span> </a>
                            <a href=""> <span class="breadRightIcons" on:click="{allDoc}"> <img
                                        src="../src/img/document.png" class="pr-2" alt=""> Documents</span> </a>
                            <a href=""> <span class="breadRightIcons" on:click="{auditTrial}"> <img
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
                                <p on:click={routeToBgv} class="initiateText">
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
                            <a href="" class="smButton" on:click="{editWorkDetail}">
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
                            <p class="flex items-center smButtonText" >
                                <a href="" class="smButton" on:click="{gstModel}">
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
                                <p class="flex items-center smButtonText pr-3" on:click="{tagAddRemove}">
                                    <a href="" class="smButton">
                                        Add/Remove Tags
                                    </a>
                                </p>

                                <!-- Add Remove Tag Modal -->

                                <div class="hidden" id="addRemoveModal">
                                    <div class="ChangeAssociateTypeWrapper" >
                                        <div  class="changeAssoMain ">
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
                                                        <div class="rightcloseIconBlack" on:click="{clear}">
                                                            <img src="../src/img/closewhite.svg" class="cursor-pointer" id="closeAddRemove" alt="">
                                                        </div>
                                                    </div>
                                                    <div class="tabwrapper flex justify-between text-center">
                                                        <div class="changetype py-3 w-2/4 " on:click={()=>{temp="Add"}}>
                                                            <p>Add Tags</p>
                                                        </div>
                                                        <div class="Historytab py-3 w-2/4	 bg-bglightgreye"  on:click={()=>{temp="tag"}}>
                                                            <p>Tag Audit Trail</p>
                                                        </div>
                                                    </div>

                                                    {#if temp=="Add"}
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
                                                            <p class="text-lg text-blackshade font-medium">Other Applied Tags</p>
                                                            <table class="table  w-full text-center mt-2 xs:hidden sm:hidden">
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
                                                                            <img src="../src/img/reject.png" alt="">
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
                                                                            <img src="../src/img/reject.png" alt="">
                                                                        </div>
                                                                    </td>
                                                                  </tr>
                                                                 
                                                                
                                                                </tbody>
                                                              </table>
                                                              ​
                                                              <div class="associateCard  border p-p7px  rounded-md hidden xs:block sm:block">
      
                                                                  <div class="flex px-4 py-1 items-center">
                                                                      <div class="light14grey">Tag</div>
                                                                      <div class="dataValue">Addhoc Facility	 </div>
                                                                  </div>
                                                                  <div class="flex px-4 py-1 items-center">
                                                                      <div class="light14grey">Remarks	</div>
                                                                      <div class="dataValue">No Remarks	 </div>
                                                                  </div>
                                                                  <div class="flex px-4 py-1 items-center">
                                                                      <div class="light14grey">Added by	</div>
                                                                      <div class="dataValue">User name	</div>
                                                                  </div>
                                                                  <div class="flex px-4 py-1 items-center">
                                                                      <div class="light14grey">Added On	</div>
                                                                      <div class="dataValue">13-Apr-2021 </div>
                                                                  </div>
                                                                  <div class="flex px-4 py-1 items-center">
                                                                      <div class="light14grey">Auto Removal On	</div>
                                                                      <div class="dataValue">No date	  </div>
                                                                  </div>
                                                                  <div class="flex px-4 py-1 items-center">
                                                                      <div class="light14grey">Remove</div>
                                                                      <div class="dataValue">    <img src="../src/img/reject.png" alt=""> </div>
                                                                  </div>
                                                                 
                                                                 
                                                              </div>
                                                        </div>    


                                                    </div>
                                                    {/if}

                                                    {#if temp=="tag"}
                                                    <div class="changeAssociateSection mx-3 ">
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
                                                        <div class="associateCard  border p-p7px rounded-md hidden xs:block sm:block">

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

                                                        <div class="associateCard  border p-p7px  rounded-md hidden xs:block sm:block">

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
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                  </div>
                                <!-- </div> -->






                                <p class="flex items-center smButtonText pr-3">
                                    <a href="" class="smButton" on:click="{workContract}">
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
                                        <p class="flex items-center smButtonText" on:click="{myBtn}">
                                            <a href="" class="smButton">
                                                Change
                                            </a>
                                        </p>

                                        <div class="hidden" id="associateModal">
                                            <div class="ChangeAssociateTypeWrapper" >
                                                <div  class="changeAssoMain ">
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
                                                                    <p>Change Associate Type</p>
                                                                </div>
                                                                <div class="rightcloseIconBlack" on:click="{close}">
                                                                    <img src="../src/img/closewhite.svg" class="cursor-pointer" id="closeAssociate" alt="">
                                                                </div>
                                                            </div>
                                                            <div class="tabwrapper flex justify-between text-center">
                                                                <div class="changetype py-4 w-2/4" on:click="{()=>{temp1="change"}}">
                                                                    <p>Change Type</p>
                                                                </div>
                                                                <div class="Historytab py-4 w-2/4	 bg-bglightgreye" on:click="{()=>{temp1="history"}}">
                                                                    <p>History</p>
                                                                </div>
                                                            </div>

                                                            {#if temp1=="change"}
                                                            <div class="changetypeSection ">

                                                                <div class="flex px-4 pt-4 items-center gap-10 xs:gap-4 xs:flex-wrap">
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
                                                            {/if}

                                                            {#if temp1=="history"}
                                                            <div class="changeAssociateSection">
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
                                                                <div class="associateCard  border p-p7px m-2.5 rounded-md hidden xs:block sm:block">

                                                                    <div class="flex px-4 py-1 items-center">
                                                                        <div class="light14grey">Associate Type</div>
                                                                        <div class="dataValue">NDA </div>
                                                                    </div>
                                                                    <div class="flex px-4 py-1 items-center">
                                                                        <div class="light14grey">Type for Attendance</div>
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
                                                                        <div class="dataValue">suraj.takale@elasti... </div>
                                                                    </div>
                                                                    <div class="flex px-4 py-1 items-center">
                                                                        <div class="light14grey">Remarks</div>
                                                                        <div class="dataValue">Ok </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/if}

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


        <div class="supplierInfoModalSection " id="supplierInfoModal">
            <div class="mainSupInfo">
                <div class="p-4">
                    <div class="supInfoWrapper ">
                        <div class="infoUserdetailsSection ">
                            <div class="detailsInfoSection">
                                <div class="tdfirstDetailsformodal">
                                    <div class="itemList ">
                                        <div class="smallText w-w115px">Vendor Name </div>
                                        <div class="smLable">Nandkishore Services</div>
                                    </div>
                                    <div class="itemList ">
                                        <div class="smallText w-w115px">Vendor Type</div>
                                        <div class="smLable">Man Power Contractor</div>
                                    </div>
                                    <div class="itemList ">
                                        <div class="smallText w-w115px">Vendor ID</div>
                                        <div class="smLable">SUPP-35479</div>
                                    </div>
                                    <div class="itemList">
                                        <div class="smallText w-w115px">Location </div>
                                        <div class="smLable">Pune</div>
                                    </div>
                                    <div class="itemList">
                                        <div class="smallText w-w115px">Status </div>
                                        <div class="statusinformation">
                                            <div class="statusWrapper  ">
                                                <div class="statusredcircle"></div>
                                                Documents Rejected
                                            </div>
                                            <p class="text-xs text-grey ml-4">(ID Proof)</p>
                                        </div>
                                    </div>
    
    
                                </div>
                            </div>
                            <div class="updatebutton ">
                                <button class="ErBlueupdated">Update</button>
                            </div>
                            <div class="closebuttonsection" on:click="{closeAuditTrailModal}">
                                <img src="../src/img/close.png" id="closeAuditTrailModal" class="closesup" alt="">
                            </div>
                        </div>
                        <div class="commentBox">
                            <div class="textAndSubmitButton ">
                                <p class="text-base text-white">Add your comment</p>
                                <button class="btnsubmitComment " type="submit"> Submit</button>
                            </div>
    
                            <textarea name="" class="textareaComment " id="" cols="30" rows="3"></textarea>
                        </div>
    
                        <div class="timelinescroll ">
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName "> Selvaraj Jayaraman
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Pancard number mismatch
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Akshay Saini
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPurple">
                                        <p class="timeCircle"></p> Vendor details verified
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName "> Selvaraj Jayaraman
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPurple">
                                        <p class="timeCircle"></p> Vendor Details
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightGreen">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:contents">
                                <div class="timelinesection">
                                    <div class="timeline ">
                                        <div class="timelineGreyline"></div>
                                    </div>
                                    <div class="timelineImg ">
                                        <img src="../src/img/chat2.svg" class="w-5 h-5" alt="">
                                    </div>
                                </div>
                                <div class="timelineContent ">
                                    <h3 class="timeCommenterName ">Vivekanand Dasar
                                        <span class="timeCommentDate ">Thurs, 07 Sept 21, 12:24 PM</span>
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle"></p> Voter ID not clear
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- All Documents modal -->
      <div class="hidden" id="modalid">
        <div class=" viewDocmodal  " >
            <div class="bglightcolormodal"></div>
            <div class="allDocmodalsuccessbody rounded-lg">
                <div class="">
                    <div class="viewDocPanmainbodyModal">
                        <div class="flex justify-between mb-3">
                            <div class="leftmodalInfo">
                                <p class="text-lg text-erBlue font-medium  ">
                                    <span class=""> All Documents</span>
                                </p>
                                <p class="text-sm ">
                                    <span class="font-medium text-lg"> Dhiraj Shah</span>
                                    <span class="userDesignation"> - Associate- NDA, MHPD  - Mulsi SP</span>
                                </p>
                            </div>
                            <div class="rightmodalclose" on:click="{closeDoc}">
                                <img src="../src/img/blackclose.svg" alt="">
                            </div>
                        </div>
                        <div class="innermodal">
                            <hr>
                            <div class="scrollbar ">
                              <div class="mainContainerWrapper ">
                                    <div class="DocCardlist ">
                                        <div class="cardDocWrapper ">
                                            <div class="infoDivCard ">
                                                <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img src="../src/img/pancard.png" alt="">
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Document Type</p>
                                                        <p class="detailData">PAN Card</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded By</p>
                                                        <p class="detailData">Admin</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded On</p>
                                                        <p class="detailData">27-Apr-2021 23:29 pm</p>
                                                    </div>
                                                  </div>  
                                                  <div class="secSecond xs:mt-3"> 
                                                        
                                                <div class="pl-4">
                                                    <p class="verifyText">
                                                        <a href="" class="smButton">
                                                            <img src="../src/img/view.png" alt="">
                                                        </a>
                                                    </p>
                                                </div>
                                                </div>
                                               
                                             
                                            </div>
                                            </div>
                                            <div class="statusSecForDoc">
                                               <p class="userStatusTick ">
                                                   <img src="../src/img/checked.png" alt="" class="pr-1"> Verify
                                               </p>
                                            </div>    
                                        </div> 
                                        <div class="cardDocWrapper ">
                                            <div class="infoDivCard ">
                                                <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img src="../src/img/pancard.png" alt="">
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Document Type</p>
                                                        <p class="detailData">PAN Card</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded By</p>
                                                        <p class="detailData">Admin</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded On</p>
                                                        <p class="detailData">27-Apr-2021 23:29 pm</p>
                                                    </div>
                                                  </div>  
                                                  <div class="secSecond xs:mt-3"> 
                                                        
                                                <div class="pl-4">
                                                    <p class="verifyText">
                                                        <a href="" class="smButton">
                                                            <img src="../src/img/view.png" alt="">
                                                        </a>
                                                    </p>
                                                </div>
                                                </div>
                                               
                                             
                                            </div>
                                            </div>
                                            <div class="statusSecForDoc">
                                               <p class="userStatusTick ">
                                                   <img src="../src/img/checked.png" alt="" class="pr-1"> Verify
                                               </p>
                                            </div>    
                                        </div> 
                                        <div class="cardDocWrapper ">
                                            <div class="infoDivCard ">
                                                <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img src="../src/img/pancard.png" alt="">
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Document Type</p>
                                                        <p class="detailData">PAN Card</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded By</p>
                                                        <p class="detailData">Admin</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded On</p>
                                                        <p class="detailData">27-Apr-2021 23:29 pm</p>
                                                    </div>
                                                  </div>  
                                                  <div class="secSecond xs:mt-3"> 
                                                        
                                                <div class="pl-4">
                                                    <p class="verifyText">
                                                        <a href="" class="smButton">
                                                            <img src="../src/img/view.png" alt="">
                                                        </a>
                                                    </p>
                                                </div>
                                                </div>
                                               
                                             
                                            </div>
                                            </div>
                                            <div class="statusSecForDoc">
                                               <p class="userStatusTick ">
                                                   <img src="../src/img/checked.png" alt="" class="pr-1"> Verify
                                               </p>
                                            </div>    
                                        </div> 
                                        <div class="cardDocWrapper ">
                                            <div class="infoDivCard ">
                                                <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img src="../src/img/pancard.png" alt="">
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Document Type</p>
                                                        <p class="detailData">PAN Card</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded By</p>
                                                        <p class="detailData">Admin</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded On</p>
                                                        <p class="detailData">27-Apr-2021 23:29 pm</p>
                                                    </div>
                                                  </div>  
                                                  <div class="secSecond xs:mt-3"> 
                                                        
                                                <div class="pl-4">
                                                    <p class="verifyText">
                                                        <a href="" class="smButton">
                                                            <img src="../src/img/view.png" alt="">
                                                        </a>
                                                    </p>
                                                </div>
                                                </div>
                                               
                                             
                                            </div>
                                            </div>
                                            <div class="statusSecForDoc">
                                               <p class="userStatusTick ">
                                                   <img src="../src/img/checked.png" alt="" class="pr-1"> Verify
                                               </p>
                                            </div>    
                                        </div> 
                                        <div class="cardDocWrapper ">
                                            <div class="infoDivCard ">
                                                <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                    <div class="docImageSec">
                                                        <img src="../src/img/pancard.png" alt="">
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Document Type</p>
                                                        <p class="detailData">PAN Card</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded By</p>
                                                        <p class="detailData">Admin</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale">Uploaded On</p>
                                                        <p class="detailData">27-Apr-2021 23:29 pm</p>
                                                    </div>
                                                  </div>  
                                                  <div class="secSecond xs:mt-3"> 
                                                        
                                                <div class="pl-4">
                                                    <p class="verifyText">
                                                        <a href="" class="smButton">
                                                            <img src="../src/img/view.png" alt="">
                                                        </a>
                                                    </p>
                                                </div>
                                                </div>
                                               
                                             
                                            </div>
                                            </div>
                                            <div class="statusSecForDoc">
                                               <p class="userStatusTick ">
                                                   <img src="../src/img/checked.png" alt="" class="pr-1"> Verify
                                               </p>
                                            </div>    
                                        </div> 
                                       
                                       
                                    </div>
                                    <div class="addDocumentSection ">
                                            <div class="addSecform ">

                                                <div class="addButtonSection my-3 py-16 text-center hidden">
                                                    <div class="updateAction">
                                                        <button class="ErBlueButton">Add New Document</button>
                                                    </div>
                                                </div>

                                                <div class="my-3 py-4 px-4 ">
                                                    <p class="text-lg font-medium">Add New Document</p>

                                                    <div class="flex  py-3 items-center flex-wrap">
                                                        <div class="light14grey mb-1">Document Type</div>
                                                        <div class="formInnerGroup ">
                                                            <select class="inputboxpopover">
                                                                <option class="pt-6">Select</option>
                                                                <option>ICICI</option>
                                                                <option>Axis</option>
                                                                <option>SIB</option>
                                                            </select>
                                                            <div class="formSelectArrow ">
                                                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex  py-1 items-center flex-wrap">
                                                        <div class="light14grey  mb-1">Document Detail</div>
                                                        <div class="formInnerGroup">
                                                            <input class="inputboxpopover" type="text">
                                                        </div>
                                                    </div>
                                                    <div class="flex  py-3 items-center flex-wrap">
                                                        <div class="light14grey  mb-1">Upload Document</div>
                                                        <div class="formInnerGroup">
                                                            <label class="cursor-pointer flex">
                                                                <div class="ErBlueButton">Select File</div>
                                                                <input type="file" class="hidden">
                                                            </label>
                                                           
                                                        </div>
                                                    </div>


                                                    <div class="flex items-center justify-end mt-5">
                                                        <div class="updateAction text-erBlue">
                                                           Cancel
                                                        </div>
                                                        <div class="updateAction ml-5">
                                                            <button class="ErBlueButton">Upload</button>
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
        </div>
    </div>

    <!-- GST Details modal -->
    <div class="hidden" id="modalidgst">
        <div class=" viewDocmodal  " >
            <div class="bglightcolormodal"></div>
            <div class="allDocmodalsuccessbody rounded-lg">
                <div class="">
                    <div class="viewDocPanmainbodyModal">
                        <div class="flex justify-between mb-3">
                            <div class="leftmodalInfo">
                                <p class="text-lg text-erBlue font-medium  ">
                                    <span class=""> GST Details</span>
                                </p>
                                <p class="text-sm ">
                                    <span class="font-medium text-lg"> Dhiraj Shah</span>
                                    <span class="userDesignation"> - Associate- NDA, MHPD  - Mulsi SP</span>
                                </p>
                            </div>
                            <div class="rightmodalclose" on:click="{closeGST}">
                                <img src="../src/img/blackclose.svg" alt="">
                            </div>
                        </div>
                        <div class="innermodal">
                            <hr>
                            <div class="scrollbar ">
                              <div class="mainContainerWrapper ">
                                    <div class="DocCardlist ">
                                        <div class="cardDocWrapper ">
                                            <div class="infoDivCard ">
                                                <div class="infofSection  ">
                                                <div class="secFirstDoc ">
                                                
                                                    <div class="locationInformation">
                                                            <div class="flex">
                                                                <p class="detailLbalesm pr-3">Address</p>
                                                                <p class="detailDatasm">B615, Marvad, near aarvi school</p>
                                                            </div>
                                                            <div class="flex">
                                                                <p class="detailLbalesm pr-3">City</p>
                                                            <p class="detailDatasm">Amravati</p>
                                                            </div>
                                                            <div class="flex">
                                                                <p class="detailLbalesm pr-3">GST State</p>
                                                                <p class="detailDatasm">Maharastra</p>
                                                            </div>
                                                    </div>
                                                   
                                                  
                                                    <div class="pl-2">
                                                        <p class="detailLbale whitespace-nowrap mb-2">GST Number</p>
                                                        <p class="detailData">22 GHDGS0000A 1Z5</p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale whitespace-nowrap mb-2">GST Certificate</p>
                                                        <p class="verifyText">
                                                            <a href="" class="smButton">
                                                                <img src="../src/img/view.png" alt="">
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div class="pl-2">
                                                        <p class="detailLbale mb-2">Edit</p>
                                                        <p class="verifyText">
                                                            <a href="" class="smButton">
                                                                <img src="../src/img/view.png" alt="">
                                                            </a>
                                                        </p>
                                                    </div>
                                                  </div>  
                                                
                                               
                                             
                                            </div>
                                            
                                            </div>
                                            <div class="statusSecForDoc">
                                                <p class="userStatusTick ">
                                                    <img src="../src/img/checked.png" alt="" class="pr-1"> Verified
                                                </p>
                                             </div> 
                                        </div> 
                                       
                                       
                                       
                                    </div>
                                    <div class="addDocumentSection ">
                                            <div class="addSecform hidden">
                                                <div class="addButtonSection my-3 py-16 text-center hidden">
                                                    <div class="updateAction">
                                                        <button class="ErBlueButton">Add New GST Details</button>
                                                    </div>
                                                </div>
                                                <div class="my-3 py-4 px-4 ">
                                                    <p class="text-lg font-medium">Add new GST details</p>

                                                    <div class="flex  py-1 items-center flex-wrap">
                                                        <div class="light14grey  mb-1">Address</div>
                                                        <div class="formInnerGroup">
                                                            <input class="inputboxpopover" type="text">
                                                        </div>
                                                    </div>
                                                    <div class="flex  py-3 items-center flex-wrap">
                                                        <div class="light14grey mb-1">City</div>
                                                        <div class="formInnerGroup ">
                                                            <select class="inputboxpopover">
                                                                <option class="pt-6">Select</option>
                                                                <option>ICICI</option>
                                                                <option>Axis</option>
                                                                <option>SIB</option>
                                                            </select>
                                                            <div class="formSelectArrow ">
                                                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex  py-1 items-center flex-wrap">
                                                        <div class="light14grey  mb-1">GST State</div>
                                                        <div class="formInnerGroup">
                                                            <input class="inputboxpopover" type="text">
                                                        </div>
                                                    </div>
                                                    
                                                   
                                                    <div class="flex  py-3 items-center flex-wrap">
                                                        <div class="light14grey  mb-1">Upload Document</div>
                                                        <div class="formInnerGroup">
                                                            <label class="cursor-pointer flex">
                                                                <div class="ErBlueButton">Select File</div>
                                                                <input type="file" class="hidden">
                                                            </label>
                                                           
                                                        </div>
                                                    </div>


                                                    <div class="flex items-center justify-end mt-5">
                                                        <div class="updateAction text-erBlue">
                                                           Cancel
                                                        </div>
                                                        <div class="updateAction ml-5">
                                                            <button class="ErBlueButton">Upload</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class=" bg-lighterGrey rounded-lg h-full">
                                                {#if temp2=="gst1"}
                                                <div class="addButtonSection my-3 py-3  text-center ">
                                                    <div class="updateAction mt-5">
                                                        <button class="ErBlueButton" on:click={()=>{temp2="gst2"}}>Add New GST Details</button>
                                                    </div>
                                                </div>
                                                {/if}
                                            
                                                {#if temp2=="gst2"}
                                                <div class="my-0 py-4 px-4 ">
                                                    <div class="h-80 max-h-80 overflow-y-scroll pr-4 border-b-2">

                                                        <p class="text-lg font-medium">Add new GST details</p>

                                                        <div class="flex  py-1 items-center flex-wrap">
                                                            <div class="light14grey  mb-1">Address</div>
                                                            <div class="formInnerGroup">
                                                                <input class="inputboxpopover" type="text">
                                                            </div>
                                                        </div>
                                                        <div class="flex  py-3 items-center flex-wrap">
                                                            <div class="light14grey mb-1">City</div>
                                                            <div class="formInnerGroup ">
                                                                <select class="inputboxpopover">
                                                                    <option class="pt-6">Select</option>
                                                                    <option>ICICI</option>
                                                                    <option>Axis</option>
                                                                    <option>SIB</option>
                                                                </select>
                                                                <div class="formSelectArrow ">
                                                                    <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="flex  py-1 items-center flex-wrap">
                                                            <div class="light14grey  mb-1">GST State</div>
                                                            <div class="formInnerGroup">
                                                                <input class="inputboxpopover" type="text">
                                                            </div>
                                                        </div>
                                                        <div class="flex  py-1 items-center flex-wrap">
                                                            <div class="light14grey  mb-1">GST Number</div>
                                                            <div class="formInnerGroup">
                                                                <input class="inputboxpopover" type="text">
                                                            </div>
                                                        </div>
                                                        
                                                       
                                                        <div class="flex  py-3 items-center flex-wrap">
                                                            <div class="light14greylong  mb-1">Upload GST Certificate</div>
                                                            <div class="formInnerGroup">
                                                                <label class="cursor-pointer flex">
                                                                    <div class="ErBlueButton">Select File</div>
                                                                    <input type="file" class="hidden">
                                                                </label>
                                                               
                                                            </div>
                                                        </div>
                                                    
                                                </div>

                                                    <div class="flex items-center justify-end mt-5">
                                                        <div class="updateAction text-erBlue cursor-pointer " on:click={()=>{temp2="gst1"}}>
                                                           Cancel
                                                        </div>
                                                        <div class="updateAction ml-5">
                                                            <button class="ErBlueButton">Add</button>
                                                        </div>
                                                    </div>

                                                </div>
                                                {/if}

                                                
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

    <!-- ERP Details modal -->
    <div class="hidden" id="erpIdModel">
        <div class=" viewDocmodal  " >
            <div class="bglightcolormodal"></div>
            <div class="allDocmodalsuccessbodyErp rounded-lg">
                <div class="">
                    <div class="viewDocPanmainbodyModal">
                        <div class="flex justify-between mb-3">
                            <div class="leftmodalInfo">
                                <p class="text-lg text-erBlue font-medium  ">
                                    <span class=""> ERP Details</span>
                                </p>
                                <p class="detailsUpdate">
                                    <span><span class="font-medium">Created On </span> - 27-Apr-2021 03:28 pm.</span>
                                </p>
                            </div>
                            <div class="rightmodalclose" on:click="{closeERP}">
                                <img src="../src/img/blackclose.svg" alt="">
                            </div>
                        </div>
                        <div class="innermodal">
                            <hr>
                            <div class="ERPDetails mt-4">
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">ERP ID</p>
                                    <p class="detailDatasm">SUPP-06943</p>
                                </div>
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">ERP Name</p>
                                <p class="detailDatasm">SUPP-06943-MEX00094</p>
                                </div>
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">Address ID</p>
                                    <p class="detailDatasm">SUPP-06943-Delhi</p>
                                </div>
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">Address Title</p>
                                    <p class="detailDatasm">SUPP-06943-Delhi</p>
                                </div>
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">Contact ID</p>
                                    <p class="detailDatasm">SUPP-06943-Delhi</p>
                                </div>
                        </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!--  Work Contract Details modal -->
<div class="hidden" id="workContractModel">
    <div class="viewDocmodal " >
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div class="allDocmodalsuccessbody rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> Work Contract Details</span>
                            </p>
                            <p class="text-sm ">
                                <span class="font-medium text-lg"> Dhiraj Shah</span>
                                <span class="userDesignation"> - Associate- NDA, MHPD  - Mulsi SP</span>
                            </p>
                        </div>
                        <div class="rightmodalclose" on:click="{closeWorkContract}">
                            <img src="../src/img/blackclose.svg" alt="">
                        </div>
                    </div>
                    <div class="innermodal">
                        <hr>
                        <div class="tabwrapper flex justify-between text-center py-2">
                            <div class="changetype py-3 w-2/4	" on:click={()=>{temp3="e-contracts"}}>
                                <p>E-Contracts</p>
                            </div>
                            <div class="Historytab py-3 w-2/4	 bg-bglightgreye" on:click={()=>{temp3="p-contracts"}}>
                                <p>Physical Contracts</p>
                            </div>
                        </div>

                        {#if temp3=="e-contracts"}
                        <div class="scrollbar ">
                        <div class="OtherAppliedTagsTable px-3 overflow-y-scroll">
                            <table class="table  w-full text-center mt-2 ">
                                <thead class="theadpopover h-10">
                                  <tr>
                                    <th>Contract Name</th>
                                    <th>Contract Type</th>
                                    <th> <div class="flex"> Accepted ? <img src="../src/img/arrowupdown.svg" class="ml-2" alt=""></div></th>
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
                              <div class="associateCard  border p-p7px  rounded-md hidden xs:block sm:block">

                                  <div class="flex px-4 py-1 items-center">
                                      <div class="light14grey">Tag</div>
                                      <div class="dataValue">Addhoc Facility	 </div>
                                  </div>
                                  <div class="flex px-4 py-1 items-center">
                                      <div class="light14grey">Remarks	</div>
                                      <div class="dataValue">No Remarks	 </div>
                                  </div>
                                  <div class="flex px-4 py-1 items-center">
                                      <div class="light14grey">Added by	</div>
                                      <div class="dataValue">User name	</div>
                                  </div>
                                  <div class="flex px-4 py-1 items-center">
                                      <div class="light14grey">Added On	</div>
                                      <div class="dataValue">13-Apr-2021 </div>
                                  </div>
                                  <div class="flex px-4 py-1 items-center">
                                      <div class="light14grey">Auto Removal On	</div>
                                      <div class="dataValue">No date	  </div>
                                  </div>
                                  <div class="flex px-4 py-1 items-center">
                                      <div class="light14grey">Remove</div>
                                      <div class="dataValue">    <img src="../src/img/reject.png" alt=""> </div>
                                  </div>
                                 
                                 
                              </div>
                        </div>  
                      </div>
                      {/if}

                      {#if temp3=="p-contracts"}
                        <div class="scrollbar ">
                          <div class="mainContainerWrapper flex gap-6">
                                <div class="DocCardlist w-7/12 pr-4 h-h442 overflow-y-scroll">
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
                                      ​
                                </div>
                                <div class="addDocumentSection w-5/12  ">
                                        <div class=" bg-lighterGrey rounded-lg h-full">
                                            {#if temp4=="p-contracts-1"}
                                            <div class="addButtonSection my-3 py-3 text-center ">
                                                <p class="text-lg font-medium text-blackshade mb-3">Upload New Physical contract here</p>
                                                <div class="updateAction">
                                                    <button class="ErBlueButton" on:click={()=>{temp4="p-contracts-2"}}>Upload</button>
                                                </div>
                                            </div>
                                            {/if}
                                            {#if temp4=="p-contracts-2"}
                                            <div class="addButtonSection mt-3 pt-3 text-center ">
                                                <p class="text-lg font-medium text-blackshade">Upload New Physical Contract</p>
                                            </div>
                                            <div class="my-0 py-4 px-4 ">
                                                <div class="h-80 max-h-80 overflow-y-scroll pr-4 border-b-2">

                                               
                                                <div class="flex  py-3 items-center flex-wrap">
                                                    <div class="light14grey mb-1">Select Contract Type</div>
                                                    <div class="formInnerGroup ">
                                                        <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                            <option>ICICI</option>
                                                            <option>Axis</option>
                                                            <option>SIB</option>
                                                        </select>
                                                        <div class="formSelectArrow ">
                                                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex  py-3 items-center flex-wrap">
                                                    <div class="light14grey mb-1">Select Organization</div>
                                                    <div class="formInnerGroup ">
                                                        <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                            <option>ICICI</option>
                                                            <option>Axis</option>
                                                            <option>SIB</option>
                                                        </select>
                                                        <div class="formSelectArrow ">
                                                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex  py-3 items-center flex-wrap">
                                                    <div class="light14grey mb-1">Select Station</div>
                                                    <div class="formInnerGroup ">
                                                        <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                            <option>ICICI</option>
                                                            <option>Axis</option>
                                                            <option>SIB</option>
                                                        </select>
                                                        <div class="formSelectArrow ">
                                                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex py-3 items-center flex-wrap ">
                                                    <div class="light14grey">From Date</div>
                                                    <div class="formInnerGroup ">
                                                        <input type="date" class="inputboxpopoverdate"
                                                            placeholder=" ">
                                                    </div>
                                                </div>
                                                <div class="flex py-3 items-center flex-wrap ">
                                                    <div class="light14grey">End Date</div>
                                                    <div class="formInnerGroup ">
                                                        <input type="date" class="inputboxpopoverdate"
                                                            placeholder=" ">
                                                    </div>
                                                </div>
                                                <div class="flex  py-3 items-center flex-wrap">
                                                    <div class="light14grey  mb-1">Upload Document</div>
                                                    <div class="formInnerGroup">
                                                        <label class="cursor-pointer flex">
                                                            <div class="ErBlueButton">Select File</div>
                                                            <input type="file" class="hidden">
                                                        </label>
                                                       
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        

                                                <div class="flex items-center justify-end mt-5">
                                                    <div class="updateAction text-erBlue cursor-pointer" on:click={()=>{temp4="p-contracts-1"}}>
                                                       Cancel
                                                    </div>
                                                    <div class="updateAction ml-5">
                                                        <button class="ErBlueButton">Upload</button>
                                                    </div>
                                                </div>

                                            </div>
                                            {/if}
                                            
                                        </div>
                                </div>
                          </div>  
                        </div>
                      {/if}

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>