import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState, Fragment } from "react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllPrograms } from "~/utils/query-fns";
import { Dialog, Transition } from "@headlessui/react";

type Program = {
  name: string;
  description: string;
};

const Programs: NextPage<Program> = (props) => {
  const programsQuery = useQuery({
    queryKey: ["all-programs"],
    queryFn: getAllPrograms,
  });
  const [sortDesc, setSortDesc] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program["name"]>("");
  const [addInput, setAddInput] = useState("");

  function openAddDialog() {
    setIsAddDialogOpen(true);
  }

  function closeAddDialog() {
    setIsAddDialogOpen(false);
  }

  function saveNewProgram() {
    if (addInput && addInput.length > 0) {
      setAddInput("");
      setIsAddDialogOpen(false);
    }
  }

  function closeDeleteModal() {
    setIsDeleteDialogOpen(false);
  }

  function openDeleteModal() {
    setIsDeleteDialogOpen(true);
  }

  function deleteProgram() {
    // delete program
    setIsDeleteDialogOpen(false);
  }

  const fnSortDesc = (a: Program, b: Program) => (a.name > b.name ? -1 : 1);
  const fnSortAsc = (a: Program, b: Program) => (a.name < b.name ? -1 : 1);
  const fnSort = sortDesc ? fnSortDesc : fnSortAsc;

  return (
    <>
      <DeleteDialog
        show={isDeleteDialogOpen}
        onClose={closeDeleteModal}
        onDelete={deleteProgram}
        name={selectedProgram}
      />
      <AddDialog
        show={isAddDialogOpen}
        onClose={closeAddDialog}
        save={saveNewProgram}
        value={addInput}
        onChange={(str) => setAddInput(str)}
      />
      <Layout>
        <QueryData dataQuery={programsQuery}>
          {(p) => (
            <div className="my-20 flex flex-col items-center justify-center">
              <table className="w-full max-w-2xl table-auto">
                <thead>
                  <tr className="flex items-center">
                    <th className="px-4 py-2" />
                    <th className="flex flex-grow items-end px-4 py-2">
                      <h3 className="text-xl">Program Name</h3>
                      <button
                        type="button"
                        className="ml-4 text-xl"
                        onClick={() => setSortDesc((prev) => !prev)}
                      >
                        {sortDesc ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-stone-500"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 21v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
                            <path d="M19 10h-4l4 -7h-4" />
                            <path d="M4 15l3 3l3 -3" />
                            <path d="M7 6v12" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-stone-500"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
                            <path d="M19 21h-4l4 -7h-4" />
                            <path d="M4 15l3 3l3 -3" />
                            <path d="M7 6v12" />
                          </svg>
                        )}
                      </button>
                    </th>
                    <th className="flex px-4 py-2">
                      <button
                        type="button"
                        className="mx-2 text-xl"
                        onClick={openAddDialog}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-stone-500"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M5 12l14 0" />
                        </svg>
                      </button>
                    </th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody className="flex flex-col items-center justify-center rounded-lg bg-white/50 p-4">
                  {p.sort(fnSort).map((program, i) => (
                    <tr
                      key={`${i}s`}
                      className="flex w-full rounded-lg px-4 py-2 text-left even:bg-black/5"
                    >
                      <td className="mr-4 w-6 select-none text-right text-lg text-black/30">
                        {i + 1}
                      </td>
                      <td className="flex-grow text-left text-lg">
                        {program.name}
                      </td>
                      <td>
                        <div className="flex">
                          <button type="button" className="mx-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-stone-400"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                              <path d="M13.5 6.5l4 4" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="mx-2"
                            onClick={() => {
                              setSelectedProgram(program.name);
                              openDeleteModal();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-stone-400"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M18 6l-12 12" />
                              <path d="M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </QueryData>
      </Layout>
    </>
  );
};

type AddDialogProps = {
  show: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  save: () => void;
};

function AddDialog(props: AddDialogProps) {
  return (
    <Transition show={props.show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="mb-2 text-lg font-medium leading-6 text-gray-900"
                >
                  New Program
                </Dialog.Title>
                <label htmlFor="newProgram">
                  <p className="text-sm text-gray-500">
                    Enter a new program name.
                  </p>
                  <input
                    className="mt-2 w-full rounded-lg bg-gray-100 p-2"
                    placeholder="Program Name"
                    type="text"
                    name="program"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    id="newProgram"
                    required
                  />
                </label>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-orange-100"
                    onClick={props.save}
                    disabled={!props.value || props.value.length === 0}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-stone-100 px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
                    onClick={props.onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

type DeleteDialogProps = {
  show: boolean;
  name: string;
  onClose: () => void;
  onDelete: () => void;
};

function DeleteDialog(props: DeleteDialogProps) {
  return (
    <Transition show={props.show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h4"
                  className="text-md font-medium leading-6 text-gray-900"
                >
                  Delete{" "}
                  <span className="rounded-lg bg-stone-100 p-1 text-stone-500">
                    {props.name}
                  </span>
                  ?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={props.onDelete}
                  >
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-stone-100 px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
                    onClick={props.onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Programs;
