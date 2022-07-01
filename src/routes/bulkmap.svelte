<script>

    import { img_url_name } from "../stores/flags_store";

    function sampleTemplate(){
        modalid.style.display = "block";
    }

    function closeBulk(){
        modalid.style.display = "none";
    }

    async function download_csv_file() {  
        // let count = 0 ;
        // let csvFileData = csvBody + ele.month_year.replace("_"," - ")+ ","+ele.org_id + "," + ele.station_code + "," + ele.resource_id + "," + count + "\n";


        var csvFileData = [  
            ['a','a','a','a','a','a'],
            ['a','a','a','a','a','a']
            // [notonboarded_data[0].month_year,notonboarded_data[0].org_id,notonboarded_data[0].station_code,notonboarded_data[0].resource_id,count]  
        ]; 

        
        //define the heading for each row of the data  
        var csv = 'FacilityID , EmployeeID	 ,Client System ID, Client BGV ID , Client BGV Status, BGV Remarks  \n';  
            
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
        hiddenElement.download = 'Bulk Data Mapping.xlsx';  
        hiddenElement.click();  
    } 
</script>

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <div class="breadcrumbtext flex justify-between">
                <p class="flex">
                    <span class="text-textgrey pr-1 text-base">Home /
                    </span> <span class="flex xs:text-base xs:items-center pl-2">Bulk Employee Mapping</span>
                </p>
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
                                <button class="ErBlueButton" on:click="{download_csv_file}">Planned Work Order</button>
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
                                    <input type="file" class="hidden">
                                </label>
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
                                    <th>FacilityID</th>
                                    <th>EmployeeID</th>
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