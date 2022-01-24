<div class="w-widthforFormSection w100xs ">   
    <!-- Associate Mobile -->
    <div class="onboardForm hidden">
        <div class="formTextSection">
            <p class="formLabelText ">Verify associate contact Number</p>
        </div>
        <form action="#">
            <div class="formElements">
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Associate Mobile Number <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/mobilephone.png" class="placeholderIcon" alt="">
                            </span>
                            <input type="text" class="inputbox">
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
                                An OTP code will send to associate mobile number</p>
                            <button class="ErBlueButton mt-3">Send OTP</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <!-- OTP Verification -->
    <div class="onboardForm ">
        <div class="formTextVerification">
            <p class="formLabelText ">OTP Verification</p>
            <p class="verifyDescription">A 6 digit OTP has been sent to associates mobile number </p>
        </div>
        <form action="#">
            <div class="formElements">
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Enter OTP code <span
                                class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/mobilephone.png" class="placeholderIcon" alt="">
                            </span>
                            <input type="text" class="inputbox">
                        </div>
                    </div>
                </div>

            </div>

            <div class="formElements">
                <div class="flex">
                    <div class="formGroupNote">
                        <label class="formLable xs:hidden sm:hidden"></label>
                        <div class="formInnerGroup">
                            <p class="noteDescription  flex justify-between">
                                <span class="secText">60 Sec</span>
                                <span> OTP sent on 8856022890 <a href="#"
                                        class="editLink">Edit</a> </span>
                            </p>
                            <button on:click={()=>{temp="c"}} class="ErBlueButton mt-3">Verify & Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

</div>