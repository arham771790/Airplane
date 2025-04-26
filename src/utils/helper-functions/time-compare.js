export const compareTime = (arrivalTime, departureTime) => {
    const arrival = new Date(arrivalTime);
    const departure = new Date(departureTime);
    return arrival.getTime() > departure.getTime();  // true if arrival is after departure
  };
  