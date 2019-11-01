import { UserActionTypes } from './user.types';
import {storage} from './firebase.utils'
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const uploadProfileImage = (file, fileName) => {
  storage.ref(`images/${image.name}`).put(image)

}