import React, { FunctionComponent } from 'react'
import { Table, TableBody, createStyles, makeStyles } from '@material-ui/core'
import { UrlTypePublic } from '../../../reducers/types'
import DirectoryTableRow from './DirectoryTableRow'
import DirectoryTablePagination from './DirectoryTablePagination'

type DirectoryTableProps = {
  searchResults: Array<UrlTypePublic>
  pageCount: number
  rowsPerPage: number
  changePageHandler: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    pageNumber: number,
  ) => void
  changeRowsPerPageHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  currentPage: number
  resultsCount: number
  disablePagination: boolean
  setUrlInfo: (url: UrlTypePublic) => void
  setOpen: (urlInfo: boolean) => void
  rankOffset: number
}

const useStyles = makeStyles((theme) =>
  createStyles({
    resultsTable: {
      boxSizing: 'content-box',
      maxWidth: theme.spacing(180),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(3),
      },
    },
  }),
)

/**
 * @component Holds the entire search results in table format and the pagination bar.
 */
const DirectoryTable: FunctionComponent<DirectoryTableProps> = React.memo(
  ({
    searchResults,
    pageCount,
    rowsPerPage,
    resultsCount,
    currentPage,
    disablePagination,
    changePageHandler,
    changeRowsPerPageHandler,
    setUrlInfo,
    setOpen,
    rankOffset,
  }: DirectoryTableProps) => {
    const classes = useStyles()
    return (
      <Table aria-label="search results table" className={classes.resultsTable}>
        <TableBody>
          {searchResults.map((url: UrlTypePublic, index) => (
            <DirectoryTableRow
              url={url}
              setUrlInfo={setUrlInfo}
              setOpen={setOpen}
              index={index + 1 + rankOffset}
            />
          ))}
          <DirectoryTablePagination
            pageCount={pageCount}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            changePageHandler={changePageHandler}
            changeRowsPerPageHandler={changeRowsPerPageHandler}
            resultsCount={resultsCount}
            disablePagination={disablePagination}
          />
        </TableBody>
      </Table>
    )
  },
)

export default DirectoryTable
