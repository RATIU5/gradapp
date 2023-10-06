<script lang="ts">
	export let disabled: boolean;
	export let label: string;
	export let value = '';

	let errorMsg: undefined | string;
</script>

<label class="mt-2">
	<p class="mb-1 mt-2 text-sm text-neutral-600">{label}</p>
	<input
		{disabled}
		on:input={() => (errorMsg = undefined)}
		bind:value
		class="bg-neutral-50 px-4 py-2 w-full text-md border border-neutral-300 text-neutral-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
		{...$$restProps}
	/>
</label>
{#if errorMsg}
	<p class="text-red-500 text-sm">{errorMsg}</p>
{/if}
