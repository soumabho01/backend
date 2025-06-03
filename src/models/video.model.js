import mongoose from "mongoose";    
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
//for watch history problems

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublihsed: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: mongoose,
        required: true,
        trim: true,
    },
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model('Video', videoSchema);