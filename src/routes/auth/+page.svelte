<script>
	import { signIn } from '@auth/sveltekit/client';
</script>

<button on:click={() => signIn('google')}>Login</button>
