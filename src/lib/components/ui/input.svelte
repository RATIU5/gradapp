<script lang="ts">
	import { cn } from '$lib/utils/fn';

	export let disabled: boolean;
	export let label: string;
	export let type: string;
	export let defaultValue: string;

	let errorMsg: undefined | string;
	let value = defaultValue || '';

	function handleInput(e: any) {
		console.log(e.target.value);
	}
</script>

<label
	class={cn('mt-2', {
		'flex flex-row': type === 'radio' || type === 'checkbox'
	})}
>
	<p class="mb-1 mt-2 text-sm text-neutral-600">
		{label}
	</p>
	<input
		{disabled}
		{type}
		{value}
		on:input={(e) => {
			errorMsg = undefined;
			handleInput(e);
		}}
		class="bg-neutral-50 px-4 py-2 w-full text-md border border-neutral-300 text-neutral-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
		{...$$restProps}
	/>
</label>
{#if errorMsg}
	<p class="text-red-500 text-sm">{errorMsg}</p>
{/if}
