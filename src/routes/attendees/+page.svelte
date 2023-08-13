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
		<div class="fixed bottom-14 left-0 z-40 w-full px-4">
			<input
				type="text"
				class="w-full border rounded-full px-4 py-2 mb-4 shadow-md"
				placeholder="Search"
			/>
		</div>
		<div>
			<div class="flex py-2 sticky top-0 bg-white text-neutral-500 font-bold">
				<div class="w-20"><p class="my-2">Awards</p></div>
				<div class="flex-grow"><p class="my-2">Name</p></div>
				<div class=" hidden"><p class="my-2">Department</p></div>
				<div class="w-24"><p class="my-2">Actions</p></div>
			</div>
			<div class="">
				{#each data.attendees as attendee}
					<AttendeeRow {attendee} />
				{/each}
			</div>
		</div>
	{/if}
</div>
