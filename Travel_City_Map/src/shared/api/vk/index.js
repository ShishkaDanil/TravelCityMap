import axios from "axios";
import { httpErrorHandler } from "../../helpers/http.error.handler";

const getDirectionsApi = (locations) => axios.post('https://maps.vk.com/api/optimal_route', {
  locations,
  costing: "pedestrian",
  costing_options:
  {
      auto:
      {
          use_border_crossing: 0
      }
  },
  units: "kilometers",
  id: "my_route"
}, {
  params: {
    api_key: '581993bd45c4d9f1bceb4399c4036ee24a21220efd7889feced09887fe7b4173'
  }
});

export const getDirections = httpErrorHandler(getDirectionsApi);
