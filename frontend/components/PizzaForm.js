import React, { useState } from "react";
import { useAddOrderMutation } from "../state/pizzaApi"; // another RTK Query hook

const initialFormState = {
  // suggested
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

export default function PizzaForm() {
  const [form, setForm] = useState(initialFormState);
  const [addOrder, { isLoading, error }] = useAddOrderMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toppings = Object.keys(form).filter(
      (k) => ["1", "2", "3", "4", "5"].includes(k) && form[k]
    );
    try { // call mutation function sending data
      await addOrder({
        fullName: form.fullName,
        size: form.size,
        toppings,
      }).unwrap();
      setForm(initialFormState); // reset form after successful submission
    } catch (err) {
      console.error("Failed to add order:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {error && (
        <div className="failure">Order failed: {error.data?.message}</div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={form.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={form["1"]}
            onChange={handleChange}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={form["2"]}
            onChange={handleChange}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={form["3"]}
            onChange={handleChange}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={form["4"]}
            onChange={handleChange}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={form["5"]}
            onChange={handleChange}
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" value="Submit" />
    </form>
  );
}
