<script lang="ts">
	import { cn } from '$lib/utils/fn';

	export let disabled: boolean;
	export let label: string;
	export let type: string;
	export let defaultValue: string;

	let errorMsg: undefined | string;
	let value = defaultValue || '';

	function handleInput(e: any) {
		errorMsg = undefined;
		value = e.target.value;
	}
</script>

<label
	class={cn('mt-2', {
		'flex flex-row-reverse justify-end items-center': type === 'radio' || type === 'checkbox'
	})}
>
	<p
		class={cn('mb-1 mt-2 text-sm text-neutral-600', {
			'mt-1': type === 'radio' || type === 'checkbox'
		})}
	>
		{label}
	</p>
	<input
		{disabled}
		{type}
		{value}
		on:input={handleInput}
		class={cn(
			'bg-neutral-50 px-4 py-2 w-full text-md border border-neutral-300 text-neutral-900 rounded-lg focus:ring-blue-500 focus:border-blue-500',
			{
				'w-auto mr-2': type === 'radio' || type === 'checkbox'
			}
		)}
		{...$$restProps}
	/>
</label>
{#if errorMsg}
	<p class="text-red-500 text-sm">{errorMsg}</p>
{/if}
