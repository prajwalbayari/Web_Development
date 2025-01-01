import React from 'react'

const ContactForm = () => {
  return (
    <div>
      <form action="">
        <input type="text" placeholder='Name'/> <br />
        <input type="text" placeholder='email'/> <br />
        <textarea placeholder='message'></textarea><br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ContactForm
