const GET_DISHES = `query getDishes($searchQuery: String) {
  getDishes(searchQuery: $searchQuery) {
    restaurantMobileNumber
    dishName
    mainIngredients
    dishImage
    dishPrice
    description
    dishCategory
    dishTag
    dishType
    restaurantId {
      mobileNumber
      name
      city
      provience
      pincode
      description
      restaurantType
    }
  }
}
`;

const GET_CART = `query getCart {
  getCart {
      customerMobileNumber
      dishId {
        dishId
        restaurantMobileNumber
        dishName
        mainIngredients
        dishImage
        dishPrice
        description
        dishCategory
        dishTag
        dishType  
      },
      restaurantMobileNumber
      quantity
      itemPrice
      totalPrice
      checkedOut
      specialInstruction
      date
      status
    }
}
`;

const GET_ORDERS = `query getOrders{
  getOrders {
    customerMobileNumber
    dishId {
      dishId
      restaurantMobileNumber
      dishName
      mainIngredients
      dishImage
      dishPrice
      description
      dishCategory
      dishTag
      dishType  
    },
    restaurantMobileNumber
    quantity
    itemPrice
    totalPrice
    checkedOut
    specialInstruction
    date
    status
  }
}`;
export {
    GET_DISHES,
    GET_CART,
    GET_ORDERS
}