export function getTimeInMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);

  return hours * 60 + minutes;
}

export function getTimeString(timeInMinutes) {
  const hours = Math.floor(timeInMinutes / 60) % 24;
  const minutes = timeInMinutes % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
