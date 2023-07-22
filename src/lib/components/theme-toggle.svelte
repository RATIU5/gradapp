<script>
	import { createDropdownMenu } from '@melt-ui/svelte';
	const { menu, item, trigger, arrow } = createDropdownMenu();
</script>

<button melt={$trigger}>Click me</button>
<div melt={$menu}>
	<div {...$item} use:item>...</div>
	<div {...$item} use:item>...</div>
	<div {...$item} use:item>...</div>
	<div melt={$arrow} />
</div>
