function useMoment(date) {
  let createdDate = moment(date);
  let currentDate = moment(new Date());
  let diff = currentDate.diff(createdDate);
  let d = moment.duration(diff);
  // console.log(d.get("hours"), d.get("minutes"), d.seconds("seconds"))
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
    : (output = moment(createdDate).format("MMM d") + "ago");

  return output;
}
