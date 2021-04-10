import { memo, useEffect, useState } from "react"
import { DataGrid, GridToolbar } from "@material-ui/data-grid"

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 70,
    valueGetter: (params) => params.rowIndex + 1,
  },
  {
    field: "mfcc0",
    headerName: "mfcc0",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc1",
    headerName: "mfcc1",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc2",
    headerName: "mfcc2",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc3",
    headerName: "mfcc3",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc4",
    headerName: "mfcc4",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc5",
    headerName: "mfcc5",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc6",
    headerName: "mfcc6",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc7",
    headerName: "mfcc7",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc8",
    headerName: "mfcc8",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc9",
    headerName: "mfcc9",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc10",
    headerName: "mfcc10",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc11",
    headerName: "mfcc11",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    field: "mfcc12",
    headerName: "mfcc12",
    width: 90,
    sortable: false,
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  { field: "label", headerName: "Label", width: 130 },
]

const Dataset = () => {
  const [dataset, setDataset] = useState([])
  useEffect(() => {
    const getDataset = async () => {
      try {
        const res = await fetch("/static/speeches.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        const data = await res.json()
        setDataset(data)
      } catch (error) {
        console.log(error)
      } finally {
      }
    }
    getDataset()
  }, [])
  return (
    <div>
      <h1>Dataset</h1>
      <DataGrid
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        loading={!!!dataset.length}
        rows={dataset}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row._id.$oid}
      />
    </div>
  )
}

export default memo(Dataset)
