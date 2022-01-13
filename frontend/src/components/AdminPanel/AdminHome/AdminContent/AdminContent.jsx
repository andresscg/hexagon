import "./AdminContent.css"
import {ArrowDownward, ArrowUpward} from "@material-ui/icons"

export default function AdminContent() {
  return (
    <div className="admin-home">
      <div className="admin-home__item">
        <span className="admin-home__title">Revanue</span>
        <div className="admin-home__money-container">
          <span className="admin-home__money">$2,415</span>
          <span className="admin-home__rate">
            -11.4 <ArrowDownward className="admin-home__icon--negative" />
          </span>
        </div>
        <span className="admin-home__sub">Compared to last month</span>
      </div>
      <div className="admin-home__item">
        <span className="admin-home__title">Sales</span>
        <div className="admin-home__money-container">
          <span className="admin-home__money">$4,415</span>
          <span className="admin-home__rate">
            -1.4 <ArrowDownward className="admin-home__icon--negative" />
          </span>
        </div>
        <span className="admin-home__sub">Compared to last month</span>
      </div>
      <div className="admin-home__item">
        <span className="admin-home__title">Cost</span>
        <div className="admin-home__money-container">
          <span className="admin-home__money">$2,225</span>
          <span className="admin-home__rate">
            +2.4 <ArrowUpward className="admin-home__icon" />
          </span>
        </div>
        <span className="admin-home__sub">Compared to last month</span>
      </div>
    </div>
  )
}
