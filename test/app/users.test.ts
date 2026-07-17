import { UserAccessGroup } from '@prisma/client'
import { test } from '../_fixtures'
import { config, dashboardUrl, prisma, sleep } from '../_setup'
import { expect } from '@playwright/test'

test.skip(!!process.env.SDK_VERSION && process.env.SDK_VERSION !== 'main')
test.skip(!!process.env.GHOST_MODE)

test.describe('Users settings', () => {
  let userGroup: UserAccessGroup

  test.beforeAll(async () => {
    await cleanup()

    const org = await prisma.organization.findUnique({
      where: { slug: config.orgSlug },
      include: { userAccessGroups: true },
    })

    if (!org) throw new Error('Could not find organization')

    userGroup =
      org.userAccessGroups.find(g => g.name === 'Engineers') ??
      (await prisma.userAccessGroup.create({
        data: {
          organization: { connect: { id: org.id } },
          name: 'Engineers',
          slug: 'engineers',
        },
      }))
  })

  test.afterAll(async () => {
    await cleanup()
  })
})

async function cleanup() {
  await prisma.userOrganizationInvitation.deleteMany({
    where: {
      organization: { slug: config.orgSlug },
    },
  })
}
