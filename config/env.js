import {config} from 'dotenv';

config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});
export const {port,NODE_ENV} = process.env;