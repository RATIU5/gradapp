<script lang="ts">
	import AttendeeRow from '$lib/components/attendee-row.svelte';
	import type { AllAttendeesData } from '$lib/utils/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let value = '';
	let filteredAttendees: AllAttendeesData[] = data.attendees;

	$: {
		if (value !== '') {
			const res: AllAttendeesData[] = [];
			for (let i = 0; i < data.attendees.length; i++) {
				const student = data.attendees[i];
				const fullName = `${student.firstname} ${student.lastname}`;
				if (fullName.includes(value)) {
					res.push(student);
				} else if (student.programs.name.includes(value)) {
					res.push(student);
				}
			}
			filteredAttendees = res;
		} else {
			filteredAttendees = data.attendees;
		}
	}
</script>

<div class="w-full pb-12 relative lg:pt-20">
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
		<div
			class="fixed bottom-16 lg:bottom-auto lg:top-16 lg:mt-2 left-1/2 -translate-x-1/2 z-40 w-full px-4 max-w-2xl"
		>
			<input
				bind:value
				type="text"
				class="w-full border rounded-full px-4 py-2 mb-4 shadow-md"
				placeholder="Search"
			/>
		</div>
		<div class="mt-12 lg:mt-0">
			{#each filteredAttendees as attendee}
				<AttendeeRow {attendee} />
			{/each}
		</div>
	{/if}
</div>
