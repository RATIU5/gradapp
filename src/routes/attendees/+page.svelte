<script lang="ts">
	import AttendeeRow from '$lib/components/attendee-row.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full">
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
		<table class="w-full">
			<thead>
				<tr>
					<th>Awards</th>
					<th>Name</th>
					<th class="hidden">Department</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.attendees as attendee}
					<AttendeeRow {attendee} />
				{/each}
			</tbody>
		</table>
	{/if}
</div>
