// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  onChangeLastName = event => {
    const {target} = event
    const {value} = target

    this.setState({
      lastName: value,
    })
  }

  renderLastNameField = () => {
    const {lastName, showLastNameError} = this.state
    const className = showLastNameError
      ? 'name-input-field-error-field'
      : 'name-input-field'
    return (
      <div className="input-container">
        <label htmlFor="lastName" className="input-label">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className={className}
          value={lastName}
          placeholder="Last name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </div>
    )
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()

    this.setState({showFirstNameError: !isValidFirstName})
  }

  onChangeFirstName = event => {
    const {target} = event
    const {value} = target

    this.setState({
      firstName: value,
    })
  }

  renderFirstNameField = () => {
    const {firstName, showFirstNameError} = this.state
    const className = showFirstNameError
      ? 'name-input-field-error-field'
      : 'name-input-field'
    return (
      <div className="input-container">
        <label htmlFor="firstName" className="input-label">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={className}
          placeholder="First name"
          value={firstName}
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </div>
    )
  }

  validateLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  validateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()
    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state

    return (
      <form onSubmit={this.onSubmitForm}>
        {this.renderFirstNameField()}
        {showFirstNameError && <p className="error-msg">Required</p>}
        {this.renderLastNameField()}
        {showLastNameError && <p className="error-msg">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}
export default RegistrationForm
