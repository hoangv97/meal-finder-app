import { useEffect, useState } from "react";
import { getMealsByName, getMealsByFirstLetter, getMealById, getRandomMeal, getAllMealCategories, getAllCategories, getAllAreas, getAllIngredients, getMealsByMainIngredient, getMealsByCategory, getMealsByArea } from "../hooks/useMealApi";
import Meals from "./Meals";
import Search from "./Search";
import Dropdown from "./Dropdown";
import Button from "./Button";
import Modal from "./Modal";

export default function App() {

  const [searchByNameInput, setSearchByNameInput] = useState('');
  const [searchByFirstLetterInput, setSearchByFirstLetterInput] = useState('');
  const [searchByIdInput, setSearchByIdInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);

  const [mealCategories, setMealCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

   const [modalFilter, setModalFilter] = useState('');

  const clearInputs = () => {
    setSearchByNameInput('');
    setSearchByFirstLetterInput('');
    setSearchByIdInput('');
  };
  
  const getMealsByFunc = async (func, input) => {
    setLoading(true);
    const { data } = await func(input);
    setLoading(false);
    console.log(data);
    setMeals(data.meals || []);
  };

  const getRandom = () => {
    getMealsByFunc(getRandomMeal);
  };

  useEffect(() => {
    if (searchByNameInput) {
      getMealsByFunc(getMealsByName, searchByNameInput);
    }
  }, [searchByNameInput]);

  useEffect(() => {
    if (searchByFirstLetterInput) {
      getMealsByFunc(getMealsByFirstLetter, searchByFirstLetterInput);
    }
  }, [searchByFirstLetterInput]);

  useEffect(() => {
    if (searchByIdInput) {
      getMealsByFunc(getMealById, searchByIdInput);
    }
  }, [searchByIdInput]);

  // useEffect(() => {
  //   const getData = async (setFunc, apiFunc, itemKey) => {
  //     const { data } = await apiFunc();
  //     setLoading(false);
  //     console.log(data);
  //     setFunc((data.meals || []).map(m => m[itemKey]));
  //   };

  //   // getData(setMealCategories, getAllMealCategories, 'strCategory');
  //   getData(setCategories, getAllCategories, 'strCategory');
  //   getData(setAreas, getAllAreas, 'strArea');
  //   getData(setIngredients, getAllIngredients, 'strIngredient');
  // }, []);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  useEffect(() => {
    console.log(modalType, modalFilter);
    if (modalType && modalFilter) {
      if (modalType === 'categories') {
        getMealsByFunc(getMealsByCategory, modalFilter);
      } else if (modalType === 'areas') {
        getMealsByFunc(getMealsByArea, modalFilter);
      } else if (modalType === 'ingredients') {
        getMealsByFunc(getMealsByMainIngredient, modalFilter);
      } 
    }
  }, [modalFilter]);

  return (
    <div>
      <div className="">
        <Search title="Search meals by name" input={searchByNameInput} setInput={setSearchByNameInput} />
        <Search title="Search meals by first letter" input={searchByFirstLetterInput} setInput={setSearchByFirstLetterInput} />
        <Search title="Search meal by id" input={searchByIdInput} setInput={setSearchByIdInput} />

        {/* <Button title="Clear search inputs" onClick={clearInputs} /> */}

        <Button title="Random meal" onClick={getRandom} />

        <div>
          <Button title="Meal Categories" onClick={() => openModal('mealCategories')} />
          <Button title="Categories" onClick={() => openModal('categories')} />
          <Button title="Areas" onClick={() => openModal('areas')} />
          <Button title="Ingredients" onClick={() => openModal('ingredients')} />
        </div>

        {/* <div>
          <Dropdown title="Meal Categories" data={categories} />
          <Dropdown title="Categories" data={categories} />
          <Dropdown title="Areas" data={areas} />
          <Dropdown title="Ingredients" data={ingredients} />
        </div> */}

        {showModal && <Modal open={showModal} setOpen={setShowModal} type={modalType} setFilter={setModalFilter} />}
      </div>
      
      {!loading && <Meals meals={meals} />}
    </div>
  )
}
