<div class="mainContent ">

    <div class="breadcrumb ">
        <div class="breadcrumb-section">
            <p class="breadcrumbtext"><span class="text-textgrey pr-1 text-base">Home / Reports /
                </span> <span class="flex xs:text-base xs:items-center">Associates not onboarded </span>
            </p>
        </div>
    </div>

    <div class="px-5  mt-8 hidde">
        <div class="getReportCard bg-white rounded-lg">
            <h3>Enter below fields to track attendance details </h3>

            <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1">
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
                    <div class="light14greylong">Select User Type</div>
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
            </div>

            <div class="grid grid-cols-7 gap-6 pb-5 xsl:grid-cols-1">
                <div class="col-span-2  items-center ">
                    <div class="light14greylong">From Date</div>
                    <div class="formInnerGroupNote ">
                        <input class="inputboxpopoverdate" type="date">
                    </div>
                </div>
                <div class="col-span-2  items-center ">
                    <div class="light14greylong">To Date</div>
                    <div class="formInnerGroupNote ">
                        <input class="inputboxpopoverdate" type="date">
                    </div>
                </div>

            </div>

            <div class="checkboxSection text-right ">
                <label >
                    <input type="checkbox"> Load Assigned but no In scan
                </label>
                <button class="ErBlueButton ml-3 xsl:mt-3">View Attendance</button>
            </div>
        </div>
        <div class="downloadLink flex mt-8 justify-between xsl:flex-wrap xsl:gap-3">
            <div class="SearchInput">
                <input
                    class="  block w-w300 bg-white border rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search..." type="text" name="search" />
            </div>
            <div class="flex gap-4">
                <p class="flex gap-2 py-3 text-grey"><img src="../src/img/download.png" alt="">Attendance Data
                </p>
                <p class="flex gap-2 py-3 text-grey"><img src="../src/img/download.png" alt="">Attendance
                    Register</p>

            </div>
        </div>
        <div class="getTableData bg-white mb-3 text-left ">
            <table class="table  w-full  mt-2 ">
                <thead class="attendanceTrackor text-left">
                    <tr>
                        <th>Associate Details</th>
                        <th>Location Details</th>
                        <th>Vendor</th>
                        <th>Attendance Details</th>
                        <th>Time Count</th>
                        <th>Travel Detail</th>
                        <th>Other Details</th>
                    </tr>
                </thead>
                <tbody class="attendanceTrackor">
                    <tr>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">User Name</div>
                                    <div class="dataFetched">Dinesh Kumar Tiwari </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">User ID</div>
                                    <div class="dataFetched">CRUN00431 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">User Type</div>
                                    <div class="dataFetched">Hybrid DA (HDA) </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">ER ID</div>
                                    <div class="dataFetched">ER002451 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Unique Facility ID</div>
                                    <div class="dataFetched">---- </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Status</div>
                                    <div class="dataFetched">Active </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Station</div>
                                    <div class="dataFetched">AKLV - Akola SP </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Work Station</div>
                                    <div class="dataFetched">Akola SP </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Org</div>
                                    <div class="dataFetched">Amazon </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Zone</div>
                                    <div class="dataFetched">North </div>
                                </div>
                              
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Vendor</div>
                                    <div class="dataFetched">Shri Anjaneya Enterprises </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Work Type</div>
                                    <div class="dataFetched">NDA </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Linked Partner</div>
                                    <div class="dataFetched">-- </div>
                                </div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Attendance Date</div>
                                    <div class="dataFetched">23/02/2019 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Present</div>
                                    <div class="dataFetched">Yes </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Billable</div>
                                    <div class="dataFetched">Yes </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Load delivered/Pickup up</div>
                                    <div class="dataFetched">Pickup </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Non billable reason</div>
                                    <div class="dataFetched">-- </div>
                                </div>
                              
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">In-Time</div>
                                    <div class="dataFetched">09:00 AM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Out Time</div>
                                    <div class="dataFetched">07:00 PM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Hours Worked</div>
                                    <div class="dataFetched">11:00 Hrs </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Additional Hours</div>
                                    <div class="dataFetched">02:00 Hrs </div>
                                </div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Vehicle In-reading Time</div>
                                    <div class="dataFetched">09:15 AM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Vehicle out-reading Time</div>
                                    <div class="dataFetched">07:00 PM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Total Distance Travelled</div>
                                    <div class="dataFetched">120 KM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Additional KMs</div>
                                    <div class="dataFetched">30 KM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Approved KM Reading</div>
                                    <div class="dataFetched">80 KM </div>
                                </div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">IMEI </div>
                                    <div class="dataFetched">--- </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Insufficient Load at Station</div>
                                    <div class="dataFetched">-- </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Tags</div>
                                    <div class="dataFetched">-- </div>
                                </div>
                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">User Name</div>
                                    <div class="dataFetched">Dinesh Kumar Tiwari </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">User ID</div>
                                    <div class="dataFetched">CRUN00431 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">User Type</div>
                                    <div class="dataFetched">Hybrid DA (HDA) </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">ER ID</div>
                                    <div class="dataFetched">ER002451 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Unique Facility ID</div>
                                    <div class="dataFetched">---- </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Status</div>
                                    <div class="dataFetched">Active </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Station</div>
                                    <div class="dataFetched">AKLV - Akola SP </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Work Station</div>
                                    <div class="dataFetched">Akola SP </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Org</div>
                                    <div class="dataFetched">Amazon </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Zone</div>
                                    <div class="dataFetched">North </div>
                                </div>
                              
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Vendor</div>
                                    <div class="dataFetched">Shri Anjaneya Enterprises </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Work Type</div>
                                    <div class="dataFetched">NDA </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Linked Partner</div>
                                    <div class="dataFetched">-- </div>
                                </div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Attendance Date</div>
                                    <div class="dataFetched">23/02/2019 </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Present</div>
                                    <div class="dataFetched">Yes </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Billable</div>
                                    <div class="dataFetched">Yes </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Load delivered/Pickup up</div>
                                    <div class="dataFetched">Pickup </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Non billable reason</div>
                                    <div class="dataFetched">-- </div>
                                </div>
                              
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">In-Time</div>
                                    <div class="dataFetched">09:00 AM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Out Time</div>
                                    <div class="dataFetched">07:00 PM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Hours Worked</div>
                                    <div class="dataFetched">11:00 Hrs </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Additional Hours</div>
                                    <div class="dataFetched">02:00 Hrs </div>
                                </div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">Vehicle In-reading Time</div>
                                    <div class="dataFetched">09:15 AM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Vehicle out-reading Time</div>
                                    <div class="dataFetched">07:00 PM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Total Distance Travelled</div>
                                    <div class="dataFetched">120 KM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Additional KMs</div>
                                    <div class="dataFetched">30 KM </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Approved KM Reading</div>
                                    <div class="dataFetched">80 KM </div>
                                </div>
                               
                            </div>
                        </td>
                        <td>
                            <div class="dataAttendence ">
                                <div class="dataItems mb-3">
                                    <div class="dataLable">IMEI </div>
                                    <div class="dataFetched">--- </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Insufficient Load at Station</div>
                                    <div class="dataFetched">-- </div>
                                </div>
                                <div class="dataItems mb-2">
                                    <div class="dataLable">Tags</div>
                                    <div class="dataFetched">-- </div>
                                </div>
                                
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>