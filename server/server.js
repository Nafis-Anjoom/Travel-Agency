const express = require("express");
const cors = require("cors");
const app = express();
const bookingAgentRoutes = require("./routes/bookingAgent");
const gamesRoutes = require("./routes/attends");
const fanRoutes = require("./routes/fan");
const tripsRoutes = require("./routes/trips");
const activitiesRoutes = require("./routes/activities");
const accommodationsRoutes = require("./routes/accommodations");

const PORT = 3005;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({statusCode: 200, result: "working"});
});

// Booking agents
app.get("/getBookingAgents", bookingAgentRoutes.getBookingAgents);
app.post("/addBookingAgent", bookingAgentRoutes.addBookingAgent);
app.put("/editBookingAgent/:employerId", bookingAgentRoutes.editBookingAgent);
app.delete("/deleteBookingAgent/:employerId", bookingAgentRoutes.deleteBookingAgent);

// Attends
app.put("/fan/:fanId/game/:gameId/seatNum/:seatNum/zone/:zone", gamesRoutes.editSeats);
app.delete("/fan/:fanId/game/:gameId/seatNum/:seatNum/zone/:zone", gamesRoutes.deleteTicket);
app.get("/games/:fanId", gamesRoutes.getGamesByFanId);
app.get("/fan/:fanId/game/:gameId", gamesRoutes.getTicket);
app.get("/allGames", gamesRoutes.getAllGames);
app.get("/gamesByDate", gamesRoutes.getGamesByDate);
app.get("/getDominantCountries", gamesRoutes.getDominantCountry);
app.get("/getAttendanceBy", gamesRoutes.getAttendanceBy);

// Trips
app.get("/trips/:fanId", tripsRoutes.getTripsByFanId);
app.get("/trips", tripsRoutes.getAllTrips);
app.get("/groupedTrips", tripsRoutes.getTripsGroupedByDest);
app.post("/addTrip", tripsRoutes.addTrip);
app.post("/addFansToTrip", tripsRoutes.addFansToTrips);

// Activities
app.get("/activities/:fanId", activitiesRoutes.getActivities);

// Fans
app.get("/fans", fanRoutes.getFans);
app.get("/getVipFans", fanRoutes.getVipFans);
app.delete("/fan/:fanId", fanRoutes.deleteFan);

// Accommodations
app.get("/accommodations", accommodationsRoutes.getAllAccommodations);
app.get("/accommodationsByBudget", accommodationsRoutes.getAccommodationsByBudget);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

