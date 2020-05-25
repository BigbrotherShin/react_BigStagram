import { useDispatch } from 'react-redux';
import {
  ADD_FOLLOWING_REQUEST,
  DELETE_FOLLOWING_REQUEST,
} from '../reducers/user';

const dispatch = useDispatch();

export const addFollowing = (userData) => () => {
  dispatch({
    type: ADD_FOLLOWING_REQUEST,
    data: {
      userId: userData.id,
    },
  });
};

export const deleteFollowing = (userData) => () => {
  dispatch({
    type: DELETE_FOLLOWING_REQUEST,
    data: {
      userId: userData.id,
    },
  });
};
