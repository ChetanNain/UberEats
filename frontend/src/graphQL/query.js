import { gql } from '@apollo/client';

const GET_DISHES = gql`
  query getDishes ($searchQuery: String) {
      getDishes(searchQuery: $searchQuery) {
        dishName
        mainIngredients
        dishImage
        dishPrice
        description
        dishCategory
        dishTag
        dishType
        restaurantId {
          name,
        }
      }
    }
`;

export {
    GET_DISHES
}