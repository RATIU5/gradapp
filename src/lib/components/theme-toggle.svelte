<script>
	import { createDropdownMenu } from '@melt-ui/svelte';
	import { Moon, Settings, Sun } from 'lucide-svelte';
	const { menu, item, trigger, arrow } = createDropdownMenu();
</script>

<button melt={$trigger} class="p-2 hover:bg-black/5 rounded-lg text-neutral-800"><Sun /></button>
<div melt={$menu}>
	<div melt={$item}>
		<div>
			<Sun />
			<span>Light</span>
		</div>
	</div>
	<div melt={$item}>
		<div>
			<Moon />
			<span>Dark</span>
		</div>
	</div>
	<div melt={$item}>
		<div>
			<Settings />
			<span>System</span>
		</div>
	</div>
	<div melt={$arrow} />
</div>
