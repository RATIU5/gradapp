import type { UseQueryResult } from "@tanstack/react-query";

type DataPromise<T> = {
  dataQuery: UseQueryResult<T[], unknown>;
  children: (e: T[]) => JSX.Element;
};

function QueryData<T>(props: DataPromise<T>) {
  if (props.dataQuery.isError) {
    return <div>There was an error loading the data</div>;
  }
  if (props.dataQuery.isLoading) {
    return (
      <div className="flex h-full w-full justify-center">
        <div
          className="h-20 w-20 animate-spin rounded-full
							border-8 border-solid border-neutral-500 border-t-transparent"
        />
      </div>
    );
  }
  return props.children(props.dataQuery.data);
}

export default QueryData;
