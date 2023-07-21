<script>
	import '../app.css';
</script>

<div class="flex min-h-screen flex-col overflow-hidden">
	<nav>Header</nav>
	<main class="flex-grow">
		<slot />
	</main>
	<footer>Footer</footer>
</div>
