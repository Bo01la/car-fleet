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

// seconds to DD/MM/YYYY (used wen displaying date)
function dmyDateFormat(seconds) {
  return new Date(seconds * 1000).toLocaleDateString("en-GB");
}

// getting the current date in MM/YYYY
function getCurrentMonthYear() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${month}-${year}`;
}

export {
  dateToSeconds,
  formatDateFromSeconds,
  dmyDateFormat,
  getCurrentMonthYear,
};
