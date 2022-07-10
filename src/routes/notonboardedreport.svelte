<script>
    import { goto } from "$app/navigation";
    import {get_client_org_mapping, get_specific_name, not_onboarded_data} from "../services/vmt_verify_services";
    import { get_loc_scope} from "../services/onboardsummary_services";
    import Toast from './components/toast.svelte';
    import Spinner from "./components/spinner.svelte";
    import {get_date_format} from '../services/date_format_servives';

    let stat_select;
    let id_select;
    let get_client_data_mapping_data = [];
    let toast_text;
    let toast_type;
    let table_head = "";
    let station_code_arr = [];
    let org_AN_flag = 0;
    let station_data_array=[];
    let notonbDate;
    let notonboarded_data = [];
    let routetoreports = "";

    $:if(stat_select != null){
        console.log("station_select",stat_select)
        station_code_select(stat_select);
    }

    $:if(id_select != null){
        console.log("id_select",id_select)
        org_id_select(id_select);
    }

    normal();

    async function normal(){
        let get_client_data_mapping_res = await get_client_org_mapping();
        try {
            console.log("im in green",get_client_data_mapping_res)

        if(get_client_data_mapping_res.body.status == "green"){
            console.log("GREEN")
             for(let i=0;i<get_client_data_mapping_res.body.data.length;i++){
                 console.log("inside /api/method/pravesh.facility.routes.organisation.get_org_list?org_field=[%22*%22]")
                // station_code.push(get_client_data_mapping_res.body.data[i].station_code);
                // org_name_array.push(get_client_data_mapping_res.body.data[i].org_name)
                // get_client_data_mapping_data.push(get_client_data_mapping_res.body.data[i]);
                get_client_data_mapping_data.push({"org_id":get_client_data_mapping_res.body.data[i].org_id,"org_name":get_client_data_mapping_res.body.data[i].org_name})

                
            }
            // station_code = station_code;
            // org_name_array=org_name_array;
            get_client_data_mapping_data = get_client_data_mapping_data;
            console.log("get_client_data_mapping_data",get_client_data_mapping_data)
            // for(let i=0;i<get_client_data_mapping_data.length;i++){
               
            //     org_name = get_client_data_mapping_data[i].org_name;
            //     // gst_city_loc_id = get_client_data_mapping_data[i].location_id;
            //     // gst_state_code = get_client_data_mapping_data[i].state_code;
            //     console.log("org_name",org_name)
            // }
        }
        else{
            toast_type = "error";
            toast_text = "No client Data";
        }
        
        } catch(err) {
            toast_type = "error";
            toast_text = err;
        
    }
    }

    function routeToReports() {
        let replaceState = false;
        goto(routetoreports, { replaceState });
    }

    async function station_code_select(station_code){
        station_code_arr = [];
        console.log("station_code",station_code.toLowerCase())
        let get_specific_name_res = await get_specific_name(station_code.toLowerCase())
        station_code_arr.push(get_specific_name_res.body.data[0].resource_id)
        console.log("get_specific_name_res",get_specific_name_res)

        station_code_arr = station_code_arr;
        console.log("station_code_arr",station_code_arr)

    }

    async function org_id_select(org_id){
        if(org_id == "AN"){
            table_head = "Name in COMP"
        }
        else if(org_id == "FT"){
            table_head = "Name in LIBERA"
        }
        else{
            table_head = "Org Specific Name"
        }
        station_code_arr = [];
        org_AN_flag = 0;
        console.log("org_AN_flag",org_AN_flag)
        station_data_array = [];
        // console.log("orgOrganization_id",org_id)
        let get_loc_scope_res = await get_loc_scope(org_id)
                for(let i=0;i<get_loc_scope_res.body.data.length;i++){
                    for(let j =0 ;j<get_loc_scope_res.body.data[i].stations.length;j++){
                        
                        // console.log("org id inside for",org_id)
                    if(org_id  == get_loc_scope_res.body.data[i].stations[j].org_id){
                        console.log("org id found",org_id);
                        station_data_array.push({"org_id":get_loc_scope_res.body.data[i].stations[j].org_id,"station_name":get_loc_scope_res.body.data[i].stations[j].station_name,"station_code":get_loc_scope_res.body.data[i].stations[j].station_code})
                        if(get_loc_scope_res.body.data[i].stations[j].org_id == "AN"){
                            org_AN_flag = 1;
                            console.log("inside if org_id",org_AN_flag)
                        }
                        else{
                            org_AN_flag = 0; 
                        }
                    }
                    }
                }
                station_data_array = station_data_array;
        console.log("station_data_array",station_data_array);

                
    }

    async function download_csv_file() {  
        let count = 0 ;

        if(!stat_select){
            toast_text = "Please select Station";
            toast_type = "error";
            return
        }

        if(!id_select){
            toast_text = "Please select organization";
            toast_type = "error"
            return
        }


        let notonboardDate = new Date(notonbDate);
        let new_date =get_date_format(notonboardDate,"MMMM/YYYY");

        let not_onboarded_data_res = await not_onboarded_data(stat_select,new_date)
        console.log("not_onboarded_data inside",not_onboarded_data_res)
        try {
            if (not_onboarded_data_res != "null"){
                for(let i=0; i< not_onboarded_data_res.body.data.length;i++){
                    notonboarded_data.push(not_onboarded_data_res.body.data[i]);
                }
                notonboarded_data = notonboarded_data;
                console.log("insnde notonboarded_data",notonboarded_data[0].month_year)
            }

            for (let i = 0; i < notonboarded_data[0].daily_work.length; i++) {
                count = count + notonboarded_data[0].daily_work[i].work_done
            }
            console.log("inside daily work",count)

        } catch (error) {
            toast_type = "error";
            toast_text = not_onboarded_data_res.body.message;
        }

        // let csvFileData = csvBody + ele.month_year.replace("_"," - ")+ ","+ele.org_id + "," + ele.station_code + "," + ele.resource_id + "," + count + "\n";


        var csvFileData = [  
            // ['Alan Walker', 'Singer'],  
            // ['Cristiano Ronaldo', 'Footballer'],  
            // ['Saina Nehwal', 'Badminton Player'],  
            // ['Arijit Singh', 'Singer'],  
            [notonboarded_data[0].month_year,notonboarded_data[0].org_id,notonboarded_data[0].station_code,notonboarded_data[0].resource_id,count]  
        ]; 

        
        //define the heading for each row of the data  
        var csv = 'Month-Year , Org ID ,Station Code , Associate Name , Monthly Count of Work  \n';  
            
        //merge the data with CSV  
        csvFileData.forEach(function(row) {  
                csv += row.join(',');  
                csv += "\n";  
        });  
        
        //display the created CSV data on the web browser   
        document.write(csv);  

        
        var hiddenElement = document.createElement('a');  
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
        hiddenElement.target = '_blank';  
            
        //provide the name for the CSV file to be downloaded  
        hiddenElement.download = 'NotOnboardedAssocistes.csv';  
        hiddenElement.click();  
    } 


    routetoreports = "reports";
</script>

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section flex-1	">
            <p class="breadcrumbtext"><span class="text-textgrey pr-1 text-base">Home / Reports /
                </span> <span class="flex xs:text-base xs:items-center">Associates not onboarded </span>
                <button type="button" class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3 ml-auto" on:click="{routeToReports}">Back</button>
        </div>
    </div>

    <!-- <button type="button" class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3">Back</button> -->


    <!-- Associates not onboarded -->

    <div class="px-5  mt-8 ">
        <div class="getReportCard bg-white rounded-lg">
            <h3>Get report of facilities who have worked but have name mismatch issues </h3>

            <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1">
                <div class="col-span-2  items-center ">
                    <div class="light14greylong">Select Organization</div>
                    <div class="formInnerGroupNote ">
                        <select class="inputboxpopover" bind:value={id_select}>
                            <option value="" disabled selected>Select</option>
                            {#each get_client_data_mapping_data as org_detail}
                                <option
                                    class="pt-6"
                                    value="{org_detail.org_id}"
                                    >{org_detail.org_name}</option
                                >
                            {/each}
                        </select>
                        <div class="formSelectArrow ">
                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-span-2  items-center ">
                    <div class="light14greylong">Select Station</div>
                    <div class="formInnerGroupNote ">
                        <select class="inputboxpopover" bind:value={stat_select}>
                            <option value="" disabled selected>Select</option>
                            {#each station_data_array as station}
                                <option
                                    class="pt-6" 
                                    value={station.station_code}
                                    >{station.station_code} - {station.station_name}</option
                                >
                                {/each}
                        </select>
                        <div class="formSelectArrow ">
                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-span-2  items-center ">
                    <div class="light14greylong">Select Month and Year</div>
                    <div class="formInnerGroupNote ">
                        <input class="inputboxpopoverdate" type="date" bind:value="{notonbDate}" onkeydown="return false">
                    </div>
                </div>

                <div class="text-right items-end justify-start flex">
                    <button class="ErBlueButton" on:click="{download_csv_file}">Get Data</button >
                </div>
            </div>
        </div>

        <!-- <div class="downloadLink flex mt-3 justify-end">
            <p class="flex gap-2 py-3"><img src="../src/img/download.png" alt="">Download Report</p>
        </div> -->

        <!-- <div class="getTableData bg-white">
            <table class="table  w-full text-center mt-2 ">
                <thead class="tHeadAssociate">
                    <tr>
                        <th>Org ID</th>
                        <th>Station Code</th>
                        <th>Resource ID</th>
                    </tr>
                </thead>
                <tbody class="tBodyAssociate">
                    <tr>
                        <td>Amazon</td>
                        <td>ANDL</td>
                        <td>Mohd_asif_bpoa_11239837277_vrma</td>
                    </tr>
                    <tr>
                        <td>Amazon</td>
                        <td>ANDL</td>
                        <td>Mohd_asif_bpoa_11239837277_vrma</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>

    <!--End Associates not onboarded -->

</div>