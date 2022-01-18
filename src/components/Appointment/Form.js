import React, { useState } from "react"
import Button from 'components/Button'
import InterviewerList from "components/InterviewerList"

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")

  const reset = () => {
    setName('')
    setInterviewer(null)
  }


  const cancel = () => {
    reset()
    setError()
    props.onCancel()
  }
  const validation = () => {
    if (!name) {
      setError('Student name cannot be blank');
      return;
    }
    if (!interviewer) {
      setError('Please select an interviewer');
      return;
    }
    setError('');
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value)
            }}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validation} confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}