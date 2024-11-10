import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseCard} = props
  const {id, name, logoUrl} = courseCard

  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="course-item">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
