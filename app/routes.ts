import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login","routes/login.tsx"),
    route("/events","routes/evenements.tsx"),
    route("/event/:eventId","routes/evenement.tsx"),
    route("/new-event","routes/newEvenement.tsx"),

] satisfies RouteConfig;
