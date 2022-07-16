<script>
export let showCDetails;
export let showDetails;
export let showItems;

import { workorderitems } from "../../../stores/workorderitems"; 
import { workorderdetails } from '../../../stores/workorderdetails';



import CardItemList from "./CardItemList.svelte";
import {popup_cnt } from "../../../stores/popups_cnt";


const changeStatusF = () =>{
    showItems = false;
    showCDetails = true;
} 
const changeStatusB = () =>{
    showItems = false;
    showDetails = true;
}

let countForCardItems = $popup_cnt.length; 

const addItem = () =>{
    countForCardItems+=1;
    $popup_cnt = [...$popup_cnt, {
        count :0,
        rate_per_item:0,
        amount:0
    }];
}

const submit_WO_adhoc_data = () =>{
     const arr = $workorderdetails.station.split(" - ");
     let station_name = arr[1];
     const save_wo_ad_hoc_data = {
        organisation : $workorderdetails.organisation.slice(0,2),
        station :station_name,
        cost_center:$workorderdetails.cost_center,
        work_order_type: $workorderdetails.work_order_type,
        resource_type:$workorderdetails.resource_type,
        van_work_type:$workorderdetails.van_work_type,
        month_and_year:$workorderdetails.month_and_year,
        adhoc_date:$workorderdetails.adhoc_date,
        approver_id:$workorderdetails.approver_id,
        remarks:$workorderdetails.remarks,
        send_sms:$workorderdetails.send_sms === "Yes" ? true: false,
        vendor:$workorderitems.vendor,
        supplier_id:$workorderitems.supplier_id,
        rates:$popup_cnt,
     }

     
}
</script>


<div class="submitWorkOrderItems"  >
    <div class="grid grid-cols-4 xsl:grid-cols-1 gap-6 px-5 xsl:gap-2 xsl:px-0">
           <div class="col-span-2 mb-5 xsl:mb-0">
           <div class="flex">
               <div class="formGroup ">
                   <label class="formLableBulkemp ">Select Vendor<span class="mandatoryIcon">*</span></label>
                   <div class="formInnerGroup ">
                       <select class="inputboxpopover" bind:value={$workorderitems.vendor}>
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
                       <select class="inputboxpopover" bind:value={$workorderitems.supplier_id}>
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

    {#each Array(countForCardItems) as _,i }
       <CardItemList bind:countForCardItems={countForCardItems} {i} />
    {/each}

    <div class="flex mt-8">
        <button class="ErBlueButton" on:click={addItem}>Add Item</button>
    </div>

    <div class="flex justify-end gap-3 mt-10">
       <button class="ErBlueButton" on:click={changeStatusB}>Prev</button>
           
       {#if $workorderdetails.work_order_type == "Ad-Hoc" }
       <button class="ErBlueButton" on:click={submit_WO_adhoc_data} >Submit New WO </button>
       {:else}
       <button class="ErBlueButton" on:click={changeStatusF} >Next</button>
       {/if}
   
    </div>
</div>