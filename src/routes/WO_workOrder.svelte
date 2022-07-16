<script>
    import PaginationOfTable from "./components/WO_components/PaginationOfTable.svelte";
    import WorkOrderTable from "./components/WO_components/workOrderTable.svelte";
    import AllWorkOrders from "./components/WO_components/AllWorkOrders.svelte";
    import Breadcrumb from "./components/WO_components/breadcrumb.svelte";
</script>

<div class="w-full flex">
   <div class="mainContent">
   <Breadcrumb  routeName ={"Work Order"}/>
   
   <div class="mainTableData ">
        <AllWorkOrders />
        <PaginationOfTable />
        <WorkOrderTable />
   </div>

</div>
</div>




