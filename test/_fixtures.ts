import { test as base } from '@playwright/test'
import { Transaction } from './classes/Transaction'

interface IntervalFixtures {
  transactions: Transaction
}

export const test = base.extend<IntervalFixtures>({
  transactions: async ({ page }, use) => {
    await use(new Transaction(page))
  },
})
