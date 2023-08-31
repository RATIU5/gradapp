import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function fileToString(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			const result = event.target?.result;
			if (typeof result === 'string') {
				resolve(result);
			} else {
				reject(new Error(`Failed to read file '${file.name}' as string`));
			}
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsText(file);
	});
}
