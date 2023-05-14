import { useInfiniteQuery } from 'react-query'
import { getDeleteDates, getEditDates, getSaveDates } from '../apis/axios'
import { ApproveData, DeleteData, EditData } from '../types/dates'

export const useInfiniteSaveDates = () =>
  useInfiniteQuery<ApproveData, Error>(
    'saveDates',
    async ({ pageParam = 0 }) => {
      const response = await getSaveDates(pageParam)
      return response
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.content.length < 8) return undefined // 마지막 페이지인 경우
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
        if (lastPage.content.length < 8) return undefined // 마지막 페이지인 경우
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
        if (lastPage.content.length < 8) return undefined // 마지막 페이지인 경우
        return lastPage.pageable.pageNumber + 1 // 마지막 아이템의 id를 반환
      },
    },
  )
