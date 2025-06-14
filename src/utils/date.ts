export function formatDate(date: string): string {
  // Parse the date string and create a date object that represents the date in local time
  // This avoids timezone conversion issues by treating the date as local
  const parts = date.split('-');
  
  if (parts.length !== 3) {
    return 'Invalid Date';
  }
  
  const year = parseInt(parts[0]!, 10);
  const month = parseInt(parts[1]!, 10);
  const day = parseInt(parts[2]!, 10);
  
  const dateObj = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 