<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import Navbar from './navbar.svelte';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<button on:click={toggleMenu}>
	<Menu />
</button>
{#if isMenuOpen}
	<Navbar />
{/if}
