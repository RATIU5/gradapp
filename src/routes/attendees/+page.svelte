<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>Attendees</h1>

	{#if data.attendees.length === 0}
		<p>No attendees yet.</p>
	{:else}
		<ul>
			{#each data.attendees as attendee}
				<li>
					{attendee.firstname}
					{attendee.lastname}
				</li>{/each}
		</ul>
	{/if}
</main>
