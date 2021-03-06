import { useEffect, useState } from 'react'

import * as Sentry from '@sentry/browser'
import { get } from '../../../../../../app/util/requests'
import { LinkStatisticsInterface } from '../../../../../../../shared/interfaces/link-statistics'
import { GAEvent } from '../../../../../../app/util/ga'

export type LinkStatistics = {
  status: number | null
  contents: LinkStatisticsInterface | null
}

export const initialState: LinkStatistics = {
  status: null,
  contents: null,
}

export const useStatistics = (shortUrl: string) => {
  const [statistics, setStatistics] = useState<LinkStatistics>(initialState)

  useEffect(() => {
    const fetchStatistics = async () => {
      const endpoint = `/api/link-stats?url=${shortUrl}`
      const response = await get(endpoint)

      if (response.status !== 200) {
        // Sentry analytics: fetching analytics fail
        Sentry.captureMessage(`fetching analytics data unsuccessful`)
        GAEvent(
          'drawer page analytics data',
          'fetch analytics data',
          'unsuccessful',
        )
      }

      const linkStatistics: LinkStatistics = {
        status: response.status,
        contents: await response.json(),
      }
      setStatistics(linkStatistics)
    }
    if (shortUrl) {
      fetchStatistics()
    }
  }, [])

  return statistics
}
