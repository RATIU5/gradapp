<script lang="ts">
	import type { AllAttendeesData } from '$lib/utils/types';
	import { Award, Gem } from 'lucide-svelte';

	export let attendee: AllAttendeesData;
</script>

<div class="flex bg-neutral-100">
	<div class="flex w-20">
		<div class="w-8">
			{#if attendee.highschool}
				<Award />
			{/if}
		</div>
		<div class="w-8">
			{#if attendee.platinum}
				<Gem />
			{/if}
		</div>
	</div>
	<div class="flex-grow">{attendee.firstname} {attendee.lastname}</div>
	<div class="hidden">{attendee.programs.name}</div>
	<div class="w-20">
		<button>Check In</button>
	</div>
</div>
