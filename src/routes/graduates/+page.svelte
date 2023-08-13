<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const date = new Date();
	const month = date.getMonth();
	const year = date.getFullYear();
</script>

<div class="w-full pt-12">
	<h1 class="text-4xl text-neutral-600 text-center">
		Bridgerland {year}
		{month > 6 ? 'Winter' : 'Summer'}
		<span class="text-red-400">Graduates</span>
	</h1>
	{#each data.programs as program}
		{#if program.people.length > 0}
			<div class="w-full">
				<div class="sticky top-0 w-full">
					<h2 class="text-3xl">{program.name}</h2>
				</div>
				{#each program.people as student}
					<div>
						<div>{student.firstname} {student.lastname}</div>
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>
