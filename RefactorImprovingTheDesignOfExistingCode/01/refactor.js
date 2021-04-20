export function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = playFor(plays, perf);
    result += ` ${play.name}: ${usd(amountFor(play, perf) / 100)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount(invoice, plays) / 100)}\n`;

  result += `You earned ${totalVolumeCredits(invoice, plays)} credits\n`;

  return result;
}

function totalAmount(invoice, plays) {
  let result = 0;
  for (let perf of invoice.performances) {
    const play = playFor(plays, perf);
    result += amountFor(play, perf);
  }
  return result;
}

function totalVolumeCredits(invoice, plays) {
  let result = 0;
  for (let perf of invoice.performances) {
    const play = playFor(plays, perf);
    result += volumeCreditsFor(perf, play);
  }
  return result;
}

function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);
}

function volumeCreditsFor(aPerformance, play) {
  let result = 0;
  result = Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === play.type) result += Math.floor(aPerformance.audience / 5);
  return result;
}

function playFor(plays, perf) {
  return plays[perf.playID];
}

function amountFor(play, aPerformance) {
  let result = 0;

  switch (play.type) {
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
      throw new Error(`Unknown type: ${play.type}`);
  }

  return result;
}
