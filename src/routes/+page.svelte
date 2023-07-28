<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#each data.attendees as p (p.id)}
    <div class="flex flex-col justify-center items-center w-full max-w-md">
        <h3 class="text-xl mb-2">{p.programname}</h3>
            {#each p.students as s (s.id)}
                <div class="flex bg-neutral-100 justify-center items-center py-6 w-full rounded-xl">
                    <div>{s.platinum ? "*" : undefined}</div>
                    <div>{s.firstname + " " + s.lastname}</div>
                </div>
            {/each}
    </div>
{/each}
