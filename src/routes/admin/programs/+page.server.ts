import { parseCSV$ } from '$lib/utils/cvs-parser';
import { z } from 'zod';
import type { Actions } from './$types';
import supabase from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
  uploadCSV: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (file?.size <= 0) {
      return fail(400, { error: true, message: 'No file uploaded' });
    }

    if (!(file instanceof File)) {
      return fail(400, { error: true, message: 'Invalid file upload' });
    }

    try {
      const fileString = await file.text();
      const fileData = parseCSV$(fileString, {
        headerNames: ['name'],
        columnTypes: [z.string()]
      });

      const { data, error } = await supabase.from('programs').insert(fileData).select();

      if (error) {
        throw new Error(error);
      }
      return { success: true };
    } catch (e) {
      return fail(400, { error: true, message: e.message });
    }
  },

  uploadName: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;

    if (!name || name === '') {
      return fail(400, { error: true, message: 'Name must be provided' });
    }

    try {
      const { error } = await supabase.from('programs').insert([{ name }]).select();

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (e) {
      return fail(500, { error: true, message: 'Internal server errror: Could not add program' });
    }
  }
};
