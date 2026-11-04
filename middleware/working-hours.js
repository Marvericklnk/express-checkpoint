// Use Nigeria time even when the hosting server is in another country.
function isWorkingHours(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos', weekday: 'short', hour: '2-digit', hourCycle: 'h23'
  }).formatToParts(date);
  const day = parts.find(part => part.type === 'weekday').value;
  const hour = Number(parts.find(part => part.type === 'hour').value);
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day) && hour >= 9 && hour < 17;
}

function workingHours(req, res, next) {
  if (isWorkingHours()) return next();
  res.status(503).sendFile(require('path').join(__dirname, '../views/closed.html'));
}

module.exports = { workingHours, isWorkingHours };
