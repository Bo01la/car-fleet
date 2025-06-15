//convert date to secons
function dateToSeconds(dateStr) {
  return Math.floor(new Date(dateStr).getTime() / 1000);
}

// seconds to YYYY/MM/DD (used wen submitting forms)
function formatDateFromSeconds(seconds) {
  const date = new Date(seconds * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dmyDateFormat(seconds) {
  return new Date(seconds * 1000).toLocaleDateString("en-GB");
}

export { dateToSeconds, formatDateFromSeconds, dmyDateFormat };
