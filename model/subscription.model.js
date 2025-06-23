import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: [3, "Subscription name must be at least 3 characters long"],
        maxlength: [100, "Subscription name must not exceed 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "LKR"],
        default: "LKR",
    },
    frequency: {
        type: String,
        enum: ["monthly", "yearly","weekly", "daily"],
        required: [true, "Frequency is required"],
    },
    category: {
        type: String,
        enum: ["food", "travel", "digital", "health", "basic","loan","Entertainment"],
        default: "basic",
        required: [true, "Frequency is required"],
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "cash", "bank_transfer"],
        default: "card",
        required: [true, "Payment method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "cancelled"],
        default: "active",
        required: [true, "Status is required"],
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator:(value) => value <= new Date(),
            message: "Start date must be in the past or today",
        },
    },
    renewDate:{
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate
            },
            message: "Renewal date must be in the future",
        },
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true,
    }
}, { timestamps: true });


subscriptionSchema.pre("save",function (next) {
    // auto cal the renewal date based on frequency
    if(!this.renewDate) {
        const renewalPeriods = {
            monthly: 30,
            yearly: 365,
            weekly: 7,
            daily: 1
        };
        const period = renewalPeriods[this.frequency];
        if (period) {
            this.renewDate = new Date(this.startDate.getTime() + period * 24 * 60 * 60 * 1000);
        } else {
            return next(new Error("Invalid frequency for renewal date calculation"));
        }

    }

    //auto update the status based on renewal date
    if (this.renewDate < new Date()) {
        this.status = "expired";
    } else {
        this.status = "active";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;