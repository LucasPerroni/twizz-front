import swal from "sweetalert"

import "./questionModal.css"

export default function questionNumber() {
  return swal({
    content: {
      element: "input",
      attributes: {
        placeholder: "Number of questions",
        type: "number",
      },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
    className: "swal-footer",
    className: "swal-modal",
    className: "swal-button--confirm",
  })
}
