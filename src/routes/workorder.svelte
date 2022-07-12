
<script>

    import {img_url_name} from '../stores/flags_store';

    let temp = "";
    let main_tab = "a";
    let filter1 = "b";
    let raisewo = "a";
    let details_active = "active";
    let items_active = "";
    let charge_details_active = "";

    function routeToMainReport() {
        main_tab = "a"
    }

    function open_tab1(){
        a.style.display = "block";
    }

    function open_tab2(){
        b.style.display = "block";
    }

    function open_tab3(){
        c.style.display = "block";
    }

    function closeA(){
        a.style.display = "none";
    }

    function closeB(){
        b.style.display = "none";
    }

    function closeC(){
        c.style.display = "none";
    }
</script>


<div class="mainContent ">
    {#if main_tab=="a"}
    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <div class="breadcrumbtext flex justify-between">
                <p class="flex">
                    <span class="text-textgrey pr-1 text-base">Home /
                    </span> <span class="flex xs:text-base xs:items-center pl-2">Work Order</span>
                </p>
                <!-- <button class="ErBlueButton" on:change={main_tab = "b"}>Estimate Work Order</button> -->
            </div>
        </div>
    </div>
    {/if}

    {#if main_tab=="a"}
    <!-- work Order view -->
    <div class="workOrderView ">
        <div class="px-5 grid grid-cols-4 gap-9 mt-8 xsl:grid-cols-1 xsl:gap-6">
            <div class="reportCard bg-white rounded-lg">
                <h3>Estimate Work Order</h3>
                <p>Filter work order Estimate, raise new work order estimate, View post work order.</p>
                <div class="text-right">
                    <button class="ErBlueButton" on:click={()=>{main_tab="b",filter1="b"}}>Go</button>
                </div>
            </div>
            <div class="reportCard bg-white rounded-lg">
                <h3>Work Order </h3>
                <p>Filter work order, raise new work order & create work Order</p>
                <div class="text-right">
                    <button class="ErBlueButton" on:click={()=>{main_tab="b",filter1="a"}}>Go</button>
                </div>
            </div>
            <!-- <div class="reportCard bg-white rounded-lg">
                <h3>BGV Data </h3>
                <p>Get background verification data report of all associates</p>
                <div class="text-right">
                    <button class="ErBlueButton" on:click={()=>{temp="b"}}>Get Data</button>
                </div>
            </div> -->
        </div>
    </div>
    <!-- End work Order view -->
    {/if}

    {#if main_tab=="b"}
    <!-- <div class="breadcrumb "> -->
        <!-- <div class="breadcrumb-section"> -->
    {#if filter1=="a"}
    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <div class="breadcrumbtext flex justify-between">
                <p class="flex">
                    <span class="text-textgrey pr-1 text-base cursor-pointer" on:click="{routeToMainReport}" >Home /
                    </span> <span class="flex xs:text-base xs:items-center pl-2">Work Order</span>
                </p>
                <button class="ErBlueButton" on:click={()=>{filter1="b",temp=""}}>Estimate Work Order</button>
            </div>
        </div>
    </div>
    {/if}

    {#if filter1=="b"}
    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <div class="breadcrumbtext flex justify-between">
                <p class="flex">
                    <span class="text-textgrey pr-1 text-base cursor-pointer" on:click="{routeToMainReport}">Home /
                    </span> <span class="flex xs:text-base xs:items-center pl-2">Estimate Work Order</span>
                </p>
                <button class="ErBlueButton" on:click={()=>{filter1="a"}}>Work Order</button>
            </div>
        </div>
    </div>
    {/if}
        <!-- </div> -->
    <!-- </div> -->
    <!-- All Work Orders-->
    <div class="px-5  mt-8 hidde">

        <div class="allWorkOrder flex justify-between items-center xsl:flex-wrap">
                <div class="AllworkOrderTitle">
                    <p class="mb-0 text-lg font-medium text-blackshade">All Work Orders</p>
                </div>
                <div class="AllworkOrderTitleActions">
                    {#if filter1=="a"}
                    <button class="ErBlueButton " on:click="{open_tab1}" on:click={()=>{temp="a"}}>Filter WO Status</button>
                    <button class="ErBlueButton " on:click="{open_tab2}" on:click={()=>{temp="b"}}>Raise New WO</button>
                    <button class="ErBlueButton " on:click="{open_tab3}" on:click={()=>{temp="c"}}>Create Bulk WO Request</button>
                    {/if}
                    {#if filter1=="b"}
                    <button class="ErBlueButton " >Filter WO Estimate</button>
                    <button class="ErBlueButton " >Raise New WO Estimate</button>
                    <button class="ErBlueButton ">Create Bulk WO Request</button>
                    {/if}
                </div>
        </div>
    <!-- Filter WO Status -->

    {#if temp=="a"}
    <div class="FilterWorkStatus hidde" id="a">
        <div class="mt-3">
            <div class="caretforImage">
                 <img src="../src/img/caret.svg" class="caretBulkemp" alt="">
            </div>
            <div class="getReportCard bg-white rounded-lg">
                <div class="flex justify-between">
                <h3>Filter work order status </h3>
                <!-- <p>
                    <img src="../src/img/closeCrossBlack.svg" alt="">
                </p> -->
                <div class="closebuttonsection" on:click={closeA}>
                    <img
                        src="{$img_url_name.img_name}/close.png"
                        class="closesup"
                        alt=""
                    />
                    </div>
                </div>

                <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1 xsl:gap-2">
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Organization</div>
                        <div class="formInnerGroupNote ">
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

                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Station</div>
                        <div class="formInnerGroupNote ">
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

                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Month & Year</div>
                        <div class="formInnerGroupNote ">
                            <input class="inputboxpopoverdate" type="month">
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1">
                  
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Work Order Type</div>
                        <div class="formInnerGroupNote ">
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
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Work Order Status</div>
                        <div class="flex gap-3 mt-2">
                            <button class="smButton bg-bgGreencolor border-none text-white text-font13px">Approved</button>
                            <button class="smButton bg-bgOrangeColor  border-none text-white text-font13px">Requested</button>
                            <button class="smButton bg-mandatorysign  border-none text-white text-font13px">Cancelled</button>
                        </div>
                    </div>

                    <div class="text-right  justify-start flex items-center">
                        <button class="ErBlueButton">Filter</button>
                    </div>
                </div>

                <div class="py-4 mb-4">
                    <hr>
                </div>

                <div class="grid grid-cols-6 xsl:grid-cols-1 gap-6 mt-2 items-center">
                    <div class="flex col-span-2 lgc:col-span-3 xsl:col-span-5 xsl:flex-wrap ">
                        <label class="text-base text-blackshade font-medium mr-3 whitespace-nowrap">Search work order by<span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup xsl:mt-3">
                            <div class="text-center flex mb-2 ml-3">
                                <div class="flex items-center mr-5">
                                    <input id="radio1" type="radio" name="radio" class="hidden" checked="">
                                    <label for="radio1" class="radioLable text-grey">
                                        <span class="radioCirle"></span>
                                        Order ID</label>
                                </div>
                                <div class="flex items-center  ">
                                    <input id="radio2" type="radio" name="radio" class="hidden">
                                    <label for="radio2" class="radioLable  text-grey">
                                        <span class="radioCirle"></span>
                                        Approved ID</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 xsl:col-span-5">
                        <div class="items-center ">
                            <div class="formInnerGroupNote ">
                                <input class="inputboxpopover" type="search">
                            </div>
                        </div>  
                    </div>
                    <div class="col-span-1">
                        <button class="ErBlueButton">Search</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    {/if}

    <!--End Filter WO Status -->


    <!-- Raise New WO -->
    {#if temp=="b"}
       <div class="RaiseNewWorkOrder hidde" id="b">
        <div class="mt-3">
            <div class="caretforImage">
                 <img src="../src/img/caret.svg" class="caretBulkemp" alt="">
            </div>
            <div class="getReportCard bg-white rounded-lg">
                <div class="flex justify-between">
                <h3>Raise New Work Order </h3>
                <!-- <p>
                    <img src="../src/img/closeCrossBlack.svg" alt="">
                </p> -->
                <div class="closebuttonsection" on:click={closeB}>
                    <img
                        src="{$img_url_name.img_name}/close.png"
                        class="closesup"
                        alt=""
                    />
                    </div>
                </div>

                <div class="stepMenus">
                    <div class="step2">
                        <div class="{details_active} cursor-pointer p-2" on:click={()=>{raisewo="a",details_active="active",items_active="",charge_details_active=""}}>1. Submit Work Order Details</div>
                        <div class="{items_active} cursor-pointer p-2" on:click={()=>{raisewo="b",details_active="",items_active="active",charge_details_active=""}}>2. Submit Work Order Items</div>
                        <div class="{charge_details_active} cursor-pointer p-2" on:click={()=>{raisewo="c",details_active="",items_active="",charge_details_active="active"}}>3. Submit Charge Details</div>
                    </div>
                </div>

                {#if raisewo=="a"}
                <!-- Submit Work Order Details -->
                <div class="submitWorkOrderDetails hidde">
                <div class="grid grid-cols-10 xsl:grid-cols-1 gap-6 ">
                    <div class="col-span-1 "></div>
                        <div class="col-span-4 mb-5">
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Work Organization<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Station<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Cost Center<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Work Order Type<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Resource Type<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Van Work Type<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                     <div class="col-span-4 mb-5">
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Month & Year<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input class="inputboxpopoverdate" type="month">
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Adhoc Date<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input class="inputboxpopoverdate" type="month">
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Approver ID<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Remarks<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <textarea class="inputboxpopover" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Send SMS<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                     </div>
                     <div class="col-span-1 flex items-end">
                         <button class="ErBlueButton" on:click={()=>{raisewo="b"}}>Next</button>
                     </div>
                </div>
                  </div>
                <!--End Submit Work Order Details -->
                {/if}

                {#if raisewo=="b"}
                 <!-- Submit Work Order Items -->
                 <div class="submitWorkOrderItems hidde">
                 <div class="grid grid-cols-4 xsl:grid-cols-1 gap-6 px-5 xsl:gap-2 xsl:px-0">
                        <div class="col-span-2 mb-5 xsl:mb-0">
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLableBulkemp ">Select Vendor<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                     <div class="col-span-2 mb-5 xsl:mb-0">
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLableBulkemp ">Supplier ID<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <select class="inputboxpopover">
                                        <option class="pt-6"></option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                     </div>
                 </div>

                 <div class="cardItemsList">
                    <div class="cardItem border grid grid-cols-10 gap-6 items-center py-pr14px px-5 rounded-lg xsl:grid-cols-1 mb-3">
                        <div class="flex col-span-3">
                            <div class="formGroupBulkemp ">
                                <label class="formLableBulkemp ">Count</label>
                                <div class="formInnerGroup ">
                                    <input class="inputboxpopover" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="flex col-span-3">
                            <div class="formGroupBulkemp ">
                                <label class="formLableBulkemp ">Rate/Unit</label>
                                <div class="formInnerGroup ">
                                    <input class="inputboxpopover" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="flex col-span-3">
                            <div class="formGroupBulkemp ">
                                <label class="formLableBulkemp ">Amount</label>
                               
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                    Rs.   
                                    </span>
                                    <input class="inputbox" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <img src="../src/img/blackclose.svg" alt="">
                        </div>
                    </div>
                    <div class="cardItem border grid grid-cols-10 gap-6 items-center py-pr14px px-5 rounded-lg xsl:grid-cols-1">
                        <div class="flex col-span-3">
                            <div class="formGroupBulkemp ">
                                <label class="formLableBulkemp ">Count</label>
                                <div class="formInnerGroup ">
                                    <input class="inputboxpopover" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="flex col-span-3">
                            <div class="formGroupBulkemp ">
                                <label class="formLableBulkemp ">Rate/Unit</label>
                                <div class="formInnerGroup ">
                                    <input class="inputboxpopover" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="flex col-span-3">
                            <div class="formGroupBulkemp ">
                                <label class="formLableBulkemp ">Amount</label>
                               
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                    Rs.   
                                    </span>
                                    <input class="inputbox" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <img src="../src/img/blackclose.svg" alt="">
                        </div>
                    </div>
                    <div class="flex mt-8">
                        <button class="ErBlueButton">Add Item</button>
                    </div>
                 </div>
                 <div class="flex justify-end gap-3 mt-10">
                    <button class="ErBlueButton" on:click={()=>{raisewo="a"}}>Prev</button>
                    <button class="ErBlueButton" on:click={()=>{raisewo="c"}}>Next</button>
                </div>

                 </div>
                <!--End Submit Work Order Items -->
                {/if}

                {#if raisewo=="c"}
                 <!-- Submit Charge Details -->
                 <div class="submitChargeDetails hidde">
                    <div class="grid grid-cols-10 xsl:grid-cols-1 gap-6 ">
                        <div class="col-span-1 "></div>
                            <div class="col-span-4 mb-5">
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable">Normal Rates</label>
                                    <div class="formInnerGroup ">
                                        <input class="inputboxpopover" type="text">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable">Ad-hoc Rates</label>
                                    <div class="formInnerGroup ">
                                        <input class="inputboxpopover" type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable">Overtime Charges</label>
                                    <div class="formInnerGroup ">
                                        <input class="inputboxpopover" type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable">Extra KMs Charges</label>
                                    <div class="formInnerGroup ">
                                        <input class="inputboxpopover" type="text">
                                    </div>
                                </div>
                            </div>

                         </div>
                         <div class="col-span-4 mb-5">
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable">Working Hours</label>
                                    <div class="formInnerGroup ">
                                        <input class="inputboxpopover" type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable">Agreed KMs Limit</label>
                                    <div class="formInnerGroup ">
                                        <input class="inputboxpopover" type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="formGroup ">
                                    <label class="formLable ">Contract Days</label>
                                    <div class="formInnerGroup ">
                                    
                                        <select class="inputboxpopover">
                                            <option class="pt-6"></option>
                                        </select>
                                        <div class="formSelectArrow ">
                                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            
                         </div>
                        
                    </div>
                    <div class="SubmitChanges">
                        <div class="flex justify-end gap-3 mt-10">
                            <button class="ErBlueButton" on:click={()=>{raisewo="b"}}>Prev</button>
                            <button class="ErBlueButton">Submit New WO</button>
                        </div>
                     </div>
                 </div>
                <!--End Submit Charge Details -->
                {/if}
            </div>
        </div>
       </div>
    {/if}
    <!--End Raise New WO -->


    <!-- Create Bulk WO Request -->
    {#if temp=="c"}
    <div class="FilterWorkStatus hidde" id="c">
        <div class="mt-3">
            <div class="caretforImage">
                 <img src="../src/img/caret.svg" class="caretBulkemp" alt="">
            </div>
            <div class="getReportCard bg-white rounded-lg">
                <div class="flex justify-between">
                <h3>Create Bulk WO Request </h3>
                <!-- <a>
                    <img src="{$img_url_name.img_name}/close.png" alt="" on:click="{closeC}">
                </a> -->
                <div class="closebuttonsection" on:click={closeC}>
                <img
                    src="{$img_url_name.img_name}/close.png"
                    class="closesup"
                    alt=""
                />
                </div>
                </div>

                <div class="grid grid-cols-6 gap-6 pb-5 xsl:grid-cols-1 xsl:gap-2">
                   <div class="downloadTemplateSec col-span-2 bg-bglightgreycolor px-4 py-4">
                        <h3>Download Template</h3>
                        <p class="text-grey text-font13px">Download sample work order excel template</p>
                     
                        <div class="planWOandSample flex gap-4 mt-6">
                        <button class="ErBlueButton">Planned Work Order</button>
                        <p class="flex items-center smButtonText">
                            <a class="smButton">
                                View Sample Format
                            </a>
                        </p>
                       </div>

                <div class="py-4">
                    <hr>
                </div>

                <div class="planWOandSample flex gap-4">
                    <button class="ErBlueButton">Ad-hoc Work Order</button>
                    <p class="flex items-center smButtonText">
                        <a class="smButton">
                            View Sample Format
                        </a>
                    </p>
                   </div>

                   </div>
                   <div class="selectfile col-span-4">
                    <h3>Upload file here to create bulk WO request</h3>
                    <div class="flex items-center gap-3">

                    Select file <label class="cursor-pointer">
                        <div class="uploadbutton">Upload</div>
                       <input type="file" class="hidden">
                    </label>
                </div>

                   </div>


                </div>



                

            </div>
        </div>
    </div>
    {/if}
    <!--End Create Bulk WO Request -->
    


        <div class="downloadLink flex mt-8 mb-4 justify-between xsl:flex-wrap xsl:gap-3 lgc:flex-wrap">
            <div class="SearchInput">
                <input
                    class="  block w-w300 bg-white border rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search..." type="text" name="search" />
            </div>

            <div class="flex  items-center xsl:hidden lgc:flex-wrap">
                <div class="relative inline-block text-left pr-3">
                    <div>
                        <button type="button"
                            class="outline-none inline-flex justify-center items-center gap-2 text-base text-greycolor w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-normal  hover:bg-gray-50 focus:outline-none    focus:none"
                            onclick="showDownloadOptions()" aria-expanded="true" aria-haspopup="true">
                            Download
                            <img src="../src/img/downarrow.svg" class="w-4 h-auto" alt="">

                        </button>
                    </div>
                    <div class=" origin-top-right absolute outline-none right-0  w-56 rounded-md shadow-lg bg-white ring-1 text-base text-greycolor ring-black ring-opacity-5 font-normal  focus:outline-none hidden"
                        id="optionsMenu">
                        <div class="py-1" role="none">
                            <a href="#" class="text-gray-700 flex gap-2 px-4 py-2 text-sm" role="menuitem"
                                tabindex="-1" id="menu-item-0"> <img src="../src/img/download-approved.svg" class="w-5" alt=""> Approved WO</a>
                            <a href="#" class="text-gray-700 flex  gap-2 px-4 py-2 text-sm" role="menuitem"
                                tabindex="-1" id="menu-item-1"><img src="../src/img/download-Excel.svg" class="w-5" alt=""> Excel</a>
                            <a href="#" class="text-gray-700 flex gap-2 px-4 py-2 text-sm" role="menuitem"
                                tabindex="-1" id="menu-item-2"> <img src="../src/img/download-csv.svg" class="w-5" alt=""> CSV</a>
                            <a href="#" class="text-gray-700 flex  gap-2 px-4 py-2 text-sm" role="menuitem"
                                tabindex="-1" id="menu-item-2"><img src="../src/img/download-csv.svg" class="w-5" alt=""> Copy WO</a>

                        </div>
                    </div>
                </div>

                <div class="flex items-center px-2">
                    <p class="mb-0 font-light text-sm text-greycolor">Showing</p>
                </div>
                <div class="inline-block relative w-32">
                    <select
                        class="block appearance-none w-full outline-none bg-white text-greycolor border font-normal  text-base border-gray-300  px-4 py-2 pr-8 rounded  leading-tight   ">
                        <option>20 items</option>
                        <option>40 items</option>
                        <option>60 items</option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <img src="../src/img/downarrow.svg" class="w-4 h-auto" alt="">
                    </div>
                </div>
                <div class="flex items-center px-2">
                    <p class="mb-0 font-light text-sm text-greycolor">120 entries</p>
                </div>

                <div class="paginationButton pl-4">
                    <nav aria-label="Page navigation">
                        <ul class="pagiWrapper ">
                            <li>
                                <p class="mb-0 font-light text-sm text-greycolor">Pre</p>
                            </li>
                            <li><button class="pagiItemsNumber">1</button>
                            </li>
                            <li><button class="pagiItemsNumberActive">2</button>
                            </li>
                            <li><button class="pagiItemsNumber">3</button>
                            </li>
                            <li>
                                <p class="mb-0 font-light text-sm text-greycolor">Next</p>

                            </li>

                        </ul>
                    </nav>
                </div>

            </div>
        </div>

        <div class="getTableData bg-white mb-3 text-left xsl:hidden">
            <table class="table  w-full  mt-2 ">
                <thead class="woDetails text-left">
                    <tr>
                        <th>WO Details</th>
                        <th>Total Count </th>
                        <th>Supplier</th>
                        <th>Date</th>
                        <th>Request detail</th>
                        <th>Status</th>
                        <th>Approve detail</th>
                        <th>Last Update</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="woDetails">
                    <tr>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Organization</div>
                                    <div class="dataFetched">Amazon </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Cost Center</div>
                                    <div class="dataFetched">Chhindwara - UIHD - NTEX </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">WO Type</div>
                                    <div class="dataFetched">Planned </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Resource Type</div>
                                    <div class="dataFetched">VD Delivery </div>
                                </div>
                                
                            </div>
                        </td>
                        <td>
                            
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="text-text-lightorange text-3xl font-medium">1 </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Supplier Name</div>
                                    <div class="dataFetched">TRVG00058 Sreejith.SS </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Supplier ID</div>
                                    <div class="dataFetched">ECOM-17119 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Total Amount</div>
                                    <div class="dataFetchedRs text-lg font-medium">Rs 1,500 </div>
                                </div>

                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Adhoc Date</div>
                                    <div class="dataFetched">23/02/2019 </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Requested By</div>
                                    <div class="dataFetched">Dhiraj Doke </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Requested On</div>
                                    <div class="dataFetched">01-Oct-2021 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Remarks</div>
                                    <div class="dataFetched">Adhoc for volumetric delivery </div>
                                </div>
                                

                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                               <button class="smButton bg-bgGreencolor border-none text-white">Approved</button>
                               <!-- <button class="smButton bg-bgOrangeColor  border-none text-white">Requested</button>
                               <button class="smButton bg-mandatorysign border-none text-white">Cancelled</button> -->

                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Approver </div>
                                    <div class="dataFetched">Dhiraj Doke </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Approved By</div>
                                    <div class="dataFetched">Dhiraj Doke </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Approved On</div>
                                    <div class="dataFetched">01-Oct-2021 </div>
                                </div>

                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Updated by</div>
                                    <div class="dataFetched">Dinesh Kumar Tiwari </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Updated On</div>
                                    <div class="dataFetched">01-Oct-2021 16:48PM </div>
                                </div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence mb-2 cursor-pointer">
                               <img src="../src/img/action-approved.svg" alt="">

                             </div>
                             <div class="dataAttendence mb-2 cursor-pointer">
                                <img src="../src/img/action-cancel.svg" alt="">


                             </div>
                             <div class="dataAttendence mb-2 cursor-pointer">
                                <img src="../src/img/action-print.svg" alt="">


                             </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Organization</div>
                                    <div class="dataFetched">Amazon </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Cost Center</div>
                                    <div class="dataFetched">Chhindwara - UIHD - NTEX </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">WO Type</div>
                                    <div class="dataFetched">Planned </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Resource Type</div>
                                    <div class="dataFetched">VD Delivery </div>
                                </div>
                                
                            </div>
                        </td>
                        <td>
                            
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="text-text-lightorange text-3xl font-medium">1 </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Supplier Name</div>
                                    <div class="dataFetched">TRVG00058 Sreejith.SS </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Supplier ID</div>
                                    <div class="dataFetched">ECOM-17119 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Total Amount</div>
                                    <div class="dataFetchedRs text-lg font-medium">Rs 1,500 </div>
                                </div>

                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Adhoc Date</div>
                                    <div class="dataFetched">23/02/2019 </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Requested By</div>
                                    <div class="dataFetched">Dhiraj Doke </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Requested On</div>
                                    <div class="dataFetched">01-Oct-2021 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Remarks</div>
                                    <div class="dataFetched">Adhoc for volumetric delivery </div>
                                </div>
                                

                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                               <button class="smButton bg-bgOrangeColor  border-none text-white">Requested</button>
                               <!-- <button class="smButton bg-mandatorysign border-none text-white">Cancelled</button> -->

                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Approver </div>
                                    <div class="dataFetched">Dhiraj Doke </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Approved By</div>
                                    <div class="dataFetched">Dhiraj Doke </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Approved On</div>
                                    <div class="dataFetched">01-Oct-2021 </div>
                                </div>

                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Updated by</div>
                                    <div class="dataFetched">Dinesh Kumar Tiwari </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Updated On</div>
                                    <div class="dataFetched">01-Oct-2021 16:48PM </div>
                                </div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence mb-2 cursor-pointer">
                               <img src="../src/img/action-approved.svg" alt="">

                             </div>
                             <div class="dataAttendence mb-2 cursor-pointer">
                                <img src="../src/img/action-cancel.svg" alt="">


                             </div>
                             <div class="dataAttendence mb-2 cursor-pointer">
                                <img src="../src/img/action-print.svg" alt="">


                             </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- End All Work Orders -->
    {/if}


</div>