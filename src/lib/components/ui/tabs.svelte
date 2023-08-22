<script>
	export let items = [];
	export let activeTabValue = 1;

	const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul>
	{#each items as item}
		<li class={activeTabValue === item.value ? 'active' : ''}>
			<span on:click={handleClick(item.value)}>{item.label}</span>
		</li>
	{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item.value}
		<div class="box">
			<svelte:component this={item.component} />
		</div>
	{/if}
{/each}
