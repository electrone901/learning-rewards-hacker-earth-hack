import { FormEvent } from 'react'
import Navbar from './Navbar'
import styles from '../styles/Home.module.css'

export default function PageWithJSbasedForm() {
  // Handle the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement

    // Get data from the form.
    const data = {
      first: form.first.value as string,
      last: form.last.value as string,
      description: form.description.value as string,
      twitter: form.twitter.value as string,
      instagram: form.instagram.value as string,
      github: form.github.value as string,
      whatsapp: form.whatsapp.value as string,
      email: form.email.value as string,
    }

    // Send the form data to our API and get a response.
    const response = await fetch('/api/form', {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST',
    })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Is this your full name: ${result.email}`)
  }
  return (
    <Navbar />
    <div className="container">
      <h1 className={styles.title}>
        Inform us who you are
      </h1>

      <p className={styles.description}>
        Users will subscribe only if they trust you.
      </p>

      <form className={styles.description} onSubmit={handleSubmit}>
        <label htmlFor="first">First Name</label>
        <input type="text" id="first" name="first" required />
        <label htmlFor="last">Last Name</label>
        <input type="text" id="last" name="last" required />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" required />
        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" name="twitter" required />
        <label htmlFor="instagram">Instagram</label>
        <input type="text" id="instagram" name="instagram" required />
        <label htmlFor="github">Git Hub</label>
        <input type="text" id="github" name="github" required />
        <label htmlFor="whatsapp">Whatsapp</label>
        <input type="text" id="whatsapp" name="whatsapp" required />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required />
        <button class={styles.savePost} type="submit">Submit</button>
      </form>
    </div>
  )
}
