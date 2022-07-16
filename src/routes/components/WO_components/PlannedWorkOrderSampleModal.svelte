<!-- Planned Work Order Sample-->

<script>
    import { img_url_name } from "../../../stores/flags_store";

    export let showPlannedWo;
    

    window.onclick = (e) => {
    if(e.target.id == "ov")
     {
        showPlannedWo = false;
     }
    //console.log(e.target);
   }
   
</script>
<div>
    <div class="modalMain" id="modal-id">
        <div class="modalOverlay" id="ov"></div>
        <div class="modalContainerAuto  rounded-lg">
            <div class="modalHeadConmb-0 sticky top-0 bg-white z-99" style="position:stick">
                <div class="leftmodalInfo">
                    <p class="text-lg text-erBlue font-medium  ">
                        <span class=""> Planned Work Order Sample</span>
                    </p>
                </div>

                <div class="rightmodalclose">
                    <button  class="closebuttonsection" on:click={()=> showPlannedWo = false}><img src="{$img_url_name.img_name}/close.png"
                        class="closesup" alt=""></button>
                </div>
            </div>
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="">
                            <h3>Sheet Name should be "wo_request"</h3>
                    </div>
                    <div class="mt-2">
                        <table class="border-collapse border border-slate-400  table w-full  text-center workOrderTabel">
                            <thead >
                              <tr>
                                <th class="border border-slate-300 ">Station code</th>
                                <th>Project</th>
                                <th>Area manager Email</th>
                                <th>WO Type</th>
                                <th>Resource Type</th>
                                <th>Van work Type</th>
                                <th>Month_year</th>
                                <th>Date</th>
                                <th>Vendor Code</th>
                                <th>Count </th>
                                <th>Rate </th>
                                <th>Normal Rates </th>
                                <th>Ad-hoc rates </th>
                                <th>Overtime Chargers </th>
                                <th>Extra KM's Chargers </th>
                                <th>Agreed KMs Limit</th>
                                <th>Contract Days</th>
                                <th>Auto-Approve</th>
                                <th>Remarks</th>

                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>DSNP</td>
                                <td>Withrun-FMCG</td>
                                <td>ABCd@elastic.run</td>
                                <td>Planned</td>
                                <td>VA</td>
                                <td>-</td>
                                <td>June-2020</td>
                                <td></td>
                                <td>DSNP099999</td>
                                <td>2</td>
                                <td>100002</td>
                                <td>100002</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>26</td>
                                <td>No</td>
                                <td>VA Required</td>
                              </tr>
                              <tr>
                                <td>ER</td>
                                <td>Elasticrun</td>
                                <td>ABCd@elastic.run</td>
                                <td>Planned</td>
                                <td>VA</td>
                                <td>-</td>
                                <td>June-2020</td>
                                <td></td>
                                <td>DSNP099999</td>
                                <td>2</td>
                                <td>100002</td>
                                <td>100002</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>26</td>
                                <td>No</td>
                                <td>VA Required</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
