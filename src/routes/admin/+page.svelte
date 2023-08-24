<script lang="ts">
	import Tabs from '$lib/components/ui/tabs.svelte';
	import ProgramTab from './program-tab.svelte';
	import StudentTab from './student-tab.svelte';

	let items = [
		{ label: 'Students', value: 1, component: StudentTab },
		{ label: 'Programs', value: 2, component: ProgramTab }
	];
</script>

<Tabs {items} />
