import { type Actions, fail } from '@sveltejs/kit';

export const actions = {
  'save-program': async (event) => {
    const data = await event.request.formData();
    const programName = data.get('program-name');

    if (!programName || programName === '') {
      return fail(400, { programName, missing: true });
    }
  }
} satisfies Actions;
