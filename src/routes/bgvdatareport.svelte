<script>
    import { goto } from "$app/navigation";
    import {bgv_data} from "../services/bgv_services";
    import {get_date_format} from '../services/date_format_servives';
    import Toast from './components/toast.svelte';
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import {success_toast ,error_toast,warning_toast} from '../services/toast_theme';

    let temp = "org";
    let bgv_fac;
    let bgv_org;
    let fromdate;
    let todate;
    let bgv_format;
    let enteredon = "";
    let routetoreports = "";
    let toast_text;
    let toast_type;

    function routeToReports() {
        let replaceState = false;
        goto(routetoreports, { replaceState });
    }

    routetoreports = "reports";

    async function map_bgv_data(){

        let new_from_date = new Date(fromdate)
        let from_date = get_date_format(new_from_date,'DD/MM/YYYY')   
        
        let new_to_date = new Date(todate)
        let to_date = get_date_format(new_to_date,'DD/MM/YYYY')   

        if(!bgv_fac){
            bgv_fac = [];
        }

        if(!bgv_org || bgv_org=="-1"){
            // toast_type = "error";
            // toast_text = "Please select Organization"
            error_toast("Please select Organization")
            return
        }

        else if(!enteredon){
            // toast_type = "error";
            // toast_text = "Please select Data Type"
            error_toast("Please select Data Type")
            return
        }

        else if(!fromdate){
            // toast_type = "error";
            // toast_text = "Please select from Date"
            error_toast("Please select from Date")
            return
        }

        else if(!todate){
            // toast_type = "error";
            // toast_text = "Please select To Date"
            error_toast("Please select To Date")
            return
        }

        else if(!bgv_format){
            // toast_type = "error";
            // toast_text = "Please select Report Format Type"
            error_toast("Please select Report Format Type")
            return
        }

        else if(todate < fromdate){
            // toast_type = "error";
            // toast_text = "Invalid To Date selected"
            error_toast("Invalid To Date selected")
            return
        }
        
            let final_bgv_data = {
                "date_type":enteredon,
                "facility_ids": bgv_fac,
                "format_type": bgv_format,
                "from_date": from_date,
                "org_id":bgv_org,
                "to_date": to_date,
            }

            let final_map_bgv_data_res = await bgv_data(final_bgv_data)
            console.log("final_map_bgv_data_res",final_map_bgv_data_res)
            // toast_text = "Details will be sent on mail";
            // toast_type = "success";
            success_toast("Details will be sent on mail")

    }
</script>

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <p class="breadcrumbtext"><span class="text-textgrey pr-1 text-base">Home / Reports /
                </span> <span class="flex xs:text-base xs:items-center">Get BGV Data </span>
                <button type="button" class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3 ml-auto" on:click="{routeToReports}">Back</button>
            </p>
        </div>
    </div>

    <!-- BGV Data -->

    <div class="hidde">
        <div class="px-5  mt-8">
            <div class="getReportCard bg-white rounded-lg">
                <h3>Get background verification data report of all associates </h3>

                <div class="flex mt-2">
                    <div class="formGroupBaseLine mb-2">
                        <label class="text-sm text-grey">Filter Data By<span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <div class="text-center flex mb-2 ml-3">
                                <div class="flex items-center mr-4">
                                    <input id="radio1" type="radio" name="radio" class="hidden" checked on:click={()=>{temp="org"}}>
                                    <label for="radio1" class="radioLable text-grey">
                                        <span class="radioCirle"></span>
                                        Organization</label>
                                </div>

                                <div class="flex items-center  ">
                                    <input id="radio2" type="radio" name="radio" class="hidden" on:click={()=>{temp="fac"}}>
                                    <label for="radio2" class="radioLable  text-grey">
                                        <span class="radioCirle"></span>
                                        Facility ID</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-4 mb-4">
                    <hr>
                </div>

                <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1 xsl:gap-2">

                    <!-- for Organization -->

                    <div class="col-span-2  items-center ">
                        {#if temp=="org"}
                        <div class="light14greylong">Select Organization</div>
                        <div class="formInnerGroupNote ">
                            <select class="inputboxpopover" bind:value="{bgv_org}">
                                <option class="pt-6" value="-1">Select</option>
                                <option value="AN">Amazon Transportation</option>
                                <option value="ER">ElasticRun</option>
                                <option value="FT">Flipkart</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                        {/if}
                        {#if temp=="fac"}
                        <!-- <div class="light14greylong">Add Facility ID's</div>
                        <div class="formInnerGroupNote ">
                            <input type="text" class="inputboxVMT" bind:value="{bgv_fac}">
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div> -->
                        <div class="light14greylong">Add Ficility ID’s</div>
                        <div class="formInnerGroupNote ">
                            <textarea class="inputboxpopover" bind:value="{bgv_fac}"></textarea>
                        </div>
                        {/if}
                    </div>

                    <!-- for Facility ID -->

                    <!-- <div class="col-span-2  items-center ">
                    <div class="light14greylong">Add Ficility ID’s</div>
                    <div class="formInnerGroupNote ">
                        <textarea class="inputboxpopover" bind:value="{bgv_fac}"></textarea>
                    </div>
                </div> -->



                    <div class="col-span-2  items-center xsl:mt-3">
                        <div class="light14greylong">Data Type</div>
                        <div class="formInnerGroup ">
                            <div class="text-center flex mb-2 ml-3">
                                <div class="flex items-center mr-4">
                                    <input id="radio4" type="radio" name="radio1" class="hidden" checked="" bind:group="{enteredon}" value="createdOn">
                                    <label for="radio4" class="radioLable text-grey">
                                        <span class="radioCirle"></span>
                                        Created On</label>
                                </div>

                                <div class="flex items-center  ">
                                    <input id="radio3" type="radio" name="radio1" class="hidden" bind:group="{enteredon}" value="updatedOn">
                                    <label for="radio3" class="radioLable  text-grey">
                                        <span class="radioCirle"></span>
                                        Updated On</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1">
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">From Date</div>
                        <div class="formInnerGroupNote ">
                            <input class="inputboxpopoverdate" type="date" bind:value="{fromdate}" max={new Date().toISOString().split('T')[0]}  onkeydown="return false">
                        </div>
                    </div>
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">To Date</div>
                        <div class="formInnerGroupNote ">
                            <input class="inputboxpopoverdate" type="date" bind:value="{todate}" max={new Date().toISOString().split('T')[0]}  onkeydown="return false">
                        </div>
                    </div>
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Report Format Type</div>
                        <div class="formInnerGroupNote ">
                            <select class="inputboxpopover" bind:value="{bgv_format}">
                                <option class="pt-6">Select</option>
                                <option value="generic">Generic</option>
                                <option value="amazon">Amazon</option>
                                <option value="flipkart">Flipkart</option>
                                <option value="amazon-insurance">Amazon Insurance</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="text-right items-end justify-start flex">
                        <button class="ErBlueButton" on:click="{map_bgv_data}">Get Data</button>
                    </div>
                </div>

            </div>

        </div>

        <div class="px-5  mt-5">
            <div class="downloadLink flex mt-3 justify-end">
                <!-- <p class="flex gap-2 py-3"><img src="../src/img/download.png" alt="">Download Report</p> -->
            </div>
        </div>
    </div>

    <!--End BGV Data -->

</div>

<Toast type={toast_type}  text={toast_text}/> 
<SvelteToast />