export const DEFAULT_ROUTE_MAPPING_BY_USER_ROLE = {
    user: "/",
    admin: "/admin",
    doctor: "/doctor"
};

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const settings = {
    BACKEND_URL : VITE_API_BASE_URL
}