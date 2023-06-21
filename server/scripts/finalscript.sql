CREATE DATABASE IF NOT EXISTS wct;
USE wct;
CREATE Table BookingAgent(
EmployerID INTEGER AUTO_INCREMENT,
FirstName CHAR(20),
LastName CHAR(20),
PhoneNum CHAR(20),
Email CHAR(80),
ReferenceID INTEGER,
UNIQUE (ReferenceID),
PRIMARY KEY (EmployerID)
);

CREATE Table Stadium(
StadiumName CHAR(20),
Capacity INTEGER,
PRIMARY KEY (StadiumName)
);

CREATE Table TripManager(
EmployerID INTEGER AUTO_INCREMENT,
FirstName CHAR(20),
LastName CHAR(20),
AreaOfExpertise CHAR(20),
PRIMARY KEY (EmployerID)
);

CREATE Table Accommodations(
Address CHAR(80),
Name CHAR(40),
Tier CHAR(40),
PRIMARY KEY (Address),
Cost INTEGER,
City CHAR(80)
);

CREATE Table Bookings(
BookingID INTEGER AUTO_INCREMENT,
Address CHAR(80),
BookingAgentID INTEGER,
CheckOutDate DATETIME,
CheckInDate DATETIME,
RoomNumber INTEGER,
PRIMARY KEY (BookingID),
FOREIGN KEY (Address) REFERENCES Accommodations(Address),
FOREIGN KEY (BookingAgentID) REFERENCES BookingAgent(EmployerID)
);


CREATE Table Fans(
FanID INTEGER AUTO_INCREMENT,
BookingID INTEGER,
FirstName CHAR(20),
LastName CHAR(20),
Nationality CHAR(20),
Gender CHAR(20),
Email CHAR(80),
Password CHAR(80),
UNIQUE (Email),
PRIMARY KEY (FanID),
FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID)
);

CREATE Table Games(
GameID INTEGER AUTO_INCREMENT,
Team1 CHAR(40),
Team2 CHAR(40),
StadiumName CHAR(40),
StartDateTime DATETIME,
PRIMARY KEY (GameID),
FOREIGN KEY (StadiumName) REFERENCES Stadium(StadiumName)
);

CREATE Table Activities(
ActivityID INTEGER AUTO_INCREMENT,
Name CHAR(40),
Location CHAR(80),
TripManagerID INTEGER NOT NULL,
Description VARCHAR(1000),
PRIMARY KEY (ActivityID),
FOREIGN KEY (TripManagerID) REFERENCES TripManager(EmployerID)
ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE Table Trips(
TripID INTEGER AUTO_INCREMENT,
Destination CHAR(100),
DepartureDateTime DATETIME,
TripManagerID INTEGER NOT NULL,
PRIMARY KEY (TripID),
FOREIGN KEY (TripManagerID)REFERENCES TripManager(EmployerID)
ON DELETE NO ACTION ON UPDATE CASCADE
);


CREATE Table Participates(
FanID INTEGER,
ActivityID INTEGER,
PRIMARY KEY (FanID, ActivityID),
FOREIGN KEY (FanID) REFERENCES Fans(FanID)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (ActivityID) REFERENCES Activities(ActivityID)
);

CREATE Table Takes(
FanID INTEGER,
TripID INTEGER,
PRIMARY KEY (FanID, TripID),
FOREIGN KEY (FanID) REFERENCES Fans(FanID)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (TripID) REFERENCES Trips(TripID)
);

CREATE Table Offers(
SeatNum INTEGER,
GameID INTEGER,
Zone CHAR(10),
IsReserved TINYINT,
GateNumber INTEGER,
BookingAgentID INTEGER,
PRIMARY KEY (SeatNum, GameID, Zone),
FOREIGN KEY (GameID) REFERENCES Games(GameID),
FOREIGN KEY (BookingAgentID) REFERENCES BookingAgent(EmployerID)
);


CREATE Table Attends(
FanID INTEGER,
SeatNum INTEGER,
Zone CHAR(10),
GameID INTEGER,
PRIMARY KEY (FanID, SeatNum, Zone, GameID),
FOREIGN KEY (FanID) REFERENCES Fans(FanID)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (GameID) REFERENCES Games(GameID),
UNIQUE (SeatNum, Zone, GameID)
);

/* Stadium */
INSERT INTO `wct`.`Stadium` (`StadiumName`, `Capacity`) VALUES ('Lusail', '90000');
INSERT INTO `wct`.`Stadium` (`StadiumName`, `Capacity`) VALUES ('Al Bayt', '60000');
INSERT INTO `wct`.`Stadium` (`StadiumName`, `Capacity`) VALUES ('Khalifa', '45000');
INSERT INTO `wct`.`Stadium` (`StadiumName`, `Capacity`) VALUES ('Ahmad Bin Ali', '45000');
INSERT INTO `wct`.`Stadium` (`StadiumName`, `Capacity`) VALUES ('Education City', '45000');

/* Games */
INSERT INTO `wct`.`Games` (`GameID`, `Team1`, `Team2`, `StadiumName`, `StartDateTime`) VALUES ('1', 'Germany', 'Brazil', 'Lusail', '2022-11-13 02:00:00');
INSERT INTO `wct`.`Games` (`GameID`, `Team1`, `Team2`, `StadiumName`, `StartDateTime`) VALUES ('2', 'Portugal', 'France', 'Al Bayt', '2022-11-13 05:00:00');
INSERT INTO `wct`.`Games` (`GameID`, `Team1`, `Team2`, `StadiumName`, `StartDateTime`) VALUES ('3', 'Argentina', 'Peru', 'Khalifa', '2022-11-13 08:00:00');
INSERT INTO `wct`.`Games` (`GameID`, `Team1`, `Team2`, `StadiumName`, `StartDateTime`) VALUES ('4', 'Tunisia', 'Australia', 'Ahmad Bin Ali', '2022-11-13 11:00:00');
INSERT INTO `wct`.`Games` (`GameID`, `Team1`, `Team2`, `StadiumName`, `StartDateTime`) VALUES ('5', 'Denmark', 'Iran', 'Education City', '2022-11-14 02:00:00');
INSERT INTO `wct`.`Games` (`GameID`, `Team1`, `Team2`, `StadiumName`, `StartDateTime`) VALUES ('6', 'USA', 'England', 'Lusail', '2022-11-15 08:00:00');
INSERT INTO `wct`.`Games` (`GameID`, `Team1`, `Team2`, `StadiumName`, `StartDateTime`) VALUES ('7', 'Belgium', 'Canada', 'Al Bayt', '2022-11-17 11:00:00');
INSERT INTO `wct`.`Games` (`GameID`, `Team1`, `Team2`, `StadiumName`, `StartDateTime`) VALUES ('8', 'Brazil', 'Poland', 'Khalifa', '2022-11-19 05:00:00');

/* BookingAgent */
INSERT INTO `wct`.`BookingAgent` (`EmployerID`, `FirstName`, `LastName`, `PhoneNum`, `Email`, `ReferenceID`) VALUES ('1', 'John', 'Doe', '123-532-5747', 'john.doe@gmail.com', '1');
INSERT INTO `wct`.`BookingAgent` (`EmployerID`, `FirstName`, `LastName`, `PhoneNum`, `Email`, `ReferenceID`) VALUES ('2', 'Alan', 'Mackenzie', '123-584-9583', 'alan.mackenzie@gmail.com', '2');
INSERT INTO `wct`.`BookingAgent` (`EmployerID`, `FirstName`, `LastName`, `PhoneNum`, `Email`, `ReferenceID`) VALUES ('3', 'Floyd', 'McCullen', '123-485-8581', 'floyd.mccullen@gmail.com', '3');
INSERT INTO `wct`.`BookingAgent` (`EmployerID`, `FirstName`, `LastName`, `PhoneNum`, `Email`, `ReferenceID`) VALUES ('4', 'Steve', 'Turner', '123-481-4828', 'steve.turner@gmail.com', '4');

/* Accomodations */
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('8648 Alvarado Boulevard', 'Grand Heritage', '5', '400', 'Al Khor');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('4321 Vine Street', 'Mondrian Doha', '4', '330', 'Doha');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('3925 Bloomberg Street', 'Four Seasons', '3', '275', 'Al Fukra');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('3423 Agg Street', 'Radisson Blue Hotel', '2', '220', 'Dukhan');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('2342 Maple Street', 'Ritz-Carlton', '1', '200', 'Abu Thaylah');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('1042 Maple Grove', 'Petit Chapeau', '3', '450', 'Abu Thaylah');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('1034 Desjardins Street', 'Chez Remy', '4', '220', 'Dukhan');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('399 Bordeau Boulevard', 'Chez Steven', '5', '600', 'Al Fukra');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('7583 Richmond Avenue', 'SAP Hotel', '2', '375', 'Doha');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('6553 Paseo Padre Street', 'Galvanize Motel', '1', '130', 'Al Khor');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('3823 Bordeau Boulevard', 'Trump Tower', '4', '600', 'Abu Thaylah');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('3224 Desjardins Street', 'Chez Pitbull', '1', '180', 'Dukhan');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('6731 Stevenson Boulevard', 'Tunisia Central', '5', '730', 'Al Fukra');
INSERT INTO `wct`.`Accommodations` (`Address`, `Name`, `Tier`, `Cost`, `City`) VALUES ('1834 Huntington Square', 'Chez Biden', '2', '200', 'Doha');


/* TripManager */
INSERT INTO `wct`.`TripManager` (`EmployerID`, `FirstName`, `LastName`, `AreaOfExpertise`) VALUES ('1', 'Brad', 'Martins', 'Casino');
INSERT INTO `wct`.`TripManager` (`EmployerID`, `FirstName`, `LastName`, `AreaOfExpertise`) VALUES ('2', 'Gareth', 'Drinkwater', 'Amusement Park');
INSERT INTO `wct`.`TripManager` (`EmployerID`, `FirstName`, `LastName`, `AreaOfExpertise`) VALUES ('3', 'Tyronne', 'Lee', 'Hiking');
INSERT INTO `wct`.`TripManager` (`EmployerID`, `FirstName`, `LastName`, `AreaOfExpertise`) VALUES ('4', 'Hamza', 'Bakkali', 'Beach');

/* Activities */
INSERT INTO `wct`.`Activities` (`ActivityID`, `Name`, `Location`, `TripManagerID`, `Description`) VALUES ('1', 'Hiking', 'Doha', '2', 'Hike one of Qatar\'s largest mountains');
INSERT INTO `wct`.`Activities` (`ActivityID`, `Name`, `Location`, `TripManagerID`, `Description`) VALUES ('2', 'Cooking', 'Dukhan', '3', 'Cook Qatar\'s most well-known dishes');
INSERT INTO `wct`.`Activities` (`ActivityID`, `Name`, `Location`, `TripManagerID`, `Description`) VALUES ('3', 'Spa Resort', 'Al Khor', '4', 'Sit back and relax from World Cup games in this wonderful resort');
INSERT INTO `wct`.`Activities` (`ActivityID`, `Name`, `Location`, `TripManagerID`, `Description`) VALUES ('4', 'Burj Khalifa Visit', 'Burj Khalifa', '1', 'Visit one of the tallest building in the world');

/* Trips */
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('1', 'Doha', '2022-11-13 02:00:00', '4');
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('2', 'Doha', '2022-11-14 05:00:00', '3');
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('3', 'Doha', '2022-11-15 08:00:00', '2');
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('4', 'Al Khor', '2022-11-13 02:00:00', '1');
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('5', 'Al Khor', '2022-11-14 07:00:00', '4');
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('6', 'Al Khor', '2022-11-15 11:00:00', '3');
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('7', 'Dukhan', '2022-11-13 02:00:00', '2');
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('8', 'Dukhan', '2022-11-14 06:00:00', '1');
INSERT INTO `wct`.`Trips` (`TripID`, `Destination`, `DepartureDateTime`, `TripManagerID`) VALUES ('9', 'Dukhan', '2022-11-15 10:00:00', '4');

/* Bookings */
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('1', '8648 Alvarado Boulevard', '4', '2022-12-02 12:00:00', '2022-11-20 08:00:00', '23');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('2', '3925 Bloomberg Street', '3', '2022-11-27 12:00:00', '2022-11-10 08:00:00', '238');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('3', '4321 Vine Street', '2', '2022-12-12 12:00:00', '2022-12-08 08:00:00', '220');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('4', '3423 Agg Street', '1', '2022-11-30 12:00:00', '2022-11-08 08:00:00', '110');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('5', '2342 Maple Street', '4', '2022-12-15 12:00:00', '2022-12-01 08:00:00', '54');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('6', '4321 Vine Street', '3', '2022-12-09 12:00:00', '2022-11-25 08:00:00', '137');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('7', '3925 Bloomberg Street', '2', '2022-12-10 12:00:00', '2022-11-15 08:00:00', '75');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('8', '4321 Vine Street', '1', '2022-12-28 12:00:00', '2022-12-10 08:00:00', '52');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('9', '3423 Agg Street', '4', '2022-11-17 12:00:00', '2022-11-01 08:00:00', '160');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('10', '6731 Stevenson Boulevard', '2', '2022-11-28 12:00:00', '2022-11-29 08:00:00', '323');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('11', '6553 Paseo Padre Street', '1', '2022-11-15 12:00:00', '2022-12-03 08:00:00', '35');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('12', '3925 Bloomberg Street', '4', '2022-11-19 12:00:00', '2022-11-22 08:00:00', '48');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('13', '399 Bordeau Boulevard', '3', '2022-11-30 12:00:00', '2022-12-15 08:00:00', '94');
INSERT INTO `wct`.`Bookings` (`BookingID`, `Address`, `BookingAgentID`, `CheckOutDate`, `CheckInDate`, `RoomNumber`) VALUES ('14', '6553 Paseo Padre Street', '2', '2022-11-21 12:00:00', '2022-11-25 08:00:00', '129');

/* Fans */
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('1', '9', 'John', 'Cena', 'USA', 'Male', 'john.cena@gmail.com', '123A');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('2', '8', 'David', 'Beckham', 'Japan', 'Male', 'david.beckham@gmail.com', '1234');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('3', '7', 'Justin', 'Bieber', 'USA', 'Male', 'justin.bieber@gmail.com', '12345');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('4', '6', 'Hasbullah', 'Mutwakil', 'Japan', 'Male', 'hasbullah.mut@gmail.com', '123456');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('5', '5', 'David', 'Newman', 'Japan', 'Male', 'david.newman@gmail.com', '1234567');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('6', '4', 'Dua', 'Lipa', 'Albania', 'Female', 'dua.lipa@gmail.com', '987');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('7', '3', 'Britney', 'Spears', 'Albania', 'Female', 'britney.spears@gmail.com', '9876');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('8', '2', 'Victoria', 'Justice', 'Albania', 'Female', 'victoria.justice@gmail.com', '98765');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('9', '1', 'Ariana', 'Grande', 'USA', 'Female', 'ariana.grande@gmail.com', '987654');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('10', '14', 'Brad', 'Pitt', 'Serbia', 'Male', 'brad.pitt@gmail.com', '3124');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('11', '10', 'Steve', 'Lacy', 'Brazil', 'Male', 'steve.lacy@gmail.com', '5325');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('12', '11', 'Chris', 'Hemsworth', 'Tunisia', 'Male', 'chris.hem@gmail.com', '64834');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('13', '12', 'Danny', 'Devito', 'Poland', 'Male', 'danny.devito@gmail.com', '29234');
INSERT INTO `wct`.`Fans` (`FanID`, `BookingID`, `FirstName`, `LastName`, `Nationality`, `Gender`, `Email`, `Password`) VALUES ('14', '13', 'Dave', 'Chapelle', 'Russia', 'Male', 'dave.chap@gmail.com', '18842');

/* Participates */
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('1', '4');
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('2', '3');
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('3', '2');
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('4', '1');
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('5', '4');
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('6', '2');
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('7', '3');
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('8', '1');
INSERT INTO `wct`.`Participates` (`FanID`, `ActivityID`) VALUES ('9', '3');

/* Takes(FanId: string, TripID: string) */
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('1', '8');
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('2', '6');
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('3', '9');
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('4', '4');
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('5', '2');
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('6', '7');
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('7', '5');
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('8', '1');
INSERT INTO `wct`.`Takes` (`FanID`, `TripID`) VALUES ('9', '3');

/* Offers */
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('23', '1', '2', '0', '2', '1');
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('322', '2', '5', '0', '4', '4');
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('450', '3', '5', '0', '9', '3');
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('422', '4', '2', '0', '1', '4');
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('789', '5', '3', '0', '3', '3');
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('239', '6', '7', '0', '4', '2');
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('233', '7', '1', '0', '2', '4');
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('367', '8', '3', '0', '9', '1');
INSERT INTO `wct`.`Offers` (`SeatNum`, `GameID`, `Zone`, `IsReserved`, `GateNumber`, `BookingAgentID`) VALUES ('124', '2', '3', '0', '12', '2');

/* Attends */
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('2', '334', '4', '1');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('2', '124', '3', '2');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('2', '674', '9', '3');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('2', '592', '17', '4');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('2', '129', '9', '5');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('2', '509', '6', '6');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('2', '989', '13', '7');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('2', '21', '6', '8');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('6', '382', '9', '1');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('6', '593', '2', '2');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('6', '450', '5', '3');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('6', '125', '5', '4');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('6', '195', '14', '5');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('6', '865', '5', '6');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('6', '434', '7', '7');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('6', '39', '4', '8');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('8', '443', '12', '1');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('8', '593', '3', '2');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('8', '867', '8', '3');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('8', '422', '2', '4');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('8', '329', '3', '5');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('8', '238', '1', '6');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('8', '293', '18', '7');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('8', '122', '12', '8');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('1', '23', '2', '1');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('3', '233', '1', '7');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('4', '789', '3', '5');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('5', '322', '5', '2');
INSERT INTO `wct`.`Attends` (`FanID`, `SeatNum`, `Zone`, `GameID`) VALUES ('7', '239', '7', '6');