<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<h2 class="text-3xl mb-14" >Graduation List</h2>
{#each data.attendees as p (p.id)}
    <div class="flex flex-col justify-center items-center w-full max-w-md">
        <h3 class="text-xl mb-2">{p.programname}</h3>
        <div class="bg-neutral-100 py-6 w-full rounded-xl">
            {#each p.students as s (s.id)}
                <div class="grid grid-cols-5 justify-center items-center">
                    <div class="col-span-2 flex justify-end">{s.platinum ? "*" : undefined}</div>
                    <div class="col-span-3">{s.firstname + " " + s.lastname}</div>
                </div>
            {/each}
        </div>
    </div>
{/each}
