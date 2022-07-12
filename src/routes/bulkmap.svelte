<script>

    import { img_url_name } from "../stores/flags_store";
    import {facility_id} from "../stores/facility_id_store";
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import {success_toast ,error_toast,warning_toast} from '../services/toast_theme';
    import Toast from './components/toast.svelte';
    import { allowed_pdf_size } from "../services/pravesh_config";
    import {bulk_emp_map} from "../services/dashboard_services";
    import Spinner from "./components/spinner.svelte";
    import { goto } from "$app/navigation";

    let toast_text = "";
    let toast_type = null;
    let excel_data="";
    let excel_upload_message = "";
    let excel_img = "";
    let show_spinner = false;
    let routePrev = "";

    var finJson;
    function process_wb(wb) {
	var output = "";
	output = JSON.stringify(to_json(wb), 2, 2);
	finJson = output;
    }

    function to_json(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }
    var X;

    if(!$facility_id.facility_id_number){
        console.log("id not found err")
    }

    function sampleTemplate(){
        modalid.style.display = "block";
    }

    function closeBulk(){
        modalid.style.display = "none";
    }

    function convert_to_excel(element_id, type, fn, sheet_name = "client_details") {
        var elt = document.getElementById(element_id);
        var wb = XLSX.utils.table_to_book(elt, { sheet: sheet_name });
        XLSX.writeFile(wb, fn + "." + type);
    }

    var X;
    const onFileSelected = (e,doctext) => {
        console.log("INside onfile selected")
        X = XLSX;
        var files = e.target.files;
        var f = files[0];
        let img = e.target.files[0];
        if (f != undefined) {
            if (img.size <= allowed_pdf_size) {
                console.log("img", img);
                
                if(doctext == "excel_upload"){
                    console.log("Photo log uploaded")  
                    excel_img = img.name;
                    console.log("excel_img",excel_img)  
                }
                var reader = new FileReader()
                // reader.readAsBinaryString(img);
                reader.onload = function () {
                console.log("reader",reader.result);
                
                if(doctext == "excel_upload"){
                    excel_data = reader.result;
                    var wb;
                    wb = X.read(excel_data, { type: 'binary' });
                    process_wb(wb);
                    // console.log("photo_data",reader.result);
                    // toast_text = "Doc Selected";
                    // toast_type = "success";
                    success_toast("Doc Selected")
                    }
                }
                    // var reader = new FileReader();
                    reader.readAsBinaryString(f);
                    reader.onerror = function (error) {
                    console.log("Error: ", error);
                    }
            }
            else {
            alert(
                "File size is greater than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB. Please upload a file less than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB ."
            );
        };
    }
}

    function download_template(){
        var data = document.getElementById('template_download');
        var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
        XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' });
        XLSX.writeFile(file, 'Bulk Empoloyee ID Template.' + 'xlsx');
        convert_to_excel(tabID, 'xlsx', fileTitle, sheet_name)

    }

    async function final_map(){
        let map_data = [];
        let new_payload_map_data = [];
        let bulk_emp_map_payload ;

        finJson = JSON.parse(finJson);
        // console.log("finJson",finJson)
        // console.log("finJson",finJson.sheet1)

        for (let k = 0; k < finJson.sheet1.length; k++) {
            // var ele = finJson[k];
            // console.log("im ele",ele)
            map_data.push(finJson.sheet1[k]);
        }

        map_data = map_data;
        console.log("im in map_data",map_data)
        console.log("im in map_data",map_data[0].FacilityID)

        for(let i=0;i<map_data.length;i++){

            // {"id_data":[{"resourceID":"AXHN00112","clientEMPID":"12542667666767","clientSystemID":"manhuk@amazon.com","status":"Green","client_bgv_id":"15161717"},{"resourceID":"EFBH01100","clientEMPID":"10000332222","clientSystemID":"67653555@flipkart.com","status":"Red","client_bgv_id":"151617656"}]}
            
            new_payload_map_data.push({"resourceID":map_data[i].FacilityID,"clientEMPID":map_data[i].EmployeeID,"clientSystemID":map_data[i].ClientSystemID,"status":map_data[i].BGVRemarks,"client_bgv_id":map_data[i].ClientBGVID});
            bulk_emp_map_payload = {"id_data":new_payload_map_data}
        }
        console.log("im in bulk_emp_map",bulk_emp_map_payload)


        if(!map_data[0].FacilityID){
            error_toast("Please add Facility ID")
        }

        // if(!map_data[i].EmployeeID){
        //     error_toast("Please add Employee ID")
        // }

        // if(!map_data[i].ClientSystemID){
        //     error_toast("Please add ClientSystem ID")
        // }

        // if(!map_data[i].BGVRemarks){
        //     error_toast("Please add BGV Remarks")
        // }

        // if(!map_data[i].ClientBGVID){
        //     error_toast("Please add ClientBGV ID")
        // }

       let bulk_emp_map_res = await bulk_emp_map(bulk_emp_map_payload)
       show_spinner = true;        
       try{
            if(bulk_emp_map_res.body.status == "green"){
                show_spinner = false;
                // toast_type = "success";
                // toast_text = bulk_search_res.body.message;
                success_toast(bulk_emp_map_res.body.message)
            }
            else{
                show_spinner = false;
                // toast_type = "error";
                // toast_text = bulk_search_res.body.message;
                error_toast(bulk_emp_map_res.body.message)

            }
            
        }
        catch(err){
            show_spinner = false;
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }
    }

    function routeToDash() {
        let replaceState = false;
        goto(routePrev, { replaceState });
    }

    routePrev = "reports";





//     function zoom(e) {
//   var zoomer = e.currentTarget;
//   e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
//   e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
//   x = (offsetX / zoomer.offsetWidth) * 100;
//   y = (offsetY / zoomer.offsetHeight) * 100;
//   zoomer.style.backgroundPosition = x + "% " + y + "%";
// }

</script>

{#if show_spinner}
    <Spinner />
{/if}


<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <div class="breadcrumbtext flex justify-between">
                <p class="flex">
                    <span class="text-textgrey pr-1 text-base">Home /
                    </span> <span class="flex xs:text-base xs:items-center pl-2">Bulk Employee Mapping</span>
                </p>
                <button type="button"
                class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3" on:click="{routeToDash}">Back</button>
            </div>
        </div>
    </div>

    <div class="px-5  mt-8">
        <div class="headingforbulkupload">
            <h3 class="text-base font-medium">Bulk Upload File for Employee ID Mapping </h3>
        </div>
    </div>

    <div class="px-5  mt-8 ">
        <div class=" bg-white rounded-lg">
            <div class="mt-3">
                <div class="caretforImage">
                    <img src="../src/img/caret.svg" class="caretBulkemp" alt="">
                </div>
                <div class="getReportCard bg-white rounded-lg">


                    <div class="grid grid-cols-6 gap-6 pb-5 xsl:grid-cols-1 xsl:gap-2">
                        <div class="downloadTemplateSec col-span-2 bg-bglightgreycolor px-4 py-6 rounded-lg">
                            <h3>Download Template</h3>
                            <p class="text-grey text-font13px">Download sample bulk employee mapping template
                            </p>

                            <div class="planWOandSample flex gap-4 mt-6">
                                <button class="ErBlueButton" on:click="{download_template}">Download the Templete</button>
                                <p class="flex items-center smButtonText">
                                    <button class="smButton" on:click="{sampleTemplate}">
                                        View Sample Format
                                    </button>
                                </p>
                            </div>
                        </div>

                        <div class="selectfile col-span-4">
                            <h3>Upload file here to create bulk Employee ID mapping</h3>
                            <div class="flex items-center gap-3">

                                Select file <label class="cursor-pointer">
                                    <div class="uploadbutton">Upload</div>
                                    <input type="file" class="hidden" on:change={(e) =>
                                        onFileSelected(e,"excel_upload")}
                                        bind:value="{excel_data}" accept=".xls,.xlsx">
                                        <div class="text-red-500">{excel_upload_message}</div>
                                </label>
                                <p class="text-grey ml-4">{excel_img}</p>
                                <div class="uploadbutton" on:click="{final_map}">Map</div>

                                <!-- <figure class="zoom" onmousemove="zoom(event)" style="background-image: url(//res.cloudinary.com/active-bridge/image/upload/slide1.jpg)">
                                    <img src="//res.cloudinary.com/active-bridge/image/upload/slide1.jpg" />
                                  </figure> -->

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>

</div>


<!-- Bulk Employee Mapping Sample modal -->
<div class="hidden" id="modalid">
    <div class="modalMain" >
        <div class="modalOverlay"></div>
        <div class="modalContainerAuto rounded-lg">
            <div class="modalHeadConmb-0 sticky top-0 bg-white z-99">
                <div class="leftmodalInfo">
                    <p class="text-lg text-erBlue font-medium  ">
                        <span class=""> Bulk Employee Mapping Sample</span>
                    </p>
                </div>
                <div class="rightmodalclose" on:click="{closeBulk}">
                    <img src="{$img_url_name.img_name}/blackclose.svg" class="cursor-pointer" alt="">
                </div>
            </div>
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="text-sm">
                        <p>Sheet Name should be "client_details"  </p>
                        <p>Column Names should be as below ( check sample data as well)  </p>
                        <p class="text-black font-medium mt-2">Note : For Client BGV mapping, fill only FacilityID and Client BGV related column
                        </p>
                    </div>
                    <div class="mt-3">
                        <table
                            class="border-collapse border border-slate-400  table w-full  text-center workOrderTabel">
                            <thead>
                                <tr>
                                    <th>Facility ID</th>
                                    <th>Employee ID</th>
                                    <th>Client System ID</th>
                                    <th>Client BGV ID</th>
                                    <th>Client BGV Status</th>
                                    <th>BGV Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>344343334434</td>
                                    <td>ABCd@Amazon.com</td>
                                    <td>214234323</td>
                                    <td>green</td>
                                    <td>-</td>
                                    <td>-</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- format  -->

<table
class="border-collapse border border-slate-400  table w-full  text-center workOrderTabel hidden" id="template_download">
<thead>
    <tr>
        <th>FacilityID</th>
        <th>EmployeeID</th>
        <th>ClientSystemID</th>
        <th>ClientBGVID</th>
        <th>ClientBGVStatus</th>
        <th>BGVRemarks</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>344343334434</td>
        <td>ABCd@Amazon.com</td>
        <td>214234323</td>
        <td>green</td>
        <td>-</td>
        <td>-</td>

    </tr>
</tbody>
</table>


<Toast type={toast_type}  text={toast_text}/>
<SvelteToast />


<!-- <style>
    figure.zoom {
  background-position: 50% 50%;
  position: relative;
  width: 500px;
  overflow: hidden;
  cursor: zoom-in;
}
figure.zoom img:hover {
  opacity: 0;
}
figure.zoom img {
  transition: opacity 0.5s;
  display: block;
  width: 100%;
}
</style> -->