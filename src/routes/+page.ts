import type { PageLoad } from "./$types";

export const load = (() => {
    return {
        attendees: [
            {
                programname: "Dental Assistant",
                id: "someid",
                students: [
                    {
                        firstname: "Kevin",
                        lastname: "Charles",
                        platinum: true,
                        highschool: false,
                        id: "1234567890"
                    }
                ]
            }
        ]
    }
}) satisfies PageLoad;

