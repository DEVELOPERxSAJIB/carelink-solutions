import React, { useState } from 'react';
import PageHeader from './../../components/FormElement/PageHeader';
import { useCreateQuestionMutation, useGetQuestionsQuery } from "../../Redux/api/SettingApi";
import AuthLoader from './../../utils/Loaders/AuthLoader';
import { useMeQuery } from "../../Redux/api/UserApi";
const PositiveIdentifications = () => {
  const { data: logData } = useMeQuery();
  const [createQuestion, { isLoading, isSuccess, error }] = useCreateQuestionMutation();
  const { data: serverQuestions } = useGetQuestionsQuery();

  const defaultQuestions = [
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

  // Initialize formData with default values from serverQuestions?.questions if available
  const initialFormData = Array(15).fill({ questionNumber: "", questionText: "", answer: "" }).map((_, index) => {
    const foundQuestion = serverQuestions?.questions?.find(q => q.questionNumber === index + 1);
    return {
      questionNumber: index + 1,
      questionText: foundQuestion ? foundQuestion.question : defaultQuestions[index % defaultQuestions.length],
      answer: foundQuestion ? foundQuestion.answer : ""
    };
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    
    if (name === 'questionNumber') {
      updatedFormData[index] = { 
        ...updatedFormData[index], 
        questionNumber: index + 1,
        questionText: defaultQuestions[parseInt(value) - 1] // Set questionText based on selected value
      };
    } else {
      updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    //console.log(formData);
    createQuestion({formData}); // Assuming createQuestion handles submission correctly
  };
if(isLoading) return <AuthLoader/>
  return (
    <div className="container py-4">
      <div className="card shadow">
        <PageHeader title="Positive Identification" className="card-header fs-3" />
        <div className="card-body">
        <div className="text-end">
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        {isLoading && <div className="alert alert-info text-center mt-3">Submitting...</div>}
          {isSuccess && <div className="alert alert-success text-center mt-3">Questions submitted successfully!</div>}
          {error && <div className="alert alert-danger text-center mt-3">{error.message}</div>}
          {formData.map((entry, index) => (
            <div key={index} className="mb-4">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="mb-3">Question {index + 1}</h6>
                  <select
                    id={`question-${index}`}
                    name={`questionNumber`}
                    className="form-select"
                    onChange={(e) => handleChange(index, e)}
                    value={entry.questionNumber}
                  >
                    <option value="">Select a question</option>
                    {defaultQuestions.map((q, idx) => (
                      <option key={idx + 1} value={idx + 1}>{q}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <h6 className="mb-3">Answer {index + 1}</h6>
                  <input
                    type="text"
                    id={`answer-${index}`}
                    name={`answer`}
                    className="form-control"
                    placeholder={`Answer ${index + 1}`}
                    onChange={(e) => handleChange(index, e)}
                    value={entry.answer}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="text-end">
            <button className="btn btn-primary" onClick={handleSubmit}>Save answer</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PositiveIdentifications;
