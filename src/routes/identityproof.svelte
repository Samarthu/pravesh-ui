<div class="w-widthforFormSection w100xs ">
    <div class="onboardForm ">
        <div class="formTextSection">
            <p class="smxslabel"> Identity Proof</p>
            <p class="formHeadingLabel ">Submit associate identity proof details </p>
            <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                required </p>
        </div>
        <form action="#">
            <div class="formElements">
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">PAN Card Number <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/pan.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="text" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroupBaseLine py-1">
                        <label class="formLable ">PAN Card Copy <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">

                            <span class="profileimage">
                                <span>dhiraj-shah.jpeg </span>
                                <span><img src="../src/img/closeblue.png" alt=""></span>
                            </span>
                            <div class="mt-2">
                                <img src="../src/img/pancard.png" class="uploadedImage"
                                    alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Aadhar Card Number <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/pan.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="text" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroupBaseLine">
                        <label class="formLable ">Aadhar Card Copy <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <label class="cursor-pointer ">
                                <div class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px">Upload</div>
                                <input type='file' class="hidden" />
                            </label>
                            <p class="noteDescription mt-2"><span class="font-medium">Note:</span>
                                Photo must be clear and in JPG, PNG, or PDF format to process faster
                                verification</p>
                        </div>
                    </div>
                </div>

                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Voter ID Number <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/pan.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="text" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroupBaseLine py-1">
                        <label class="formLable ">Voter ID Copy <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">

                            <span class="profileimage">
                                <span>voter-id.jpeg </span>
                                <span><img src="../src/img/closeblue.png" alt=""></span>
                            </span>
                            <div class="mt-2">
                                <img src="../src/img/pancard.png" class="uploadedImage"
                                    alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable">Driving License Number <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/pan.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="text" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroupBaseLine">
                        <label class="formLable ">Driving License Copy <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <label class="cursor-pointer ">
                                <div class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px">Upload</div>
                                <input type='file' class="hidden" />
                            </label>
                            <p class="noteDescription mt-2"><span class="font-medium">Note:</span>
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
            <div on:click={()=>{temp="c"}} class="backButton">
                <img src="../src/img/arrowleft.png" alt="">
            </div>
            <button on:click={()=>{temp="e"}} class="saveandproceed">Save &
                Proceed</button>
        </div>
    </div>
</div>