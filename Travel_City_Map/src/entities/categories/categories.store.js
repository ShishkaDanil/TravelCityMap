import { makeAutoObservable } from 'mobx';
import { getCategories } from '../../shared/api/categories/index'

class Categories {
  categories = [];
  selectedCategories = 
    localStorage.getItem('savedCategories') ?
      JSON.parse(localStorage.getItem('savedCategories'))
      : {}

  constructor() {
    makeAutoObservable(this);
    console.log(localStorage.getItem('savedCategories') ?
    JSON.parse(localStorage.getItem('savedCategories'))
    : {});
  }

  getCategories = async () => {
    const categories = await getCategories();
    if (categories.data) {
      this.categories = categories.data;
      console.log(categories.data);
    }
  }

  selectCategories(id) {
    this.selectedCategories[id] = true;
    localStorage.setItem('savedCategories', JSON.stringify(this.selectedCategories));
  }
  unselectCategory(id) {
    delete this.selectedCategories[id];
    localStorage.setItem('savedCategories', JSON.stringify(this.selectedCategories));
  }
}

export const categoriesStore = new Categories();