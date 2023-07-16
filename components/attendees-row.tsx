import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { PersonWithProgram } from "@/lib/types";
import { setAttendeePresent$ } from "@/lib/queries";

type AttendeesRowProps = {
  person: PersonWithProgram;
};

const AttendeesRow = ({ person }: AttendeesRowProps) => {
  const queryClient = useQueryClient();
  const presentMutation = useMutation({
    mutationFn: (params: { id: number; present: boolean }) =>
      setAttendeePresent$(params.id, params.present),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true });
    },
  });

  return (
    <TableRow>
      <TableCell>{person.platinum ? <Icons.medal /> : null}</TableCell>
      <TableCell>{person.highschool ? <Icons.award /> : null}</TableCell>
      <TableCell>{person.firstname + " " + person.lastname}</TableCell>
      <TableCell>{person.programs.name}</TableCell>
      <TableCell className="text-right">
        <Button
          variant={person.present ? "outline" : "default"}
          onClick={() =>
            presentMutation.mutate({
              id: person.id,
              present: !person.present,
            })
          }
        >
          {presentMutation.isLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : person.present ? (
            "Check-out"
          ) : (
            "Check-in"
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AttendeesRow;
