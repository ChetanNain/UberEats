const   ADD_USER = `mutation register {
    register {
        fullName
        mobileNumber
        userType
        password
        dateOfBirth: "01-01-1995",
        email: "abc@xyz",
        uploadedFile: "",
        address: "",
        city:"",
        country: "" 
        },
        fullName,
        email,
      }
  }`

  export {
    ADD_USER,
}