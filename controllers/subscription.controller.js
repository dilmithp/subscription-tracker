import Subscription from "../model/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        const {workflowRunId} = await workflowClient.trigger({
            url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
                body:{
                subscriptionId: Subscription.id,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            retries:0,
        })
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription,workflowRunId,
        });
    } catch (err) {
        console.error("Error creating subscription:", err);
        next(err);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        if(req.user.id !== req.params.id){
            const error = new Error("You are not authorized to view this user's subscriptions");
            error.status = 401;
            throw error;

        }
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            message: "User subscriptions fetched successfully",
            data: subscriptions,
        });
    }catch(err) {
        next(err);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            message: "All subscriptions fetched successfully",
            data: subscriptions,
        });
    } catch (err) {
        console.error("Error fetching all subscriptions:", err);
        next(err);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Subscription fetched successfully",
            data: subscription,
        });
    } catch (err) {
        console.error("Error fetching subscription by ID:", err);
        next(err);
    }
}