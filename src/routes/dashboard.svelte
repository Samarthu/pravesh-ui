<script context="module">
 import {onMount} from 'svelte';
</script>
<script>
    import { goto } from "$app/navigation";
    import {get_current_user_function} from '../services/dashboard_services';
    import {dashboard_data,get_fac_count} from '../services/dashboard_services';
    import {current_user} from '../stores/current_user_store';
    // import {dashboard_details} from '../stores/dashboard_store';
    import Supplier from './supplier.svelte';
    import {goto_wrapper} from '../services/goto_wrapper';
    
    
    let active;
    // let background_verification_pending;
    // let bank_beneficiary_pending;
    let id_proof_rejected,id_proof_rejected_display_name;
    let bank_details_rejected,bank_details_rejected_display_name;
    let bgv_pending,bgv_pending_display_name;
    let id_verification_pending,id_verification_pending_display_name;
    let bank_verification_pending,bank_verification_pending_display_name;
    let pending_offer_letter,pending_offer_letter_display_name;
    let bgv_rejected,bgv_rejected_display_name;
    let fac_count_array=[];
    let ven_type_arr = [];
    let workf_type_arr = [];
    
    

    
    // console.log(dashboard)
    onMount(async () =>{
        console.log("href", window.location);
        if(window.location.pathname == "/pravesh-ui"){
            window.location.href = window.location.href+"/dashboard";
        }
        // window.location.href = window.location.href+"/dashboard";
    

        // let temp_res = await fetch("https://elasticrun.in/ifscapi/KARB0000001")
        // console.log("temp_res",temp_res)
        // let result = await temp_res.json();
        // console.log("TEMP RESULT",result)

        
        let current_user_response = await get_current_user_function();
        if(current_user_response.body.status == "green"){
            $current_user.email = current_user_response.body.data.user.email;
            $current_user.name = current_user_response.body.data.user.name;
            $current_user.username = current_user_response.body.data.user.username;
            // console.log("email",current_user_response.body.data);
        }
        else{
            alert("Session User not found");
        }

        let fac_count_res = await get_fac_count();
        
        fac_count_array = fac_count_res.body.data;
       
        for (let i=0 ; i<fac_count_array.length ; i++) {
            if(fac_count_array[i].category == "Workforce"){
                if(fac_count_array[i].count != "0"){
                workf_type_arr.push({
                    "new_type":fac_count_array[i].facility_type_name,
                    "new_count":fac_count_array[i].count
                })
            }
            }
            else if(fac_count_array[i].category == "Vendor"){
               if(fac_count_array[i].count != "0")
               ven_type_arr.push({
                    "new_type":fac_count_array[i].facility_type_name,
                    "new_count":fac_count_array[i].count
                });
            }
            else{
                console.log("ERROR")
            }

    }
    workf_type_arr=workf_type_arr;   
    ven_type_arr=ven_type_arr;
    

        let dashboard_res = await dashboard_data();
        if(dashboard_res != null){
        let dashboard = dashboard_res.body.data;
        for(let new_dash_data of dashboard){
            
            if(new_dash_data.name == "active"){
                active = new_dash_data.count
               
            }
            
            if(new_dash_data.name == "id proof rejected"){
                id_proof_rejected = new_dash_data.count
                id_proof_rejected_display_name = new_dash_data.display_name
                
            }
            if(new_dash_data.name == "background verification pending"){
                bgv_pending = new_dash_data.count
                bgv_pending_display_name = new_dash_data.display_name
                
            }
            if(new_dash_data.name == "bank details rejected"){
                bank_details_rejected = new_dash_data.count
                bank_details_rejected_display_name = new_dash_data.display_name
                
            }
            if(new_dash_data.name == "id verification pending"){
                id_verification_pending = new_dash_data.count
                id_verification_pending_display_name = new_dash_data.display_name
               
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
            if(new_dash_data.name == "bank verification pending"){
                bank_verification_pending = new_dash_data.count
                bank_verification_pending_display_name = new_dash_data.display_name
                
            }
            if(new_dash_data.name == "pending offer letter"){
                pending_offer_letter = new_dash_data.count
                pending_offer_letter_display_name = new_dash_data.display_name
               
            }
            if(new_dash_data.name == "background verification rejected"){
                bgv_rejected = new_dash_data.count
                bgv_rejected_display_name = new_dash_data.display_name
                
            }
        }
    }
})

    

    let routeNew = "";

    // export let url = "/bussines";

    function routeToBussiness() {
        let replaceState = false;
        // console.log(routeNew)
        goto("/bussiness", { replaceState });
        // goto_wrapper("bussiness",{ replaceState });
    }

    // routeNew = "/bussines";
    

    // function demoClick(){
    //     console.log("clicked")
    // }
    function id_proof_clicked(){
        goto("./supplier?status="+id_proof_rejected_display_name);
        

    }
    function bank_details_rejected_clicked(){
        goto("./supplier?status="+bank_details_rejected_display_name);
        
    }
    function bgv_pending_clicked(){
        goto("./supplier?status="+bgv_pending_display_name);
       
    }
    function id_verification_pending_clicked(){
        goto("./supplier?status="+id_verification_pending_display_name);
        
    }
    function bank_verification_pending_clicked(){
        goto("./supplier?status="+bank_verification_pending_display_name);
       
    }
    function pending_offer_clicked(){
        goto("./supplier?status="+pending_offer_letter_display_name);
        
    }
    function bgv_rejected_clicked(){
        goto("./supplier?status="+bgv_rejected_display_name);
       
    }


</script>

<!-- Dashboard  -->
<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section flex justify-between items-center xs:px-3">
            <p class="pt-5 pb-5">
                <span class=" pr-1 text-font32 font-medium xs:text-2xl">Dashboard</span> 
            </p>
            <p on:click={()=>routeToBussiness()}>
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
                    <div class="cardAction " on:click={id_proof_clicked}>
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
                    <div class="cardAction" on:click={bank_details_rejected_clicked}>
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
                    <div class="cardAction " on:click={bgv_pending_clicked}>
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
                    <div class="cardActionother" on:click={id_verification_pending_clicked}>
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
                          <span class="countcircleother  ">{id_verification_pending}</span>  
                           </div> 
                        </div>
                    </div>
                    <div class="cardActionother "  on:click={bank_verification_pending_clicked}>
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
                    <div class="cardActionother "   on:click={pending_offer_clicked}>
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
                    <div class="cardAction " on:click={bgv_rejected_clicked}>
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
                            <p class="cxardhead">Active Profiles</p>
                            <p class="cardhead">{active}</p>
                        </div>
                        <div class="venderHead plr ">
                            <p class="venderheadText "><img src="../src/img/manager.svg" class="pr-p15" alt=""> Vendors</p>
                        </div>
                        <div class="venderHead plr ">
                        
                            <ul >
                            
                            {#each ven_type_arr as ven_det}
                           
                                <li class="listli"><a href="">{ven_det.new_type}</a> <span class="text-lg text-blackshade font-bold">{ven_det.new_count}</span></li>
                               
                            {/each}
                        </ul>
                    
                       
                        </div>
                    

                        <div class="venderHead plr mt-4">
                            <p class="venderheadText "><img src="../src/img/workforce.svg" class="pr-p15" alt=""> Workforce</p>
                        </div>
                        <div class="venderHead plr ">
                            <ul >
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
                           
                            <li class="listli"><a href="">{workf_det.new_type}</a><span class="text-lg text-blackshade font-bold">{workf_det.new_count}</span></li>
                               
                            {/each} 
                            </ul>
                            </div>




                </div>
        </div>
    </div>

</div>
<!-- <div>
    <h1>this is for testing</h1>
    <button on:click={() =>demo_clickhandle()}>click me bbbbbbbbbbbbbbbbbbbbbbbbb</button>
</div> -->