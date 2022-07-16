<script>
import { goto } from '$app/navigation';

import {success_toast,error_toast,warning_toast} from "../../handler/toast_theme";



// const redirect = ()=>{
//     //window.location.href = "/main";
    

// } 

const dis = () =>{
    
    success_toast("hiii not available");
    error_toast("hii not available");
    warning_toast("hii not availablr");
}

</script>




<div class="workOrderView ">
    <div class="px-5 grid grid-cols-4 gap-9 mt-8 xsl:grid-cols-1 xsl:gap-6">
        <div class="reportCard bg-white rounded-lg">
            <h3>Estimate Work Order</h3>
            <p>Filter work order Estimate, raise new work order estimate, View poast work order.</p>
            <div class="text-right">
                <button class="ErBlueButton" on:click={dis}>Go</button>
            </div>
        </div>
        <div class="reportCard bg-white rounded-lg">
            <h3>Work Order </h3>
            <p>Filter work order, raise new work order & create work Order</p>
            <div class="text-right">
                <button class="ErBlueButton" on:click={()=> goto("/main") }>Go</button>
            </div>
        </div>
        <!-- <div class="reportCard bg-white rounded-lg">
            <h3>BGV Data </h3>
            <p>Get background verification data report of all associates</p>
            <div class="text-right">
                <button class="ErBlueButton">Get Data</button>
            </div>
        </div> -->
    </div>
</div>