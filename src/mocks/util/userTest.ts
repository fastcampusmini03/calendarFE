// import { ExcludeBaseEntity, User } from "@/types/entity";

export const mockUserList = [
  {
    id: 1,
    email: "test1@gmail.com",
    password: "12345678",
    username: "testUser1",
    profile: "https://picsum.photos/200/300",
    createdAt: "2023-04-20T09:03:09.566Z",
    updatedAt: "2023-04-20T09:03:09.566Z",
  },
  {
    id: 2,
    email: "test2@gmail.com",
    password: "12345678",
    username: "testUser2",
    profile: "https://picsum.photos/200/300",
    createdAt: "2023-04-20T09:03:09.566Z",
    updatedAt: "2023-04-20T09:03:09.566Z",
  },
];

export function createMockUser({
  email = "testDefault@gmail.com",
  password = "testPassword",
  username = "testDefaultUser",
 
}) {
  const id = mockUserList.length + 1;

  const date = new Date();

  const user = {
    id,
    email,
    password,
    username,
    profile: "https://picsum.photos/200/300",
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
  };

  mockUserList.push(user);

  return user;
}
