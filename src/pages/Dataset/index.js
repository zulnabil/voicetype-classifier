import { memo, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import { DataGrid, GridToolbar } from "@material-ui/data-grid"
import { columns } from "./constants"

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
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1>Dataset</h1>
        <Link to="/predict" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Mulai Klasifikasi
          </Button>
        </Link>
      </div>
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
