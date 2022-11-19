import * as R from "ramda";

export default () =>
  location.search
    ? R.fromPairs(
        location.search
          .slice(1)
          .split("&")
          .map(assignment => assignment.split("="))
      )
    : {};
