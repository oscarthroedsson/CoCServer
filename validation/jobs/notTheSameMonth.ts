//! We may be able to take away this and use date-fns instead
export function notTheSameMonth(monthToCompare: Date | undefined) {
  const date = new Date();
  const month = date.getMonth();
  const bajs = monthToCompare?.getMonth();

  console.log({ month, bajs });

  console.log(month === bajs);

  if (month !== monthToCompare?.getMonth()) {
    return true;
  } else {
    return false;
  }
}
