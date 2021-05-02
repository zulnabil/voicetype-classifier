import { memo } from "react"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
})

const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src="/assets/illustration.svg" width="500" alt="illustration" />
      <div
        style={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Jenis suara adalah penggolongan suara penyanyi berdasarkan beberapa
          kriteria yang berbeda antara lain jangkauan vokal, bobot vokal,
          tessitura, nada vokal dan lokasi bridge.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Final project ini dibuat oleh Afandi sebagai syarat kelulusan pada
          program studi Teknik Informatika di Universitas Tadulako.
        </Typography>
        <Link to="/dataset" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Mulai
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default memo(Home)
