<script>
import { goto } from "$app/navigation";

const routeToWOmainPage =() =>{
    let replaceState= false;
    goto("WO_workOrder",{replaceState});
}


</script>

<div class="mainContent ">
   
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


    <div class="workOrderView ">
        <div class="px-5 grid grid-cols-4 gap-9 mt-8 xsl:grid-cols-1 xsl:gap-6">
            <div class="reportCard bg-white rounded-lg">
                <h3>Estimate Work Order</h3>
                <p>Filter work order Estimate, raise new work order estimate, View post work order.</p>
                <div class="text-right">
                    <button class="ErBlueButton" on:click={()=>{goto()}}>Go</button>
                </div>
            </div>
            <div class="reportCard bg-white rounded-lg">
                <h3>Work Order </h3>
                <p>Filter work order, raise new work order & create work Order</p>
                <div class="text-right">
                    <button class="ErBlueButton" on:click={routeToWOmainPage}>Go</button>
                </div>
            </div>
        </div>
    </div>
  

 </div>   
