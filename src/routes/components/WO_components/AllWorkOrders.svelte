<script>
    import FilterWOStatusModal from "./FilteredWorkOrderModal.svelte";
    import RaiseNewWoModal from "./RaiseNewWOModal.svelte";
    import CreateBulkRequest from "./createBulkRequest.svelte";

   

  

    let filter = false;
    let raiseWo = false;
    let BulkWO = false;

    // const toggleFilter =()=>{
        
    //     filter = filter ? false : true;
    // }
    // const toggleRaiseNewWo =()=>{
    //     if(!flag) flag=true;
    //     raiseWo=raiseWo  ? false : true;
        
    // }
    // const toggleBulkWo =()=>{ 
    //     if(!flag) flag=true;
    //     BulkWo=BulkWo ? false : true;
        
    // }

    const setValue = (n) =>{
        if(n == 1) {
            
            raiseWo = false;
            BulkWO  = false;
        }
        else if( n == 2)
        {
           
            filter = false;
            BulkWO = false;

        }else{
            
            filter = false;
            raiseWo = false;
        }
    }
</script>


<div class="allWorkOrder m-3 flex justify-between items-center xsl:flex-wrap">
    <div class="AllworkOrderTitle">
        <p class="mb-0 text-lg font-medium text-blackshade">All Work Orders</p>
    </div>
    <div class="AllworkOrderTitleActions mr-2">
        <button class="ErBlueButton " on:click={()=> {filter = !filter;
        setValue(1);}}>Filter WO Status</button>
        <button class="ErBlueButton " on:click={()=> {raiseWo =!raiseWo;
        setValue(2);}}>Raise New WO</button>
        <button class="ErBlueButton " on:click={()=> {BulkWO = !BulkWO;
        setValue(3);}}>Create Bulk WO Request</button>
    </div>
</div>

{#if filter }   
  <FilterWOStatusModal bind:filter={filter} />
{/if} 

{#if raiseWo}
 <RaiseNewWoModal bind:raiseWo ={raiseWo}/> 

{/if}

{#if BulkWO }
 <CreateBulkRequest bind:BulkWo ={BulkWO} />
{/if}





