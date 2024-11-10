import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Courses extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getAllCoursesDetails()
  }

  getAllCoursesDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetryButton = () => {
    this.getAllCoursesDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-btn"
        type="button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderAllCourses = () => {
    const {coursesList} = this.state

    return (
      <div className="course-container">
        <h1 className="main-heading">Courses</h1>
        <ul className="courses-list">
          {coursesList.map(eachCourse => (
            <CourseItem key={eachCourse.id} courseCard={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllCourses()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Courses
