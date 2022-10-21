import { useForm } from 'react-hook-form';
import Head from 'next/head';
import useSWR from 'swr';
import { useEffect, useState, Fragment } from 'react';
import Recipe from '../components/Recipe';
import moment from 'moment';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@heroicons/react/20/solid';
import 'react-datepicker/dist/react-datepicker.css';

export default function mealplans() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const fetcher2 = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(`/api/mealplans`, fetcher);

  const { data: recipes, error: recipesError } = useSWR(
    `/api/recipes`,
    fetcher2
  );

  let newArray = [];

  if (data) {
    for (let i = 0; i < data.mealPlans.length; i++) {
      if (moment.unix(data.mealPlans[i].timestamp).date() < moment().date()) {
        continue;
      }
      newArray.push({
        recipe: data.mealPlans[i].recipeData,
        date: data.mealPlans[i].timestamp,
      });
    }
  }

  const [selected, setSelected] = useState(recipes?.recipes[0]);
  const [query, setQuery] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const [datePickerSelected, setDatePickerSelected] = useState(false);

  useEffect(() => {
    if (recipes) {
      setSelected(recipes.recipes[0]);
    }
  }, [recipes]);

  const filteredRecipes =
    query === ''
      ? recipes?.recipes
      : recipes?.recipes.filter((recipe) =>
          recipe.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setDatePickerSelected(false);
  }, [dateValue]);

  const onSubmit = async () => {
    const data = {
      recipeId: selected.id,
      timestamp: moment(dateValue).unix(),
    };
    console.log(data);

    try {
      // const res = await fetch('/api/mealplans/create', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authheader,
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify(data),
      // });
      // const jsonData = await res.json();
      // console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Meal Plans</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center relative">
        <div className="flex flex-col items-center justify-center w-full relative">
          <h1 className="text-[4rem] pt-20">
            Meal <span className="text-[#0070f3]"> Plan</span>
          </h1>

          <div className="w-[30rem]">
            <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              <label className="mt-8 font-bold mb-2 ">
                Schedule your meals!
              </label>
              <div className="bg-gradient-to-r from-[#94a3b8] via-[#3861a4] to-[#8c5db8] flex items-center p-1 rounded-lg">
                <div
                  id="mealSelectsContainer"
                  className=" flex flex-col items-center p-2 bg-black rounded-lg w-[99.99%]"
                >
                  <div className="flex items-center space-x-3 p-2">
                    <div
                      className="flex  bg-[#a1a5b057] rounded-lg py-2.5 pl-3 pr-10 items-center sm:text-sm hover:cursor-pointer"
                      onClick={() => setDatePickerSelected(true)}
                    >
                      <CalendarIcon className="h-4 pr-2 " />
                      <DatePicker
                        selected={dateValue}
                        onChange={(date) => {
                          setDateValue(date);
                        }}
                        open={datePickerSelected}
                        minDate={new Date()}
                        onClickOutside={() => setDatePickerSelected(false)}
                      />
                    </div>
                    {recipes && !recipesError ? (
                      <div className="">
                        <Combobox value={selected} onChange={setSelected}>
                          <div className="relative ">
                            <div className="relative text-white w-full   hover:border-[#1e1f21cd] cursor-default overflow-hidden rounded-lg    text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                              <Combobox.Input
                                className="w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 bg-[#a1a5b057] focus:ring-0"
                                displayValue={(recipe) => recipe?.name}
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </Combobox.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                              afterLeave={() => setQuery('')}
                            >
                              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#4d4f54] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredRecipes.length === 0 &&
                                query !== '' ? (
                                  <div className="relative cursor-default select-none py-2 px-4 ">
                                    Nothing found.
                                  </div>
                                ) : (
                                  filteredRecipes.map((recipe) => (
                                    <Combobox.Option
                                      key={recipe.id}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                          active
                                            ? 'bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] text-white'
                                            : 'text-white'
                                        }`
                                      }
                                      value={recipe}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected
                                                ? 'font-medium'
                                                : 'font-normal'
                                            }`}
                                          >
                                            {recipe.name}
                                          </span>
                                          {selected ? (
                                            <span
                                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active
                                                  ? 'text-white'
                                                  : 'text-teal-600'
                                              }`}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))
                                )}
                              </Combobox.Options>
                            </Transition>
                          </div>
                        </Combobox>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <button
                    className={`mt-3 mb-2 bg-[#0070f3] hover:bg-blue-700   text-white font-bold py-2 px-4 rounded w-[25%] `}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>

            {data && !error ? (
              <div className="recipe-container">
                {newArray.map(({ recipe, date }, idx) => (
                  <div key={recipe.recipeId} className="flex flex-col">
                    {idx === 0 ? (
                      <div className="text-[#9ca4ad] text-2xl mt-3">
                        {moment.unix(date).format('MMMM Do YYYY')}
                        <hr className=""></hr>
                      </div>
                    ) : moment.unix(newArray[idx - 1].date).date() !==
                      moment.unix(date).date() ? (
                      <div className="text-[#9ca4ad] text-2xl mt-3">
                        {moment.unix(date).format('MMMM Do YYYY')}
                        <hr></hr>
                      </div>
                    ) : (
                      ''
                    )}

                    <Recipe recipe={recipe} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex mt-10 text-red-400">error</div>
            )}

            {/* {errorMsg && (
              <div className="mt-20 flex bg-[#c9606086] rounded-lg p-1 items-center justify-center">
                <div>{errorMsg}</div>
              </div>
            )}

            {successMsg && (
              <div className="mt-20 flex bg-[#88c186a6] rounded-lg p-1 items-center justify-center">
                <div>{successMsg}</div>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
}