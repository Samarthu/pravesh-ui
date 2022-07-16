<script>
 let  showpop = false;

</script>

<div class="downloadLink flex mt-4 mb-4 m-4 justify-between xsl:flex-wrap xsl:gap-3 lgc:flex-wrap">
    <div class="SearchInput">
        <input
            class=" block w-w300 bg-white border rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search..." type="text" name="search" />
    </div>

    <div class="flex  items-center xsl:hidden lgc:flex-wrap">
        <div class="relative inline-block text-left pr-3">
            <div>
                <button type="button"
                    class="outline-none inline-flex justify-center items-center gap-2 text-base text-greycolor w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-normal  hover:bg-gray-50 focus:outline-none focus:none"
                    on:click={()=>showpop=!showpop } aria-expanded="true" aria-haspopup="true">
                    Download
                    <img src="../src/img/downarrow.svg" class="w-4 h-auto" alt="">

                </button>
            </div>
            <div class=" origin-top-right absolute outline-none right-0  w-56 rounded-md shadow-lg bg-white ring-1 text-base text-greycolor ring-black ring-opacity-5 font-normal  focus:outline-none {showpop ? "":"hidden"}"
                id="optionsMenu">
                <div class="py-1" role="none">
                    <a href="#" class="text-gray-700 flex gap-2 px-4 py-2 text-sm" role="menuitem"
                        tabindex="-1" id="menu-item-0"> <img src="../src/img/download-approved.svg" class="w-5" alt=""> Approved WO</a>
                    <a href="#" class="text-gray-700 flex  gap-2 px-4 py-2 text-sm" role="menuitem"
                        tabindex="-1" id="menu-item-1"><img src="../src/img/download-Excel.svg" class="w-5" alt=""> Excel</a>
                    <a href="#" class="text-gray-700 flex gap-2 px-4 py-2 text-sm" role="menuitem"
                        tabindex="-1" id="menu-item-2"> <img src="../src/img/download-csv.svg" class="w-5" alt=""> CSV</a>
                    <a href="#" class="text-gray-700 flex  gap-2 px-4 py-2 text-sm" role="menuitem"
                        tabindex="-1" id="menu-item-2"><img src="../src/img/download-csv.svg" class="w-5" alt=""> Copy WO</a>

                </div>
            </div>
        </div>

        <div class="flex items-center px-2">
            <p class="mb-0 font-light text-sm text-greycolor">Showing</p>
        </div>
        <div class="inline-block relative w-32">
            <select
                class="block appearance-none w-full outline-none bg-white text-greycolor border font-normal  text-base border-gray-300  px-4 py-2 pr-8 rounded  leading-tight   ">
                <option>20 items</option>
                <option>40 items</option>
                <option>60 items</option>
            </select>
            <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img src="../src/img/downarrow.svg" class="w-4 h-auto" alt="">
            </div>
        </div>
        <div class="flex items-center px-2">
            <p class="mb-0 font-light text-sm text-greycolor">120 entries</p>
        </div>
        <div class="paginationButton pl-4">
            <nav aria-label="Page navigation">
                <ul class="pagiWrapper m-2">
                    <li>
                        <p class="mb-0 font-light text-sm text-greycolor">Prev</p>
                    </li>
                    <li><button class="pagiItemsNumber">1</button>
                    </li>
                    <li><button class="pagiItemsNumberActive">2</button>
                    </li>
                    <li><button class="pagiItemsNumber">3</button>
                    </li>
                    <li>
                        <p class="font-light text-sm text-greycolor">Next</p>
                    </li>
        
                </ul>
            </nav>
        </div>
        
    </div>
</div>








