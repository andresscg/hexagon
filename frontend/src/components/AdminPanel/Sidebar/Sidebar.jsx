import {Link, useParams} from "react-router-dom"
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons"
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Dashboard</h3>
          <ul className="sidebar-list">
            <Link to="/admin" className="sidebar-list__link">
              <li className="sidebar-list__item--active">
                <LineStyle className="sidebar-icon" />
                Home
              </li>
            </Link>
            <li className="sidebar-list__item">
              <Timeline className="sidebar-icon" />
              Analytics
            </li>
            <li className="sidebar-list__item">
              <TrendingUp className="sidebar-icon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Quick Menu</h3>
          <ul className="sidebar-list">
            <Link to="/admin/users" className="sidebar-list__link">
              <li className="sidebar-list__item">
                <PermIdentity className="sidebar-icon" />
                Users
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebar-list__item">
                <Storefront className="sidebar-icon" />
                Products
              </li>
            </Link>
            <li className="sidebar-list__item">
              <AttachMoney className="sidebar-icon" />
              Transactions
            </li>
            <li className="sidebar-list__item">
              <BarChart className="sidebar-icon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Notifications</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list__item">
              <MailOutline className="sidebar-icon" />
              Mail
            </li>
            <li className="sidebar-list__item">
              <DynamicFeed className="sidebar-icon" />
              Feedback
            </li>
            <li className="sidebar-list__item">
              <ChatBubbleOutline className="sidebar-icon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Staff</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list__item">
              <WorkOutline className="sidebar-icon" />
              Manage
            </li>
            <li className="sidebar-list__item">
              <Timeline className="sidebar-icon" />
              Analytics
            </li>
            <li className="sidebar-list__item">
              <Report className="sidebar-icon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
