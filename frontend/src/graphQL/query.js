const GET_DISHES = `query getDishes($searchQuery: String) {
  getDishes(searchQuery: $searchQuery) {
    _id
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

const GET_RESTAURANT = `query getRestaurant{
  getRestaurant {
    mobileNumber
    name
    address
    city
    provience
    pincode
    images
    description
    restaurantType 
  }
}`;

const GET_CUSTOMER = `query getCustomer{
  getCustomer {
    fullName
    dateOfBirth
    email
    mobileNumber
    password
    favorites
    profilePicture
    language
    restFlg
    address
  }
}`;

export {
    GET_DISHES,
    GET_CART,
    GET_ORDERS,
    GET_RESTAURANT,
    GET_CUSTOMER
}