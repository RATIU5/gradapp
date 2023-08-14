<script lang="ts">
	import AttendeeRow from '$lib/components/attendee-row.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full pb-12 relative">
	{#if data.attendees.length === 0}
		<div class="w-full h-full flex flex-col items-center justify-center">
			<img
				src="/img/dead-tree.png"
				alt="Dead tree"
				class="w-1/2 mx-auto shadow-inner shadow-white"
			/>
			<h3 class="font-light text-lg text-neutral-500">Hmm, no attendees found.</h3>
		</div>
	{:else}
		<div class="fixed md:relative bottom-14 md:bottom-0 md:mt-12 left-0 z-40 w-full px-4 max-w-2xl">
			<input
				type="text"
				class="w-full border rounded-full px-4 py-2 mb-4 shadow-md"
				placeholder="Search"
			/>
		</div>
		<div class="mt-12 md:mt-0">
			{#each data.attendees as attendee}
				<AttendeeRow {attendee} />
			{/each}
		</div>
	{/if}
</div>
