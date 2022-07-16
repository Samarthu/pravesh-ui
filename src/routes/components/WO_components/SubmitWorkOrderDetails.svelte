

<script>
     import { fade } from 'svelte/transition';
    //import { goto } from '$app/navigation';
    //import SubmitWoItems from './SubmitWOItems.svelte';
    import {  org_station_list,org_ccw_list}  from "../../../stores/popups_cnt";

    import { onMount } from "svelte";
    import {get_org_station,get_org_list,get_ccw_details,get_org} from "../../../services/organisation"
    import { workorderdetails }from "../../../stores/workorderdetails"
    export let showItems;
    export let showDetails;
    //toggle between the pages
    const changeStatus = () =>{
        showItems = true;
        showDetails = false;
    }

    let placeholder = "Select the Option";
    const r_type = ["Delivery Associate (DA)","Van Associate (VA)","Station Associate (SA)","Process Associate (PA)","Supervisor (SU)","Housekeeping (HK)","Loader (LR)","Security (ST)","Van (VD)","Team Leader(TL)","Associate Team Leader (ATL)","Associate Station Manager (ASM)"];
    let org_list=[];
    
    let locID;
    
     onMount(async()=>{
            //const res = await get_org();
           const res = await get_org_list();
            org_list = res.body.data;
            //org_list = res.body.message;
            console.log(res.body.message);
            //console.log(org_list[0]);
     });
    let station_name;
    let org_id;
    let isStation = false;
    let isCCW = false;
    let PrevOrgValue = true;

    $: if($workorderdetails.organisation)  {
            isStation = true;
            //console.log(org_id);
            org_id = $workorderdetails.organisation.slice(0,2);
            console.log($workorderdetails.organisation);
            //document.getElementById("org_station_opt").value = $workorderdetails.organisation;
       }
       
    $: if($workorderdetails.station!== null)
        {
            
            const arr = $workorderdetails.station.split(" - ");
            station_name = arr[1];
            //console.log(station_name);
            isCCW = true;
            console.log($workorderdetails)
        }
       
    const set_station_data = async (org_id) =>{
        
        const res = await get_org_station(org_id);
        org_station_list.set(res.body.data);
        //return res.body.data;        

    }
   
    const set_ccw_data = (station_name,org_id)=>{
        // const res = await get_ccw_details(station_name,org_id);
        // $$org_ccw_list = res.body.data;
        if($org_station_list)
        {
            $org_station_list.map((d)=>{
            if(d.station_name == station_name && d.org_id== org_id)
            {
                org_ccw_list.set(d.cost_center);
                locID =d.location_id;
                console.log($org_ccw_list,locID);
            }
           });
        }
    }
   
   let flag = false;
    const handle_ccw = () =>{
        set_ccw_data(station_name,org_id);
        //var opt = $org_ccw_list[0].cost_center + " - "+ $org_ccw_list[0].warehouse;
        // var ds = document.getElementById('ccw');
        // ds.add(new Option(opt,opt)); 
       // $workorderdetails.cost_center=opt;
        // $workorderdetails.cost_center= opt; 
        ///console.log(document.getElementById('ccw').value);
    }
  const handleOrgChange = () =>{
     PrevOrgValue = !PrevOrgValue;
     set_station_data(org_id);
  }
</script>


<div class="submitWorkOrderDetails ">
    <div class="grid grid-cols-10 xsl:grid-cols-1 gap-6 ">
        <div class="col-span-1 "></div>
            <div class="col-span-4 mb-5">
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable ">Work Organization<span class="mandatoryIcon">*</span></label>
                    <div class="formInnerGroup ">
                        <select class="inputboxpopover"  bind:value={$workorderdetails.organisation} on:change={handleOrgChange}   >
                            <option value ="" class="pt-6"  disabled >{placeholder}</option>
                            {#if org_list}
                            
                             {#each org_list as item }
                               
                               <option class="pt-6" value={item.name+" - "+item.org_name}>{item.name+" - "+item.org_name}</option> 
                               <!-- <option class="pt-6" value={item[1]+" - "+item[0]}>{item[1]+" - "+item[0]}</option> -->
                               
                             {/each} 
                             
                            {/if}
                        </select>
                        <div class="formSelectArrow ">
                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable"> Station <span class="mandatoryIcon">*</span></label>
                    <div class="formInnerGroup ">
                        <select class="inputboxpopover" id ="org_station_opt" bind:value={$workorderdetails.station}  on:change={handle_ccw} >                                                      
                             {#if $org_station_list}
                              <option  disabled >{placeholder}</option>

                               {#each $org_station_list as item }
                                    <option  >{item.name+" - "+item.station_name}</option> 
                                {/each}     
                             {/if} 
                            
                             
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
                        <select class="inputboxpopover" id="ccw" bind:value={$workorderdetails.cost_center}>
                            {#if $org_ccw_list }
                             <option value="" >Select the Option</option>
                            {#each  $org_ccw_list as item}
                                 <option value = {item.cost_center+" : "+ item.warehouse}>{item.cost_center+" : "+ item.warehouse}</option>
                            {/each}
                            {/if}
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
                    
                        <select class="inputboxpopover" bind:value={$workorderdetails.work_order_type}>
                            <option default>Planned</option>
                            <option>Ad-Hoc</option>
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
                    
                        <select class="inputboxpopover" bind:value={$workorderdetails.resource_type}>
                            <option value="" disabled selected>{placeholder}</option>
                            {#each r_type as r }
                                <option value={r} >{r}</option>
                            {/each}
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
                    
                        <select class="inputboxpopover" bind:value={$workorderdetails.van_work_type}>
                            <option value="" disabled>{placeholder}</option>
                            <option >Delivery</option>
                            <option >Load Drop</option>
                            <option >Load Connection</option>
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
                        <input class="inputboxpopoverdate" type="month" bind:value={$workorderdetails.month_and_year}>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable ">Adhoc Date<span class="mandatoryIcon">*</span></label>
                    <div class="formInnerGroup ">
                        <input class="inputboxpopoverdate" type="month" bind:value={$workorderdetails.adhoc_date}>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable ">Approver ID<span class="mandatoryIcon">*</span></label>
                    <div class="formInnerGroup ">
                    
                        <select class="inputboxpopover" bind:value={$workorderdetails.approver_id}>
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
                        <textarea class="inputboxpopover"  bind:value={$workorderdetails.remarks} rows="3"></textarea>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="formGroup ">
                    <label class="formLable ">Send SMS<span class="mandatoryIcon">*</span></label>
                    <div class="formInnerGroup ">
                        <select class="inputboxpopover" bind:value={$workorderdetails.send_sms}>
                            <option class="pt-6">Yes</option>
                            <option class="pt-6" selected>No</option>
                        </select>
                        <div class="formSelectArrow ">
                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                        </div>
                    </div>
                </div>
            </div>
            
         </div>
         <div class="col-span-1 flex items-end">
             <button class="ErBlueButton" on:click={changeStatus}>Next</button>
         </div>
    </div>
</div>