import { parseCSV$ } from '$lib/utils/cvs-parser';
import { z } from 'zod';
import type { Actions } from './$types';
import supabase from '$lib/server/db.server';

export const actions: Actions = {
  uploadCSV: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return { status: 400, body: 'Invalid file upload' };
    }

    try {
      const fileString = await file.text();
      const fileData = parseCSV$(fileString, {
        separator: ',',
        headerNames: ['name'],
        columnTypes: [z.number()]
      });

      supabase.from('programs').insert(fileData);
    } catch (e) {
      return { status: 400, body: e };
    }
  }
};
