import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { getMealsByName, getMealsByFirstLetter, getMealById, getRandomMeal, getAllMealCategories, getAllCategories, getAllAreas, getAllIngredients, getMealsByMainIngredient, getMealsByCategory, getMealsByArea } from "../hooks/useMealApi";

export default function Modal({ open, setOpen, type, setFilter}) {

  const cancelButtonRef = useRef(null);

  const [data, setData] = useState([]);

  const maps = {
    categories: {
      func: getAllCategories,
      key: 'strCategory'
    },
    mealCategories: {
      func: getAllMealCategories,
      key: 'strCategory'
    },
    areas: {
      func: getAllAreas,
      key: 'strArea'
    },
    ingredients: {
      func: getAllIngredients,
      key: 'strIngredient'
    },
  }

  useEffect(() => {
    const getData = async (obj) => {
      const { data } = await obj.func();
      console.log(data);
      if (type !== 'mealCategories') {
        setData((data.meals || []).map(m => m[obj.key]));
      } else {
        setData(data.categories || []);
      }
    };

    getData(maps[type]);
  }, []);

  return (
    <Transition.Root show={open} as={Fragment} appear={true}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        // initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 sm:p-6 sm:pb-4">
                <h2>{type}</h2>

                {type !== 'mealCategories' && (
                  <>
                    {data.map(item => (
                      <div className="py-1" key={item}>
                        <a
                            href="#"
                          className={'block px-4 py-2 text-sm'}
                          onClick={e => {
                            setOpen(false)
                            setFilter(item)
                          }}
                          >
                            {item}
                          </a>
                      </div>
                    ))}
                  </>
                )}

                {type === 'mealCategories' && (
                  <>
                    {data.map(item => (
                      // <div className="py-1" key={item.idCategory}>
                      //   <h2><a
                      //     href="#"
                      //     className={'block px-4 py-2 text-sm font-bold'}
                      //   >
                      //     {item.strCategory}
                      //   </a></h2>
                      //   <small>{item.strCategoryDescription }</small>
                      // </div>
                      <a key={item.idCategory} className="group">
                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                          <img
                            src={item.strCategoryThumb}
                            alt={item.strCategory}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                          />
                        </div>
                        <h1 className="mt-4 text-sm text-gray-700">{item.strCategory}</h1>
                        <small>{item.strCategoryDescription }</small>
                        {/* <p className="mt-1 text-lg font-medium text-gray-900">{meal.price}</p> */}
                      </a>
                    ))}
                  </>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}