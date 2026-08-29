import assert from "node:assert/strict";
import test from "node:test";

import { buildWaveformPath, conductionVelocity, recruitmentFraction } from "./ncs-core.mjs";

test("motor conduction velocity converts cm/ms to m/s", () => {
  assert.ok(Math.abs(conductionVelocity(24, 3.6, 8.4) - 50) < 1e-9);
});

test("invalid latency order cannot produce a velocity", () => {
  assert.equal(conductionVelocity(24, 8.4, 3.6), 0);
});

test("recruitment reaches but never exceeds the plateau", () => {
  assert.equal(recruitmentFraction(40, 40), 1);
  assert.equal(recruitmentFraction(80, 40), 1);
  assert.ok(recruitmentFraction(20, 40) > 0 && recruitmentFraction(20, 40) < 1);
});

test("waveform generation is deterministic", () => {
  const first = buildWaveformPath(3.6, 8.6, 1);
  assert.equal(first, buildWaveformPath(3.6, 8.6, 1));
  assert.match(first, /^M 0\.00,/);
});
