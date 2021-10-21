import { addDocfyRoutes } from '@docfy/ember';
import EmbroiderRouter from '@embroider/router';
import config from 'ember-cheat-sheet/config/environment';

export default class Router extends EmbroiderRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  addDocfyRoutes(this);
});
