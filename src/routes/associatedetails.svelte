<div class="w-widthforFormSection w100xs ">
    <div class="onboardForm ">
        <div class="formTextSection">
            <p class="smxslabel"> Associate Details</p>
            <p class="formHeadingLabel ">Submit basic details of associate</p>
            <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                required </p>
        </div>
        <form action="#">
            <div class="formElements">
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Associate Name <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/Subtract.png" class="w-6 h-auto text-white"
                                    alt="">
                            </span>
                            <input type="text" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Email ID <span class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/email.png" class="w-6 h-auto text-white"
                                    alt="">
                            </span>
                            <input type="Email" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Date of Birth <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/date.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="Email" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup py-1">
                        <label class="formLable ">Associate Photo <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">

                            <span class="profileimage hidden">
                                <img src="../src/img/Maskprofile.jpg"
                                    class="associateProfile" alt="">
                                <span>dhiraj-shah.jpeg </span>
                                <span><img src="../src/img/closeblue.png" alt=""></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Permanent Address <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/location1.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="Email" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable invisible xs:hidden">Permanent Address <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/location1.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="Email" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable">Pin Code<span class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/pincode.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <input type="Email" class="inputbox">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup">
                        <label class="formLable ">Address Proof Copy<span
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
                                Address on the documents has to be same as given.</p>
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
            <div on:click={()=>{temp="a"}} class="backButton">
                <img src="../src/img/arrowleft.png" alt="">
            </div>
            <button on:click={()=>{temp="d"}} class="saveandproceed">Save &
                Proceed</button>
        </div>
    </div>
</div>