import { Skeleton } from "./ui/skeleton";
import { TableBody, TableCell, TableRow } from "./ui/table";

export function TableSkeleton() {
  return (
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-full" />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export function HereListSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="h-4 w-1/4 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="h-4 w-1/4 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="h-4 w-1/4 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}
