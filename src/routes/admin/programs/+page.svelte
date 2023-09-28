<script lang="ts">
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let programInputErrorMsg: undefined | string = undefined;

	if (form?.error) {
		console.error(form?.message);
		toast.error('There was a problem importing the file', {
			position: 'top-right'
		});
	}

	if (form?.success) {
		toast.success('Programs added successfully', {
			position: 'top-right'
		});
	}
</script>

<div class="flex flex-col mx-4 w-full">
	<div class="border-b border-solid border-neutral-200 py-4">
		<form
			action="?/uploadCSV"
			enctype="multipart/form-data"
			method="POST"
			class="flex items-center flex-col justify-center w-full"
		>
			<p class="text-sm text-neutral-500">The CSV should contain the following headers: name</p>
			<label
				class="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100"
			>
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						class="w-10 h-10 mb-3 text-neutral-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
						/></svg
					>
					<p class="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
						<span class="font-semibold">Click to upload</span> or drag and drop
					</p>
					<p class="text-xs text-neutral-500 dark:text-neutral-400">CSV (200mb Max)</p>
				</div>
				<input name="file" type="file" accept="text/csv" class="hidden" />
			</label>
			<button
				type="submit"
				class="px-4 w-full py-2 mt-4 bg-neutral-100 rounded-lg active:bg-sky-100 text-neutral-600 disabled:text-neutral-400"
				>Add</button
			>
		</form>
	</div>
	<div>
		<form action="?/uploadName" method="POST" class="flex flex-col justify-center">
			<label class="mt-2">
				<p class="mb-1 mt-2 text-sm text-neutral-600">Program Name</p>
				<input
					name="name"
					type="text"
					placeholder="Forestry"
					class="bg-neutral-50 px-4 py-2 w-full text-md border border-neutral-300 text-neutral-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
				/>
			</label>
			{#if programInputErrorMsg}
				<p class="text-red-500 text-sm">{programInputErrorMsg}</p>
			{/if}

			<button
				class="px-4 py-2 mt-4 bg-neutral-100 rounded-lg active:bg-sky-100 text-neutral-600 disabled:text-neutral-400"
				>Add</button
			>
		</form>
	</div>
</div>
