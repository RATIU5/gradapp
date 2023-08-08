<script lang="ts">
	import { GraduationCap, Menu } from 'lucide-svelte';
	import ThemeToggle from './theme-toggle.svelte';

    
</script>


<div>
    <Menu />
</div>

<nav
	class="flex justify-between items-center my-4 rounded-full py-2 px-4 w-full max-w-4xl bg-white/50 backdrop-blur-lg border border-neutral-200 border-solid"
>
	<a href="/">
		<GraduationCap strokeWidth={1.75} size={32} class="text-neutral-500" />
	</a>
	<ul class="flex">
		<li class="mx-2 text-md text-neutral-600"><a href="/">List</a></li>
		<li class="mx-2 text-md text-neutral-600"><a href="/login">Login</a></li>
	</ul>
	<div>
		<ThemeToggle />
	</div>
</nav>
