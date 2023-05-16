import { useInfiniteQuery } from 'react-query'
import { getDeleteDates, getEditDates, getSaveDates, getUsers } from '../apis/axios'
import { ApproveData, DeleteData, EditData } from '../types/dates'
import { UserData } from 'src/types/user'

export const useInfiniteSaveDates = () =>
  useInfiniteQuery<ApproveData, Error>(
    'saveDates',
    async ({ pageParam = 0 }) => {
      const response = await getSaveDates(pageParam)
      return response
    },
    {
      getNextPageParam: (lastPage) => {
        if (
          lastPage.content.length < 8 ||
          lastPage.pageable.pageNumber + 1 >= lastPage.totalPages - 1
        )
          return null // 마지막 페이지인 경우

        return lastPage.pageable.pageNumber + 1 // 마지막 아이템의 id를 반환
      },
    },
  )

export const useInfiniteEditDates = () =>
  useInfiniteQuery<EditData, Error>(
    'editDates',
    async ({ pageParam = 0 }) => {
      const response = await getEditDates(pageParam)
      return response
    },
    {
      getNextPageParam: (lastPage) => {
        if (
          lastPage.content.length < 8 ||
          lastPage.pageable.pageNumber + 1 >= lastPage.totalPages - 1
        )
          return null // 마지막 페이지인 경우

        return lastPage.pageable.pageNumber + 1 // 마지막 아이템의 id를 반환
      },
    },
  )

export const useInfiniteDeleteDates = () =>
  useInfiniteQuery<DeleteData, Error>(
    'deleteDates',
    async ({ pageParam = 0 }) => {
      const response = await getDeleteDates(pageParam)
      return response
    },
    {
      getNextPageParam: (lastPage) => {
        if (
          lastPage.content.length < 8 ||
          lastPage.pageable.pageNumber + 1 >= lastPage.totalPages - 1
        )
          return null // 마지막 페이지인 경우

        return lastPage.pageable.pageNumber + 1 // 마지막 아이템의 id를 반환
      },
    },
  )

export const useInfiniteUsers = () =>
  useInfiniteQuery<UserData, Error>(
    'users',
    async ({ pageParam = 0 }) => {
      const response = await getUsers(pageParam)
      return response
    },
    {
      getNextPageParam: (lastPage) => {
        if (
          lastPage.content.length < 8 ||
          lastPage.pageable.pageNumber + 1 >= lastPage.totalPages - 1
        )
          return null // 마지막 페이지인 경우

        return lastPage.pageable.pageNumber + 1 // 마지막 아이템의 id를 반환
      },
    },
  )
