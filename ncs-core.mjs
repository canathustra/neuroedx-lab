/**
 * Returns a pedagogic recruitment fraction for a stimulus current.
 * This deterministic curve is not a physiological population model.
 */
export function recruitmentFraction(current, threshold) {
  if (current >= threshold) return 1;
  const normalized = Math.max(0, current - 5) / Math.max(1, threshold - 5);
  return Math.max(0.16, Math.min(1, Math.pow(normalized, 0.82)));
}

/** Motor conduction velocity in m/s from centimetres and milliseconds. */
export function conductionVelocity(distanceCm, distalMs, proximalMs) {
  const latencyDifference = proximalMs - distalMs;
  if (latencyDifference <= 0) return 0;
  return (distanceCm * 10) / latencyDifference;
}

/** Builds a deterministic SVG path for a synthetic biphasic CMAP. */
export function buildWaveformPath(latencyMs, amplitudeMv, recruitment, width = 760, height = 246) {
  const points = [];
  const baseline = height * 0.5;
  const maxTime = 20;
  const samples = 380;
  const effectiveAmplitude = amplitudeMv * recruitment;

  for (let index = 0; index <= samples; index += 1) {
    const time = (index / samples) * maxTime;
    const x = (time / maxTime) * width;
    const baselineNoise = Math.sin(time * 8.7) * 0.65 + Math.sin(time * 3.1) * 0.35;
    let signal = baselineNoise * 0.08;

    if (time >= latencyMs) {
      const phase = time - latencyMs;
      signal +=
        -Math.exp(-Math.pow((phase - 0.82) / 0.5, 2)) +
        0.58 * Math.exp(-Math.pow((phase - 2.05) / 0.82, 2)) -
        0.13 * Math.exp(-Math.pow((phase - 3.65) / 1.1, 2));
    }

    const y = baseline + signal * effectiveAmplitude * 10.2;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return `M ${points.join(" L ")}`;
}
