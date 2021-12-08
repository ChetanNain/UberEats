const   ADD_USER = `mutation register(
    $fullName: String,
    $mobileNumber: String,
    $userType:  String,
    $password: String,
    $dateOfBirth: String,
    $email: String,
    $uploadedFile: String,
    $address: String,
    $city: String,
    $country: String
    ) {
    register( 
        fullName: $fullName,
        mobileNumber: $mobileNumber,
        userType: $userType,
        password: $password,
        dateOfBirth: $dateOfBirth,
        email: $email,
        uploadedFile: $uploadedFile,
        address: $address,
        city: $city,
        country: $country
        ) {
        fullName
        email
      }
  }`

  export {
    ADD_USER,
}