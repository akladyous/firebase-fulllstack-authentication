import mongoose from "mongoose"
const { Schema } = mongoose;
import validUrl from "valid-url";

const urlsSchema = new Schema({
    originalUrl: {
        type: String,
        required: [true, 'Original URL is required'],
        lowercase: true,
        // validate: [validUrl, 'Please enter a valid URL'],
        validate: {
            validator: function validateUrl(v) {
                if (validUrl.isUri(v)) {
                    return true
                } else {
                    return false
                }
            },
            message: (props) => { return `${props.value} is not valid URL` }
        },
    },
    shortUrl: {
        type: String,
        required: [true, 'Short URL is required'],
        lowercase: true,
        unique: [true, 'Short URL already exists'],
        // default: () => { return nanoid(8) },
        index: true,
    },
}
    , { timestamps: true }
);

// urlsSchema.pre('save', async function (next) {
//     const shortUrl = await this.generateShortUrl();
//     this.shortUrl = shortUrl;
//     next();
// });

// urlsSchema.statics.findByShortUrl = async function (shortUrl) {
//     return await this.findOne({ shortUrl });
// }

// urlsSchema.post('save', (doc, next) => {
//     console.log('doc: ', doc)
//     next();
// }

const Urls = mongoose.model("Urls", urlsSchema);
export default Urls;
