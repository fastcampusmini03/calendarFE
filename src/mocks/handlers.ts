import { rest } from 'msw'
import { getBearerToken } from '../utils/bearerToken'
import { createMockUser, mockUserList } from './util/userTest'
import { getJwtExpireTimeStamp } from './util/jwt'

const result = [
  {
    id: 0,
    calendarId: 0,
    username: 'jyc',
    email: 'test@test.com',
    title: '히히히히',
    start: new Date(),
    end: new Date(),
    isAllday: true,
    role: 'normal',
  },
  {
    id: 1,
    calendarId: 0,
    username: '만두',
    email: 'test2@test.com',
    title: '김치만두',
    start: new Date(),
    end: new Date(),
    isAllday: true,
    role: 'normal',
  },
  {
    id: 1,
    calendarId: 0,
    username: '만두',
    email: 'test3@test.com',
    title: '고기만두',
    start: new Date(),
    end: new Date(),
    isAllday: true,
    role: 'normal',
  },
  {
    id: 1,
    calendarId: 0,
    username: 'testUser1',
    email: 'test3@test.com',
    title: '따뜻한 녹차',
    start: new Date(),
    end: new Date(),
    isAllday: true,
    role: 'normal',
  },
]
export const AUTHORIZATION_KEY = 'Authorization'
export const ACCESSTOKEN_KEY = 'accessToken'
const TEST_ACCESSTOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiLquYDspIDtg5wiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjgxOTU1NDcyLCJleHAiOjE2ODE5NTkwNzJ9.nAZVh5TXoeZ_BORMzlCYDiCWvqe6DijguEZYlfFrPsc'

export const authHandler = [
  rest.get('/auth/verify', async (req, res, ctx) => {
    const token = getBearerToken(req.headers.get(AUTHORIZATION_KEY))

    if (!token)
      return res(
        ctx.status(401),
        ctx.json({ ok: false, error: { message: '인증되지 않은 사용자입니다' } }),
      )

    const user = mockUserList[0]

    return res(
      ctx.status(200),
      ctx.json({
        ok: true,
        payload: {
          user: {
            id: 1,
            email: user.email,
            username: user.username,
            profile: user.profile,
            role: user.role,
          },
        },
      }),
    )
  }),
  rest.post('/auth/login', async (req, res, ctx) => {
    const { email, password } = await req.json()

    if (email === 'test@text12.com' && password === 'Aa123456') {
      const now = Date.now()

      const user = mockUserList[0]

      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
          payload: {
            content: {
              ...user,
              iat: now,
              exp: getJwtExpireTimeStamp(now, 3600),
            },
            accessToken: TEST_ACCESSTOKEN,
          },
        }),
      )
    }

    return res(
      ctx.status(404),
      ctx.json({ ok: false, error: { message: '존재하지 않는 사용자 입니다.' } }),
    )
  }),
  rest.post('/auth/signup', async (req, res, ctx) => {
    const { email, password, username } = await req.json()

    const now = Date.now()

    const newUser = createMockUser({
      email,
      password,
      username,
      // profile: profile?.name,
    })

    return res(
      ctx.status(201),
      ctx.json({
        ok: true,
        payload: {
          content: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            iat: now,
            exp: getJwtExpireTimeStamp(now, 3600),
          },
          accessToken: TEST_ACCESSTOKEN,
        },
      }),
    )
  }),
]

export const handlers = [
  rest.get('/annualDuty', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(result))
  }),
  ...authHandler,
]
