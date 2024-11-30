
import './open-big-picutre.js';
import './load-picture.js';
import { onCloseFrom, setUserFormSubmit } from './user-form.js';
import { getData } from './api.js';
import { onSuccess, onError } from './api-util.js';


getData()
  .then((pictures) => {
    onSuccess(pictures);
  })
  .catch(() => {
    onError();
  });

setUserFormSubmit(onCloseFrom);
