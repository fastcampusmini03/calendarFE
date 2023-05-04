import { rest } from 'msw'

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
    username: '녹차',
    email: 'test3@test.com',
    title: '따뜻한 녹차',
    start: new Date(),
    end: new Date(),
    isAllday: true,
    role: 'normal',
  },
]

export const handlers = [
  rest.get('/annualDuty', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(result))
  }),
]
