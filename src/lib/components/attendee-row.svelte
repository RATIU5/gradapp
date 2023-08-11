<script lang="ts">
	import type { AllAttendeesData } from '$lib/utils/types';
	import { Award, Gem } from 'lucide-svelte';

	export let attendee: AllAttendeesData;
</script>

<tr>
	<div class="my-2">
		<td class="flex justify-center items-center">
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
		</td>
		<td>{attendee.firstname} {attendee.lastname}</td>
		<td class="hidden">{attendee.programs.name}</td>
		<td>
			<button>Check In</button>
		</td>
	</div>
</tr>
