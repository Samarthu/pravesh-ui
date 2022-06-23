<script>
    import {get_loc_scope} from "../services/onboardsummary_services";
    import {get_current_user_function} from "../services/dashboard_services";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { current_user,details_user_info } from "../stores/current_user_store";

    let city_list = [];


    onMount(async () => {
        let scope_response = await get_loc_scope();
        // console.log(scope_response.body.data.length);
        if(scope_response.body.status == "green"){
            for(let i=0;i<scope_response.body.data.length;i++){
                city_list.push( scope_response.body.data[i]['location_name']);
            }
            city_list = city_list;
            

        }
        else{

        }

        let session_user_response = await get_current_user_function();
        console.log("session_user_response",session_user_response);

    });
    console.log("city list1",city_list);


</script>


<div class="mainContent ">
    <div class="breadcrumb">
        <div class="breadcrumb-section">
            <p class="breadcrumbtext border-none">
                <span class="text-3xl xs:text-2xl"> My Account</span>
            </p>
        </div>
    </div>
    <div class="contentsection ">
        <div class="innerProfile bg-white w-full pt-p15 pl-p15 pb-5 rounded-br10">
            <h4 class="text-2xl xs:text-xl text-blackshade pb-p15 font-medium">Basic Details</h4>
            <div class="flex xs:flex-wrap">
                <div class="pr-6 pt-p18 xs:w-full xs:mb-4 sm:mb-4" >
                    <a href=""> <img class="w-20 h-20" src="../src/img/Userpic.png" alt="" /></a>
                </div>
                <div class="flex w-full">
                    <div class=" xs:w-auto pt-p18 w-full">
                        <div class="font-light text-sm flex">
                          <p class="w-36 ">Name</p>   
                          <p class="w-full font-normal text-base pl-pr14px">Akshay Saini</p>   
                        </div>
                        <div class="font-light text-sm flex">
                            <p class="w-36 ">Email</p>   
                            <p class="w-full font-normal text-base pl-pr14px">{$current_user.email}</p>   
                          </div>
                        <div class="font-light text-sm flex">
                          <p class="w-36 ">Role</p>  
                          <p class="w-full font-normal text-base pl-pr14px">Territory Manager</p>   

                        </div>
                        <div class="font-light text-sm flex">
                          <p class="w-36 ">Station</p>  
                          <p class="w-full font-normal text-base pl-pr14px">PNQP Pune</p>   

                        </div>
                        <div class="font-light text-sm flex">
                          <p class="w-36 ">  Reporting Manager</p>  
                          <p class="w-full font-normal text-base pl-pr14px">Mr.Xyz</p>   

                        </div>
                    </div>
                 
                </div>
            </div>
        </div>
    </div>
    <div class="contentsection  mt-4 xs:mt-0 sm:mt-0 ">
        <div class="innerProfile bg-white w-full pt-p15 pl-p15 pb-5 rounded-br10">
            <h4 class="text-2xl xs:text-xl text-blackshade">Locations I have Access</h4>
            <!-- <div class="text-base text-textdarkgrey py-2 font-medium h-8">Maharastra</div> -->
            <!-- <div>
                <div class="flex items-center pt-4">
                    <img class="w-3.5 h-4 mr-2" src="../src/img/checked.png" alt="">
                    <p class="text-base text-textdarkgrey font-normal">Dhule</p>
                </div>
            </div> -->
            <div class="cardsectio">
                

                <div class="grid grid-cols-3 xsl:grid-cols-1 gap-4 mt-4">
                    <!-- <div> 
                       <div class="bglightgreycolor "> eCommerce</div>
                     </div>
                   
                    <div>
                        <div class="bglightgreencolor"> Credit</div>

                    </div>
                    <div>
                        <div class="bglightyellowcolor "> WithRun</div>

                    </div>
                    <div>
                        <div class="bglightredcolor "> WithRun</div>

                    </div>
                    <div>
                        <div class="bglightbluecolor"> WithRun</div>

                    </div> -->
                    <!-- {#each final_list as org }
                    <div class={org.class_name} on:click={() => onclickhandel(org.org_id)}>{org.org_name}</div>
                        
                    {/each} -->
                    {#each city_list as city }
                    <div class="bglightgreycolor">{city}</div>
                        
                    {/each}
                    <!-- <div class="bglightgreycolor">city</div>
                    <div class="bglightgreycolor">city</div>
                    <div class="bglightgreycolor">city</div>
                    <div class="bglightgreycolor">city</div> -->
                   
                 
                </div>
            </div>

        </div>
    </div>

</div>