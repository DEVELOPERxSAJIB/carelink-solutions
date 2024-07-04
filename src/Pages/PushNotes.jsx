import PopupModal from "./../components/Models/PopupModel";
import { useState } from "react";
import avatar from "../../src/assets/img/avatars/7.png";
const PushNotes = () => {
  const [count, setCount] = useState(1);
  const handleSubmit = () => {};
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <PopupModal title="Add Note" id="Add_Note">
          <form onSubmit={handleSubmit}>
            {count === 1 && (
              <>
                <div className="mb-3">
                  <input
                    type="file"
                    id="Note_title"
                    name="title"
                    className="form-control"
                    placeholder="Enter title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Note_title" className="form-label">
                    Note Title
                  </label>
                  <input
                    type="text"
                    id="Note_title"
                    name="title"
                    className="form-control"
                    placeholder="Enter title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Note_description" className="form-label">
                    Note Description
                  </label>
                  <input
                    type="text"
                    id="Note_description"
                    name="description"
                    className="form-control"
                    placeholder="Enter description"
                    required
                  />
                </div>
                <button
                  onClick={() => setCount(2)}
                  type="submit"
                  className="btn btn-primary"
                >
                  <i className="ti ti-arrow-right"></i>
                </button>
              </>
            )}
            {count === 2 && (
              <>
                <input
                  type="search"
                  className="form-control"
                  placeholder="search"
                />
                <div className="d-flex flex-column gap-4 mt-5">
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
                    <a className="d-flex align-items-center">
                      <div className="flex-shrink-0 avatar">
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-contact-info flex-grow-1 ms-4">
                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
                    <a className="d-flex align-items-center">
                      <div className="flex-shrink-0 avatar">
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-contact-info flex-grow-1 ms-4">
                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
                    <a className="d-flex align-items-center">
                      <div className="flex-shrink-0 avatar">
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-contact-info flex-grow-1 ms-4">
                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
                    <a className="d-flex align-items-center">
                      <div className="flex-shrink-0 avatar">
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-contact-info flex-grow-1 ms-4">
                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
                    <a className="d-flex align-items-center">
                      <div className="flex-shrink-0 avatar">
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-contact-info flex-grow-1 ms-4">
                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
                    <a className="d-flex align-items-center">
                      <div className="flex-shrink-0 avatar">
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-contact-info flex-grow-1 ms-4">
                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                  <button
                    onClick={() => setCount(1)}
                    type="submit"
                    className="btn btn-primary"
                  >
                    <i className="ti ti-arrow-left"></i>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Done
                  </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </PopupModal>
      </div>
    </div>
  );
};

export default PushNotes;
