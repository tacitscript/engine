
export default () =>
  location.search
    ? R.fromPairs(
        location.search
          .slice(1)
          .split("&")
          .map(assignment => assignment.split("="))
      )
    : {};
