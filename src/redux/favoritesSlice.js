import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: JSON.parse(localStorage.getItem("favorites")) || [],
  reducers: {
    addFavorite: (state, action) => {
      if (state.length < 10) {
        state.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
      if (state.length === 10) {
        alert(
          "Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız."
        );
      }
    },
    removeFavorite: (state, action) => {
      const characterId = state.findIndex((id) => id === action.payload);
      if (characterId !== -1) {
        state.splice(characterId, 1);
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
