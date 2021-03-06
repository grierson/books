import plays from "./plays";

export function statement(invoice) {
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    // Print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount(invoice))}\n`;
  result += `You earned ${totalVolumeCredits(invoice)} credits\n`;

  return result;
}

function totalAmount(invoice) {
  let result = 0;
  for (let perf of invoice.performances) {
    result += amountFor(perf);
  }
  return result;
}

function totalVolumeCredits(invoice) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
  return volumeCredits;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function volumeCreditsFor(perf) {
  let volumeCredits = 0;
  volumeCredits += Math.max(perf.audience - 30, 0);

  if (playFor(perf).type === "comedy")
    volumeCredits += Math.floor(perf.audience / 5);

  return volumeCredits;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function amountFor(aPerformance) {
  let result = 0;

  switch (playFor(aPerformance).type) {
    case "tragedy":
      result = 40000;

      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }

      break;

    case "comedy":
      result = 30000;

      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }

      result += 300 * aPerformance.audience;

      break;

    default:
      throw new Error(`Unknown type: ${playFor(aPerformance).type}`);
  }
  return result;
}
