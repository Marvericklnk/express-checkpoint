const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isWorkingHours } = require('../middleware/working-hours');
const app = require('../app');

test('Nigeria working hours include weekdays from 09:00 up to 17:00', () => {
  for (const [date, expected] of [
    ['2026-11-02T07:59:59Z', false],
    ['2026-11-02T08:00:00Z', true],
    ['2026-11-06T15:59:59Z', true],
    ['2026-11-06T16:00:00Z', false],
    ['2026-11-07T11:00:00Z', false],
    ['2026-11-08T11:00:00Z', false]
  ]) assert.equal(isWorkingHours(new Date(date)), expected, date);
});

test('routes, navigation, stylesheet and closed-hours responses', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-11-02T09:00:00Z').getTime() });
  const server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://localhost:${server.address().port}`;
  for (const route of ['/', '/services', '/contact']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200);
    const html = await response.text();
    for (const href of ['/', '/services', '/contact']) assert.ok(html.includes(`href="${href}"`));
    assert.ok(html.includes('aria-current="page"'));
  }
  assert.equal((await fetch(base + '/missing')).status, 404);
  for (const time of ['2026-11-02T16:00:00Z', '2026-11-07T10:00:00Z']) {
    t.mock.timers.setTime(new Date(time).getTime());
    for (const route of ['/', '/services', '/contact']) {
      const response = await fetch(base + route);
      assert.equal(response.status, 503);
      assert.match(await response.text(), /We’re offline/);
    }
    assert.equal((await fetch(base + '/assets/style.css')).status, 200);
  }
});
