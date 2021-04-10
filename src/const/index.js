import Icon from "@material-ui/core/Icon"

import { Home, Dataset, Predict } from "pages"

export const menus = [
  {
    name: "Home",
    path: "/",
    icon: <Icon>home</Icon>,
  },
  {
    name: "Dataset",
    path: "/dataset",
    icon: <Icon>view_list</Icon>,
  },
  {
    name: "Predict",
    path: "/predict",
    icon: <Icon>person_search</Icon>,
  },
  {
    name: "Train",
    path: "/train",
    icon: <Icon>model_training</Icon>,
  },
]

export const routes = [
  {
    name: "Dataset",
    path: "/dataset",
    component: Dataset,
  },
  {
    name: "Predict",
    path: "/predict",
    component: Predict,
  },
  {
    name: "Home",
    path: "/",
    component: Home,
  },
]
