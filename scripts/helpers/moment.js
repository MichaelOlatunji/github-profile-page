function useMoment(date) {
  let createdDate = moment(date);
  let currentDate = moment(new Date());
  let diff = currentDate.diff(createdDate);
  let d = moment.duration(diff);
  let monthDiff = d.get("months");
  let daysDiff = d.get("days");
  let hoursDiff = d.get("hours");
  let minutesDiff = d.get("minutes");
  let secondsDiff = d.get("seconds");
  let output;

  monthDiff === 0
    ? daysDiff === 0
      ? hoursDiff === 0
        ? minutesDiff === 0
          ? (output = secondsDiff + " seconds ago")
          : (output = minutesDiff + " minutes ago")
        : (output = hoursDiff + " hours ago")
      : (output = daysDiff + " days ago")
    : (output = "on "+moment(createdDate).format("MMM D"));

  return output;
}
