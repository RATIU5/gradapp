<script lang="ts">
	import { parseCSV$ } from '$lib/utils/cvs-parser';
	import { z } from 'zod';

	let uploadFileContent: string | undefined = undefined;
	let programNameInput = '';
	let files: undefined | FileList = undefined;
	let inputDisabled = false;
	let programInputErrorMsg: undefined | string = undefined;

	$: {
		if (uploadFileContent) {
		}
	}

	async function addProgramHandler() {
		const programName = programNameInput.trim();
		const programs: { name: string }[] = [];

		if (programName === '' || !files) {
			programInputErrorMsg = 'Please add program names';
			return;
		}

		programInputErrorMsg = undefined;
		inputDisabled = true;

		if (programName !== '') {
			programs.push({ name: programName });
		} else {
			const file = files[0];
			try {
				if (file) {
					const reader = new FileReader();
					reader.onload = (event) => {
						try {
							const content = event.target?.result as string;
							if (file.name.endsWith('.csv')) {
								const programs = parseCSV$(content, {
									headerNames: ['name'],
									columnTypes: [z.string()]
								});
							} else {
								throw new Error('Invalid file type; csv expected');
							}
						} catch (err) {
							console.error(err);
						}
					};
					reader.readAsText(file);
				} else {
					throw new Error('No file selected');
				}
			} catch (e: any) {
				console.error('huh');
			}
		}

		const res = await fetch('/api/db/add-programs', {
			method: 'POST',
			body: JSON.stringify(programs)
		});

		programNameInput = '';

		if (!res.ok) {
			programInputErrorMsg = 'Failed to add new program';
		}

		if (res.status !== 200) {
			programInputErrorMsg = res.body.data;
		}

		inputDisabled = false;
	}
</script>

<div class="flex flex-col mx-4">
	<div class="border-b border-solid border-neutral-200 py-4">
		<div class="flex items-center justify-center w-full">
			<label
				for="dropzone-file"
				class="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100"
			>
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						class="w-10 h-10 mb-3 text-gray-400"
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
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold">Click to upload</span> or drag and drop
					</p>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG or GIF (MAX. 800x400px)
					</p>
				</div>
				<input bind:files id="dropzone-file" type="file" accept="text/csv" class="hidden" />
			</label>
		</div>
	</div>
	<div>
		<div class="flex flex-col justify-center">
			<label class="mt-2">
				<p class="mb-1 mt-2 text-sm text-neutral-600">Program Name</p>
				<input
					disabled={inputDisabled}
					on:input={() => (programInputErrorMsg = undefined)}
					bind:value={programNameInput}
					name="program-name"
					type="text"
					placeholder="Forestry"
					class="bg-neutral-50 px-4 py-2 w-full text-md border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
				/>
			</label>
			{#if programInputErrorMsg}
				<p class="text-red-500 text-sm">{programInputErrorMsg}</p>
			{/if}

			<button
				on:click={addProgramHandler}
				class="px-4 py-2 mt-4 bg-neutral-100 rounded-lg active:bg-sky-100 text-neutral-600 disabled:text-neutral-400"
				>Add</button
			>
		</div>
	</div>
</div>
