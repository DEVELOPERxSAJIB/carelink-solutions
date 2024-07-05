import React, { useState } from 'react';
import PageHeader from './../../components/FormElement/PageHeader';

const PositiveIdentifications = () => {
  const [formData, setFormData] = useState([]);

  const questions = [
    "Which family member do you like the most?",
    "Which family members do you like the least?",
    "What did you want be when you grew up?",
    "What are you most afraid of?",
    "What cartoon character would you like to be?",
    "What is the worst concert that you attended?",
    "What store did you have your first layaway?",
    "Who was your first childhood crush?",
    "Who is your celebrity crush?",
    "Who do you secretly admire?",
    "Who do you think Secretly admires you?",
    "What is your favorite book?",
    "What is your favorite body feature?",
    "What do you fear the most?",
    "What do you fear the least?",
    "What would you do with a million dollars?",
    "Who was your favorite teacher?",
    "Who was your worst teacher?",
    "What country would you like to visit?",
    "What country would you never want to visit?",
    "What city would you like to visit?",
    "What city would you never want to visit?",
    "What state would you never want to visit?",
    "What is your favorite type of fabric?",
    "What fabric do you like the least?",
    "What is your favorite store?",
    "What store do you like the least?",
    "What is your dream car?",
    "What makes you sad?",
    "What make you happy?",
    "What make you afraid?",
    "What is your favorite food?",
    "What food you dislike?",
    "What is your oldest memory?",
    "What is your fondest memory?",
    "What would you like to forget?",
    "What perfume to you like the most?",
    "What perfume do you hate?",
    "What cologne do you like the most?",
    "What cologne do you hate?",
    "Who is your favorite singer?",
    "Who is your favorite drummer?",
    "What is your favorite TV show?",
    "What TV show do you dislike the most?",
    "How do you deal with stress?",
    "How do you help others?",
    "What make you feel lucky?",
    "What makes you feel confident?",
    "What will you do when you retire?",
    "If you owned the moon, what would you rename it?",
    "What is your greatest desire?",
    "What is longest distance you have run?",
    "What is the longest distance you have swam?",
    "What is the favorite flavor?",
    "What flavor do you like the least?",
    "What is your favorite candy?",
    "What is the oldest garment you own?",
    "What is the newest garment you own?",
    "How much did you weigh in the 10th grade?",
    "Who did you first fall in love with?",
    "What is your library card",
    "What is your first phone number",
    "What's your favorite Animal",
    "What's your favorite bird",
    "What's your favorite tree",
    "How many electronic devices do you have",
    "What is your main frequent flyer number",
    "Where did you spend your summer in 2015"
  ];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log(formData); // Just for example, replace with actual submission logic
  };

  return (
    <div className="container py-4">
      <div className="card shadow">

        <PageHeader title="Positive Identification" className="card-header fs-3"/>
        <div className="card-body">
          {questions.splice(0,15).map((question, index) => (
            <div key={index} className="mb-4">
              <div className="row">
                <div className="col-md-6">
                <h6 className="mb-3">Question {index + 1}</h6>
                  <select
                    id={`question-${index}`}
                    className="form-select"
                    onChange={(e) => handleChange(index, e)}
                  >
                    <option value="">Select a question</option>
                    {questions.map((q, idx) => (
                      <option key={idx} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                <h6 className="mb-3">Answer {index + 1}</h6>
                  <input
                    type="text"
                    id={`answer-${index}`}
                    name={`answer-${index}`}
                    className="form-control"
                    placeholder={`Answer ${index + 1}`}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositiveIdentifications