<script>
    ///////////tushar edit/////////////
    import {onMount} from 'svelte';
    // import {dashboard_details} from '../stores/dashboard_store';
    import {supplier_details} from '../stores/supplier_store';
    // import {dashboard_data} from '../services/dashboard_services';
    import {supplier_data} from '../services/supplier_services';
    // import {filter_city_data} from '../services/supplier_services';
    // import {filter_status_data} from '../services/supplier_services';
    import {audit_trail_data} from '../services/supplier_services';
    import {audit_details} from '../stores/audit_details_store';
    // import {city_store} from  '../stores/city_store';
    // import {status_store_details} from  '../stores/status_details_store';

    let offset=0;
    let totalskip=0;
    let limit=10;
    let supplier_data_from_store = [];
    let total_count_associates;
    let city_data;
    let audit_array= [];
    let audit_details_array= [];

    $:new_associate_data = {city: "-1",limit:limit,offset:offset,prevFlag: false,prevSkip: 0,search_keyword: "",sortDesc: true,status: "Bank Beneficiary Pending",totalskip:totalskip}
    $:audit_array = $supplier_details;
    ///////////tushar edit/////////////
    let json_associate_data,json_associate_new_data;

    onMount(async () =>{

        json_associate_data=JSON.stringify(new_associate_data);
    await supplier_data(json_associate_data);


    ////////////exp audit_trail///////////
    supplier_data_from_store = audit_array.associate_data.body.data.data_list;
    total_count_associates = audit_array.associate_data.body.data.total_records;

})
function next_function(){
    offset=offset+limit;
    totalskip=totalskip+limit;
    console.log("next++++++",offset,totalskip)
    json_associate_new_data=JSON.stringify(new_associate_data);
    supplier_data(json_associate_new_data);
    console.log("new_associate_data++++++++",json_associate_new_data)
    }
    
    function previous_function(){
    offset=offset-limit;
    totalskip=totalskip-limit;
    console.log("prev++++++",offset,totalskip)
    json_associate_new_data=JSON.stringify(new_associate_data);
    supplier_data(json_associate_new_data);
    console.log("new_associate_data++++++++",json_associate_new_data)
    }

    async function SupplerModalbuttonClick(datalist_name) {
        console.log("dataList name",datalist_name)
        await audit_trail_data(datalist_name)
        console.log("inside audit trail",$audit_details.audit_data.body)
        audit_details_array = $audit_details.audit_data.body.data
        supplierInfoModal.style.display = "block";
    };
    function collapse() {
        
        var shortInfo = document.querySelectorAll(".shortInfo");
        var elems = document.querySelectorAll(".detailsInfo");
        var trow = document.querySelector(".trow");

        document.querySelector(".trow").classList.add("valgin");

        shortInfo.forEach.call(shortInfo, function (el) {
            el.classList.add("hidden");


        });

        elems.forEach.call(elems, function (el) {
            el.classList.remove("hidden");
        });
    };

 

    function collapsedown() {
        var shortInfo = document.querySelectorAll(".shortInfo");
        var elems = document.querySelectorAll(".detailsInfo");
        var trow = document.querySelector(".trow");

        document.querySelector(".trow").classList.remove("valgin");

        shortInfo.forEach.call(shortInfo, function (el) {
            el.classList.remove("hidden");
        });

        elems.forEach.call(elems, function (el) {
            el.classList.add("hidden");
        });
    };

    function closeAuditTrailModal() {
        supplierInfoModal.style.display = "none";
    };




</script>


<tbody class="bg-white ">
    {#each supplier_data_from_store as facility_data} 
    <tr class="border-b-2 trow ">
        <td>
            <div
                class="tdfirstshortInfo shortInfo"
                id="shortInfo"> 

                <p class="hText"> {facility_data.facility_name}</p>
                <p class="text-xs text-grey">
                    {facility_data.facility_type}
                </p>
            </div>
            <div class="detailsInfo hidden">
                <div class="tdfirstDetails">
                    <div class="itemList ">
                        <div
                            class="smallText w-w115px"
                        >
                            Vendor
                        </div>
                        <div class="smLable">
                            {facility_data.facility_name}
                        </div>
                    </div>
                    <div class="itemList ">
                        <div
                            class="smallText w-w115px"
                        >
                            Vendor Type
                        </div>
                        <div class="smLable">
                            {facility_data.facility_type}
                        </div>
                    </div>
                    <div class="itemList ">
                        <div
                            class="smallText w-w115px"
                        >
                            Vendor ID
                        </div>
                        <div class="smLable">
                            {facility_data.name}
                        </div>
                    </div>
                    <div class="itemList">
                        <div
                            class="smallText w-w115px"
                        >
                            Location
                        </div>
                        <div class="smLable">
                            {#each facility_data.addresess as curr_address}
                            {curr_address.address}
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div
                class="paddingrt shortInfo"
                id="shortInfo"
            >
                <div class="statusWrapper  ">
                    <div
                        class="statusredcircle"
                    />
                    {facility_data.status}
                </div>
                <p
                    class="text-xs text-grey ml-4"
                >
                    (ID Proof)
                </p>
            </div>

            <div class="detailsInfo hidden">
                <div class="paddingrt">
                    <div class="statusWrapper">
                        <div
                            class="statusredcircle "
                        />
                        {facility_data.status}
                    </div>
                    <div class="statusDetails">
                        <p
                            class="vendorDetailsText"
                        >
                            <img
                                src="../src/img/checked.png"
                                class="pr-p7px"
                                alt=""
                            />
                            Vendor Details
                        </p>
                        <p
                            class="idproofRejected"
                        >
                            <img
                                src="../src/img/reject.png"
                                class="pr-p7px"
                                alt=""
                            /> ID Proof Rejected
                        </p>
                        <p
                            class="pendingBankVerfi"
                        >
                            <img
                                src="../src/img/timer.png"
                                class="pr-p7px"
                                alt=""
                            /> Pending Bank Verification
                        </p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div class="shortInfo">
                <div class="paddingrt">
                    <p class="smallText">{facility_data.remarks.length}</p>
                </div>
            </div>

            <div class="detailsInfo hidden">
                <div
                    class="remarklist ml-5 paddingrt"
                >
                    <ul class="list-disc ">
                        <li class="listitems">
                            {#each facility_data.remarks as remark}
                            {remark}
                            {/each}
                        </li>
                    </ul>
                </div>
            </div>
        </td>
        <td>
            <div class="shortInfo">
                <div class="paddingrt">
                    <p class="smallText">
                        1
                        
                        </p>
                </div>
            </div>

            <div class="detailsInfo hidden">
                <div
                    class="remarklist ml-5 paddingrt"
                >
                    <ul class="list-disc ">
                        <li class="listitems">
                            {facility_data.action}
                        </li>
                    </ul>
                    <div class="actionBtn mt-3">
                        <a
                            href="#"
                            class="ErBlueButton"
                            >Update</a
                        >
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div
                class="auditTrailtd  paddingrt"
            >
                <button
                    class="auditTrail"
                    on:click="{SupplerModalbuttonClick(facility_data.name)}"
                >
                    <img
                        src="../src/img/chat1.svg"
                        class="chatIcon"
                        alt=""
                    />
                    <span class="text-sm"
                        >
                        <!-- {#each audit_details_array as new_audit_data}
                         {new_audit_data.data}
                         {/each} -->
                        
                     </span>
                </button>
                <p class="mtextaudit">11 M</p>
                <div class="shortInfo">
                    <p
                        on:click="{collapse}"
                        class="arrowCollaps"
                    >
                        <img
                            src="../src/img/arrowDownCollaps.svg"
                            class="downArrowIcon"
                            alt=""
                        />
                    </p>
                </div>

                <div class="detailsInfo hidden">
                    <p
                        on:click="{collapsedown}"
                        class="detailsarrowCollaps "
                    >
                        <img
                            src="../src/img/arrowDownCollaps.svg"
                            class=" downArrowIconDetails"
                            alt=""
                        />
                    </p>
                </div>
            </div>
        </td>
    </tr>
    {/each}
</tbody>


 <!-- /////////////////////Audit Data///////////////////// -->

 <div class="supplierInfoModalSection" id="supplierInfoModal">
    {#each supplier_data_from_store as facility_data} 
    <div class="mainSupInfo">
        <div class="p-4">
            <div class="supInfoWrapper ">
                <div class="infoUserdetailsSection ">
                    <div class="detailsInfoSection">
                        <div class="tdfirstDetailsformodal">
                            <div class="itemList ">
                                <div class="smallText w-w115px">
                                    Vendor Name
                                </div>
                                <div class="smLable"> {facility_data.facility_name}</div>
                            </div>
                            <div class="itemList ">
                                <div class="smallText w-w115px">
                                    Vendor Type
                                </div>
                                <div class="smLable">{facility_data.facility_type}</div>
                            </div>
                            <div class="itemList ">
                                <div class="smallText w-w115px">Vendor ID</div>
                                <div class="smLable">{facility_data.name}</div>
                            </div>
                            <div class="itemList">
                                <div class="smallText w-w115px">Location</div>
                                <div class="smLable">{#each facility_data.addresess as curr_address}
                                    {curr_address.address}
                                    {/each}</div>
                            </div>
                            <div class="itemList">
                                <div class="smallText w-w115px">Status</div>
                                <div class="statusinformation">
                                    <div class="statusWrapper  ">
                                        <div class="statusredcircle" />
                                        {facility_data.status}
                                    </div>
                                    <p class="text-xs text-grey ml-4">
                                        (ID Proof)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="updatebutton ">
                        <button class="ErBlueupdated">Update</button>
                    </div>
                    <div class="closebuttonsection">
                        <img
                            src="../src/img/close.png"
                            on:click="{closeAuditTrailModal}"
                            class="closesup"
                            alt=""
                        />
                    </div>
                </div>
                <div class="commentBox">
                    <div class="textAndSubmitButton ">
                        <p class="text-base text-white">Add your comment</p>
                        <button class="btnsubmitComment " type="submit">
                            Submit</button
                        >
                    </div>

                    <textarea
                        name=""
                        class="textareaComment "
                        id=""
                        cols="30"
                        rows="3"
                    />
                </div>

                <div class="timelinescroll ">
                    <div class="flex md:contents">
                        <div class="timelinesection">
                            <div class="timeline ">
                                <div class="timelineGreyline" />
                            </div>
                            <div class="timelineImg ">
                                <img
                                    src="../src/img/chat2.svg"
                                    class="w-5 h-5"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="timelineContent ">
                            {#each audit_details_array as new_audit_data}
                            <h3 class="timeCommenterName ">
                                {new_audit_data.owner}
                                <span class="timeCommentDate "
                                    >{new_audit_data.creation}</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                {new_audit_data.remarks}
                            </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/each}
</div>



 <!-- /////////////////////Audit Data///////////////////// -->