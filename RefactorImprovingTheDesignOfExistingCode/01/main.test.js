import { statement as ostatement } from "./orginal";
import { statement as rstatement } from "./refactor";

const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

const invoice = {
  customer: "BigCo",
  performances: [
    {
      playID: "hamlet",
      audience: 55,
    },
    {
      playID: "as-like",
      audience: 35,
    },
    {
      playID: "othello",
      audience: 40,
    },
  ],
};

const output = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits`;

// test("orginal expected output", () => {
//   var result = ostatement(invoice, plays);
//   expect(result.trim()).toBe(output);
// });

test("refactored expected output", () => {
  var result = rstatement(invoice, plays);
  expect(result.trim()).toBe(output);
});
