<script>
    ///////////tushar edit/////////////
    import {onMount} from 'svelte';
    import {dashboard_details} from '../stores/dashboard_store';
    import {dashboard_data} from '../services/dashboard_services';
    import {supplier_data} from '../services/supplier_services';
    import {filter_city_data} from '../services/supplier_services';
    import {filter_status_data} from '../services/supplier_services';
    import {audit_trail_data} from '../services/supplier_services';
    // import {audit_details} from '../stores/audit_details_store';
    ///////////tushar edit pagination/////////////
    let offset=0;
    let limit=20;
    let supplier_data_from_service = [];
    let total_count_associates;
    // let city_data;
    // let audit_array = [];
    let audit_details_array= [];
    let filter_city_array = [];
    let filter_status_res;
    let filter_city_res;
    let filter_status_array= [];
    let status,city;
    let searchTerm;
    let searchResult;
    let new_city;
    let drop_limit;
    let audit_supplier_data = [];
  
    $:new_associate_data = {city: "-1",limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status: "Bank Beneficiary Pending"}
    // $:new_associate_data = {"city":"-1","totalSkip":0,"prevFlag":false,"prevSkip":20,"search_keyword":"","limit":10,"offset":0,"status":"Bank Beneficiary Pending    Bank Beneficiary Pending"}

    ///////////tushar edit/////////////
    let id_proof_rejected,bank_details_rejected,id_verification_pending,bank_verification_pending,pending_offer_letter,bgv_rejected;
    let json_associate_data,json_associate_new_data;
    onMount(async () =>{
    ///////////dashboard/////////////////////
    await dashboard_data();
    let dashboard = $dashboard_details;
    console.log("innnn dashboard_detailssss222",$dashboard_details)
    id_proof_rejected = dashboard.id_proof_rejected
    bank_details_rejected = dashboard.bank_details_rejected;
    id_verification_pending = dashboard.id_verification_pending;
    bank_verification_pending = dashboard.bank_verification_pending;
    pending_offer_letter = dashboard.pending_offer_letter;
    bgv_rejected = dashboard.bgv_rejected;
    ///////////dashboard/////////////////////
    
    json_associate_data=JSON.stringify(new_associate_data);
    let res=await supplier_data(json_associate_data);
    
    supplier_data_from_service = res.body.data.data_list;
    total_count_associates = res.body.data.total_records;


    ////////////filter city-data///////////
    filter_city_res = await filter_city_data();
    filter_city_array = filter_city_res.body.data;

    filter_status_res = await filter_status_data();
    filter_status_array = filter_status_res.body.data;

    ///////////////////dropdown count///////////
        console.log("new_lllliiimmmiitttt",drop_limit)
        console.log("dropdown_function",supplier_data_from_service)

    })

    // console.log("supplier_data_from_store++++++ outside",supplier_data_from_store)
    
    async function next_function(){
    offset=offset+limit;
    new_associate_data = {city: "-1",limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status: "Bank Beneficiary Pending"}
    json_associate_new_data=JSON.stringify(new_associate_data);
    let next_res =await supplier_data(json_associate_new_data);
    supplier_data_from_service = next_res.body.data.data_list;
    total_count_associates = next_res.body.data.total_records;
}
    
    async function previous_function(){
    offset=offset-limit;
    new_associate_data = {city: "-1",limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status: "Bank Beneficiary Pending"}
    json_associate_new_data=JSON.stringify(new_associate_data);
    let prev_res =await supplier_data(json_associate_new_data);
    supplier_data_from_service = prev_res.body.data.data_list;
    total_count_associates = prev_res.body.data.total_records;
    }

    // function myFunction() {
    //     var x = document.getElementById("mobilemenu");
    //     if (x.style.display === "none") {
    //         x.style.display = "block";
    //         document.querySelector("#mobileBar").classList.add("bg-bgSideNav");
    //         document
    //             .querySelector("#mobilemenu")
    //             .classList.add("d-block-content");
    //         document.querySelector(".homelogo").classList.add("border-r-none");
    //     } else {
    //         x.style.display = "none";
    //         document
    //             .querySelector("#mobileBar")
    //             .classList.remove("bg-bgSideNav");
    //         document
    //             .querySelector("#mobilemenu")
    //             .classList.remove("d-block-content");
    //         document
    //             .querySelector(".homelogo")
    //             .classList.remove("border-r-none");
    //     }
    // }
    // // modal for filter mobile           {{{Done}}}

    // var modal = document.getElementById("myModal");
    // var btn = document.getElementById("myBtn");
    // var span = document.getElementsByClassName("close")[0];

    function myBtn() {
        myModal.style.display = "block";
    };
    function close() {
        myModal.style.display = "none";
    };
    // window.onclick = function (event) {
    //     if (event.target == myModal) {
    //         myModal.style.display = "none";
    //     }
    // };

    // // modal for supplierInfoModal mobile                {{{{{Done}}}}}

    // var supplierInfoModalId = document.getElementById("supplierInfoModal");
    // var SupplerModalbuttonClick = document.getElementById("SupplerModalbuttonClick");
    // var closeAuditTrailModal = document.getElementById("closeAuditTrailModal");

    // closeAuditTrailModal;

    async function SupplerModalbuttonClick(datalist_name) {
        console.log("dataList name",datalist_name)
        let audit_res = await audit_trail_data(datalist_name.name)
        console.log("inside audit trail",audit_res)
        audit_details_array = audit_res.body.data
        // console.log("supplier_data_from_serviceeeeeee",supplier_data_from_service)
        audit_supplier_data = datalist_name;
        console.log("audit_supplier_dataaaaa",audit_supplier_data)
        console.log("audit_supplier_dataaaaa",audit_supplier_data.addresess[0].address)     
        
        supplierInfoModal.style.display = "block";
    };
    
    function closeAuditTrailModal() {
        supplierInfoModal.style.display = "none";
    };

    // window.onclick = function (event) {
    //     if (event.target == supplierInfoMsupplierInfoModalodalId) {
    //         supplierInfoModal.style.display = "none";
    //     }
    // };

    async function filterButton(){
        city = document.getElementById("select_city").value.trim();
       
        for(let cityK  of filter_city_array){
            if (city == cityK.location_name){
                new_city =cityK.location_id
            }    
        } 
        status = document.getElementById("select_status").value.trim();
        // if(city.value == All && status.value == All)    ------We dont have any API returning values for all statuses
        if(new_city == "All"){
        new_associate_data = {city:"-1",limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}
        }
        else{
        new_associate_data = {city:new_city,limit:limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}  
        }
        console.log("new_associate_data",new_associate_data)
        json_associate_new_data=JSON.stringify(new_associate_data);
        let filter_res =await supplier_data(json_associate_new_data);
        supplier_data_from_service = filter_res.body.data.data_list;
        total_count_associates = filter_res.body.data.total_records;
        
    }



    // // modal for filter desktop                  {{{{{Done}}}}}

    function myFunctionFilter() {
        var x = document.getElementById("myModalDesktop");
        var y = document.getElementById("desktopfilterbtn");

        if (x.style.display === "block") {
            x.style.display = "none";
            y.style.background = "#374ea2";
        } else {
            x.style.display = "block";
            y.style.background = "#000";
        }
    }
// // show search textbox hide supplier count          {{{{{{{pending}}}}}}}

    // var btnSearch = document.getElementById("SearchClick");
    // var searchInput = document.getElementById("searchBox");
    // var supplierCount = document.getElementById("supplierCount");
    // var inputboxsearch = document.getElementById("inputboxsearch");
    function SearchClick() {
        searchBox.style.display = "block";
        supplierCount.style.display = "none";
        SearchClick.style.display = "none";
        searchBox.style.width = "100%";
        inputboxsearch.style.width = "100%";
    };

    // var closeSearch = document.getElementById("closeSearch");
    function closeSearch() {
        supplierCount.style.display = "block";
        searchBox.style.display = "none";
        SearchClick.style.display = "block";
    };
    function filterResults(){
        for(let searchK  of supplier_data_from_service){
            searchResult = supplier_data_from_service.filter(searchK=>searchK.facility_name == searchTerm)
        }
        supplier_data_from_service = searchResult;
    }

    function dropdown_function(){
        console.log("new_lllliiimmmiitttt",drop_limit)
        // new_associate_data = {city:new_city,limit:drop_limit,offset:offset,prevFlag: false,search_keyword: "",sortDesc: true,status:status}
        console.log("dropdown_function",supplier_data_from_service)
        
    }

    // // supplier table collaps

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









    // supplier mobile collaps

    function collapseMobile() {
        var shortInfom = document.querySelectorAll(".shortInfoMobile");
        var detailsInfoMobile = document.querySelectorAll(".detailsInfoMobile");

        shortInfom.forEach.call(shortInfom, function (el) {
            el.classList.add("hidden");
        });

        detailsInfoMobile.forEach.call(detailsInfoMobile, function (el) {
            el.classList.remove("hidden");
        });
    };

    function collapsedownMobile() {
        var shortInfom = document.querySelectorAll(".shortInfoMobile");
        var detailsInfoMobile = document.querySelectorAll(".detailsInfoMobile");

        shortInfom.forEach.call(shortInfom, function (el) {
            el.classList.remove("hidden");
        });

        detailsInfoMobile.forEach.call(detailsInfoMobile, function (el) {
            el.classList.add("hidden");
        });
    };



    


    // {{{{{{{pending}}}}}}}


    // let tabsContainer = document.querySelector("#tabs");

    // let tabTogglers = tabsContainer.querySelectorAll("a");
    // console.log(tabTogglers);

    // tabTogglers.forEach(function (toggler) {
    //     toggler.addEventListener("click", function (e) {
    //         e.preventDefault();

    //         let tabName = this.getAttribute("href");

    //         let tabContents = document.querySelector("#tab-contents");

    //         for (let i = 0; i < tabContents.children.length; i++) {
    //             tabTogglers[i].parentElement.classList.remove(
    //                 "border-black",
    //                 "border-b-2",
    //                 "-mb-px",
    //                 "opacity-100"
    //             );
    //             tabContents.children[i].classList.remove("hidden");
    //             if ("#" + tabContents.children[i].id === tabName) {
    //                 continue;
    //             }
    //             tabContents.children[i].classList.add("hidden");
    //         }
    //         e.target.parentElement.classList.add(
    //             "border-black",
    //             "border-b-2",
    //             "-mb-px",
    //             "opacity-100"
    //         );
    //     });
    // });

    // document.getElementById("default-tab").click();
</script>
<div class="mainContent ">
    <div class="breadcrumb">
        <div class="breadcrumb-section">
            <div class="breadcrumbSupplier">
                <div class="flex whitespace-nowrap">
                    <p>
                        <span class="breadcrumbgrey">Home / 
                            <span class="text-base text-black">
                                Associates
                            </span>
                        </span>
                    </p>
                </div>
                <div class="Onboardedbyme">
                    <div class="checkFormgroup">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            checked
                            placeholder="Your password"
                            class="inputChecked"
                        />
                        <label for="remember-me" class="onboardedText ">
                            Onboarded by me
                        </label>
                    </div>
                    <p>
                        <a href="#" class="filterxsl " on:click="{myBtn}">
                            <img src="../src/img/filter.svg" alt="" /></a
                        >

                        <a
                            href="#"
                            class="filter "
                            id="desktopfilterbtn"
                            on:click="{myFunctionFilter}"
                        >
                            <span>Filter</span>
                            <img
                                src="../src/img/filter.svg"
                                class="pl-2 xs:p-0"
                                alt=""
                            />
                        </a>
                    </p>
                </div>
            </div>

            <div class="filterModal" id="myModal">
                <div class="modalwrapper">
                    <div class="filterModalwrapper ">
                        <div class="filterContainer  ">
                            <div class="filterSection">
                                <div class=" filterXsheader">
                                    <div class="filterxsContent ">
                                        <p class="filterTextLable">Filter</p>
                                        <p>
                                            <img on:click="{close}"
                                                src="../src/img/cross.svg"
                                                class="close"
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div class="filterSectionContainer ">
                                    <div class="filterValues  ">
                                        <div>
                                            <div class="flex gap-4">
                                                <div>
                                                    <label
                                                        class="inline-flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                            checked
                                                        />
                                                        <span class="ml-2"
                                                            >Vendor</span
                                                        >
                                                    </label>
                                                </div>
                                                <div class="pl-4">
                                                    <label
                                                        class="inline-flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                        />
                                                        <span class="ml-2"
                                                            >Workforce</span
                                                        >
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="filterActions  ">
                                                <div class="selectOptions">
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Organization
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >
                                                                <option
                                                                    class="pt-6"
                                                                    >Amazon</option
                                                                >
                                                                <option
                                                                    >Flipkart</option
                                                                >
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select City
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >
                                                            
                                                                    {#each filter_city_array as data_city}
                                                                <option
                                                                    class="pt-6" value="">
                                                                    {data_city.location_name}
                                                                    </option>
                                                                {/each}
                                                                
                                                                
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Vendor Type
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >
                                                                <option
                                                                    class="pt-6"
                                                                    >Man power</option
                                                                >
                                                                <option
                                                                    >Lorem</option
                                                                >
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Status
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >{#each filter_status_array as data_status}
                                                                {#if data_status.display_name != undefined}
                                                                 <option class="pt-6"> {data_status.display_name}
                                                                 </option>
            
                                                                {/if}
                                                            
                                                                <!-- <option
                                                                    >Lorem</option
                                                                > -->
                                                                {/each}
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="applyfilterbutton ">
                                                    <a
                                                        href="#"
                                                        class="filterCancelbtn close"
                                                        >Cancel</a
                                                    >
                                                    <a
                                                        href="#"
                                                        class="filterApplybtn "
                                                        >Apply</a
                                                    >
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

            <div class="filterModalDesktop hidden " id="myModalDesktop">
                <div class="caret" />
                <div class="modalwrapper">
                    <div class="filterModalwrapper ">
                        <div class="filterContainer  ">
                            <div class="filterSection">
                                <div class=" filterXsheader">
                                    <div class="filterxsContent ">
                                        <p class="filterTextLable">Filter</p>
                                        <p>
                                            <img on:click="{close}"
                                                src="../src/img/cross.svg"
                                                class="close"
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div class="filterSectionContainer ">
                                    <div class="filterValues  ">
                                        <div>
                                            <div class="flex gap-4">
                                                <div>
                                                    <label
                                                        class="inline-flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                            checked
                                                        />
                                                        <span class="ml-2"
                                                            >Vendor</span
                                                        >
                                                    </label>
                                                </div>
                                                <div class="pl-4">
                                                    <label
                                                        class="inline-flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                        />
                                                        <span class="ml-2"
                                                            >Workforce</span
                                                        >
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="filterActions  ">
                                                <div class="selectOptions">
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Organization
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >
                                                                <option
                                                                    class="pt-6"
                                                                    >Amazon</option
                                                                >
                                                                <option
                                                                    >Flipkart</option
                                                                >
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection" >
                                                        <label
                                                            class="formLableSelect "
                                                            >Select City
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                                id= "select_city"
                                                                >
                                                                <option class="pt-6" 
                                                                >All</option>
                                                            {#each filter_city_array as data_city}
                                                                <option
                                                                    class="pt-6">
                                                                    {data_city.location_name}
                                                                    </option>
                                                                {/each}
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection ">
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Vendor Type
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                            <select
                                                                class="selectInputbox"
                                                            >
                                                                <option
                                                                    class="pt-6"
                                                                    >Man power</option
                                                                >
                                                                <option
                                                                    >Lorem</option
                                                                >
                                                            </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="selectSection " >
                                                        <label
                                                            class="formLableSelect "
                                                            >Select Status
                                                        </label>
                                                        <div
                                                            class="formInnerGroupSelect "
                                                        >
                                                        <select
                                                        class="selectInputbox" id= "select_status"> 
                                                    <option class="pt-6" 
                                                        >All</option>
                                                        {#each filter_status_array as data_status}   
                                                        {#if data_status.display_name != undefined}
                                                        <option class="pt-6"> {data_status.display_name}
                                                        </option>
   
                                                       {/if}
                                                        {/each}
                                                        
                                                    </select>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="../src/img/downarrow.svg"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="applyfilterbutton ">
                                                    <a
                                                        href="#"
                                                        class="filterCancelbtn close"
                                                        >Cancel</a
                                                    >
                                                    <button
                                                        href="#"
                                                        class="filterApplybtn" on:click={filterButton}
                                                        >Apply</button
                                                    >
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

            <div class="countsSection ">
                <div class="SectionsCounts ">
                    <p class="docReject">Documents Rejected</p>
                    <div class="docRejctedCon flex gap-2">
                        <div class="idproof flex-grow">
                            <p class="countHeading">
                                ID Proof <span class="idproofcount">{id_proof_rejected}</span>
                            </p>
                        </div>
                        <div class="idproof flex-grow">
                            <p class="countHeading">
                                Bank Details <span class="idproofcount"
                                    >{bank_details_rejected}</span
                                >
                            </p>
                        </div>
                        <div class="idproof flex-grow">
                            <p class="countHeading">
                                BGV Pending <span class="idproofcount">{bgv_rejected}</span
                                >
                            </p>
                        </div>
                    </div>
                </div>
                <div class="SectionsCounts ">
                    <p class="PendingVeri">Pending Verification</p>
                    <div class="docRejctedCon flex gap-2">
                        <div class="bgdocreject flex-grow">
                            <p class="countHeading">
                                ID Proof <span class="docRejectCount">{id_verification_pending}</span
                                >
                            </p>
                        </div>
                        <div class="bgdocreject flex-grow">
                            <p class="countHeading">
                                Bank Details <span class="docRejectCount"
                                    >{bank_verification_pending}</span
                                >
                            </p>
                        </div>
                        <div class="bgdocreject flex-grow">
                            <p class="countHeading">
                                Offer Letter <span class="docRejectCount"
                                    >{pending_offer_letter}</span
                                >
                            </p>
                        </div>
                    </div>
                </div>
                <div class="SectionsCountsSaved ">
                    <div class="savedcount ">
                        <p class="otherCounts">Saved</p>
                        <div class="bgsavedCount flex-grow">
                            <p class="otherCountNumbers">05</p>
                        </div>
                    </div>
                    <div class="savedcount">
                        <p class="otherCounts">Active</p>
                        <div class="bgActiveCount flex-grow">
                            <p class="otherCountNumbers">1122</p>
                        </div>
                    </div>
                    <div class="savedcount">
                        <p class="otherCounts">Deactive</p>
                        <div class="bgDeactiveCount flex-grow">
                            <p class="otherCountNumbers">05</p>
                        </div>
                    </div>
                    <div class="savedcount">
                        <p class="otherCounts">All</p>
                        <div class="bgAllCount flex-grow">
                            <p class="otherCountNumbers">1212</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mobiletabsSection ">
                <!-- Tabs -->
                <ul id="tabs" class="tabsmobile">
                    <li class="tablink border-b-2">
                        <a id="default-tab" href="#first">Rejected</a>
                    </li>
                    <li class="tablink">
                        <a href="#second">Pending Verification</a>
                    </li>
                    <li class="tablink">
                        <a href="#third">Other</a>
                    </li>
                </ul>

                <!-- Tab Contents -->
                <div id="tab-contents">
                    <div id="first" class="">
                        <div class="SectionsCountsmobile">
                            <div class="docRejctedCon flex gap-2 ">
                                <div
                                    class="idproof flex-grow flex whitespace-nowrap "
                                >
                                    <p class="countHeading">
                                        ID Proof <span class="idproofcount"
                                            >1253</span
                                        >
                                    </p>
                                </div>
                                <div
                                    class="idproof flex-grow flex whitespace-nowrap"
                                >
                                    <p class="countHeading">
                                        Bank Details <span class="idproofcount"
                                            >456</span
                                        >
                                    </p>
                                </div>
                                <div
                                    class="idproof flex-grow flex whitespace-nowrap"
                                >
                                    <p class="countHeading">
                                        BGV Pending <span class="idproofcount"
                                            >343</span
                                        >
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="second" class="hidden">
                        <div class="SectionsCountsmobile">
                            <div class="docRejctedCon flex gap-2">
                                <div class="bgdocreject flex-grow">
                                    <p class="countHeading whitespace-nowrap">
                                        ID Proof <span class="docRejectCount"
                                            >1253</span
                                        >
                                    </p>
                                </div>
                                <div class="bgdocreject flex-grow">
                                    <p class="countHeading whitespace-nowrap">
                                        Bank Details <span
                                            class="docRejectCount">456</span
                                        >
                                    </p>
                                </div>
                                <div class="bgdocreject flex-grow">
                                    <p class="countHeading whitespace-nowrap">
                                        Offer Letter <span
                                            class="docRejectCount">343</span
                                        >
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="third" class="hidden">
                        <div class="SectionsCountsmobileLast ">
                            <div class="savedcount ">
                                <p class="otherCounts">Saved</p>
                                <div class="bgsavedCount flex-grow">
                                    <p class="otherCountNumbers">05</p>
                                </div>
                            </div>
                            <div class="savedcount">
                                <p class="otherCounts">Active</p>
                                <div class="bgActiveCount flex-grow">
                                    <p class="otherCountNumbers">1122</p>
                                </div>
                            </div>
                            <div class="savedcount">
                                <p class="otherCounts">Deactive</p>
                                <div class="bgDeactiveCount flex-grow">
                                    <p class="otherCountNumbers">05</p>
                                </div>
                            </div>
                            <div class="savedcount">
                                <p class="otherCounts">All</p>
                                <div class="bgAllCount flex-grow">
                                    <p class="otherCountNumbers">1212</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="searchPagi ">
                <div class="leftsearchPagi ">
                    <div class="recordCount ">
                        <div class="allsupplier" id="supplierCount">
                            <h4 class="supplierRecords">
                                <span
                                    class="xs:text-rejectcolor sm:text-rejectcolor"
                                    >{total_count_associates}</span
                                > <span class="text-grey">All ASSOCIATES</span>
                            </h4>
                        </div>

                        <div class="searchSupplier " id="searchBox">
                            <div class="formInnerGroup ">
                                <span class="searchicon">
                                    <img
                                        src="../src/img/search.svg"
                                        class="placeholderIcon"
                                        alt=""
                                        on:click="{filterResults}"/>
                                </span>
                                <input bind:value="{searchTerm}"
                                    class="inputboxsearch"
                                    id="inputboxsearch"
                                    placeholder="Search"
                                />
                                <div class="serchCloseIconSection " id="">
                                    <div class="closeIconCon " on:click="{closeSearch}">
                                        <img
                                            src="../src/img/closeSearch.svg"
                                            class="w-4 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" searchClickbtn" on:click="{SearchClick}" >
                            <p class="searchIconPlace">
                                <img
                                    src="../src/img/search.svg"
                                    class="placeholderIcon"
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                </div>
                <div class="rightSearchPagi ">
                    <div class="itemsPagi flex items-center gap-10">
                        <div class="itemsNo ">
                            <div class="selectSection">
                                <div class="formInnerGroupSelect ">
                                    <select class="selectInputbox" bind:value ="{drop_limit}" on:change="{dropdown_function}">
                                        <option class="pt-6" value="20">20 items</option>
                                        <option value="30">30 items</option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img
                                            src="../src/img/downarrow.svg"
                                            class="w-5 h-auto"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="perpage">
                                <p>per page</p>
                            </div>
                        </div>
                        <div class="paginationButton">
                            <nav aria-label="Page navigation">
                                <ul class="pagiWrapper ">
                                    <li>
                                        <button class="preNextbtn"on:click={previous_function}>
                                            Previous</button
                                        >
                                        <!-- <button on:click={setValuechange}>value change</button> -->
                                    </li>
                                    <li>
                                        <button class="pagiItemsNumber"
                                            >1</button
                                        >
                                    </li>
                                    <li>
                                        <button class="pagiItemsNumberActive"
                                            >2</button
                                        >
                                    </li>
                                    <li>
                                        <button class="pagiItemsNumber"
                                            >3</button
                                        >
                                    </li>

                                    <li>
                                        <button class="preNextbtn" on:click={next_function}>
                                            Next</button
                                        >
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div class="supplerDetails sm:hidden xs:hidden">
                <div class="tableSectionSuppliers ">
                    <div class="py-2 ">
                        <div class="tableWrapper">
                            <table class="mainTable ">
                                <thead class="bg-bgthead ">
                                    <tr>
                                        <th
                                            scope="col"
                                            width="25%"
                                            class="theading px-3"
                                        >
                                            Associate
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            class="theading"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            class="theading"
                                        >
                                            Remarks
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            class="theading"
                                        >
                                            Required Action
                                        </th>
                                        <th scope="col" class="theading">
                                            Audit Trial
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="bg-white ">
                                    {#each supplier_data_from_service as facility_data} 
                                    <tr class="border-b-2 trow ">
                                        <td>
                                            <div
                                                class="tdfirstshortInfo shortInfo"
                                                id="shortInfo"> 
        
                                                <p class="hText">{facility_data.facility_name}</p>
                                                <p class="text-xs text-grey">
                                                
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
                                                    on:click="{SupplerModalbuttonClick(facility_data)}"
                                                >
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="chatIcon"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        ></span>
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

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Rajesh Kumar
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Associate)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center"
                                                >
                                                    <p
                                                        class="bg-green rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                    Active
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >12
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    30 M
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">Sumeet T.</p>
                                                <p class="designationTextsmall">
                                                    (Associate)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-bluecolor"
                                                >
                                                    <p
                                                        class="bg-bgbluecolor rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Saved
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->
                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Sri Anjaneya Enterprises
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-boldyellow"
                                                >
                                                    <p
                                                        class="bg-bgyellow rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Verification Pending
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Santosh Kumar
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="paddingrt">
                                                <div class="statusWrapper  ">
                                                    <div
                                                        class="statusredcircle"
                                                    />
                                                    Documents Rejected
                                                </div>
                                                <p
                                                    class="text-xs text-grey ml-4"
                                                >
                                                    (Bank Details)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">1</p>
                                        </td>
                                        <td>
                                            <p class="smallText">1</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Sri Sai Agency
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="paddingrt">
                                                <div class="statusWrapper  ">
                                                    <div
                                                        class="statusredcircle"
                                                    />
                                                    Documents Rejected
                                                </div>
                                                <p
                                                    class="text-xs text-grey ml-4"
                                                >
                                                    (ID Proof, Bank Details)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">2</p>
                                        </td>
                                        <td>
                                            <p class="smallText">2</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >4
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->
                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Mr Hemant Chouhan
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-boldyellow"
                                                >
                                                    <p
                                                        class="bg-bgyellow rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Verification Pending
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >2
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">Junaid S</p>
                                                <p class="designationTextsmall">
                                                    (Associate)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-bluecolor"
                                                >
                                                    <p
                                                        class="bg-bgbluecolor rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Saved
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >14
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">Prakash B</p>
                                                <p class="designationTextsmall">
                                                    (Associate)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-pinkcolor whitespace-nowrap"
                                                >
                                                    <p
                                                        class="bg-bgpinkcolor rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                    Pending Beneficiary Creation
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr class="border-b-2">
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">Rahul F</p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-boldyellow"
                                                >
                                                    <p
                                                        class="bg-bgyellow rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                     Verification Pending
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->

                                    <!-- <tr>
                                        <td>
                                            <div
                                                class="leading-relaxed px-3 py-p9px"
                                            >
                                                <p class="hText">
                                                    Kannawar Agencies
                                                </p>
                                                <p class="designationTextsmall">
                                                    (Vendor)
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="leading-relaxed">
                                                <div
                                                    class="text-font13px font-normal inline-flex items-center text-pinkcolor whitespace-nowrap"
                                                >
                                                    <p
                                                        class="bg-bgpinkcolor rounded-full w-w10px h-h10px mr-2 "
                                                    />
                                                    Pending Beneficiary Creation
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <p class="smallText">----</p>
                                        </td>
                                        <td>
                                            <div
                                                class=" flex items-center gap-3"
                                            >
                                                <button class="auditTrail">
                                                    <img
                                                        src="../src/img/chat1.svg"
                                                        class="w-4 h-4 mr-2 ml-1"
                                                        alt=""
                                                    />
                                                    <span class="text-sm"
                                                        >0
                                                    </span>
                                                </button>
                                                <p
                                                    class="text-font11 font-light text-blackshade w-10"
                                                >
                                                    1 H
                                                </p>
                                                <p
                                                    class="bg-erBlue rounded-full w-w30px h-h30px  ml-5  flex cursor-pointer"
                                                >
                                                    <img
                                                        src="../src/img/arrowDownCollaps.svg"
                                                        class="  w-w30px h-h30px  px-2"
                                                        alt=""
                                                    />
                                                </p>
                                            </div>
                                        </td>
                                    </tr> -->
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="supplierDetailMobile md:hidden lg:hidden xl:hidden 2xl:hidden px-p10"
            >
            {#each supplier_data_from_service as facility_data}
                <div class="mobilecardSup mb-m5">
                    <div class="supDetailsrow flex">
                        <div class="supDetailsTitle ">
                            <p>Supplier</p>
                        </div>
                        <div class="supDetailsData">
                            
                            <div class="pl-p7px pt-p7px shortInfoMobile ">
                                <p class="supName"> </p>
                                <p class="subDeg ">(Vendor)</p>
                            </div>

                            <div
                                class="pl-p7px pt-p7px detailsInfoMobile hidden"
                            >
                                <div class="venderListDetails">
                                    <p class="subDeg ">Vendor</p>
                                    <p class="supName">{facility_data.facility_name}</p>
                                </div>
                                <div class="venderListDetails">
                                    <p class="subDeg ">Vendor Type</p>
                                    <p class="supName">{facility_data.facility_type}</p>
                                </div>
                                <div class="venderListDetails">
                                    <p class="subDeg ">Vendor ID</p>
                                    <p class="supName">{facility_data.name}</p>
                                </div>
                                <div class="venderListDetails">
                                    <p class="subDeg ">Station</p>
                                    <p class="supName">
                                        {#each facility_data.addresess as curr_address}
                                        {curr_address.address}
                                        {/each}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div class="paddingArrow">
                                    <div class="shortInfoMobile">
                                        <p
                                            class="arrowCollaps "
                                            on:click="{collapseMobile}"
                                        >
                                            <img
                                                src="../src/img/arrowDownCollaps.svg"
                                                class="downArrowIcon"
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                    <div class="detailsInfoMobile hidden">
                                        <p
                                            on:click="{collapsedownMobile}"
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
                            </div>
                          
                        </div>
                    </div>
                    <div class="supDetailsrow flex">
                        <div class="supDetailsTitle ">
                            <p>Status</p>
                        </div>
                        <div class="supDetailsData ">
                            <div class="pl-p7px pt-p7px shortInfoMobile ">
                                <div class="">
                                    <div class="statusWrapper">
                                        <div class="statusredcircle" />
                                        Documents Rejected
                                    </div>
                                    <!-- <div class="statusWrapper">
                                        <div class="statusGreencircle"></div>
                                    Active
                                    </div> -->
                                    <p class="subDeg ml-4">(ID Proof)</p>
                                </div>
                            </div>
                            <div
                                class="pl-p7px pt-p7px detailsInfoMobile hidden"
                            >
                                <div>
                                    <div class="statusWrapper">
                                        <div class="statusredcircle" />
                                        Documents Rejected
                                    </div>
                                </div>
                                <div class="statusDetails">
                                    <p class="vendorDetailsText">
                                        <img
                                            src="../src/img/checked.png"
                                            class="pr-p7px"
                                            alt=""
                                        />
                                        Vendor Details
                                    </p>
                                    <p class="idproofRejected">
                                        <img
                                            src="../src/img/reject.png"
                                            class="pr-p7px"
                                            alt=""
                                        /> ID Proof Rejected
                                    </p>
                                    <p class="pendingBankVerfi">
                                        <img
                                            src="../src/img/timer.png"
                                            class="pr-p7px"
                                            alt=""
                                        /> Pending Bank Verification
                                    </p>
                                </div>
                            </div>
                            <div />
                        </div>
                    </div>
                    <div class="supDetailsrow flex">
                        <div class="supDetailsTitle ">
                            <p>Remarks</p>
                        </div>
                        <div class="supDetailsData ">
                            <div class="pl-p7px pt-p7px shortInfoMobile ">
                                <p class="smallText">2</p>
                            </div>

                            <div
                                class="pl-p7px pt-p7px remarklist ml-5  detailsInfoMobile hidden"
                            >
                                <ul class="list-disc ">
                                    <li class="listitems">
                                        Pancard number mismatch
                                    </li>
                                    <li class="listitems">
                                        Voter ID not clear
                                    </li>
                                </ul>
                            </div>

                            <div />
                        </div>
                    </div>
                    <div class="supDetailsrow flex">
                        <div class="supDetailsTitle ">
                            <p>Required Action</p>
                        </div>
                        <div class="supDetailsData ">
                            <div class="pl-p7px pt-p7px shortInfoMobile ">
                                <p class="smallText">2</p>
                            </div>

                            <div
                                class="pl-p7px pt-p7px remarklist ml-5 detailsInfoMobile hidden"
                            >
                                <ul class="list-disc ">
                                    <li class="listitems">
                                        Pancard number mismatch
                                    </li>
                                    <li class="listitems">
                                        Voter ID not clear
                                    </li>
                                </ul>
                                <div class="actionBtn mt-3">
                                    <a href="#" class="ErBlueButton">Update</a>
                                </div>
                            </div>

                            <div />
                        </div>
                    </div>
                    <div class="supDetailsrow flex">
                        <div
                            class="supDetailsTitle flex justify-end items-center"
                        >
                            <p>Audit Trial</p>
                        </div>
                        <div class="supDetailsData ">
                            <div class="pl-p7px pt-p7px">
                                <div class="auditTrailtd">
                                    <button
                                        class="auditTrail"
                                        
                                        on:click={SupplerModalbuttonClick}
                                    >
                                        <img
                                            src="../src/img/chat1.svg"
                                            class="chatIcon"
                                            alt=""
                                        />
                                        <span class="text-sm">12 </span>
                                    </button>
                                    <p class="mtextaudit">11 M</p>
                                    <div class="shortInfo" />
                                </div>
                            </div>
                            <div />
                        </div>
                    </div>
                </div>

                <div class="paginationButton flex justify-center mt-7">
                    <nav aria-label="Page navigation">
                        <ul class="pagiWrapper ">
                            <li>
                                <button class="preNextbtn"> Previous</button>
                            </li>
                            <li><button class="pagiItemsNumber">1</button></li>
                            <li>
                                <button class="pagiItemsNumberActive">2</button>
                            </li>
                            <li><button class="pagiItemsNumber">3</button></li>

                            <li><button class="preNextbtn"> Next</button></li>
                        </ul>
                    </nav>
                </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<div class="supplierInfoModalSection" id="supplierInfoModal">
    <!-- {#each audit_supplier_data as audit_data}  -->
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
                                <div class="smLable">{audit_supplier_data.facility_name}</div>
                            </div>
                            <div class="itemList ">
                                <div class="smallText w-w115px">
                                    Vendor Type
                                </div>
                                <div class="smLable">{audit_supplier_data.facility_type}</div>
                            </div>
                            <div class="itemList ">
                                <div class="smallText w-w115px">Vendor ID</div>
                                <div class="smLable">{audit_supplier_data.name}</div>
                            </div>
                            <div class="itemList">
                                <div class="smallText w-w115px">Location</div>
                                <div class="smLable">
                                    <!-- {#each audit_supplier_data.addresess as curr_address}
                                    {curr_address.address}
                                    {/each} -->
                                   
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="smallText w-w115px">Status</div>
                                <div class="statusinformation">
                                    <div class="statusWrapper  ">
                                        <div class="statusredcircle" />
                                        {audit_supplier_data.status}
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
                    <!-- <div class="flex md:contents">
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
                            <h3 class="timeCommenterName ">
                                Selvaraj Jayaraman
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Pancard number mismatch
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Akshay Saini
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPurple">
                                <p class="timeCircle" />
                                 Vendor details verified
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Selvaraj Jayaraman
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPurple">
                                <p class="timeCircle" />
                                 Vendor Details
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightGreen">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div>
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
                            <h3 class="timeCommenterName ">
                                Vivekanand Dasar
                                <span class="timeCommentDate "
                                    >Thurs, 07 Sept 21, 12:24 PM</span
                                >
                            </h3>
                            <div class="timeStatus  timeStatusbglightPink">
                                <p class="timeCircle" />
                                 Voter ID not clear
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</div>


