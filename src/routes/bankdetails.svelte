<div class="w-widthforFormSection w100xs ">
    <div class="onboardForm ">
        <div class="formTextSection">
            <p class="smxslabel"> Bank Details</p>
            <p class="formHeadingLabel ">Submit associate bank details  </p>
            <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                required </p>
        </div>
        <form action="#">
            <div class="formElements">
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Bank Details<span class="mandatoryIcon">*</span></label>
                        <div class="formInnerGroup ">
                            <span class="searchicon">
                                <img src="../src/img/bank.png" class="placeholderIcon"
                                    alt="">
                            </span>
                            <select class="inputbox">
                                <option class="pt-6">HDFC</option>
                                <option>ICICI</option>
                                <option>Axis</option>
                                <option>SIB</option>
                            </select>
                            <div class="formSelectArrow ">
                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Account Number<span
                                class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img src="../src/img/account.png" class="placeholderIcon"
                                            alt="">
                                    </span>
                                    <input type="text" class="inputbox">
                                </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">Confirm Account Number <span
                                class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img src="../src/img/account.png" class="placeholderIcon"
                                            alt="">
                                    </span>
                                    <input type="text" class="inputbox">
                                </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable ">IFSC Code<span
                                class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img src="../src/img/bank.png" class="placeholderIcon"
                                            alt="">
                                    </span>
                                    <input type="text" class="inputbox">
                                   
                                </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="formGroup ">
                        <label class="formLable invisible xs:hidden">IFSC Code<span
                                class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <p class="noteDescription"><span class="font-medium">Note:</span>
                                        Do not add white space </p>
                                        <p class="branchText">Branch</p>
                                        <p class="locationText">Pune - East Street</p>
                                </div>
                    </div>
                </div>

                <div class="flex mt-2">
                    <div class="formGroupBaseLine ">
                        <label class="formLable">Bank Document<span
                                class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                 
                                    <div class="text-center flex mb-2">
                                    
                                      <div class="flex items-center mr-4 mt-2">
                                        <input id="radio1" type="radio" name="radio" class="hidden" checked />
                                        <label for="radio1" class="radioLable">
                                         <span class="radioCirle"></span>
                                         Cancel Cheque</label>
                                       </div>
                                    
                                       <div class="flex items-center  mt-2">
                                        <input id="radio2" type="radio" name="radio" class="hidden" />
                                        <label for="radio2" class="radioLable">
                                         <span class="radioCirle"></span>
                                         Bank Statement</label>
                                       </div>
                                     </div>
                                     <label class="cursor-pointer">
                                        <div class="bg-erBlue font-medium rounded text-yellow-50 text-sm px-4 py-2 w-w79px">Upload</div>
                                        <input type='file' class="hidden" />
                                    </label>
                                     <p class="noteDescription mt-2"><span class="font-medium">Note:</span>
                                    Photo must be clear and in JPG, PNG, or PDF format to process faster verification</p>
                                </div>
                    </div>
                </div>

             


            </div>

        </form>
    </div>
    <div class="onboardFormNot ">
        <div class="formFooterActionSubmit">
            <div on:click={()=>{temp="d"}} class="backButton">
                <img src="../src/img/arrowleft.png" alt="">
            </div>
            <div>
            <button class="saveandproceed">Save</button>
                <button on:click={routeToSuccess} class="saveandproceed">Submit</button>
            </div>
        </div>
    </div>
</div>