import { useState } from "react";

export const Accordion = ({faq}) => {
    const {question, answer} = faq;
    const [show, setShow] = useState(false);

    return (
       <div>
  <h2 id="accordion-flush-heading-1">
    <button
      onClick={() => setShow(!show)}
      type="button"
      className="text-lg flex items-center justify-between w-full py-5 font-medium text-left text-gray-600 border-b border-gray-200"
      data-accordion-target="#accordion-flush-body-1"
      aria-expanded={show ? "true" : "false"}
      aria-controls="accordion-flush-body-1"
    >
      <span className="text-xl text-black">{question}</span>
      {!show && (
        <svg
          data-accordion-icon
          className="w-6 h-6 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {show && (
        <svg
          data-accordion-icon
          className="rotate-180 w-6 h-6 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  </h2>
  {show && (
    <div
      id="accordion-flush-body-1"
      aria-labelledby="accordion-flush-heading-1"
    >
      <div className="py-5 border-b border-gray-200">
        <p className="text-lg mb-2 text-gray-600">{answer}</p>
      </div>
    </div>
  )}
</div>

    )
}