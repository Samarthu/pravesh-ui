<script>
    let routeTo = "";

    function route(){
        let replaceState = false;
        goto(routeTo, { replaceState });
    }

    routeTo = "verifycontactnumber";
</script>

<div class="w-widthforFormSection w100xs ">
    <div class="onboardForm ">
           <div class="formTextSection">
            <p class="smxslabel"> Work Details</p>
            <p class="formHeadingLabel ">Submit associate work details</p>
            <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                required </p>
        </div>
        <form action="#">
            <div class="formElements">
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Work
                            Organization <span class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/organization.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <select class="inputbox">
                                <option class="pt-6">Amazon</option>
                                <option>Flipkart</option>
                                <option>Velocity</option>
                                <option>Corporate</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup">
                        <label class="formLable ">Work City <span class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/location.png" class="placeholderIcon" alt="">
                            </span>
                            <select class="inputbox">
                                <option class="pt-6">Pune</option>
                                <option>Nagpur</option>
                                <option>Hydrabad</option>
                                <option>Kolhapur</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup">
                        <label class="formLable ">Work
                            Station <span class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/warehouse.png" class="placeholderIcon" alt="">
                            </span>
                            <select class="inputbox">
                                <option class="pt-6">MHPD - Mulshi SP</option>
                                <option>MHPD - Haveli SP</option>
                                <option>HBPD - Bangloru SP</option>
                                <option>MHPD - Mulshi SP</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup">
                        <label class="formLable ">Associate Type <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/Subtract.png" class="placeholderIcon" alt="">
                            </span>
                            <select class="inputbox">
                                <option class="pt-6">NDA</option>
                                <option>Leader</option>
                                <option>Velocity</option>
                                <option>Corporate</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup">
                        <label class="formLable ">Vendor Name<span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/managericon.png" class="placeholderIcon" alt="">
                            </span>
                            <select class="inputbox">
                                <option class="pt-6">Vitthal Sutar - MHPD00012</option>
                                <option>Rakesh Raj - MHPD00012</option>
                                <option>Vishwas Patil</option>
                                <option>Somnath Narule</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup">
                        <label class="formLable ">Offer Letter Copy<span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                                <label class="cursor-pointer ">
                                    <div class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px">Upload</div>
                                    <input type='file' class="hidden" />
                                </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="formElements">
                <div class="flex">
                    <div class="formGroupNote">
                        <label class="formLable xs:hidden sm:hidden"></label>
                        <div class="formInnerGroupNote">
                            <p class="noteDescription"><span class="font-medium">Note:</span>
                                Photo must be clear and in JPG, PNG, or PDF format to process faster
                                verification</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="onboardFormNot ">
        <div class="formFooterAction">
            <div on:click={routeToWorkforce} class="backButton">
                <img src="../src/img/arrowleft.png" alt="">
            </div>
            <button on:click="{route}" class="saveandproceed">Save &
                Proceed</button>
        </div>
    </div>
</div>