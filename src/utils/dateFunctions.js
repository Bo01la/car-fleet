//convert date to secons after converting date to YYYY/MMM/DD
function dateToSeconds(dateStr) {
  // if YYYY/MM/DD from input field
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return Math.floor(new Date(dateStr).getTime() / 1000);
  }

  // if DD/MM/YYYY OR DD-MM-YYYY
  const [day, month, year] = dateStr.split(/[-/]/).map(Number);
  const dateObj = new Date(year, month - 1, day);
  return Math.floor(dateObj.getTime() / 1000);
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

// second to number of months
function secondsToMonths(seconds) {
  const secondsPerMonth = 2629743; // متوسط عدد الثواني في شهر
  return seconds / secondsPerMonth;
}

export {
  dateToSeconds,
  formatDateFromSeconds,
  dmyDateFormat,
  getCurrentMonthYear,
  secondsToMonths,
};
