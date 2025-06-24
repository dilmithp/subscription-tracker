import dayjs from "dayjs";
import {createRequire} from 'module';
import Subscription from "../model/subscription.model.js";
const require = createRequire(import.meta.url);
const{ serve } = require('@upstash/workflow/express');

const REMINDERS = [7,5,2,1];

export const sendReminder = serve(async (context) => {
    const { subscriptionId } = context.requestPlayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== active) return;

    const renewalDate = dayjs(subscription.renewalDate);

    if( renewalDate.isBefore(dayjs())) {
        console.log(`Subscription ${subscriptionId} has already expired.`);
        return;
    }

    for( const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
    }
    if(reminderDate.isAfter(dayjs())) {
        await sleepUntilReminder(context, `reminder-${daysBefore}days`, reminderDate);
    }

    await triggerReminder(context, `reminder-${daysBefore}days`);
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription',() => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, lable, date) => {
    console.log(`Sleeping until ${lable} reminder at ${date.format('YYYY-MM-DD')}`);
    await context.sleepUntil(lable,date.toDate());
}
const triggerReminder = async (context, lable) => {
    return await context.run(lable,() => {
        console.log(`Trigger ${lable} Reminder`);
    })
}

