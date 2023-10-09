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

  uploadStudent: async ({ request }) => {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const programId = formData.get('programId') as string;
    const platinum = formData.get('platinum') as string;
    const highSchool = formData.get('highschool') as string;

    if (!firstName || firstName === '') {
      return fail(400, { error: true, message: 'First name must be provided' });
    }
    if (!lastName || lastName === '') {
      return fail(400, { error: true, message: 'Last name must be provided' });
    }
    if (!email || email === '') {
      return fail(400, { error: true, message: 'Email must be provided' });
    }
    if (!programId) {
      return fail(400, { error: true, message: 'Program must be provided' });
    }

    try {
      const { error } = await supabase
        .from('people')
        .insert([
          {
            firstname: firstName,
            lastname: lastName,
            programid: programId,
            email,
            platinum,
            highschool: highSchool,
            present: false,
            persontype: 2
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (e) {
      return fail(500, { error: true, message: 'Internal server errror: Could not add program' });
    }
  }
};
