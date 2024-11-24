import { renderThumbnail } from './render-thumbnails.js';
import './open-big-picutre.js';
import { onCloseFrom, setUserFormSubmit } from './user-form.js';
import { getData } from './api.js';


getData()
  .then((pictures) => {
    renderThumbnail(pictures);
  });

setUserFormSubmit(onCloseFrom);
