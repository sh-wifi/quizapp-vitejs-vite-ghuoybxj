<script>
    export let isGrayout = false;
</script>

<button on:click 
    class="bg-blue-500 text-blue-100 border-blue-800 text-lg font-bold border-2 rounded-xl py-4 w-4/5"
    class:bg-gray-500={isGrayout} class:bg-blue-500={!isGrayout}>
    <slot></slot>
</button>