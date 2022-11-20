// @ts-check
const { test, expect } = require('@playwright/test');

test('homepage has title and board', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tic Tac Toe/);

  // create a locator
  const square1 = page.locator('[data-testid=square-0]');
  await expect(square1).toHaveText(" ");

  await square1.click();

  await expect(square1).toHaveText("X");

});

test('X wins the game', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const square0 = page.getByTestId('square-0');
  await square0.click();
  const square4 = page.getByTestId('square-4');
  await square4.click();
  const square1 = page.getByTestId('square-1');
  await square1.click();
  const square8 = page.getByTestId('square-8');
  await square8.click();
  const square2 = page.getByTestId('square-2');
  await square2.click();

  const statusText = page.getByTestId('status-text');
  await expect(statusText).toHaveText('The winner is X');

  await page.getByRole('button', { name: 'Reset' }).click();

  // check that all fields are empty
  for (let i = 0; i < 9; i++) {
    await expect(page.getByTestId('square-' + i)).toHaveText(' ');
  }

});