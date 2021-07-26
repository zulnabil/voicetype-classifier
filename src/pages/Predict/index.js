import { memo, useEffect, useState, useRef } from "react"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Meyda from "meyda"
import KNN from "ml-knn"

const LABEL_MAP = { alto: 0, bass: 1, sopran: 2, tenor: 3 }
const RESULT_MAP = { 0: "Alto", 1: "Bass", 2: "Sopran", 3: "Tenor" }

function getMeanArray(arr) {
  let meanArr = arr[0].map((col, i) => {
    return arr.map((row) => row[i]).reduce((acc, c) => acc + c, 0) / arr.length
  })
  return meanArr
}

const Predict = () => {
  const [dataset, setDataset] = useState([])
  const [state, setState] = useState({
    context: null,
    source: null,
    sourceStream: null,
  })
  const [analyzer, setAnalyzer] = useState(null)
  const [mfccTotal, setMfccTotal] = useState([])
  const [file, setFile] = useState(null)
  const streamFileRef = useRef(null)
  const [resultText, setResultText] = useState("")

  useEffect(() => {
    if (analyzer) {
      analyzer.start()
    }
  }, [analyzer])

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
    let AudioContext =
      (typeof window !== "undefined" && window.AudioContext) || // Default
      (typeof window !== "undefined" && window.webkitAudioContext) || // Safari and old versions of Chrome
      false
    if (!AudioContext) alert("Your browser not supported")
    const audioContext = new AudioContext()
    audioContext.resume().then(() => {
      console.log("Playback resumed successfully")
    })
    setState({
      context: audioContext,
      sourceStream: audioContext.createMediaElementSource(
        streamFileRef.current
      ),
    })
  }, [])

  const handleInputFile = async (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
    await handleExtractFeature()
  }

  const handleExtractFeature = async () => {
    setResultText("Sedang menganalisa...")
    setMfccTotal([])
    if (state.sourceStream)
      state.sourceStream.connect(state.context.destination)
    setAnalyzer(
      Meyda.createMeydaAnalyzer({
        audioContext: state.context,
        source: state.sourceStream,
        bufferSize: 512,
        featureExtractors: ["mfcc"],
        callback: (features) => {
          setMfccTotal((curr) => curr.concat([features.mfcc]))
        },
      })
    )
  }

  const handlePredictFromFile = async () => {
    analyzer.stop()
    let testingDataSource = await getMeanArray(mfccTotal)
    predict(testingDataSource)
    setMfccTotal([])
  }

  const predict = (dataTest) => {
    const data = dataset.map((item) => {
      const tempItem = { ...item }
      delete tempItem._id
      delete tempItem.label
      return Object.values(tempItem)
    })
    const label = dataset.map((item) => LABEL_MAP[item.label])

    const knn = new KNN(data, label)
    const result = knn.predict(dataTest)
    console.log(result)
    setResultText(`Jenis suara adalah "${RESULT_MAP[result]}"`)
  }

  return (
    <div>
      <h1>Klasifikasi</h1>
      <input
        id="contained-button-file"
        type="file"
        accept="audio/*"
        onChange={handleInputFile}
        style={{ display: "none" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <audio
          ref={streamFileRef}
          src={file}
          controls
          autoPlay
          onPlay={() => analyzer.start()}
          onEnded={handlePredictFromFile}
        />
        <Typography variant="h6" gutterBottom>
          {resultText}
        </Typography>
      </div>
    </div>
  )
}

export default memo(Predict)
