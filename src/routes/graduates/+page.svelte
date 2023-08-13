<script lang="ts">
	import type { PageData } from './$types';
	import { cn } from '$lib/utils/fn';
	import { Award } from 'lucide-svelte';

	export let data: PageData;
	const date = new Date();
	const month = date.getMonth();
	const year = date.getFullYear();
</script>

<div class="w-full pt-12">
	<h1 class="text-4xl text-neutral-600 text-center mb-6">
		Bridgerland {year}
		{month > 6 ? 'Winter' : 'Summer'}
		<span class="text-red-400">Graduates</span>
	</h1>
	{#each data.programs.sort((a, b) => a.name.localeCompare(b.name)) as program}
		{#if program.people.length > 0}
			<div class="w-full mb-12">
				<div
					class="sticky top-0 w-full mt-6 bg-white py-2 px-2 border-b border-t border-solid border-neutral-200"
				>
					<h2 class="text-3xl text-center text-red-400">{program.name}</h2>
				</div>
				{#each program.people.sort((a, b) => a.lastname.localeCompare(b.lastname)) as student}
					<div
						class={cn('mx-auto bg-neutral-100 my-4 py-4 px-4 rounded-lg flex justify-between', {
							'bg-golden border border-solid border-yellow-400': student.platinum
						})}
					>
						<p
							class={cn('text-lg text-neutral-700', {
								' text-amber-100': student.platinum
							})}
						>
							{student.firstname}
							{student.lastname}
						</p>
						{#if student.highschool}
							<Award class="text-red-400" />
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>
