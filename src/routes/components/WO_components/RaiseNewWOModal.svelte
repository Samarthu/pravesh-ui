<script>
//import { createEventDispatcher } from "svelte";
//const dispatch = createEventDispatcher();
import SubmitWorkOrderDetails from "./SubmitWorkOrderDetails.svelte";
import SubmitWoItems from "./SubmitWOItems.svelte";
import SubmitChargeDetails from "./SubmitChargeDetails.svelte";
import {workorderdetails} from "../../../stores/workorderdetails";
import { fade } from 'svelte/transition';
import { img_url_name } from "../../../stores/flags_store";


export let raiseWo;

let showDetails  = true;
let showItems = false;
let showCDetails = false;


const show1 = ()  =>{
    showDetails = true;
    showItems = false;
    showCDetails = false;

}
const show2 = ()  =>{
    showDetails = false;
    showItems = true;
    showCDetails = false;
    
}
const show3 = ()  =>{
    showDetails = false;
    showItems = false;
    showCDetails = true;
    
}

</script>

<div class="RaiseNewWorkOrder shadow-lg rounded-lg border-2 m-5" transition:fade>
    <div >
        <div class="caretforImage">
             <img src="../src/img/caret.svg" class="caretBulkemp" style="margin-right: 260px;" alt="">
        </div>
        <div class="getReportCard bg-white rounded-lg">
            <div class="flex justify-between">
            <h3>Raise New Work Order </h3>
            <p>
               <button  class="closebuttonsection" on:click={()=> raiseWo = false}><img src="{$img_url_name.img_name}/close.png"
                class="closesup" alt=""></button>
               
            </p>
            </div>

            <div class="stepMenus">
                <div class="flex justify-center gap-16 font-light text-blackshade text-base bg-bglightgreycolor py-5 mb-3 xsl:flex-wrap xsl:gap-5">
                    <p on:click={show1} class={showDetails ? "font-bold" :"" }>1. Submit Work Order Details</p>
                    <p  on:click={show2} class={showItems ?   "font-bold" :"" }>2. Submit Work Order Items</p>
                    <p on:click={show3} class={showCDetails ? "font-bold" :"" | $workorderdetails.work_order_type == "Ad-Hoc" ? "hidden" : "" }>3. Submit Charge Details</p>
                </div>
            </div>

           {#if showDetails}
            <SubmitWorkOrderDetails bind:showItems ={showItems} bind:showDetails = {showDetails} />
           {/if}
           
           {#if showItems}
             <SubmitWoItems bind:showItems ={showItems} bind:showDetails = {showDetails} bind:showCDetails={showCDetails}/>
           {/if}
           
           {#if showCDetails}
               <SubmitChargeDetails bind:showItems = {showItems} bind:showCDetails = {showCDetails} />
           {/if}

           


            <!-- Submit Work Order Details -->
               

            <!--End Submit Work Order Details -->

             <!-- Submit Work Order Items -->
            
            <!--End Submit Work Order Items -->

             <!-- Submit Charge Details -->
             
            <!--End Submit Charge Details -->
        </div>
    </div>
   </div>