export const getDateAndTimeIST = (dayName, time) => {
    // Define the days of the week in order
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    // Get today's date
    const today = new Date();
  
    // Get the current day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    const currentDayIndex = today.getDay();
  
    // Calculate the difference between the current day and the target day
    const targetDayIndex = daysOfWeek.indexOf(dayName);
  
    if (targetDayIndex === -1) {
      throw new Error("Invalid day name");
    }
  
    // Calculate the difference in days (how many days to go back or forward)
    const diff = targetDayIndex - currentDayIndex;
  
    // Set the target date by adjusting the current date
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
  
    // Format the date to 'YYYY-MM-DD' format
    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = targetDate.getDate().toString().padStart(2, "0");
  
    // Parse the time (it will be in HH:MM format)
    const [hours, minutes] = time.split(":");
  
    // Create a new Date object with the correct date and time
    const dateTime = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;

    return dateTime;
  };

export const gateTimeOnly = (date) => {
    console.log({date})
    if(!date) return "00:00"
    return date.split("T")[1].split(":").slice(0,2).join(":")
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleString('en-GB', options);
}