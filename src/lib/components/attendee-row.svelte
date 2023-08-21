<script lang="ts">
	import { cn } from '$lib/utils/fn';
	import type { AllAttendeesData } from '$lib/utils/types';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { Award, Gem } from 'lucide-svelte';

	export let attendee: AllAttendeesData;

	const client = useQueryClient();

	const presentMutation = createMutation({
		mutationFn: async (body: { status: boolean; id: string }) => {
			await fetch('/api/db/set-present-status', {
				method: 'POST',
				body: JSON.stringify(body)
			});
		},
		onSuccess: () => {
			client.invalidateQueries(['attendees']);
		}
	});
</script>

<div class="flex items-center bg-neutral-100 mb-4 p-2 rounded-lg">
	<div class="flex w-20">
		<div class="w-6 text-red-400">
			{#if attendee.highschool}
				<Award />
			{/if}
		</div>
		<div class="w-6 text-red-400">
			{#if attendee.platinum}
				<Gem />
			{/if}
		</div>
	</div>
	<div class="flex-grow text-neutral-600">{attendee.firstname} {attendee.lastname}</div>
	<div class="hidden flex-grow sm:block text-neutral-400">{attendee.programs.name}</div>
	<div class="w-24">
		<button
			on:click={() => {
				$presentMutation.mutate({ status: !attendee.present, id: attendee.id });
			}}
			class={cn(
				'w-24 text-center py-2 text-sm bg-red-400 rounded-lg text-white active:scale-105 transition-all ease-in-out duration-100',
				{
					'bg-neutral-200 text-neutral-600': attendee.present
				}
			)}
		>
			{#if $presentMutation.isLoading}
				Loading...
			{:else if attendee.present}
				Check Out
			{:else}
				Check In
			{/if}
		</button>
	</div>
</div>
