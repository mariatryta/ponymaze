import Home from "../views/Home.vue";
import Maze from "../views/Maze.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/maze", component: Maze },
  { path: "/about", component: Maze }
];

export default routes;
