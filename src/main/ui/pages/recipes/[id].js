import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function Recipe() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const router = useRouter();
  const { id } = router.query;

  let [isOpen, setIsOpen] = useState(false);

  let [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleDelete = async () => {
    // const res = await fetch(`/api/recipes/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const data = await res.json();

    if (true) {
      setIsDeleteOpen(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  //   const { data: recipe, error: recipeError } = useSWR(`/api/recipes/${id}`, fetcher);
  let testStr =
    'This is the first step\nAnd this is two\nThree make some cheese please oh yeah\nFour is the last one haha or is it lol idk\nsaying hi from copilot\nai is not scary at all\nthis is the last step';
  let stepsTest = testStr.split('\n');

  let steps = [];

  for (let i = 0; i < steps.length; i++) {
    console.log(steps[i]);
  }
  //   useEffect(() => {
  // if(recipe) {
  //   steps = recipe.steps.split('\n');
  // }
  //   }, [recipe])

  return (
    <div>
      <Head>
        <title>Recipe App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Recipe {id}</h1>

      <main className="flex flex-col items-center ">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-[4rem] pt-20 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8cdcbc] via-[#6287c2] to-[#b086d7]">
            Turkey Burger {/* {recipe.name} */}
          </h1>
        </div>
        <div className="w-[30rem]">
          <div id="searchBar" className="mt-10 flex flex-col ">
            {stepsTest.map((step, index) => (
              <div className="mb-5 " key={index}>
                <p className="text-xl">
                  {index + 1}. {step}
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-[#9d3a3a]  px-8 py-2 text-sm font-medium text-white hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Delete
          </button>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-r from-[#858b99] via-[#81899c] to-[#44464d] p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Are you sure you want to delete this recipe?
                      </Dialog.Title>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            closeModal();
                            handleDelete();
                          }}
                        >
                          Yes, delete it
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          <Transition appear show={isDeleteOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsDeleteOpen(false)}
            >
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-r from-[#858b99] via-[#81899c] to-[#44464d] p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Deleted successfully!
                      </Dialog.Title>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </main>
    </div>
  );
}
