import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import * as courseAction from '../../actions/courseActions';

class CoursesPage extends React.Component {
  static courseRow(course, index) {
    return (<div key={index}>{course.title}</div>);
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      course: {"title": ""}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave() {
    this.props.createCourse(this.state.course);
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>

        {this.props.courses.map(CoursesPage.courseRow)}

        <h2>Add new course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title}/>

        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave}
        />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps){
  return{
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return{
    createCourse: course => dispatch(courseAction.createCourse(course))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);