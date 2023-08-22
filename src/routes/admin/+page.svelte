<script>
	import Tabs from '$lib/components/ui/tabs.svelte';

	let items = [
		{ label: 'Content', value: 1, component: Tab1 },
		{ label: 'Interactions', value: 2, component: Tab2 },
		{ label: 'Tab 3', value: 3, component: Tab3 }
	];
</script>

<Tabs {items} />
