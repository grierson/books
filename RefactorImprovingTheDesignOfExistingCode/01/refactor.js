let Plays;

export function statement(invoice, plays) {
  Plays = plays;

  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };

  return renderPlainText(statementData);
}

function playFor(perf) {
  return Plays[perf.playID];
}

function enrichPerformance(aPerformance) {
  const result = Object.assign(
    {
      play: playFor(aPerformance),
    },
    aPerformance
  );
  return result;
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount(data.performances) / 100)}\n`;
  result += `You earned ${totalVolumeCredits(data.performances)} credits\n`;

  return result;
}

function totalAmount(performances) {
  let result = 0;
  for (let perf of performances) {
    result += amountFor(perf);
  }
  return result;
}

function totalVolumeCredits(performances) {
  let result = 0;
  for (let perf of performances) {
    result += volumeCreditsFor(perf);
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

function volumeCreditsFor(aPerformance) {
  let result = 0;
  result = Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === aPerformance.play.type)
    result += Math.floor(aPerformance.audience / 5);
  return result;
}

function amountFor(aPerformance) {
  let result = 0;

  switch (aPerformance.play.type) {
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
      throw new Error(`Unknown type: ${aPerformance.play.type}`);
  }

  return result;
}
