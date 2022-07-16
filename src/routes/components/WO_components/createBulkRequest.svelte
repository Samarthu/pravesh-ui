<script>
export let BulkWo;

///import {convertExceltoJson} from "../../handler/convertion";
//import XLSX from 'xlsx';

import { fade } from 'svelte/transition';
import AddHocWOSampleModal from "./AddHocWOSampleModal.svelte";
import PlannedWorkOrderSampleModal from "./PlannedWorkOrderSampleModal.svelte";
import {success_toast,error_toast,warning_toast} from "../../../services/toast_theme";
import { SvelteToast, toast } from '@zerodevx/svelte-toast'
import {img_url_name} from "../../../stores/flags_store"
import {bulkUploadFile}  from "../../../services/organisation";
let showPlannedWo = false;
let showAdhocWo =  false;
// $:if(convExTJSon) {
//    console.log(convExTJSon); 
// }

// let convExTJSon ;
// var ExcelToJSON = function() {
//   this.parseExcel = function(file) {
//   var reader = new FileReader();
//   reader.onload =  function(e) {
//     var data = e.target.result;
//     var workbook = XLSX.read(data, {
//       type: 'binary'
//     });

//     workbook.SheetNames.forEach(function(sheetName) {
      
//       var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
//       var json_object = JSON.stringify(XL_row_object);
    
//       convExTJSon = JSON.parse(json_object);
     
//     })
//   };

//   reader.onerror = function(ex) {
//     console.log(ex);
//   };
//   reader.readAsBinaryString(file); 
// };
// };

$:{

}
let base64;
let fileSelected = false;
let fileName = "";


const uploadFile = async () =>{
    let f_data = {
        doctype:"WO Bulk Upload",
        filename : fileName,
        filedata : base64,
        is_private:1
    }
   // console.log(JSON.stringify(f_data));
    let res = await bulkUploadFile(f_data);
    console.log(res)
    // if(res.status == "green")
    // {
    //     success_toast("file uplaod successfully");
    //     deleteFile();
    // }
    // else{
    //     error_toast("There is error in File Uplaod");
    // }
    
}

const selectFile =(file) =>{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) =>{
        base64 = e.target.result;
        fileName = file.name;
        fileSelected = true;
       
       
    }
    reader.onerror=(e)=>console.log(e);
    // let formData =  new FormData();

}

const deleteFile = () =>{
    const f = document.getElementById('file');
    f.value = "";
    fileName ="";
    fileSelected = false;
}


const  handleFileUpload = (e) =>{
    const file = e.target.files[0];
    if(file){
        selectFile(file)
        success_toast("Doc Selected")
        console.log(file);
        // var xl2json = new ExcelToJSON();
        // xl2json.parseExcel(file);
        
    } 
    else{
        error_toast("file is Empty!...");
        console.log("file is empty!");
    }
}


</script>
<div class="FilterWorkStatus shadow-lg rounded-lg m-5 border-2" transition:fade>
   
    <div >
        <div class="caretforImage">
             <img src="../src/img/caret.svg" class="caretBulkemp" style="margin-right: 90px; " alt="">
        </div>
        <div class="getReportCard bg-white rounded-lg ">
          <div class="flex justify-between">
             <h3>Create Bulk WO Request </h3>
             <p>
                <button  class="closebuttonsection" on:click={()=> BulkWo = false}><img src="{$img_url_name.img_name}/close.png"
                    class="closesup" alt=""></button>
             </p>
         </div>
            <div class="grid grid-cols-6 gap-6 pb-5 xsl:grid-cols-1 xsl:gap-2 space-x-24 ">
               <div class="downloadTemplateSec col-span-2 bg-bglightgreycolor px-4 py-4">
                    <h3>Download Template</h3>
                    <p class="text-grey text-font13px">Download sample work order excel template</p>
                 
                    <div class="planWOandSample flex gap-4 mt-6">
                    <a href="/src/assets/Planned_Work_Order_Bulk_Format.xlsx" target="_blank"><button class="ErBlueButton" >Planned Work Order</button></a>
                    <p class="flex items-center smButtonText">
                        <button class="smButton" on:click|stopPropagation ={()=> showPlannedWo = !showPlannedWo}>
                            View Sample Format
                        </button>
                    </p>
                   </div>

            <div class="py-5">
                <hr>
            </div>

            <div class="planWOandSample flex gap-4">
                <a href="/src/assets/Ad-hoc_Work_Order_Bulk_Format.xlsx" target="_blank" class="ErBlueButton" >Ad-hoc Work Order</a>
                <p class="flex items-center smButtonText">
                    <button class="smButton" id="abtn" on:click|stopPropagation ={()=> showAdhocWo = !showAdhocWo}>
                        View Sample Format
                    </button>
                </p>
               </div>

        </div>
            <div class="selectfile col-span-4 space-x-12">
                <h3>Upload file here to create bulk WO request</h3>
                <div class="flex items-center font-bold  space-x-2 ">
                    <p>Select file</p> 
                <label class="cursor-pointer  ">
                    <div class="uploadbutton">Select </div>
                    <input type="file" id="file" on:change={(e)=> handleFileUpload(e) } class="hidden" accept=".xls,.xlsx,.png,.jpeg">
                </label>
                <div class="flex">
                    {#if fileSelected }
                        <p class="text-gray-400">{fileName}</p>
                        <img
                            class="pl-2 cursor-pointer"
                            on:click={deleteFile}
                            src="{$img_url_name.img_name}/blackclose.svg"
                            alt=""
                        />
                        <div class="uploadbutton ml-2" on:click={uploadFile}> Upload </div>
                    {/if}
                </div>
               </div>
            </div>
            </div>
        </div>
    </div>
</div>


{#if showPlannedWo}
<PlannedWorkOrderSampleModal bind:showPlannedWo = {showPlannedWo}></PlannedWorkOrderSampleModal>
{/if}

{#if showAdhocWo}
<AddHocWOSampleModal  bind:showAdhocWo = {showAdhocWo}></AddHocWOSampleModal>
{/if}
<SvelteToast />