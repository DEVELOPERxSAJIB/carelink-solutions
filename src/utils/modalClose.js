// Reusable function to close the modal and reset the page state
const closeModal = () => {
    const modal = document.querySelector(".modal");
    const body = document.querySelector("body");
    
    if (modal) {
      // Remove the "show" class from the modal to hide it
      modal.classList.remove("show");
  
      // Remove the "modal-open" class from the body
      if (body) {
        body.classList.remove("modal-open");
      }
  
      // Remove the backdrop element
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      
      // Reset the inline styles added by Bootstrap to the modal and body
      modal.style.display = '';
      body.style.paddingRight = '';
    }
  };
  
export default closeModal