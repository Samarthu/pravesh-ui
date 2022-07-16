<script>
    import { chargedetails } from "../../../stores/chargedetails";
    import { fade } from 'svelte/transition';
    import { workorderdetails } from "../../../stores/workorderdetails";
    import { workorderitems } from "../../../stores/workorderitems";
    import {popup_cnt} from "../../../stores/popups_cnt";
    export let showItems;
    export let showCDetails;

    const changeStatus = ()=>{
        showItems = true;
        showCDetails = false;
    }
    const submit_wo_planned_data = () =>{
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
            normal_rates:$chargedetails.normal_rates,
            working_hours:$chargedetails.working_hours,
            ad_hoc_rates:$chargedetails.ad_hoc_rates,
            overtime_charges:$chargedetails.overtime_charges,
            agreed_km_limit:$chargedetails.agreed_km_limit,
            contract_days:$chargedetails.contract_days,
            extra_km_charges:$chargedetails.extra_km_charges,
        }
    }



</script>

<div class="submitChargeDetails" >
    <div class="grid grid-cols-10 xsl:grid-cols-1 gap-6 ">
        <div class="col-span-1 "></div>
            <div class="col-span-4 mb-5">
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable">Normal Rates</label>
                    <div class="formInnerGroup ">
                        <input class="inputboxpopover" type="text" bind:value={$chargedetails.normal_rates}>

                    </div>
                </div>
            </div>
            
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable">Ad-hoc Rates</label>
                    <div class="formInnerGroup ">
                        <input class="inputboxpopover" type="text" bind:value={$chargedetails.ad_hoc_rates}>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable">Overtime Charges</label>
                    <div class="formInnerGroup ">
                        <input class="inputboxpopover" type="text" bind:value={$chargedetails.overtime_charges}>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable">Extra KMs Charges</label>
                    <div class="formInnerGroup ">
                        <input class="inputboxpopover" type="text" bind:value={$chargedetails.extra_km_charges}>
                    </div>
                </div>
            </div>

         </div>
         <div class="col-span-4 mb-5">
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable">Working Hours</label>
                    <div class="formInnerGroup ">
                        <input class="inputboxpopover" type="text" bind:value={$chargedetails.working_hours}>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable">Agreed KMs Limit</label>
                    <div class="formInnerGroup ">
                        <input class="inputboxpopover" type="text" bind:value={$chargedetails.agreed_km_limit}>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable ">Contract Days</label>
                    <div class="formInnerGroup ">
                    
                        <select class="inputboxpopover" bind:value={$chargedetails.contract_days}>
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
            <button class="ErBlueButton" on:click={changeStatus}>Prev</button>
            <button class="ErBlueButton" on:click={submit_wo_planned_data}>Submit New WO</button>
        </div>
     </div>
 </div>