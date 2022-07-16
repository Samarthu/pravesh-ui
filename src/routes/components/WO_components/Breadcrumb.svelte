
<script>
    export let routeName;
    import { goto } from "$app/navigation";
   
</script>


<div class="breadcrumb ">
    <div class="breadcrumb-section">
        <div class="breadcrumbtext flex justify-between">
            <p class="flex">
                <span class="text-textgrey pr-1 text-base">Home /
                </span> <span class="flex xs:text-base xs:items-center pl-2">{routeName}</span>
            </p>
            <button class="ErBlueButton" >Estimate Work Order</button>
        </div>
    </div>
</div>