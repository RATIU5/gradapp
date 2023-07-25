<script lang="ts">
	import { GraduationCap } from 'lucide-svelte';
	import ThemeToggle from './theme-toggle.svelte';
</script>

<nav
	class="flex justify-between items-center my-2 rounded-full py-1 px-4 w-full max-w-4xl bg-neutral-100/50 backdrop-blur-lg"
>
	<a href="/">
		<GraduationCap strokeWidth={1.75} size={32} class="text-neutral-800" />
	</a>
	<ul class="flex">
		<li class="mx-2 text-md"><a href="/">List</a></li>
		<li class="mx-2 text-md"><a href="/login">Login</a></li>
	</ul>
	<div>
		<ThemeToggle />
	</div>
</nav>
