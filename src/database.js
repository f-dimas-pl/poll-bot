import {createClient} from "@supabase/supabase-js";
import API_CONFIG from "./config/api.config.js";

const supabase = createClient(API_CONFIG.databaseUrl, API_CONFIG.databaseRoleApi)

export {
    supabase
}