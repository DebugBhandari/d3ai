import ChartsDiv from "./ChartsDiv";
import QueryComponent from "./QueryComponent";
import "../Styles/index.css";


export default function Dashboard() {
  return (
    <div className="dashboard">
      <QueryComponent />
      <ChartsDiv />
    </div>
  )
}
