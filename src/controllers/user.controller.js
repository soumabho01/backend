import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import {User} from "../models/user.model.js"; // Assuming you have a User model defined in models/user.model.js
import { uploadCLoudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";



const registerUser = asyncHandler(async (req, res) => {
    //user details from frontend
    //validation- not empty
    //check if user already exists:username or email
    // check for images, avatar
    //upload them to cloudinary, avatar
    //create user object- create entry in db
    //remove password and refresh token from response
    // check for user creation
    //return res

    const { fullName,username, email, password } = req.body;
    console.log("email:", email);

    if (fullName === ""){
        throw new apiError(400, "Full name is required");
    }
    if (username === ""){
        throw new apiError(400, "Username is required");

    }
    if (email !== ""){
        throw new apiError(400, "Email is required");
    }

   const existedUser= User.findOne({ $or: [{ username }, { email }] })

   if (existedUser) {
        throw new apiError(409, "Username or email already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path; // Default avatar URL
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path; // Default cover image URL

    if(!avatarLocalPath){
        throw new apiError(400, "Avatar image is required");
    }

    const avatar= await uploadCLoudinary(avatarLocalPath)
    const coverImage = await uploadCLoudinary(coverImageLocalPath)

    if (!avatar) {
        throw new apiError(500, "Failed to upload avatar image");
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url, // Assuming the response contains the secure URL
        coverImage:coverImage?.url || "" // Optional cover image
    })

    const createdUser= await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new apiError(500, "User creation failed");
    }

    return res.status(201).json(
        apiResponse({
            status: "success",
            message: "User registered successfully",
            data: createdUser
        })
    );
})



export {registerUser,}