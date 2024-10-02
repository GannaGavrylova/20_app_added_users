import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataUsers: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.dataUsers.push(action.payload);
    },
    removeUser(state, action) {
      state.dataUsers = state.dataUsers.filter(
        (users) => users.id !== action.payload
      );
    },
    // editUser(state, action) {
    //   const { id, updatedData } = action.payload; // Приходит id и обновленные данные
    //   state.dataUsers = state.dataUsers.map((user) => {
    //     if (user.id === id) {
    //       return { ...user, ...updatedData };
    //     }
    //     return user;
    //   });
    // },

    editUser(state, action) {
      // Находим пользователя по id и обновляем его данные
      const index = state.dataUsers.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.dataUsers[index] = action.payload; // Обновляем пользователя
      }
    },
  },
});

export const { addUser, removeUser, editUser } = userSlice.actions;
export default userSlice.reducer;
