<script> 
export let filter;
import { fade } from 'svelte/transition';
import { img_url_name } from '../../../stores/flags_store';


</script>

<div class="FilterWorkStatus shadow-lg rounded-lg border-2 m-5" transition:fade >
        <div class="mt-3">
            <div class="caretforImage">
                 <img src="/pravesh-ui/caret.svg" class="caretBulkemp" alt="">
            </div>
            <div class="getReportCard bg-white rounded-lg">
                <div class="flex justify-between">
                <h3>Filter work order status </h3>

                    <div class="closebuttonsection" on:click={()=> filter = false }>
                        <img
                        src="{$img_url_name.img_name}/close.png"
                        class="closesup"
                        alt=""
                        />
                    </div>
               </div>

                <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1 xsl:gap-2">
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Organization</div>
                        <div class="formInnerGroupNote ">
                            <select class="inputboxpopover">
                                <option class="pt-6">Select</option>
                                <option>ICICI</option>
                                <option>Axis</option>
                                <option>SIB</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Station</div>
                        <div class="formInnerGroupNote ">
                            <select class="inputboxpopover">
                                <option class="pt-6">Select</option>
                                <option>ICICI</option>
                                <option>Axis</option>
                                <option>SIB</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Month & Year</div>
                        <div class="formInnerGroupNote ">
                            <input class="inputboxpopoverdate" type="month">
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1">
                  
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Work Order Type</div>
                        <div class="formInnerGroupNote ">
                            <select class="inputboxpopover">
                                <option class="pt-6">Select</option>
                                <option>ICICI</option>
                                <option>Axis</option>
                                <option>SIB</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2  items-center ">
                        <div class="light14greylong">Select Work Order Status</div>
                        <div class="flex gap-3 mt-2">
                            <button class="smButton  bg-bgGreen encolor border-none text-white text-font13px">Approved</button>
                            <button class="smButton bg-bgyellow  border-none text-white text-font13px">Requested</button>
                            <button class="smButton bg-mandatorysign  border-none text-white text-font13px">Cancelled</button>
                        </div>
                    </div>

                    <div class="text-right  justify-start flex items-center">
                        <button class="ErBlueButton">Filter</button>
                    </div>
                </div>

                <div class="py-4 mb-4">
                    <hr>
                </div>

                <div class="grid grid-cols-6 xsl:grid-cols-1 gap-6 mt-2 items-center">
                    <div class="flex col-span-2 lgc:col-span-3 xsl:col-span-5 xsl:flex-wrap ">
                        <label class="text-base text-blackshade font-medium mr-3 whitespace-nowrap">Search work order by<span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup xsl:mt-3">
                            <div class="text-center flex mb-2 ml-3">
                                <div class="flex items-center mr-5">
                                    <input id="radio1" type="radio" name="radio" class="hidden" checked="">
                                    <label for="radio1" class="radioLable text-grey">
                                        <span class="radioCirle"></span>
                                        Order ID</label>
                                </div>
                                <div class="flex items-center  ">
                                    <input id="radio2" type="radio" name="radio" class="hidden">
                                    <label for="radio2" class="radioLable  text-grey">
                                        <span class="radioCirle"></span>
                                        Approved ID</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 xsl:col-span-5">
                        <div class="items-center ">
                            <div class="formInnerGroupNote ">
                                <input class="inputboxpopover" type="search">
                            </div>
                        </div>  
                    </div>
                    <div class="col-span-1">
                        <button class="ErBlueButton">Search</button>
                    </div>
                </div>

            </div>  
        </div> 
</div>
     