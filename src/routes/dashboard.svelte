<script context="module">
 import {onMount} from 'svelte';
</script>
<script>
    import { goto } from "$app/navigation";
    import {demo_api_fun} from '../services/dashboard_services';
    import {dashboard_data} from '../services/dashboard_services';
    import {dashboard_details} from '../stores/dashboard_store';
import Supplier from './supplier.svelte';
    
    let id_proof_rejected;
    let bank_details_rejected;
    let bgv_pending;
    let id_verifiaction_pending;
    let bank_verification_pending;
    let pending_offer_letter;
    let bgv_rejected;

    
    // console.log(dashboard)
    onMount(async () =>{


        let response = await demo_api_fun();
        console.log("demo api response",response);
        await dashboard_data();
        let dashboard = $dashboard_details;
        console.log("innnn dashboard_details",dashboard)
        id_proof_rejected = dashboard.id_proof_rejected
        bank_details_rejected = dashboard.bank_details_rejected;
        bgv_pending = dashboard.bgv_pending;
        id_verifiaction_pending = dashboard.id_verifiaction_pending;
        bank_verification_pending = dashboard.bank_verification_pending;
        pending_offer_letter = dashboard.pending_offer_letter;
        bgv_rejected = dashboard.bgv_rejected;
    })

    

    let routeNew = "";

    export let url = "/bussines";;

    function routeToBussiness() {
        let replaceState = false;
        goto(routeNew, { replaceState });
    }

    // routeNew = "/bussines";
    async function demo_clickhandle(){
        alert("button clicked");
    }

    function demoClick(){
        console.log("clicked")
    }
</script>

<!-- Dashboard  -->
<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section flex justify-between items-center xs:px-3">
            <p class="pt-5 pb-5">
                <span class=" pr-1 text-font32 font-medium xs:text-2xl">Dashboard</span> 
            </p>
            <p on:click={routeToBussiness}>
                <a href="#" class="newonboard "> Onboard<span class="xs:hidden"> New</span> <img src="../src/img/useradd.svg" class="pl-2" alt=""></a>
            </p>
            
        </div>
    </div>

    <div class="dashboardWrapper m-m15 xs:mx-3 xs:mt-0">
        <div class="dashboardSection w-full">
            <div class="myactionitems">
                <div class="headingMyactions">
                    <h1 class="cardhead">My Action Items</h1>
                    <p class="cardDes">Take appropriate action to complete onboarding</p>
                </div>
                <div class="cards">
                    <div class="cardAction " on:click={demoClick}>
                        <div class="cardContentText flex">
                        <div class="cardimg mr-3">
                            <img src="../src/img/idproofRejected.png" alt="">
                        </div>
                            <div class="content">
                            <h1 class="dashHeading ">ID Proof Rejected</h1>
                            <p class="dashDes ">Re-submit ID Proof </p>
                        </div>
                        </div>
                        <div class="cardCount">
                           <div class="bgcircle ">
                          <span class="countcircle  ">{id_proof_rejected}</span>  
                           </div> 
                        </div>
                    </div>
                    <div class="cardAction ">
                        <div class="cardContentText flex">
                        <div class="cardimg mr-3">
                            <img src="../src/img/bankdetails.png" alt="">
                        </div>
                            <div class="content">
                            <h1 class="dashHeading ">Bank Details Rejected</h1>
                            <p class="dashDes ">Re-submit Bank Details </p>
                        </div>
                        </div>
                        <div class="cardCount">
                           <div class="bgcircle ">
                          <span class="countcircle  ">{bank_details_rejected}</span>  
                           </div> 
                        </div>
                    </div>
                    <div class="cardAction ">
                        <div class="cardContentText flex">
                        <div class="cardimg mr-3">
                            <img src="../src/img/bgv.png" alt="">
                        </div>
                            <div class="content">
                            <h1 class="dashHeading ">BGV Pending</h1>
                            <p class="dashDes ">Take required action </p>
                        </div>
                        </div>
                        <div class="cardCount">
                           <div class="bgcircle ">
                          <span class="countcircle  ">{bgv_pending}</span>  
                           </div> 
                        </div>
                    </div>
                    <div class="cardActionsaved">
                        <div class="cardContentText flex">
                        <div class="cardimg mr-3">
                            <img src="../src/img/saved.png" alt="">
                        </div>
                            <div class="content">
                            <h1 class="dashHeading ">Saved</h1>
                            <p class="dashDes ">Complete Onboarding </p>
                        </div>
                        </div>
                        <div class="cardCount">
                           <div class="bgcirclesaved ">
                          <span class="countcirclesaved  ">01</span>  
                           </div> 
                        </div>
                    </div>
                </div>

            </div>
            <div class="myactionitems ">
                <div class="headingMyactions">
                    <h1 class="cardhead">Verification in Progress</h1>
                    <p class="cardDes">Teams are activily working on document verifications</p>
                </div>
                <div class="cards">
                    <div class="cardActionother ">
                        <div class="cardContentText flex">
                        <div class="cardimg mr-3">
                            <img src="../src/img/pendingid.png" alt="">
                        </div>
                            <div class="content">
                            <h1 class="dashHeading ">Pending ID Proof Verification</h1>
                            <p class="dashDes ">Pending from VMT Team </p>
                        </div>
                        </div>
                        <div class="cardCount">
                           <div class="bgcircleother ">
                          <span class="countcircleother  ">{id_verifiaction_pending}</span>  
                           </div> 
                        </div>
                    </div>
                    <div class="cardActionother ">
                        <div class="cardContentText flex">
                        <div class="cardimg mr-3">
                            <img src="../src/img/pendingbank.png" alt="">
                        </div>
                            <div class="content">
                            <h1 class="dashHeading ">Pending Bank Verification</h1>
                            <p class="dashDes ">Pending from Accounts Team </p>
                        </div>
                        </div>
                        <div class="cardCount">
                           <div class="bgcircleother ">
                          <span class="countcircleother  ">{bank_verification_pending}</span>  
                           </div> 
                        </div>
                    </div>
                    <div class="cardActionother ">
                        <div class="cardContentText flex">
                        <div class="cardimg mr-3">
                            <img src="../src/img/pendingletter.png" alt="">
                        </div>
                            <div class="content">
                            <h1 class="dashHeading ">Pending Offer Letter</h1>
                            <p class="dashDes ">Pending from HR Team </p>
                        </div>
                        </div>
                        <div class="cardCount">
                           <div class="bgcircleother ">
                          <span class="countcircleother  ">{pending_offer_letter}</span>  
                           </div> 
                        </div>
                    </div>
                    <div class="cardAction ">
                        <div class="cardContentText flex">
                        <div class="cardimg mr-3">
                            <img src="../src/img/bvgreject.png" alt="">
                        </div>
                            <div class="content">
                            <h1 class="dashHeading ">BGV Rejected</h1>
                            <p class="dashDes ">Lorem Ipsum... </p>
                        </div>
                        </div>
                        <div class="cardCount">
                           <div class="bgcircle ">
                          <span class="countcircle  ">{bgv_rejected}</span>  
                           </div> 
                        </div>
                    </div>
                </div>

            </div>
          
        </div>
        <div class="activeProfile xs:w-full">
                <div class="activeProfileWrapper w-w325 xs:w-full">
                        <div class="headingCount ">
                            <p class="cardhead">Active Profiles</p>
                            <p class="cardhead">84</p>
                        </div>
                        <div class="venderHead plr ">
                            <p class="venderheadText "><img src="../src/img/manager.svg" class="pr-p15" alt=""> Vendors</p>
                        </div>
                        <div class="venderHead plr ">
                        <ul >
                            <li class="listli"><a href=""> Man Power Contractors</a> <span class="text-lg text-blackshade font-bold">02</span></li>
                            <li class="listli"><a href=""> Van Vendors</a> <span class="text-lg text-blackshade font-bold">04</span></li>
                            <li class="listli"><a href=""> Service Providers</a><span class="text-lg text-blackshade font-bold">10</span></li>
                            <li class="listhb"><a href=""> Food Vendors </a><span class="text-lg text-blackshade font-bold">09</span></li>
                          
                        </ul>
                        </div>

                        <div class="venderHead plr mt-4">
                            <p class="venderheadText "><img src="../src/img/workforce.svg" class="pr-p15" alt=""> Workforce</p>
                        </div>
                        <div class="venderHead plr ">
                            <ul >
                                <li class="listli"><a href=""> NDA </a><span class="text-lg text-blackshade font-bold">02</span></li>
                                <li class="listli"><a href="">Delivery Associates (DA)</a> <span class="text-lg text-blackshade font-bold">04</span></li>
                                <li class="listli"><a href="">Hybrid Delivery Associates (NDA)</a><span class="text-lg text-blackshade font-bold">10</span></li>
                                <li class="listli"><a href="">House Keeping </a><span class="text-lg text-blackshade font-bold">09</span></li>
                                <li class="listli"><a href="">Van Driver</a> <span class="text-lg text-blackshade font-bold">09</span></li>
                                <li class="listli"><a href="">Process Associate</a> <span class="text-lg text-blackshade font-bold">09</span></li>
                                <li class="listli"><a href="">Station Staff</a><span class="text-lg text-blackshade font-bold">09</span></li>
                                <li class="listli"><a href="">Landlords</a> <span class="text-lg text-blackshade font-bold">09</span></li>
                                <li class="listli"><a href="">Station Managers </a><span class="text-lg text-blackshade font-bold">09</span></li>
                                <li class="listhb"><a href="">Team Leads </a><span class="text-lg text-blackshade font-bold">09</span></li>
                               
                            </ul>
                            </div>




                </div>
        </div>
    </div>

</div>
<div>
    <h1>this is for testing</h1>
    <button on:click={() =>demo_clickhandle()}>click me bbbbbbbbbbbbbbbbbbbbbbbbb</button>
</div>