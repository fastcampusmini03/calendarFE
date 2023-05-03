import { DatesPayload } from '../../types/dates'

interface AdminPageProps {
  dates: DatesPayload[]
}

function AnnualDutyList({ dates }: AdminPageProps) {
  return (
    <div>
      {dates.map((result: DatesPayload) => (
        <div key={result.id}>
          <div>{result.username}</div>
          <div> {result.role}</div>

          <div>{result.title}</div>
          <div>{result.start.toLocaleString('ko-KR')}</div>
          <div>{result.start.toLocaleString('ko-KR')}</div>
        </div>
      ))}
    </div>
  )
}

export default AnnualDutyList
