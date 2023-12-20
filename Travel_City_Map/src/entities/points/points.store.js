import { makeAutoObservable } from "mobx";
import { categoriesStore } from "../categories/categories.store";
import { getPoints } from "../../shared/api/points";
import mmrgl from 'mmr-gl';

class Points {
  points = []
  constructor() {
    makeAutoObservable(this)
  }

  marks=[]

  fetchPoints = async () => {
    await this.clearPreviusMarks();
    const categories = Object.keys(categoriesStore.selectedCategories);
    const points = await getPoints(categories);
    if (points.data) {
      this.points = points.data
    }

    for (const point of this.points) {
      const marker = new mmrgl.Marker({
        color: '#2688eb'
      }).setLngLat({ lng: point.longitude, lat: point.latitude });
      this.marks.push(marker)
    }
    console.log(this.marks);
  }
  
  async clearPreviusMarks() {
    for (const mark of this.marks) {
      mark.remove();
    }
  }

  get getPoints() {
    return this.points;
  }
}

export const pointsStore = new Points()