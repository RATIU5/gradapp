<script>
	import { signOut } from '@auth/sveltekit/client';
</script>

<div class="w-full flex justify-center items-center">
	<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
		<div class="w-full max-w-sm space-y-10">
			<div>
				<img
					class="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
				<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Really sign out?
				</h2>
			</div>
			<div class="relative -space-y-px rounded-md shadow-sm">
				<button
					class="focus:outline-none bg-white focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-300 flex items-center w-full mt-10"
					on:click={() => signOut()}
				>
					Logout
				</button>
			</div>
		</div>
	</div>
</div>
