import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,    
        trim: true,
        index:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minlength: 6,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://example.com/default-avatar.png', // Default avatar URL
    },
    coverImage: {
        type: String,
        required: false,
        default: 'https://example.com/default-cover.jpg', // Default cover image URL
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    }],
    refreshToken: {
        type: String,
    }
},{ timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();//if 'if conditioon' isnt done password would be hashed even if user changes his avatar
});

userSchema.methods.isPasswordCorrect =async function(password) {
    return await bcrypt.compare(password, this.password);

    };

userSchema.methods.generateAccessToken = function() {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Access token valid for 15 minutes
        }
    )
}
userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        {
            _id: this._id,
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Access token valid for 15 minutes
        }
    )
}

export const User = mongoose.model('User', userSchema);